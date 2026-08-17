import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  city: z.string().optional(),
  age: z.number().min(18, 'Must be at least 18 years old').optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email: parsed.email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.password);
    const username = parsed.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Math.floor(Math.random() * 1000);

    let ageGroup = '25-34';
    if (parsed.age) {
      if (parsed.age <= 24) ageGroup = '18-24';
      else if (parsed.age <= 34) ageGroup = '25-34';
      else if (parsed.age <= 49) ageGroup = '35-49';
      else if (parsed.age <= 64) ageGroup = '50-64';
      else ageGroup = '65+';
    }

    const user = await db.user.create({
      data: {
        name: parsed.name,
        email: parsed.email.toLowerCase(),
        passwordHash,
        profile: {
          create: {
            username,
            city: parsed.city || 'San Francisco',
            age: parsed.age || 25,
            ageGroup,
            isOnboarded: false,
          },
        },
      },
      include: { profile: true },
    });

    const token = signToken({
      id: user.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      username: user.profile?.username || username,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.profile?.username,
        isOnboarded: false,
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
