import { prisma } from './src/lib/prisma'

async function checkBlogData() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        locale: 'vi',
        isPublished: true
      },
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
        isFeatured: true,
        locale: true,
      },
      orderBy: [
        { isFeatured: 'desc' },
        { publishedDate: 'desc' }
      ]
    })

    console.log('Blog posts for Vietnamese locale:')
    posts.forEach((post, index) => {
      console.log(`\n${index + 1}. ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   Locale: ${post.locale}`)
      console.log(`   Image: ${post.image || 'No image'}`)
      console.log(`   Featured: ${post.isFeatured}`)
    })

    if (posts.length === 0) {
      console.log('No published posts found for Vietnamese locale')
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkBlogData()