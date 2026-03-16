import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const lessons = [
	{
		id: 'L1',
		sourcePath: path.join(repoRoot, 'L1', 'L1_subs.md'),
		outputPath: path.join(repoRoot, 'src', 'data', 'generated', 'l1-subs.ts'),
		title: 'Jak dziala LLM?',
		subtitle: 'Lekcja 1: podstawy',
	},
];

const parseTimestamp = (value) => {
	const trimmed = value.trim();
	const parts = trimmed.split(':').map((part) => Number(part));

	if (parts.some((part) => Number.isNaN(part))) {
		throw new Error(`Invalid timestamp: ${value}`);
	}

	if (parts.length === 2) {
		return parts[0] * 60 + parts[1];
	}

	if (parts.length === 3) {
		return parts[0] * 3600 + parts[1] * 60 + parts[2];
	}

	throw new Error(`Unsupported timestamp: ${value}`);
};

const parseTimedMarkdown = (content) => {
	const lines = content
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);

	const segments = [];

	for (let index = 0; index < lines.length; index += 2) {
		const text = lines[index];
		const timestampLine = lines[index + 1];

		if (!text || !timestampLine) {
			throw new Error(`Expected text/timestamp pair at line ${index + 1}`);
		}

		const match = /^\*(.+)\*$/.exec(timestampLine);

		if (!match) {
			throw new Error(`Expected markdown timestamp at line ${index + 2}: ${timestampLine}`);
		}

		segments.push({
			text,
			startInSeconds: parseTimestamp(match[1]),
		});
	}

	return segments.map((segment, index) => {
		const nextStart = segments[index + 1]?.startInSeconds;
		return {
			...segment,
			endInSeconds: nextStart ?? segment.startInSeconds + 5,
		};
	});
};

const ensureDir = (filePath) => {
	fs.mkdirSync(path.dirname(filePath), {recursive: true});
};

const writeLessonModule = ({id, sourcePath, outputPath, title, subtitle}) => {
	const markdown = fs.readFileSync(sourcePath, 'utf8');
	const segments = parseTimedMarkdown(markdown);
	const durationInSeconds = segments[segments.length - 1].endInSeconds;

	const moduleSource = `export type LessonSegment = {
  text: string;
  startInSeconds: number;
  endInSeconds: number;
};

export const ${id.toLowerCase()}Lesson = {
  id: ${JSON.stringify(id)},
  title: ${JSON.stringify(title)},
  subtitle: ${JSON.stringify(subtitle)},
  durationInSeconds: ${durationInSeconds},
  segments: ${JSON.stringify(segments, null, 2)}
} as const;
`;

	ensureDir(outputPath);
	fs.writeFileSync(outputPath, moduleSource);
};

for (const lesson of lessons) {
	writeLessonModule(lesson);
}
