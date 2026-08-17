import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const [totalUsers, totalCommunities, totalEvents, totalActivities, pendingReports, totalPosts] = await Promise.all([
    db.user.count(),
    db.community.count(),
    db.event.count(),
    db.activity.count(),
    db.report.count({ where: { status: 'PENDING' } }),
    db.post.count(),
  ]);

  return NextResponse.json({
    totalUsers,
    totalCommunities,
    totalEvents,
    totalActivities,
    pendingReports,
    totalPosts,
  });
}
