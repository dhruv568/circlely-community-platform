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

  const { id: eventId } = await params;

  const existingAttendee = await db.eventAttendee.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId: session.userId,
      },
    },
  });

  if (existingAttendee) {
    await db.eventAttendee.delete({ where: { id: existingAttendee.id } });
    const updated = await db.event.update({
      where: { id: eventId },
      data: { attendeesCount: { decrement: 1 } },
    });
    return NextResponse.json({ rsvped: false, attendeesCount: updated.attendeesCount });
  } else {
    await db.eventAttendee.create({
      data: {
        eventId,
        userId: session.userId,
        status: 'JOINED',
      },
    });
    const updated = await db.event.update({
      where: { id: eventId },
      data: { attendeesCount: { increment: 1 } },
    });
    return NextResponse.json({ rsvped: true, attendeesCount: updated.attendeesCount });
  }
}
