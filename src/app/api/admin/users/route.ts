import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { profile: true },
  });

  return NextResponse.json(users);
}

export async function PATCH(req: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { userId, status, isVerified, role } = await req.json();

    const user = await db.user.update({
      where: { id: userId },
      data: {
        status: status !== undefined ? status : undefined,
        isVerified: isVerified !== undefined ? isVerified : undefined,
        role: role !== undefined ? role : undefined,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }
}
