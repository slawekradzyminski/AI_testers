import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Highest quality: CRF 14 (near-lossless), JPEG 95 for sharp text/graphics
Config.setCrf(14);
Config.setJpegQuality(95);
