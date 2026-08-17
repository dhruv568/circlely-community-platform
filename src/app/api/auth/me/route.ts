import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: {
      profile: true,
      userInterests: {
        include: { interest: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.profile?.username,
      avatarUrl: user.profile?.avatarUrl,
      bio: user.profile?.bio,
      city: user.profile?.city,
      age: user.profile?.age,
      isOnboarded: user.profile?.isOnboarded ?? false,
      interests: user.userInterests.map((ui) => ui.interest),
    },
  });
}
