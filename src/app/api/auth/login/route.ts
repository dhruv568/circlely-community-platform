import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: parsed.email.toLowerCase() },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (user.status === 'BANNED' || user.status === 'SUSPENDED') {
      return NextResponse.json({ message: 'Your account has been suspended by administration.' }, { status: 403 });
    }

    const isValid = await comparePassword(parsed.password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({
      id: user.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      username: user.profile?.username || 'user',
      avatarUrl: user.profile?.avatarUrl,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        username: user.profile?.username,
        isOnboarded: user.profile?.isOnboarded ?? false,
      },
    });

    res.cookies.set('circlely_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.issues[0]?.message || 'Validation error' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
