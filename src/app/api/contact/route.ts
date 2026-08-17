import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All required fields must be filled.' }, { status: 400 });
    }

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to record contact request' }, { status: 500 });
  }
}
