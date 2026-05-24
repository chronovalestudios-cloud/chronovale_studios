import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Newsletter <onboarding@resend.dev>', // Resend's default test domain
        to: 'chronovalestudios@gmail.com',
        subject: `New Newsletter Subscriber: ${email}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #FF6B00;">New Newsletter Subscriber!</h2>
            <p>The following email just subscribed to the Chronovale Newsletter via the website footer:</p>
            <p style="font-size: 18px; font-weight: bold;">${email}</p>
          </div>
        `
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Resend error:', errorData);
      throw new Error('Failed to send email via Resend');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to send newsletter email:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
