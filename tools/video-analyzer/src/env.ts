import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

export const loadEnvironment = (repoRoot: string): void => {
	const envPath = path.join(repoRoot, '.env');
	if (fs.existsSync(envPath)) {
		dotenv.config({path: envPath, quiet: true});
	}
};

export const getGeminiApiKey = (): string => {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error('GEMINI_API_KEY is not set. Add it to .env before running non-dry analysis.');
	}
	return apiKey;
};
