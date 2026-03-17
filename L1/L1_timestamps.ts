/**
 * L1 video overlay timestamps (in seconds).
 * Edit this file to adjust when each overlay appears.
 */

export const L1_TIMESTAMPS = {
	/** Intro: "Jak działa LLM?" — full screen for first 11 seconds */
	intro: { start: 0, end: 11 },

	/** Flow diagram: Input → Transformer → Output (matches transcript ~0:26) */
	flowDiagram: { start: 30, end: 60 },

	/** Chaos / probabilistic thinking — funny visual (matches transcript ~3:50) */
	chaos: { start: 230, end: 250 }, // 3:50 - 4:10
} as const;

export type L1TimestampKey = keyof typeof L1_TIMESTAMPS;

export const getDuration = (key: L1TimestampKey) =>
	L1_TIMESTAMPS[key].end - L1_TIMESTAMPS[key].start;
