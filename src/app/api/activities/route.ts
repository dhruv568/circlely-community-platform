import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const type = searchParams.get('type'); // online, offline

  const whereClause: any = {};
  if (category && category !== 'All') {
    whereClause.category = category;
  }
  if (type === 'online') {
    whereClause.isOnline = true;
  } else if (type === 'offline') {
    whereClause.isOnline = false;
  }

  const activities = await db.activity.findMany({
    where: whereClause,
    orderBy: { activityDate: 'asc' },
    include: {
      community: { select: { name: true, slug: true } },
      creator: { include: { profile: true } },
    },
  });

  return NextResponse.json(activities);
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, category, isOnline, location, city, activityDate, maxParticipants, icon, communityId } = body;

    const activity = await db.activity.create({
      data: {
        title,
        description,
        category: category || 'Discussions',
        isOnline: isOnline ?? true,
        location,
        city: city || 'San Francisco',
        activityDate: new Date(activityDate || Date.now() + 86400000 * 2),
        maxParticipants: maxParticipants || 20,
        icon: icon || '🎯',
        communityId: communityId || null,
        creatorId: session.userId,
        participantsCount: 1,
        participants: {
          create: {
            userId: session.userId,
            status: 'JOINED',
          },
        },
      },
    });

    return NextResponse.json(activity);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create activity' }, { status: 500 });
  }
}
