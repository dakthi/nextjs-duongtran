import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmployerThankYou, sendDuongEmployerNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.email || !data.companyName) {
      return NextResponse.json(
        { error: 'Email and company name are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!data.email.includes('@') || !data.email.includes('.')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Calculate percentage for emails
    const isInHouse = data.testAnswers?.workEnvironment?.value === 'In-house (single company finance/accounting team)'
    const maxScore = isInHouse ? 90 : 100
    const percentage = Math.round((data.score / maxScore) * 100)

    // Save to database
    const submission = await prisma.employerTestSubmission.create({
      data: {
        email: data.email,
        companyName: data.companyName,
        companySize: data.companySize || null,
        role: data.role || null,
        testAnswers: data.testAnswers || data,
        passedTest: percentage >= 50,
        accessCodeSent: false,
        accessCode: null
      }
    })

    // Send thank you email to employer
    const thankYouResult = await sendEmployerThankYou({
      email: data.email,
      companyName: data.companyName,
      score: data.score,
      percentage: percentage
    })

    if (!thankYouResult.success) {
      console.error('Failed to send thank you email:', thankYouResult.error)
    }

    // Send notification to Duong
    const notificationResult = await sendDuongEmployerNotification({
      employerEmail: data.email,
      companyName: data.companyName,
      score: data.score,
      percentage: percentage,
      answers: data.testAnswers || data,
      notes: data.notes
    })

    if (!notificationResult.success) {
      console.error('Failed to send notification email to Duong:', notificationResult.error)
    }

    // Update submission to mark emails as sent
    await prisma.employerTestSubmission.update({
      where: { id: submission.id },
      data: { accessCodeSent: thankYouResult.success }
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you! Please check your email for next steps.'
    })
  } catch (error) {
    console.error('Error processing employer test:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
