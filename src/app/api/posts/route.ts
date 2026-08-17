import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const posts = await db.post.findMany({
    take: 30,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { include: { profile: true } },
      community: true,
      comments: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { author: { include: { profile: true } } },
      },
      polls: true,
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { communityId, content, type, imageUrl, pollQuestion, pollOptions } = body;

    const post = await db.post.create({
      data: {
        communityId,
        authorId: session.userId,
        content,
        type: type || 'TEXT',
        imageUrl: imageUrl || null,
      },
      include: {
        author: { include: { profile: true } },
        community: true,
      },
    });

    if (type === 'POLL' && pollQuestion && Array.isArray(pollOptions)) {
      await db.poll.create({
        data: {
          postId: post.id,
          question: pollQuestion,
          options: JSON.stringify(pollOptions),
        },
      });
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
  }
}
