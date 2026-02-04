/**
 * Gateway verification system
 * Exports for host-level session and boot tracking
 */

export {
  initializeBootId,
  getCurrentBootId,
  getBootRecord,
  formatBootIdSystemMessage,
  verifyBootId,
  hasRestartedSince,
  getUptimeMs,
  type BootRecord,
} from "./boot-id.js";

export {
  verifySessionReset,
  generateSystemVerificationMessage,
  detectFalseResetClaim,
  generateBlockedClaimResponse,
  type SessionVerificationContext,
  type VerificationResult,
} from "./session-verification.js";
