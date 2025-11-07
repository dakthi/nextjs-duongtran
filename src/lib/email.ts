import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

export interface AdminNotificationData {
  bookingId: string
  customerName: string
  customerEmail: string
  customerPhone?: string | null
  facilityName: string
  eventTitle: string
  eventDescription?: string | null
  startDateTime: Date
  endDateTime: Date
  totalCost?: number
  totalHours: number
  status: string
  notes?: string | null
}

export async function sendAdminBookingNotification(data: AdminNotificationData) {
  try {
    const resend = getResendClient()
    const { data: emailData, error } = await resend.emails.send({
      from: 'noreply@chartedconsultants.com',
      to: ['lieu.boa@outlook.com'],
      subject: `New Booking Request - ${data.eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">
            New Booking Request
          </h2>
          
          <p>A new booking request has been submitted:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #dc3545;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.customerEmail}</p>
            ${data.customerPhone ? `<p><strong>Phone:</strong> ${data.customerPhone}</p>` : ''}
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            ${data.eventDescription ? `<p><strong>Description:</strong> ${data.eventDescription}</p>` : ''}
            <p><strong>Facility:</strong> ${data.facilityName}</p>
            <p><strong>Date & Time:</strong> ${data.startDateTime.toLocaleDateString()} from ${data.startDateTime.toLocaleTimeString()} to ${data.endDateTime.toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> ${data.totalHours} hours</p>
            ${data.totalCost ? `<p><strong>Total Cost:</strong> £${data.totalCost.toFixed(2)}</p>` : ''}
            ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
            <p><strong>Status:</strong> ${data.status.toUpperCase()}</p>
          </div>
          
          <p>Please review this booking request and update its status in the admin panel.</p>
          
          <p>Best regards,<br>
          Booking System</p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending admin booking notification:', error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error('Failed to send admin booking notification:', error)
    throw error
  }
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface LieuVoContactFormData {
  name: string
  email: string
  message: string
  privacyPolicy: boolean
  newsletter: boolean
}

export async function sendContactFormNotification(data: ContactFormData) {
  try {
    const resend = getResendClient()
    const { data: emailData, error } = await resend.emails.send({
      from: 'noreply@chartedconsultants.com',
      to: ['lieu.boa@outlook.com'],
      subject: `Contact Enquiry: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            New Contact Enquiry - West Acton Community Centre
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #28a745;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <hr style="border: 1px solid #dee2e6; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            This enquiry was submitted through the West Acton Community Centre website contact form.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending contact form notification:', error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error('Failed to send contact form notification:', error)
    throw error
  }
}

export async function sendLieuVoContactEmail(data: LieuVoContactFormData) {
  try {
    const resend = getResendClient()
    const { data: emailData, error } = await resend.emails.send({
      from: 'noreply@chartedconsultants.com',
      to: ['lieu.boa@outlook.com'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0C1631;">New Contact Form Submission</h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Newsletter Subscription:</strong> ${data.newsletter ? 'Yes' : 'No'}</p>
            <p><strong>Privacy Policy Accepted:</strong> ${data.privacyPolicy ? 'Yes' : 'No'}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #0C1631;">Message:</h3>
            <p style="line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">
            <p style="font-size: 12px; color: #666;">
              This email was sent from the contact form on your website.
              Reply directly to: <a href="mailto:${data.email}">${data.email}</a>
            </p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission

        Name: ${data.name}
        Email: ${data.email}
        Newsletter Subscription: ${data.newsletter ? 'Yes' : 'No'}
        Privacy Policy Accepted: ${data.privacyPolicy ? 'Yes' : 'No'}

        Message:
        ${data.message}

        ---
        This email was sent from the contact form on your website.
        Reply directly to: ${data.email}
      `,
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendAdminBookingStatusUpdate(data: AdminNotificationData) {
  try {
    const statusMessages = {
      confirmed: 'Booking has been confirmed',
      cancelled: 'Booking has been cancelled',
      rejected: 'Booking has been rejected'
    }

    const message = statusMessages[data.status as keyof typeof statusMessages] || `Booking status updated to: ${data.status}`

    const resend = getResendClient()
    const { data: emailData, error } = await resend.emails.send({
      from: 'noreply@chartedconsultants.com',
      to: ['lieu.boa@outlook.com'],
      subject: `Booking Status Update - ${data.eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Booking Status Update
          </h2>

          <p>${message}</p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #007bff;">Booking Details</h3>
            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.customerEmail}</p>
            <p><strong>Event:</strong> ${data.eventTitle}</p>
            <p><strong>Facility:</strong> ${data.facilityName}</p>
            <p><strong>Date & Time:</strong> ${data.startDateTime.toLocaleDateString()} from ${data.startDateTime.toLocaleTimeString()} to ${data.endDateTime.toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> ${data.totalHours} hours</p>
            ${data.totalCost ? `<p><strong>Total Cost:</strong> £${data.totalCost.toFixed(2)}</p>` : ''}
            <p><strong>Status:</strong> <span style="color: ${data.status === 'confirmed' ? '#28a745' : data.status === 'cancelled' || data.status === 'rejected' ? '#dc3545' : '#007bff'}; font-weight: bold;">${data.status.toUpperCase()}</span></p>
          </div>

          <p>Admin notification - no action required.</p>

          <p>Best regards,<br>
          Booking System</p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending admin status update:', error)
      throw error
    }

    return emailData
  } catch (error) {
    console.error('Failed to send admin status update:', error)
    throw error
  }
}

export interface EmployerTestNotificationData {
  employerEmail: string
  companyName: string
  score: number
  percentage: number
  answers: any
  notes?: string
}

export async function sendEmployerThankYou(data: { email: string; companyName: string; score: number; percentage: number }) {
  try {
    const resend = getResendClient()
    const { data: emailData, error } = await resend.emails.send({
      from: 'noreply@chartedconsultants.com',
      to: [data.email],
      subject: 'Thank you for your interest - Lieu Vo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #FEF3C7; padding: 20px; border-left: 4px solid #F59E0B; margin-bottom: 20px;">
            <h2 style="color: #0F172A; margin-top: 0;">Thank you for your interest!</h2>
          </div>

          <p style="color: #334155; line-height: 1.6;">Dear ${data.companyName} team,</p>

          <p style="color: #334155; line-height: 1.6;">
            Thank you for taking the time to complete the compatibility assessment. I truly appreciate
            your interest in learning more about my background and experience.
          </p>

          <div style="background-color: #F1F5F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #334155; margin-bottom: 10px;"><strong>Your compatibility score:</strong></p>
            <p style="color: #0F172A; font-size: 32px; font-weight: bold; margin: 10px 0;">${data.percentage}%</p>
            <p style="color: #64748B; font-size: 14px; margin-top: 10px;">
              Based on your responses, there appears to be strong alignment between your needs and my expertise.
            </p>
          </div>

          <p style="color: #334155; line-height: 1.6;">
            I will personally review your submission and be in touch within the next 2-3 business days to
            discuss the opportunity further and share my full CV.
          </p>

          <p style="color: #334155; line-height: 1.6;">
            In the meantime, if you have any questions or would like to expedite the conversation,
            please feel free to reach out directly at
            <a href="mailto:lieu.boa@outlook.com" style="color: #F59E0B;">lieu.boa@outlook.com</a>.
          </p>

          <div style="border-top: 2px solid #E2E8F0; margin-top: 30px; padding-top: 20px;">
            <p style="color: #64748B; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong>Lieu Vo</strong><br>
              ACCA Qualified Chartered Accountant
            </p>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #FEF3C7; border-radius: 4px;">
            <p style="font-size: 12px; color: #78716C; margin: 0;">
              This email was sent to you because you completed the employer compatibility test
              on my professional portfolio website.
            </p>
          </div>
        </div>
      `,
      text: `
        Dear ${data.companyName} team,

        Thank you for taking the time to complete the compatibility assessment. I truly appreciate your interest in learning more about my background and experience.

        Your Compatibility Score: ${data.percentage}%

        Based on your responses, there appears to be strong alignment between your needs and my expertise.

        I will personally review your submission and be in touch within the next 2-3 business days to discuss the opportunity further and share my full CV.

        In the meantime, if you have any questions or would like to expedite the conversation, please feel free to reach out directly at lieu.boa@outlook.com.

        Best regards,
        Lieu Vo
        ACCA Qualified Chartered Accountant
      `,
    })

    if (error) {
      console.error('Failed to send employer thank you email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error sending employer thank you email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendLieuEmployerNotification(data: EmployerTestNotificationData) {
  try {
    const resend = getResendClient()

    // Format answers for display
    const answersHtml = Object.entries(data.answers)
      .filter(([key, value]) => typeof value === 'object' && value !== null && 'value' in value)
      .map(([key, value]: [string, any]) => `
        <p style="margin: 8px 0;">
          <strong style="color: #475569;">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong><br>
          <span style="color: #64748B;">${value.value} (${value.points} points)</span>
        </p>
      `).join('')

    const { data: emailData, error } = await resend.emails.send({
      from: 'noreply@chartedconsultants.com',
      to: ['lieu.boa@outlook.com'],
      subject: `New Employer Lead: ${data.companyName} (${data.percentage}% match)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: ${data.percentage >= 70 ? '#D1FAE5' : '#FEF3C7'}; padding: 20px; border-left: 4px solid ${data.percentage >= 70 ? '#10B981' : '#F59E0B'}; margin-bottom: 20px;">
            <h2 style="color: #0F172A; margin-top: 0;">New Employer Test Submission</h2>
          </div>

          <div style="background-color: #F8FAFC; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0F172A; margin-top: 0;">Company Details</h3>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${data.companyName}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.employerEmail}" style="color: #F59E0B;">${data.employerEmail}</a></p>
            <p style="margin: 8px 0;"><strong>Compatibility score:</strong> <span style="font-size: 24px; font-weight: bold; color: ${data.percentage >= 70 ? '#10B981' : data.percentage >= 50 ? '#F59E0B' : '#EF4444'};">${data.percentage}%</span> (${data.score} points)</p>
          </div>

          ${data.notes ? `
          <div style="background-color: #FEF3C7; padding: 20px; border-left: 4px solid #F59E0B; border-radius: 4px; margin-bottom: 20px;">
            <h3 style="color: #0F172A; margin-top: 0;">Additional Notes from Employer</h3>
            <p style="color: #334155; white-space: pre-wrap; line-height: 1.6;">${data.notes}</p>
          </div>
          ` : ''}

          <div style="background-color: #FFFFFF; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0F172A; margin-top: 0;">Assessment Responses</h3>
            ${answersHtml}
          </div>

          <div style="background-color: #FEF3C7; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="font-size: 14px; color: #78716C; margin: 0;">
              <strong>Next Steps:</strong> Review the submission and reach out to ${data.companyName} within 2-3 business days.
              A thank you email has already been sent to the employer letting them know you'll be in touch.
            </p>
          </div>
        </div>
      `,
      text: `
        New Employer Test Submission

        Company: ${data.companyName}
        Email: ${data.employerEmail}
        Compatibility score: ${data.percentage}% (${data.score} points)

        Assessment Responses:
        ${Object.entries(data.answers)
          .filter(([key, value]) => typeof value === 'object' && value !== null && 'value' in value)
          .map(([key, value]: [string, any]) => `${key}: ${value.value} (${value.points} points)`)
          .join('\n')}

        Next Steps: Review the submission and reach out to ${data.companyName} within 2-3 business days.
        A thank you email has already been sent to the employer letting them know you'll be in touch.
      `,
    })

    if (error) {
      console.error('Failed to send Lieu notification email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error sending Lieu notification email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}