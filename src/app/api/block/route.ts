import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { blockedId } = await req.json();

    const block = await db.block.create({
      data: {
        blockerId: session.userId,
        blockedId,
      },
    });

    return NextResponse.json(block);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to block user' }, { status: 500 });
  }
}
