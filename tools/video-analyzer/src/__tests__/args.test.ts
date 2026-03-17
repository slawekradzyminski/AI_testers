import path from 'node:path';
import {describe, expect, it} from 'vitest';
import {parseArgs} from '../args';
import {DEFAULT_MODEL} from '../config';

describe('video-analyzer args', () => {
	it('parses required flags and applies defaults', () => {
		const cwd = '/repo';
		const parsed = parseArgs(['--lesson', 'L1', '--input', 'L1/L1_intro.mp4'], cwd);
		if ('help' in parsed) {
			throw new Error('Expected CLI options');
		}

		expect(parsed.lessonId).toBe('L1');
		expect(parsed.inputPath).toBe(path.join(cwd, 'L1/L1_intro.mp4'));
		expect(parsed.outputDir).toBe(path.join(cwd, 'tmp/video-analysis/L1'));
		expect(parsed.model).toBe(DEFAULT_MODEL);
		expect(parsed.selectedSegmentIndexes).toBeNull();
		expect(parsed.dryRun).toBe(false);
		expect(parsed.keepAudio).toBe(false);
	});

	it('rejects invalid overlap values', () => {
		expect(() =>
			parseArgs(
				['--lesson', 'L1', '--input', 'L1/L1_intro.mp4', '--segment-length', '10', '--segment-overlap', '10'],
				'/repo',
			),
		).toThrow('--segment-overlap');
	});

	it('parses selected segment indexes', () => {
		const parsed = parseArgs(
			['--lesson', 'L1', '--input', 'L1/L1_intro.mp4', '--segment-indexes', '30, 28,30,29'],
			'/repo',
		);
		if ('help' in parsed) {
			throw new Error('Expected CLI options');
		}

		expect(parsed.selectedSegmentIndexes).toEqual([28, 29, 30]);
	});
});
