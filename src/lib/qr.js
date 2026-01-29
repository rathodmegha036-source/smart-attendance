import crypto from 'crypto';

export function generateQRToken(sessionId) {
  const timestamp = Date.now();
  const random = crypto.randomBytes(6).toString('hex');

  return `${sessionId}.${timestamp}.${random}`;
}

export function isQRValid(token) {
  const parts = token.split('.');
  if (parts.length < 3) return false;

  const timestamp = Number(parts[1]);
  const now = Date.now();

  return now - timestamp <= 30000; // 30 seconds
}