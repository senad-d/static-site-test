export const MIN_PROJECT_DESCRIPTION_LENGTH = 20;

/**
 * Returns true if the given string has any non-whitespace characters.
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Basic email format validation.
 * This is intentionally simple and shared between frontend and backend.
 */
export function isValidEmail(value: string): boolean {
  if (!isNonEmpty(value)) return false;
  const email = value.toLowerCase();

  // Simple RFC2822-style email check, good enough for UX and server validation.
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
}

/**
 * Returns true if value meets or exceeds the given minimum length (after trim).
 */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/**
 * Convenience helper for project description validation used by the contact form.
 */
export function isValidProjectDescription(
  value: string,
  min: number = MIN_PROJECT_DESCRIPTION_LENGTH,
): boolean {
  return hasMinLength(value, min);
}