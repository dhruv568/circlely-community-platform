import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { bio, avatarUrl, city, interests, communitySlugs, isPublic, allowMessages } = body;

    // Update Profile
    await db.profile.update({
      where: { userId: session.userId },
      data: {
        bio: bio || undefined,
        avatarUrl: avatarUrl || undefined,
        city: city || undefined,
        isPublic: isPublic !== undefined ? isPublic : true,
        allowMessages: allowMessages !== undefined ? allowMessages : true,
        isOnboarded: true,
      },
    });

    // Save interests if provided
    if (Array.isArray(interests) && interests.length > 0) {
      await db.userInterest.deleteMany({ where: { userId: session.userId } });
      const interestRecords = await db.interest.findMany({
        where: { name: { in: interests } },
      });

      for (const inst of interestRecords) {
        await db.userInterest.create({
          data: {
            userId: session.userId,
            interestId: inst.id,
          },
        });
      }
    }

    // Join communities if provided
    if (Array.isArray(communitySlugs) && communitySlugs.length > 0) {
      const comms = await db.community.findMany({
        where: { slug: { in: communitySlugs } },
      });

      for (const c of comms) {
        await db.communityMember.upsert({
          where: {
            communityId_userId: {
              communityId: c.id,
              userId: session.userId,
            },
          },
          update: {},
          create: {
            communityId: c.id,
            userId: session.userId,
            role: 'MEMBER',
          },
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Onboarding completed!' });
  } catch (err) {
    console.error('Onboarding API Error:', err);
    return NextResponse.json({ message: 'Failed to save onboarding data' }, { status: 500 });
  }
}
