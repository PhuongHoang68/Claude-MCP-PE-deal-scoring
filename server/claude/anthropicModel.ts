/**
 * Default matches Anthropic Console model id (Haiku 4.5).
 * Override with ANTHROPIC_MODEL, or ANTHROPIC_MODEL_PRIMARY / ANTHROPIC_MODEL_FALLBACK if unset.
 */
export const DEFAULT_ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";

export function resolveAnthropicModel(): string {
  const explicit = process.env.ANTHROPIC_MODEL?.trim();
  if (explicit) return explicit;
  const primary = process.env.ANTHROPIC_MODEL_PRIMARY?.trim();
  if (primary) return primary;
  return DEFAULT_ANTHROPIC_MODEL;
}
