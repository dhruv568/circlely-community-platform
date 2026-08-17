import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const notifications = await db.notification.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    include: { actor: { include: { profile: true } } },
  });

  return NextResponse.json(notifications);
}

export async function PATCH() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await db.notification.updateMany({
    where: { userId: session.userId, isRead: false },
    data: { isRead: true },
  });

  return NextResponse.json({ success: true, message: 'All notifications marked as read' });
}
