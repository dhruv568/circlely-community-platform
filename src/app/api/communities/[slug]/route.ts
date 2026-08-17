import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await getSessionUser();

  const community = await db.community.findUnique({
    where: { slug },
    include: {
      creator: { select: { name: true, profile: { select: { username: true, avatarUrl: true } } } },
      members: {
        take: 12,
        include: { user: { include: { profile: true } } },
      },
      posts: {
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { include: { profile: true } },
          comments: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { author: { include: { profile: true } } },
          },
          polls: true,
          community: true,
        },
      },
      activities: {
        take: 6,
        orderBy: { activityDate: 'asc' },
      },
      events: {
        take: 6,
        orderBy: { startDate: 'asc' },
      },
    },
  });

  if (!community) {
    return NextResponse.json({ message: 'Community not found' }, { status: 404 });
  }

  let isJoined = false;
  if (session) {
    const member = await db.communityMember.findUnique({
      where: {
        communityId_userId: {
          communityId: community.id,
          userId: session.userId,
        },
      },
    });
    isJoined = !!member;
  }

  return NextResponse.json({ ...community, isJoined });
}
