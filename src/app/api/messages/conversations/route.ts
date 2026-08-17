import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const conversations = await db.conversation.findMany({
    where: {
      members: {
        some: { userId: session.userId },
      },
    },
    include: {
      members: {
        include: { user: { include: { profile: true } } },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json(conversations);
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { targetUserId } = await req.json();

    // Check existing 1-on-1 conversation
    const existing = await db.conversation.findFirst({
      where: {
        isGroup: false,
        AND: [
          { members: { some: { userId: session.userId } } },
          { members: { some: { userId: targetUserId } } },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const conversation = await db.conversation.create({
      data: {
        isGroup: false,
        members: {
          create: [
            { userId: session.userId },
            { userId: targetUserId },
          ],
        },
      },
      include: {
        members: { include: { user: { include: { profile: true } } } },
      },
    });

    return NextResponse.json(conversation);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create conversation' }, { status: 500 });
  }
}
