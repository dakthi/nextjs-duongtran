/**
 * Password Utilities
 *
 * Helper functions for password hashing and validation
 */

import bcrypt from 'bcryptjs'

// Number of salt rounds for bcrypt (10-12 is recommended for production)
const SALT_ROUNDS = 10

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error('Password is required')
  }

  // Basic password strength validation
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long')
  }

  return await bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) {
    return false
  }

  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

/**
 * Generate a random password (for development/testing)
 */
export function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  return password
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
  score: number // 0-5
} {
  const errors: string[] = []
  let score = 0

  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  } else if (password.length >= 12) {
    score += 1
  }

  // Character variety checks
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  } else {
    score += 1
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  } else {
    score += 1
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  } else {
    score += 1
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  } else {
    score += 1
  }

  // Common password check (basic)
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ]

  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common')
    score = 0
  }

  return {
    isValid: errors.length === 0,
    errors,
    score
  }
}