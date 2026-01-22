#!/usr/bin/env python3
"""
Facebook scraper using Apify API
Scrapes posts and photos from Facebook pages

Usage:
    python scripts/download-facebook-images.py

The script will:
1. Scrape posts from Facebook page using Apify
2. Download all images from posts
3. Organize into year-month folders (same as Instagram gallery structure)
4. Create a gallery-index.json for the frontend
"""

import os
import json
import requests
import ssl
import urllib.request
import re
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
import concurrent.futures

# Load environment variables
load_dotenv('/Users/dakthi/Documents/Factory-Tech/comms/.env')

APIFY_API_KEY = os.getenv('APIFY_API_KEY')
APIFY_ACTOR_ID = 'apify~facebook-posts-scraper'  # Facebook posts scraper

# Disable SSL verification for CDN
ssl._create_default_https_context = ssl._create_unverified_context

BASE_DIR = Path(__file__).parent.parent
GALLERY_DIR = BASE_DIR / ".resources" / "facebook-gallery"
POSTS_FILE = BASE_DIR / "facebook_posts.json"

# Facebook page URL to scrape
FACEBOOK_PAGE_URL = "https://www.facebook.com/duongtran110"  # Duong Tran


def slugify(text, max_length=50):
    """Convert text to a safe filename slug."""
    if not text:
        return None
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    text = text.strip('-')
    return text[:max_length] if text else None


def extract_name_from_message(message):
    """Extract a meaningful name from post message."""
    if not message:
        return None

    priority_keywords = [
        'acca', 'exam', 'study', 'revision', 'tips', 'class', 'course',
        'accounting', 'finance', 'business', 'audit', 'tax',
        'congratulations', 'welcome', 'announcement', 'update', 'news',
        'event', 'workshop', 'seminar', 'webinar',
    ]

    search_text = message.lower()
    hashtags = re.findall(r'#(\w+)', search_text)
    for tag in hashtags:
        search_text += ' ' + tag

    found = []
    for kw in priority_keywords:
        if kw in search_text:
            found.append(kw)

    if found:
        unique = []
        for k in found:
            if k not in unique:
                unique.append(k)
        return '-'.join(unique[:3])

    if message:
        clean = re.sub(r'[#@]\w+', '', message)
        clean = re.sub(r'https?://\S+', '', clean)
        clean = re.sub(r'[^\w\s]', '', clean)
        words = [w.lower() for w in clean.split() if len(w) > 3]
        skip = {'that', 'this', 'with', 'your', 'have', 'from', 'will', 'please', 'thank', 'thanks', 'everyone', 'happy', 'guys'}
        words = [w for w in words if w not in skip]
        if words:
            return slugify(' '.join(words[:3]))

    return None


def download_image(args):
    """Download a single image."""
    url, filepath = args
    try:
        if filepath.exists():
            return f"SKIP: {filepath.name}"

        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })

        with urllib.request.urlopen(req, timeout=30) as response:
            filepath.parent.mkdir(parents=True, exist_ok=True)
            with open(filepath, 'wb') as f:
                f.write(response.read())
        return f"OK: {filepath.name}"
    except Exception as e:
        return f"ERROR: {filepath.name} - {str(e)[:50]}"


def scrape_facebook_page(page_url, max_posts=100):
    """
    Scrape Facebook page using Apify

    Args:
        page_url: Facebook page URL
        max_posts: Maximum number of posts to scrape

    Returns:
        list: Scraping results
    """

    # Prepare the Actor input for Facebook Posts Scraper
    run_input = {
        "startUrls": [{"url": page_url}],
        "resultsLimit": max_posts,
    }

    print(f"Starting Facebook scrape for {page_url}...")
    print(f"Requesting up to {max_posts} posts...")

    # Run the Actor and wait for it to finish
    run_url = f"https://api.apify.com/v2/acts/{APIFY_ACTOR_ID}/runs?token={APIFY_API_KEY}"

    response = requests.post(
        run_url,
        json=run_input,
        headers={'Content-Type': 'application/json'}
    )

    if response.status_code != 201:
        print(f"Error starting scraper: {response.status_code}")
        print(response.text)
        return None

    run_data = response.json()
    run_id = run_data['data']['id']
    print(f"Run ID: {run_id}")
    print("Waiting for scraper to complete...")

    # Wait for the Actor to finish
    status_url = f"https://api.apify.com/v2/acts/{APIFY_ACTOR_ID}/runs/{run_id}?token={APIFY_API_KEY}"

    import time
    while True:
        time.sleep(10)

        status_response = requests.get(status_url)
        status_data = status_response.json()
        status = status_data['data']['status']

        print(f"Status: {status}")

        if status in ['SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT']:
            break

    if status != 'SUCCEEDED':
        print(f"Scraping failed with status: {status}")
        return None

    # Get the results
    dataset_id = status_data['data']['defaultDatasetId']
    results_url = f"https://api.apify.com/v2/datasets/{dataset_id}/items?token={APIFY_API_KEY}"

    results_response = requests.get(results_url)
    results = results_response.json()

    print(f"Successfully scraped {len(results)} posts")

    return results


