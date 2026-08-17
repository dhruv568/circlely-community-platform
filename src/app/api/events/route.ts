import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');

  const whereClause: any = {};
  if (category && category !== 'All') whereClause.category = category;
  if (city && city !== 'All') whereClause.city = city;

  const events = await db.event.findMany({
    where: whereClause,
    orderBy: { startDate: 'asc' },
    include: {
      creator: { include: { profile: true } },
      community: true,
    },
  });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, category, isOnline, location, city, startDate, coverImage, communityId } = body;

    const event = await db.event.create({
      data: {
        title,
        description,
        category: category || 'General',
        isOnline: isOnline ?? true,
        location,
        city: city || 'New York',
        startDate: new Date(startDate || Date.now() + 86400000 * 5),
        coverImage,
        communityId: communityId || null,
        creatorId: session.userId,
        attendeesCount: 1,
        attendees: {
          create: {
            userId: session.userId,
            status: 'JOINED',
          },
        },
      },
    });

    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create event' }, { status: 500 });
  }
}
