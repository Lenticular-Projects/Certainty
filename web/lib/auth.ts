import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "certainty-dev-secret-change-me";
const COOKIE_NAME = "cs_token";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "agent" | "manager";
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

/**
 * Dev-mode fallback: returns the manager user from DB when no token is present.
 */
function getDevUser(): SessionUser | null {
  try {
    const db = getDb();
    const row = db
      .prepare("SELECT id, name, email, role FROM users WHERE role = 'manager' LIMIT 1")
      .get() as { id: string; name: string; email: string; role: "manager" } | undefined;
    if (row) return row;
  } catch {
    // DB not ready yet
  }
  return null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (token) {
      const user = verifyToken(token);
      if (user) return user;
    }
  } catch {
    // cookies() may fail outside request context
  }

  // Dev mode fallback — return mock manager
  return getDevUser();
}

export { COOKIE_NAME };
