/**
 * Login authentication module
 * Provides credential validation for user authentication
 */

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates user credentials including email format and password strength
 * @param username - Email address to validate
 * @param password - Password to validate
 * @returns ValidationResult with valid flag and array of error messages
 */
export function validateCredentials(username: string, password: string): ValidationResult {
  const errors: string[] = [];

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!username || !emailRegex.test(username)) {
    errors.push("Invalid email format");
  }

  // Password strength validation
  // Must be >= 8 chars, >= 1 digit, >= 1 special character
  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  const hasDigit = /\d/.test(password);
  if (!hasDigit) {
    errors.push("Password must contain at least one digit");
  }

  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  if (!hasSpecial) {
    errors.push("Password must contain at least one special character");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export type { ValidationResult };
