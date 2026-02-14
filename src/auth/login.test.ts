/**
 * Vitest tests for login authentication module
 */

import { describe, it, expect } from "vitest";
import { validateCredentials } from "./login.js";

describe("validateCredentials", () => {
  it("should pass for valid credentials", () => {
    const result = validateCredentials("user@example.com", "SecureP@ss1");
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should fail for invalid email format", () => {
    const result = validateCredentials("invalid-email", "SecureP@ss1");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Invalid email format");
  });

  it("should fail for weak password", () => {
    // Password too short, no digit, no special character
    const result = validateCredentials("user@example.com", "weak");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors).toContain("Password must be at least 8 characters long");
    expect(result.errors).toContain("Password must contain at least one digit");
    expect(result.errors).toContain("Password must contain at least one special character");
  });

  it("should fail for password without digit", () => {
    const result = validateCredentials("user@example.com", "SecurePass!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must contain at least one digit");
  });

  it("should fail for password without special character", () => {
    const result = validateCredentials("user@example.com", "SecurePass1");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must contain at least one special character");
  });

  it("should fail for empty email", () => {
    const result = validateCredentials("", "SecureP@ss1");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Invalid email format");
  });

  it("should fail for empty password", () => {
    const result = validateCredentials("user@example.com", "");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must be at least 8 characters long");
    expect(result.errors).toContain("Password must contain at least one digit");
    expect(result.errors).toContain("Password must contain at least one special character");
  });
});
