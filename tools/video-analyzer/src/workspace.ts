import fs from 'node:fs';
import path from 'node:path';
import type {Workspace} from './types';

export const ensureDir = (dirPath: string): void => {
	fs.mkdirSync(dirPath, {recursive: true});
};

export const createWorkspace = (outputDir: string): Workspace => {
	const clipsDir = path.join(outputDir, 'clips');
	const responsesDir = path.join(outputDir, 'responses');

	ensureDir(outputDir);
	ensureDir(clipsDir);
	ensureDir(responsesDir);

	return {outputDir, clipsDir, responsesDir};
};

export const writeJson = (filePath: string, value: unknown): void => {
	ensureDir(path.dirname(filePath));
	fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};

export const toRepoRelativePath = (repoRoot: string, targetPath: string): string =>
	path.relative(repoRoot, targetPath);
