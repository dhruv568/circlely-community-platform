import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const community = await db.community.findUnique({ where: { slug } });

  if (!community) {
    return NextResponse.json({ message: 'Community not found' }, { status: 404 });
  }

  const existingMember = await db.communityMember.findUnique({
    where: {
      communityId_userId: {
        communityId: community.id,
        userId: session.userId,
      },
    },
  });

  if (existingMember) {
    // Leave community
    await db.communityMember.delete({ where: { id: existingMember.id } });
    const updated = await db.community.update({
      where: { id: community.id },
      data: { memberCount: { decrement: 1 } },
    });
    return NextResponse.json({ joined: false, memberCount: updated.memberCount });
  } else {
    // Join community
    await db.communityMember.create({
      data: {
        communityId: community.id,
        userId: session.userId,
        role: 'MEMBER',
      },
    });
    const updated = await db.community.update({
      where: { id: community.id },
      data: { memberCount: { increment: 1 } },
    });
    return NextResponse.json({ joined: true, memberCount: updated.memberCount });
  }
}
