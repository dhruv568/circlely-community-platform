import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { postId, content, parentId } = await req.json();

    const comment = await db.comment.create({
      data: {
        postId,
        authorId: session.userId,
        content,
        parentId: parentId || null,
      },
      include: {
        author: { include: { profile: true } },
      },
    });

    await db.post.update({
      where: { id: postId },
      data: { commentsCount: { increment: 1 } },
    });

    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create comment' }, { status: 500 });
  }
}
