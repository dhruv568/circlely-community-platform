import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return NextResponse.json({ message: 'conversationId required' }, { status: 400 });
  }

  const messages = await db.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    include: { sender: { include: { profile: true } } },
  });

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { conversationId, content } = await req.json();

    const message = await db.message.create({
      data: {
        conversationId,
        senderId: session.userId,
        content,
      },
      include: { sender: { include: { profile: true } } },
    });

    await db.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(message);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
