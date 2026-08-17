import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { targetType, targetId, reason, details } = await req.json();

    const report = await db.report.create({
      data: {
        reporterId: session.userId,
        targetType,
        targetId,
        reason,
        details: details || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json(report);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create report' }, { status: 500 });
  }
}
