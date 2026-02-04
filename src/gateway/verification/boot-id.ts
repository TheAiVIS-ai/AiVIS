/**
 * Host-level boot verification system
 *
 * Generates a unique UUID on gateway startup that proves actual process restart.
 * This prevents agents from falsely claiming context resets without host-level verification.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export interface BootRecord {
  bootId: string;
  processStartTime: number;
  processStartTimeISO: string;
  pid: number;
  hostname: string;
  nodeVersion: string;
}

let CURRENT_BOOT_ID: string | null = null;
let CURRENT_BOOT_RECORD: BootRecord | null = null;

/**
 * Initialize boot ID on gateway startup.
 * Must be called exactly once during gateway bootstrap.
 */
export function initializeBootId(): BootRecord {
  if (CURRENT_BOOT_ID) {
    throw new Error(
      "Boot ID already initialized. This should only be called once on gateway startup.",
    );
  }

  const bootId = crypto.randomUUID();
  const processStartTime = Date.now();
  const record: BootRecord = {
    bootId,
    processStartTime,
    processStartTimeISO: new Date(processStartTime).toISOString(),
    pid: process.pid,
    hostname: os.hostname(),
    nodeVersion: process.version,
  };

  CURRENT_BOOT_ID = bootId;
  CURRENT_BOOT_RECORD = record;

  // Log to console for host-level verification
  console.log(`[BOOT-ID] Gateway started with boot ID: ${bootId}`);
  console.log(`[BOOT-ID] Process: PID=${record.pid}, started=${record.processStartTimeISO}`);

  // Persist to file for external verification
  try {
    const bootLogPath = path.join(os.homedir(), ".openclaw", "gateway-boot.log");
    const logEntry = `${record.processStartTimeISO} | BOOT_ID=${bootId} | PID=${record.pid} | NODE=${record.nodeVersion}\n`;
    fs.appendFileSync(bootLogPath, logEntry, "utf-8");
  } catch (err) {
    console.warn(`[BOOT-ID] Failed to write boot log:`, err);
  }

  return record;
}

/**
 * Get current boot ID (throws if not initialized)
 */
export function getCurrentBootId(): string {
  if (!CURRENT_BOOT_ID) {
    throw new Error("Boot ID not initialized. Call initializeBootId() during gateway startup.");
  }
  return CURRENT_BOOT_ID;
}

/**
 * Get full boot record
 */
export function getBootRecord(): BootRecord {
  if (!CURRENT_BOOT_RECORD) {
    throw new Error("Boot ID not initialized. Call initializeBootId() during gateway startup.");
  }
  return CURRENT_BOOT_RECORD;
}

/**
 * Format boot ID for system message injection
 */
export function formatBootIdSystemMessage(): string {
  const record = getBootRecord();
  return `Host session verification: BOOT_ID=${record.bootId} (PID=${record.pid}, started=${record.processStartTimeISO})`;
}

/**
 * Verify if a boot ID matches the current gateway instance
 */
export function verifyBootId(bootId: string): boolean {
  return CURRENT_BOOT_ID === bootId;
}

/**
 * Check if gateway has been restarted since a given timestamp
 */
export function hasRestartedSince(timestamp: number): boolean {
  if (!CURRENT_BOOT_RECORD) {
    return false;
  }
  return CURRENT_BOOT_RECORD.processStartTime > timestamp;
}

/**
 * Get uptime in milliseconds since gateway boot
 */
export function getUptimeMs(): number {
  if (!CURRENT_BOOT_RECORD) {
    throw new Error("Boot ID not initialized");
  }
  return Date.now() - CURRENT_BOOT_RECORD.processStartTime;
}
