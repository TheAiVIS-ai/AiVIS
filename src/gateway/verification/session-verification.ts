/**
 * Session-level verification guard
 *
 * Prevents agents from falsely claiming context resets, new sessions, or token counts
 * without corresponding host-level evidence.
 */

import { getBootRecord, hasRestartedSince } from "./boot-id.js";

export interface SessionVerificationContext {
  sessionId: string;
  sessionKey: string;
  sessionCreatedAt: number;
  isNewSession: boolean;
  resetTriggered: boolean;
}

export interface VerificationResult {
  verified: boolean;
  reason?: string;
  bootId?: string;
  evidence?: string[];
}

/**
 * Verify if a "new session" claim is legitimate
 */
export function verifySessionReset(ctx: SessionVerificationContext): VerificationResult {
  const bootRecord = getBootRecord();
  const evidence: string[] = [];

  // Evidence 1: Reset trigger was explicitly invoked
  if (ctx.resetTriggered) {
    evidence.push("Reset trigger detected (/new command)");
    return {
      verified: true,
      bootId: bootRecord.bootId,
      evidence,
    };
  }

  // Evidence 2: Session is genuinely new (created after gateway boot)
  if (ctx.isNewSession && ctx.sessionCreatedAt >= bootRecord.processStartTime) {
    evidence.push("Session created after current gateway boot");
    return {
      verified: true,
      bootId: bootRecord.bootId,
      evidence,
    };
  }

  // Evidence 3: Gateway restarted since session creation
  if (hasRestartedSince(ctx.sessionCreatedAt)) {
    evidence.push("Gateway restarted since session creation");
    return {
      verified: true,
      bootId: bootRecord.bootId,
      evidence,
    };
  }

  // No valid evidence for reset
  return {
    verified: false,
    reason: "No host-level evidence for context reset. Session persists across gateway restarts.",
    bootId: bootRecord.bootId,
  };
}

/**
 * Generate system message for agent context
 * This is injected into every session to provide verifiable boot tracking
 */
export function generateSystemVerificationMessage(ctx: SessionVerificationContext): string {
  const bootRecord = getBootRecord();

  const lines = [
    "# Host Session Verification",
    "",
    `**Gateway Boot ID**: \`${bootRecord.bootId}\``,
    `**Process**: PID ${bootRecord.pid}, started ${bootRecord.processStartTimeISO}`,
    `**Session ID**: \`${ctx.sessionId}\``,
    `**Session Key**: \`${ctx.sessionKey}\``,
    "",
    "## Important Rules",
    "",
    "1. **Context Reset Claims**: You may ONLY claim a context reset if:",
    "   - A `/new` command was explicitly used, OR",
    "   - The Boot ID changes (indicating actual gateway restart)",
    "",
    "2. **Token Count Claims**: You MUST NOT estimate or report token usage.",
    "   - Token tracking is handled at the host level",
    "   - Use available tools to query actual usage",
    "",
    "3. **Session Persistence**: This session persists across messages.",
    "   - The session ID remains the same unless explicitly reset",
    "   - Check the Boot ID to verify if the gateway restarted",
    "",
    `**Current Status**: ${ctx.isNewSession ? "NEW SESSION" : "EXISTING SESSION"}`,
  ];

  if (ctx.resetTriggered) {
    lines.push("**Reset Triggered**: YES (explicit /new command)");
  }

  return lines.join("\n");
}

/**
 * Check if agent response contains false reset claims
 */
export function detectFalseResetClaim(
  responseText: string,
  ctx: SessionVerificationContext,
): { detected: boolean; extractedClaims: string[] } {
  const claims: string[] = [];
  const _lowerText = responseText.toLowerCase();

  // Patterns that indicate false reset claims
  const resetPatterns = [
    /context\s+(has\s+been\s+)?reset/i,
    /new\s+session\s+(started|created)/i,
    /cleared?\s+(context|history|buffer)/i,
    /fresh\s+(start|session|context)/i,
    /tokens?\s+(\d+)\s*\/\s*(\d+)/i, // e.g., "tokens 5000 / 128000"
    /context\s+window\s+is\s+now/i,
  ];

  for (const pattern of resetPatterns) {
    const match = responseText.match(pattern);
    if (match) {
      claims.push(match[0]);
    }
  }

  // Verify if claims are legitimate
  if (claims.length > 0) {
    const verification = verifySessionReset(ctx);
    if (!verification.verified) {
      return {
        detected: true,
        extractedClaims: claims,
      };
    }
  }

  return {
    detected: false,
    extractedClaims: [],
  };
}

/**
 * Generate response for blocked false claims
 */
export function generateBlockedClaimResponse(
  claims: string[],
  ctx: SessionVerificationContext,
): string {
  const bootRecord = getBootRecord();

  return [
    "⚠️ **Operation could not be verified at host level.**",
    "",
    "The agent claimed the following operations occurred:",
    ...claims.map((c) => `- "${c}"`),
    "",
    "However, host-level verification failed:",
    `- **Boot ID**: \`${bootRecord.bootId}\` (unchanged)`,
    `- **Session ID**: \`${ctx.sessionId}\` (unchanged)`,
    `- **Reset Triggered**: ${ctx.resetTriggered ? "Yes" : "No"}`,
    "",
    "**These operations did not occur at the host level.**",
    "",
    "To perform an actual reset, use: `/new`",
  ].join("\n");
}
