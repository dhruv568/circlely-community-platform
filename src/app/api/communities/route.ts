import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const ageGroup = searchParams.get('ageGroup');
  const search = searchParams.get('search');

  const whereClause: any = {};

  if (category && category !== 'All') {
    whereClause.category = category;
  }
  if (ageGroup && ageGroup !== 'All') {
    whereClause.ageGroup = ageGroup;
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const communities = await db.community.findMany({
    where: whereClause,
    orderBy: { memberCount: 'desc' },
  });

  return NextResponse.json(communities);
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, category, ageGroup, icon, coverImage } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    const community = await db.community.create({
      data: {
        name,
        slug,
        description,
        category: category || 'General',
        ageGroup: ageGroup || 'All Ages',
        icon: icon || '💬',
        coverImage,
        creatorId: session.userId,
        memberCount: 1,
        members: {
          create: {
            userId: session.userId,
            role: 'ADMIN',
          },
        },
      },
    });

    return NextResponse.json(community);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create community' }, { status: 500 });
  }
}
