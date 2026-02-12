# PLAN — x402claw‑style site + Unbrowse (separate systems)

- [ ] **T1** Lock decisions: Base + separate systems
  - **Goal:** Confirm architecture choices before build.
  - **Implementation:** Document final decisions for chain (Base), separation (Unbrowse vs site), and payment model (HTTP‑402 + on‑chain USDC) in this plan and pin them as constraints for downstream work.
  - **AC:** Plan explicitly states Base chain + Unbrowse separate + x402‑style payments + HTTP‑402 flow.
  - **If Blocked:** Draft a decision log entry with assumptions and mark as “needs confirmation.”

- [ ] **T2** Unbrowse setup (standalone usage)
  - **Goal:** Generate initial skills using Unbrowse without coupling to our site.
  - **Implementation:** Install `@getfoundry/unbrowse-openclaw`, publish 3 skills, and verify the creator wallet mapping in Unbrowse.
  - **AC:** 3 skills visible in Unbrowse marketplace under our creator wallet; publish logs/screens show success.
  - **If Blocked:** Capture the exact error and check Unbrowse auth/creator wallet settings.

- [ ] **T3** Funding strategy (earn first)
  - **Goal:** Fund Base mainnet without user funding.
  - **Implementation:** Publish paid skills on Unbrowse → earn USDC on Solana → bridge to Base.
  - **AC:** Earned USDC received on Solana; successfully bridged to Base; wallet shows Base ETH + USDC.
  - **If Blocked:** Use a small manual seed to cover bridge gas, then revert to earn‑first flow.

- [ ] **T4** Base wallet + funding
  - **Goal:** Enable USDC on Base for payments.
  - **Implementation:** Create Base wallet, fund with Base ETH + USDC (via bridge), verify network and USDC contract.
  - **AC:** Wallet holds Base ETH + USDC; test transfer succeeds.
  - **If Blocked:** Verify RPC + contract address, then try a different bridge or faucet for Base ETH.

- [ ] **T5** Payment rail (x402‑style on Base)
  - **Goal:** Accept USDC payments to unlock services.
  - **Implementation:** Implement HTTP‑402 flow with on‑chain USDC verification and signed proof retry; include retry token format + expiry.
  - **AC:** Paid request → 402 → payment → access granted (end‑to‑end test).
  - **If Blocked:** Build a stub verifier that accepts test receipts to validate the flow.

- [ ] **T6** x402claw‑style website (separate site)
  - **Goal:** Public site with paid services and live stats.
  - **Implementation:** Build landing page, service catalog, live balance/burn/time‑to‑death, and execution endpoints.
  - **AC:** Site renders catalog + stats; paid endpoint works with payment rail.
  - **If Blocked:** Ship static landing + catalog while the payment rail is finalized.

- [ ] **T7** Ops & monitoring
  - **Goal:** Keep the system stable and observable.
  - **Implementation:** Add alerts for low balance/failed payments; error logging; rate limits; basic dashboards.
  - **AC:** Alerts fire on low balance; failures logged; rate limits enforced.
  - **If Blocked:** Add minimal logs + manual health checks until alerting is ready.

- [ ] **T8** Launch + first revenue test
  - **Goal:** Validate real‑world payment flow.
  - **Implementation:** Publish site, run paid test, verify settlement + unlock, record outcome.
  - **AC:** Successful paid transaction recorded; service delivered; revenue logged.
  - **If Blocked:** Run a test‑net or internal dry‑run with signed receipts.

## Decisions (confirmed)
- **Service catalog (top‑10) + pricing:** Set below (micro‑service pricing $0.05–$0.50, anchor $0.15–$0.35).
- **Revenue split:** No split — revenue is retained for project runway.
- **Bridge choice (Solana → Base):** Use Wormhole Portal; validate fees/limits before first bridge.

## Initial service catalog + pricing
1. **Web research brief (1–2 sources, <300 words)** — $0.10
2. **Web research brief (3–5 sources, <600 words)** — $0.25
3. **Competitive scan (top 5 competitors, bullet summary)** — $0.30
4. **Landing page copy (headline + 3 sections + CTA)** — $0.20
5. **FAQ generator (10 Q/A)** — $0.15
6. **Product description (short + long)** — $0.12
7. **Pricing copy/packaging suggestions (3 tiers)** — $0.25
8. **Email rewrite (subject + body)** — $0.10
9. **Ad variants (5 headlines + 5 descriptions)** — $0.20
10. **Bug repro summary (steps + expected/actual + environment)** — $0.18