import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getSessionUser();
  const { searchParams } = new URL(req.url);
  const interest = searchParams.get('interest');
  const city = searchParams.get('city');
  const ageGroup = searchParams.get('ageGroup');
  const search = searchParams.get('search');

  const whereClause: any = {
    profile: {
      isPublic: true,
    },
  };

  if (session) {
    whereClause.id = { not: session.userId };
  }

  if (city && city !== 'All') {
    whereClause.profile.city = city;
  }
  if (ageGroup && ageGroup !== 'All') {
    whereClause.profile.ageGroup = ageGroup;
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { profile: { bio: { contains: search } } },
    ];
  }

  const users = await db.user.findMany({
    where: whereClause,
    take: 24,
    include: {
      profile: true,
      userInterests: { include: { interest: true } },
      communityMemberships: { include: { community: true } },
    },
  });

  return NextResponse.json(users);
}
