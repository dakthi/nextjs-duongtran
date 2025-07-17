import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 1. Validate incoming data from your ContactForm
    const { name, email, message, privacyPolicy, newsletter } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    if (!privacyPolicy) { // Check if privacy policy was agreed to
      return NextResponse.json(
        { error: 'You must agree to the privacy policy.' },
        { status: 400 }
      );
    }

    // 2. Define the Google Apps Script Web App URL
    // THIS IS YOUR GOOGLE APPS SCRIPT WEB APP DEPLOYMENT URL
    // You'll get this URL when you deploy your Google Apps Script project as a Web App.
    // It's recommended to store this in an environment variable for security and flexibility.
    const googleAppsScriptUrl = process.env.GOOGLE_CONTACT_FORM_APPS_SCRIPT_URL;

    if (!googleAppsScriptUrl) {
        console.error("Missing GOOGLE_CONTACT_FORM_APPS_SCRIPT_URL environment variable.");
        return NextResponse.json(
            { error: "Server configuration error: Contact form API endpoint not set." },
            { status: 500 }
        );
    }

    // 3. Prepare the data for forwarding
    // You can add a timestamp or other server-side data here if needed
    const dataToForward = {
        name,
        email,
        message,
        newsletterOptIn: newsletter, // Clarify newsletter status
        timestamp: new Date().toISOString(),
        source: 'BlazingStar Contact Form', // Indicate source if you have multiple forms
    };

    // 4. Forward the data to the Google Apps Script Web App
    const response = await fetch(googleAppsScriptUrl, {
      method: "POST",
      headers: {
        // Google Apps Script `doPost(e)` often expects 'text/plain' for raw JSON body parsing.
        // If your Apps Script expects 'application/json', change this.
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(dataToForward),
    });

    // 5. Read the response from the Google Apps Script
    // Apps Script typically returns plain text or JSON.
    const textResponseFromAppsScript = await response.text();

    console.log("Response from Google Apps Script:", textResponseFromAppsScript);

    // 6. Return a response to the frontend
    // You might want to parse textResponseFromAppsScript if your Apps Script returns JSON
    // and check its status (e.g., if it returns { status: "OK" }).
    if (response.ok) { // Check if the Apps Script responded with a 2xx status
        return NextResponse.json(
            { message: "Message successfully sent!", appsScriptResponse: textResponseFromAppsScript },
            { status: 200 }
        );
    } else {
        // If Apps Script responded with an error status (e.g., 4xx, 5xx)
        console.error("Google Apps Script returned an error status:", response.status, textResponseFromAppsScript);
        return NextResponse.json(
            { error: `Google Apps Script error: ${textResponseFromAppsScript || 'Unknown error'}`, statusFromAppsScript: response.status },
            { status: 500 } // Or response.status if you want to relay it directly
        );
    }

  } catch (error: any) {
    console.error("Error processing contact form submission:", error);

    // Differentiate between known errors (e.g., network issues) and unexpected ones
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later.", details: error.message },
      { status: 500 }
    );
  }
}

// Optional: A GET request handler for testing the API route directly
export async function GET() {
  return NextResponse.json({ message: "Contact form API route is active. Use POST to submit data." });
}