import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { receiverId } = await req.json();

    const existingConnection = await db.connection.findFirst({
      where: {
        OR: [
          { requesterId: session.userId, receiverId },
          { requesterId: receiverId, receiverId: session.userId },
        ],
      },
    });

    if (existingConnection) {
      return NextResponse.json({ message: 'Connection already requested or established' });
    }

    const connection = await db.connection.create({
      data: {
        requesterId: session.userId,
        receiverId,
        status: 'PENDING',
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId: receiverId,
        actorId: session.userId,
        type: 'CONNECTION',
        title: 'New Connection Request',
        message: `${session.name} sent you a connection request.`,
        link: '/messages',
      },
    });

    return NextResponse.json(connection);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to send connection' }, { status: 500 });
  }
}
