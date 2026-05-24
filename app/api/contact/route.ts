import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, type, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #FF6B00;">New Inquiry from chronovalestudios.com</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${type || 'Not specified'}</p>
        <hr style="border: 1px solid #eee; my-4;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>', // Resend's default test domain
        to: 'chronovalestudios@gmail.com', // Your email
        reply_to: email, // This allows you to reply directly to the sender
        subject: `New Contact Inquiry: ${type || 'General'} from ${name}`,
        html: htmlContent
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Resend error:', errorData);
      throw new Error('Failed to send email via Resend');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
