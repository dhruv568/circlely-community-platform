import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id: postId } = await params;

  const existingLike = await db.like.findFirst({
    where: {
      userId: session.userId,
      postId,
    },
  });

  if (existingLike) {
    await db.like.delete({ where: { id: existingLike.id } });
    const post = await db.post.update({
      where: { id: postId },
      data: { likesCount: { decrement: 1 } },
    });
    return NextResponse.json({ liked: false, likesCount: post.likesCount });
  } else {
    await db.like.create({
      data: {
        userId: session.userId,
        postId,
      },
    });
    const post = await db.post.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } },
    });
    return NextResponse.json({ liked: true, likesCount: post.likesCount });
  }
}
