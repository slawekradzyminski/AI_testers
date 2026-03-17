import fs from 'node:fs';
import path from 'node:path';
import {D2} from '@terrastruct/d2';

const repoRoot = process.cwd();

const diagrams = [
	{
		sourcePath: path.join(repoRoot, 'L1', 'flow.d2'),
		outputPath: path.join(repoRoot, 'public', 'generated', 'l1-flow.svg'),
	},
];

const ensureDir = (dir) => {
	fs.mkdirSync(dir, {recursive: true});
};

const d2 = new D2();

for (const diagram of diagrams) {
	const source = fs.readFileSync(diagram.sourcePath, 'utf8');
	const result = await d2.compile(source, {
		options: {
			layout: 'elk',
			center: true,
			pad: 24,
			themeID: 200,
			darkThemeID: 200,
			noXMLTag: true,
		},
	});
	const svg = await d2.render(result.diagram, {
		...result.renderOptions,
		center: true,
		pad: 24,
		noXMLTag: true,
	});
	ensureDir(path.dirname(diagram.outputPath));
	fs.writeFileSync(diagram.outputPath, svg);
	console.log(
		`Generated ${path.relative(repoRoot, diagram.outputPath)} from ${path.relative(repoRoot, diagram.sourcePath)}`,
	);
}

process.exit(0);
