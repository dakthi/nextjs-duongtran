import { NextRequest, NextResponse } from "next/server";
import { sendLieuVoContactEmail } from "@/lib/email";

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

    // 2. Send email using Resend
    const result = await sendLieuVoContactEmail({
      name,
      email,
      message,
      privacyPolicy,
      newsletter: newsletter || false
    });

    // 3. Return response based on email sending result
    if (result.success) {
      return NextResponse.json(
        { message: "Message successfully sent!" },
        { status: 200 }
      );
    } else {
      console.error("Failed to send email:", result.error);
      return NextResponse.json(
        { error: `Failed to send message: ${result.error || 'Unknown error'}` },
        { status: 500 }
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