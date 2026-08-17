import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { db } from './db';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'circlely-super-secret-production-key-2026';
const TOKEN_COOKIE_NAME = 'circlely_session';

export interface UserSessionPayload {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  username: string;
  avatarUrl?: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: Omit<UserSessionPayload, 'id'> & { id?: string }): string {
  const fullPayload: UserSessionPayload = {
    ...payload,
    id: payload.id || payload.userId,
    userId: payload.userId || payload.id || '',
  };
  return jwt.sign(fullPayload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserSessionPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserSessionPayload;
    if (decoded && !decoded.id) {
      decoded.id = decoded.userId;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<UserSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function getCurrentFullUser() {
  const session = await getSessionUser();
  if (!session) return null;

  return db.user.findUnique({
    where: { id: session.userId },
    include: {
      profile: true,
      userInterests: {
        include: { interest: true },
      },
    },
  });
}