def extract_images_from_post(post):
    """Extract all image URLs from a Facebook post."""
    images = []

    # Main media
    if post.get('media'):
        for media in post.get('media', []):
            if media.get('photo'):
                images.append(media['photo'])
            elif media.get('thumbnail'):
                images.append(media['thumbnail'])

    # Full picture
    if post.get('fullPicture'):
        if post['fullPicture'] not in images:
            images.append(post['fullPicture'])

    # Attached images
    if post.get('attachedImages'):
        for img in post['attachedImages']:
            if img not in images:
                images.append(img)

    # Photo URL
    if post.get('photoUrl'):
        if post['photoUrl'] not in images:
            images.append(post['photoUrl'])

    return images


def process_posts(posts):
    """Process posts and organize into gallery structure."""
    tasks = []
    gallery_index = []

    for post in posts:
        post_id = post.get('postId', post.get('id', ''))
        message = post.get('text', post.get('message', ''))
        created_time = post.get('time', post.get('timestamp', ''))
        permalink = post.get('url', post.get('postUrl', ''))

        # Parse timestamp
        if created_time:
            try:
                if isinstance(created_time, str):
                    date = datetime.fromisoformat(created_time.replace('Z', '+00:00'))
                else:
                    date = datetime.fromtimestamp(created_time)
                year_month = date.strftime('%Y-%m')
                date_str = date.strftime('%Y%m%d')
            except:
                year_month = 'unknown'
                date_str = 'unknown'
        else:
            year_month = 'unknown'
            date_str = 'unknown'

        # Get engagement metrics
        likes = post.get('likes', post.get('likesCount', 0)) or 0
        comments = post.get('comments', post.get('commentsCount', 0)) or 0
        shares = post.get('shares', post.get('sharesCount', 0)) or 0
        engagement_str = f"{likes}l-{comments}c"

        # Extract post ID suffix for folder name
        post_id_short = str(post_id).split('_')[-1][-12:] if post_id else 'unknown'

        # Extract name from message
        name_from_message = extract_name_from_message(message)

        # Create folder name
        if name_from_message:
            folder_name = f"{date_str}_{engagement_str}_{name_from_message}"
        else:
            folder_name = f"{date_str}_{engagement_str}_{post_id_short}"

        post_folder = GALLERY_DIR / year_month / folder_name

        # Extract images
        images = extract_images_from_post(post)
        images_downloaded = []

        base_name = name_from_message or post_id_short

        for i, img_url in enumerate(images):
            filename = f"{base_name}_{i+1:02d}.jpg"
            filepath = post_folder / filename
            tasks.append((img_url, filepath))
            images_downloaded.append(f"/gallery/{year_month}/{folder_name}/{filename}")

        # Add to gallery index
        gallery_index.append({
            'postId': str(post_id),
            'folder': f"/gallery/{year_month}/{folder_name}",
            'images': images_downloaded,
            'message': message,
            'name': base_name,
            'timestamp': created_time if isinstance(created_time, str) else datetime.fromtimestamp(created_time).isoformat() if created_time else '',
            'yearMonth': year_month,
            'likesCount': likes,
            'commentsCount': comments,
            'sharesCount': shares,
            'type': 'post',
            'url': permalink,
        })

    return tasks, gallery_index


def main():
    """Main execution function"""
    print("=" * 60)
    print("Facebook Gallery Downloader (Apify)")
    print("=" * 60)

    if not APIFY_API_KEY:
        print("Error: APIFY_API_KEY not found")
        print("Make sure /Users/dakthi/Documents/Factory-Tech/comms/.env has APIFY_API_KEY")
        return

    print(f"Page: {FACEBOOK_PAGE_URL}")
    print()

    # Scrape the page
    posts = scrape_facebook_page(FACEBOOK_PAGE_URL, max_posts=200)

    if not posts:
        print("No posts obtained. Exiting.")
        return

    print(f"\nTotal posts fetched: {len(posts)}")

    # Save raw posts
    with open(POSTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    print(f"Saved raw posts to: {POSTS_FILE}")

    # Process posts
    tasks, gallery_index = process_posts(posts)

    print(f"\nDownloading {len(tasks)} images...")

    if tasks:
        completed = 0
        errors = 0
        skipped = 0

        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            futures = {executor.submit(download_image, task): task for task in tasks}

            for future in concurrent.futures.as_completed(futures):
                result = future.result()
                if result.startswith("OK"):
                    completed += 1
                elif result.startswith("SKIP"):
                    skipped += 1
                else:
                    errors += 1

                total = completed + errors + skipped
                if total % 20 == 0:
                    print(f"Progress: {total}/{len(tasks)} ({completed} ok, {skipped} skip, {errors} err)")

        print(f"\nDone! {completed} downloaded, {skipped} skipped, {errors} errors")

    # Save gallery index
    GALLERY_DIR.mkdir(parents=True, exist_ok=True)
    index_file = GALLERY_DIR / 'gallery-index.json'
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(gallery_index, f, ensure_ascii=False, indent=2)
    print(f"Saved gallery index: {index_file}")

    # Print summary
    print(f"\n{'=' * 60}")
    print("Summary:")
    print(f"  Total posts: {len(gallery_index)}")
    print(f"  Posts with images: {sum(1 for p in gallery_index if p['images'])}")
    print(f"  Total images: {sum(len(p['images']) for p in gallery_index)}")


if __name__ == '__main__':
    main()
