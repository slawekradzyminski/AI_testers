#!/usr/bin/env node
/**
 * Prepares assets and renders the L1 Enhanced video (intro + presenter video).
 *
 * Flow:
 * 1. Copies L1/L1_intro.mp4 to public/ (never moves or deletes; keeps L1/ as backup)
 * 2. If L1/L1_intro.mp4 doesn't exist, creates it from out/L1Intro.mp4 for testing
 * 3. Gets video duration via ffprobe
 * 4. Syncs lesson data
 * 5. Renders L1Enhanced composition
 */

import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const L1_SOURCE = path.join(repoRoot, 'L1', 'L1_intro.mp4');
const PUBLIC_VIDEO = path.join(repoRoot, 'public', 'L1_intro.mp4');
const INTRO_FALLBACK = path.join(repoRoot, 'out', 'L1Intro.mp4');
const OUTPUT = path.join(repoRoot, 'out', 'L1Enhanced.mp4');

function ensureDir(dir) {
	fs.mkdirSync(dir, {recursive: true});
}

function copyFile(src, dest) {
	ensureDir(path.dirname(dest));
	fs.copyFileSync(src, dest);
	console.log(`Copied ${path.relative(repoRoot, src)} → ${path.relative(repoRoot, dest)}`);
}

function getVideoDurationSeconds(videoPath) {
	// Try ffprobe first
	try {
		const result = execSync(
			`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`,
			{encoding: 'utf8'},
		);
		const duration = parseFloat(result.trim());
		if (!Number.isNaN(duration) && duration > 0) return duration;
	} catch {
		// ffprobe not available
	}

	// Fallback: mdls on macOS (Spotlight metadata)
	try {
		const result = execSync(`mdls -name kMDItemDurationSeconds -raw "${videoPath}"`, {
			encoding: 'utf8',
		});
		const duration = parseFloat(result.trim());
		if (!Number.isNaN(duration) && duration > 0) return duration;
	} catch {
		// mdls failed
	}

	// Last resort: use default, warn user
	console.warn('Could not detect video duration (install ffmpeg for accurate duration). Using 300s default.');
	return 300;
}

function main() {
	console.log('=== L1 Enhanced Video: Prepare & Render ===\n');

	// 1. Ensure source video exists (create from intro if needed for first-time setup)
	if (!fs.existsSync(L1_SOURCE)) {
		if (fs.existsSync(INTRO_FALLBACK)) {
			ensureDir(path.dirname(L1_SOURCE));
			copyFile(INTRO_FALLBACK, L1_SOURCE);
			console.log('(Created L1/L1_intro.mp4 from out/L1Intro.mp4 for testing)\n');
		} else {
			console.error('Error: L1/L1_intro.mp4 not found.');
			console.error('Add your presenter video to L1/L1_intro.mp4, or run "npm run render:l1" first.');
			process.exit(1);
		}
	}

	// 2. Copy to public/ (Remotion reads from public/)
	ensureDir(path.join(repoRoot, 'public'));
	copyFile(L1_SOURCE, PUBLIC_VIDEO);
	console.log('');

	// 3. Get video duration
	const videoDuration = getVideoDurationSeconds(PUBLIC_VIDEO);
	console.log(`Video duration: ${videoDuration.toFixed(2)}s\n`);

	// 4. Sync lesson data
	console.log('Syncing lesson data...');
	execSync('npm run sync:data', {cwd: repoRoot, stdio: 'inherit'});

	// 5. Render
	const props = JSON.stringify({
		videoDurationInSeconds: videoDuration,
	});
	console.log('\nRendering L1Enhanced...');
	execSync(
		`npx remotion render src/index.ts L1Enhanced "${OUTPUT}" --props='${props}'`,
		{cwd: repoRoot, stdio: 'inherit'},
	);

	console.log(`\nDone. Output: ${path.relative(repoRoot, OUTPUT)}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
