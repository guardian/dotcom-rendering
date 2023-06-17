import { transparentColour } from './transparentColour';

describe('transparentColour', () => {
	test.each([
		['#000000', 'rgba(0, 0, 0, 0.5)'],
		['#C70000', 'rgba(199, 0, 0, 0.5)'],
		['#aabbcc', 'rgba(170, 187, 204, 0.5)'],
		['#ffffff', 'rgba(255, 255, 255, 0.5)'],
	])('For valid hex %s, return %s', (hex, output) => {
		expect(transparentColour(hex)).toEqual(output);
	});

	test.each([
		['#000', 'rgba(0, 0, 0, 0.5)'],
		['#c00', 'rgba(204, 0, 0, 0.5)'],
		['#abc', 'rgba(170, 187, 204, 0.5)'],
		['#fff', 'rgba(255, 255, 255, 0.5)'],
	])('For short hex %s, return %s', (hex, output) => {
		expect(transparentColour(hex)).toEqual(output);
	});

	test.each(['---', '#ab', '#abcd', '#gggggg', '-ffffff', 'rgb(0,0,0)'])(
		'For invalid hex %s, return rgba(127, 127, 127, 0.5)',
		(hex) => {
			expect(transparentColour(hex)).toEqual('rgba(127, 127, 127, 0.5)');
		},
	);
});
