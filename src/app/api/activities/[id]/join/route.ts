import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id: activityId } = await params;

  const existingParticipant = await db.activityParticipant.findUnique({
    where: {
      activityId_userId: {
        activityId,
        userId: session.userId,
      },
    },
  });

  if (existingParticipant) {
    await db.activityParticipant.delete({ where: { id: existingParticipant.id } });
    const updated = await db.activity.update({
      where: { id: activityId },
      data: { participantsCount: { decrement: 1 } },
    });
    return NextResponse.json({ joined: false, participantsCount: updated.participantsCount });
  } else {
    await db.activityParticipant.create({
      data: {
        activityId,
        userId: session.userId,
        status: 'JOINED',
      },
    });
    const updated = await db.activity.update({
      where: { id: activityId },
      data: { participantsCount: { increment: 1 } },
    });
    return NextResponse.json({ joined: true, participantsCount: updated.participantsCount });
  }
}
