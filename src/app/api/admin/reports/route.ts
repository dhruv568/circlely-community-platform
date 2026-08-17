import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const reports = await db.report.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      reporter: { include: { profile: true } },
    },
  });

  return NextResponse.json(reports);
}

export async function PATCH(req: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { reportId, status, resolutionNote } = await req.json();

    const report = await db.report.update({
      where: { id: reportId },
      data: {
        status,
        resolutionNote,
      },
    });

    return NextResponse.json(report);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to update report status' }, { status: 500 });
  }
}
