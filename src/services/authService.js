/**
 * services/authService.js
 * ─────────────────────────────────────────────────────────────
 * Authentication & session management logic.
 * To switch auth provider (e.g. NextAuth, Clerk), replace this file.
 * ─────────────────────────────────────────────────────────────
 */

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET, SESSION_DURATION_SECONDS } from '@/config/database';
import { query } from '@/lib/db';

const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

/**
 * Verify admin credentials and return a signed JWT token.
 * @returns {{ token: string } | { error: string }}
 */
export async function loginAdmin(username, password) {
  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  const { rows } = await query(
    `SELECT * FROM admin_users WHERE username = $1 LIMIT 1`,
    [username]
  );
  const admin = rows?.[0];

  if (!admin) return { error: 'Username Or Password Not Matched' };

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return { error: 'Username Or Password Not Matched' };

  const token = await new SignJWT({
    id: admin.id,
    username: admin.username,
    role: admin.role,
    fname: admin.first_name,
    lname: admin.last_name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(SECRET_KEY);

  return { token };
}

/**
 * Verify a JWT session token.
 * @returns {object|null} Decoded payload or null if invalid.
 */
export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
