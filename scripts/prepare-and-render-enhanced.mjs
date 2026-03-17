#!/usr/bin/env node
/**
 * Prepares assets and renders the L1 lesson video with overlays baked in.
 *
 * Flow:
 * 1. Copies L1/L1_intro.mp4 to public/ so Remotion can read it via staticFile()
 * 2. Syncs lesson data
 * 3. Renders the registered L1 composition
 */

import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const L1_SOURCE = path.join(repoRoot, 'L1', 'L1_intro.mp4');
const PUBLIC_VIDEO = path.join(repoRoot, 'public', 'L1_intro.mp4');
const OUTPUT = path.join(repoRoot, 'out', 'L1Full.mp4');
const COMPOSITION_ID = 'L1Full';

function ensureDir(dir) {
	fs.mkdirSync(dir, {recursive: true});
}

function copyFile(src, dest) {
	ensureDir(path.dirname(dest));
	fs.copyFileSync(src, dest);
	console.log(`Copied ${path.relative(repoRoot, src)} → ${path.relative(repoRoot, dest)}`);
}

function main() {
	console.log('=== L1 Video: Prepare & Render ===\n');

	// 1. Ensure source video exists
	if (!fs.existsSync(L1_SOURCE)) {
		console.error('Error: L1/L1_intro.mp4 not found.');
		console.error('Add the source video at L1/L1_intro.mp4 before rendering.');
		process.exit(1);
	}

	// 2. Copy to public/ (Remotion reads from public/)
	ensureDir(path.join(repoRoot, 'public'));
	copyFile(L1_SOURCE, PUBLIC_VIDEO);
	console.log('');

	// 3. Sync lesson data
	console.log('Syncing lesson data...');
	execSync('npm run sync:data', {cwd: repoRoot, stdio: 'inherit'});

	// 4. Render
	console.log(`\nRendering ${COMPOSITION_ID}...`);
	execSync(`npx remotion render src/index.ts ${COMPOSITION_ID} "${OUTPUT}"`, {
		cwd: repoRoot,
		stdio: 'inherit',
	});

	console.log(`\nDone. Output: ${path.relative(repoRoot, OUTPUT)}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
