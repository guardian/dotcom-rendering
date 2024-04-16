const sizeToPresetMapping = {
	textSans: {
		xxsmall: 'textSans12',
		xsmall: 'textSans14',
		small: 'textSans15',
		medium: 'textSans17',
		large: 'textSans20',
		xlarge: 'textSans24',
		xxlarge: 'textSans28',
		xxxlarge: 'textSans34',
	},
	headline: {
		xxxsmall: 'headlineMedium17',
		xxsmall: 'headlineMedium20',
		xsmall: 'headlineMedium24',
		small: 'headlineMedium28',
		medium: 'headlineMedium34',
		large: 'headlineMedium42',
		xlarge: 'headlineMedium50',
	},
	titlePiece: {
		small: 'titlepiece42',
		medium: 'titlepiece50',
		large: 'titlepiece70',
	},
	body: {
		xsmall: 'textEgyptian14',
		small: 'textEgyptian15',
		medium: 'textEgyptian17',
	},
};
const existingPresets = [
	'headlineBold17',
	'headlineBold20',
	'headlineBold24',
	'headlineBold28',
	'headlineBold34',
	'headlineBold42',
	'headlineBold50',
	'headlineLight17',
	'headlineLight20',
	'headlineLight24',
	'headlineLight28',
	'headlineLight34',
	'headlineLight42',
	'headlineLight50',
	'headlineLightItalic17',
	'headlineLightItalic20',
	'headlineLightItalic24',
	'headlineLightItalic28',
	'headlineLightItalic34',
	'headlineLightItalic42',
	'headlineLightItalic50',
	'headlineMedium17',
	'headlineMedium20',
	'headlineMedium24',
	'headlineMedium28',
	'headlineMedium34',
	'headlineMedium42',
	'headlineMedium50',
	'headlineMediumItalic17',
	'headlineMediumItalic20',
	'headlineMediumItalic24',
	'headlineMediumItalic28',
	'headlineMediumItalic34',
	'headlineMediumItalic42',
	'headlineMediumItalic50',
	'textEgyptian14',
	'textEgyptian15',
	'textEgyptian17',
	'textEgyptianBold14',
	'textEgyptianBold15',
	'textEgyptianBold17',
	'textEgyptianBoldItalic14',
	'textEgyptianBoldItalic15',
	'textEgyptianBoldItalic17',
	'textEgyptianItalic14',
	'textEgyptianItalic15',
	'textEgyptianItalic17',
	'textSans12',
	'textSans14',
	'textSans15',
	'textSans17',
	'textSans20',
	'textSans24',
	'textSans28',
	'textSans34',
	'textSansBold12',
	'textSansBold14',
	'textSansBold15',
	'textSansBold17',
	'textSansBold20',
	'textSansBold24',
	'textSansBold28',
	'textSansBold34',
	'textSansItalic12',
	'textSansItalic14',
	'textSansItalic15',
	'textSansItalic17',
	'textSansItalic20',
	'textSansItalic24',
	'textSansItalic28',
	'textSansItalic34',
	'titlepiece42',
	'titlepiece50',
	'titlepiece70',
];

const typographyApiMapping = {
	headlineBold17: { fontWeight: 'bold' },
	headlineBold20: { fontWeight: 'bold' },
	headlineBold24: { fontWeight: 'bold' },
	headlineBold28: { fontWeight: 'bold' },
	headlineBold34: { fontWeight: 'bold' },
	headlineBold42: { fontWeight: 'bold' },
	headlineBold50: { fontWeight: 'bold' },
	headlineLight17: { fontWeight: 'light' },
	headlineLight20: { fontWeight: 'light' },
	headlineLight24: { fontWeight: 'light' },
	headlineLight28: { fontWeight: 'light' },
	headlineLight34: { fontWeight: 'light' },
	headlineLight42: { fontWeight: 'light' },
	headlineLight50: { fontWeight: 'light' },
	headlineLightItalic17: {
		fontWeight: 'light',
		fontStyle: 'italic',
	},
	headlineLightItalic20: {
		fontWeight: 'light',
		fontStyle: 'italic',
	},
	headlineLightItalic24: {
		fontWeight: 'light',
		fontStyle: 'italic',
	},
	headlineLightItalic28: {
		fontWeight: 'light',
		fontStyle: 'italic',
	},
	headlineLightItalic34: {
		fontWeight: 'light',
		fontStyle: 'italic',
	},
	headlineLightItalic42: {
		fontWeight: 'light',
		fontStyle: 'italic',
	},
	headlineLightItalic50: {
		fontWeight: 'light',
		fontStyle: 'italic',
	},
	// headlineLightItalic70: () => {},
	// headlineMedium14: () => {},
	headlineMedium17: {},
	headlineMedium20: {},
	headlineMedium24: {},
	headlineMedium28: {},
	headlineMedium34: {},
	headlineMedium42: {},
	headlineMedium50: {},
	// headlineMedium70: () => {},
	// headlineMediumItalic14: () => {},
	headlineMediumItalic17: { fontStyle: 'italic' },
	headlineMediumItalic20: { fontStyle: 'italic' },
	headlineMediumItalic24: { fontStyle: 'italic' },
	headlineMediumItalic28: { fontStyle: 'italic' },
	headlineMediumItalic34: { fontStyle: 'italic' },
	headlineMediumItalic42: { fontStyle: 'italic' },
	headlineMediumItalic50: { fontStyle: 'italic' },
	// headlineMediumItalic70: () => {},
	textEgyptian14: { lineHeight: 'regular' },
	textEgyptian15: { lineHeight: 'regular' },
	textEgyptian17: { lineHeight: 'regular' },
	textEgyptianBold14: {
		lineHeight: 'regular',
		fontWeight: 'bold',
	},
	textEgyptianBold15: { lineHeight: 'regular', fontWeight: 'bold' },
	textEgyptianBold17: {
		lineHeight: 'regular',
		fontWeight: 'bold',
	},
	textEgyptianBoldItalic14: {
		lineHeight: 'regular',
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
	textEgyptianBoldItalic15: {
		lineHeight: 'regular',
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
	textEgyptianBoldItalic17: {
		lineHeight: 'regular',
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
	textEgyptianItalic14: {
		lineHeight: 'regular',
		fontStyle: 'italic',
	},
	textEgyptianItalic15: {
		lineHeight: 'regular',
		fontStyle: 'italic',
	},
	textEgyptianItalic17: {
		lineHeight: 'regular',
		fontStyle: 'italic',
	},
	textSans12: {},
	textSans14: {},
	textSans15: {},
	textSans17: {},
	textSans20: {},
	textSans24: {},
	textSans28: {},
	textSans34: {},
	textSansBold12: { fontWeight: 'bold' },
	textSansBold14: { fontWeight: 'bold' },
	textSansBold15: { fontWeight: 'bold' },
	textSansBold17: { fontWeight: 'bold' },
	textSansBold20: { fontWeight: 'bold' },
	textSansBold24: { fontWeight: 'bold' },
	textSansBold28: { fontWeight: 'bold' },
	textSansBold34: { fontWeight: 'bold' },
	textSansItalic12: { fontStyle: 'italic' },
	textSansItalic14: { fontStyle: 'italic' },
	textSansItalic15: { fontStyle: 'italic' },
	textSansItalic17: { fontStyle: 'italic' },
	textSansItalic20: { fontStyle: 'italic' },
	textSansItalic24: { fontStyle: 'italic' },
	textSansItalic28: { fontStyle: 'italic' },
	textSansItalic34: { fontStyle: 'italic' },
	titlepiece42: {},
	titlepiece50: {},
	titlepiece70: {},
};
const lineHeightMapping = {
	tight: '1.15',
	regular: '1.3',
	loose: '1.4',
};
const fontWeightMapping = {
	light: 300,
	normal: 400,
	medium: 500,
	bold: 700,
};

const getArgumentsFromObjectExpression = (arg) => {
	const args = [];
	arg.properties.forEach((prop) => {
		if (prop.key.type === 'Identifier') {
			args[prop.key.name] = prop.value.value;
		}
	});
	return args;
};
const buildPresetName = (preset, args) => {
	// Extract the numeric part (size) and the base name from the preset
	const sizeMatch = preset.match(/\d+$/);
	const size = sizeMatch ? sizeMatch[0] : '';
	let baseName = preset.replace(size, '');

	// Initialize variables for fontWeight and fontStyle, if they are provided
	let fontWeight = args['fontWeight']
		? args['fontWeight'].charAt(0).toUpperCase() +
		  args['fontWeight'].slice(1)
		: '';
	let fontStyle = args['fontStyle']
		? args['fontStyle'].charAt(0).toUpperCase() + args['fontStyle'].slice(1)
		: '';
	// Remove `Medium` if font weight is specified
	if (fontWeight && baseName.includes('Medium')) {
		baseName = baseName.replace('Medium', '');
	}

	// Reassemble the modified preset name
	const modifiedPreset = `${baseName}${fontWeight}${fontStyle}${size}`;
	// Check if the modified preset exists in the existing presets
	if (existingPresets.includes(modifiedPreset)) {
		return modifiedPreset;
	} else {
		// If not, return the original preset
		return preset;
	}
};

module.exports = function (fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);
	const usedPresets = new Set();

	root.find(j.TaggedTemplateExpression).forEach((templatePath) => {
		templatePath.node.quasi.expressions.forEach((expr, index) => {
			if (
				expr.type === 'CallExpression' &&
				expr.callee.object &&
				sizeToPresetMapping[expr.callee.object.name] &&
				sizeToPresetMapping[expr.callee.object.name][
					expr.callee.property.name
				]
			) {
				const newSize =
					sizeToPresetMapping[expr.callee.object.name][
						expr.callee.property.name
					];

				if (expr.arguments.length === 0) {
					usedPresets.add(newSize);
					return;
				}

				const optionsArg = expr.arguments[0];
				if (optionsArg.type !== 'ObjectExpression') return;
				const args = getArgumentsFromObjectExpression(optionsArg);
				const newPresetName = buildPresetName(newSize, args);
				let addComment = false;
				let comment = `;
/**
 * @TODO Typography preset styles should not be overridden.
 * Please speak to your team's designer and update this to use a more appropriate preset.
*/`;
				if (
					'fontWeight' in args &&
					(typographyApiMapping[newPresetName].fontWeight !==
						args['fontWeight'] ||
						!typographyApiMapping[newPresetName].fontWeight)
				) {
					comment += `
font-weight: ${fontWeightMapping[args['fontWeight']] ?? ''}`;
					addComment = true;
				}
				if (
					'lineHeight' in args &&
					(typographyApiMapping[newPresetName].lineHeight !==
						args['lineHeight'] ||
						!typographyApiMapping[newPresetName].lineHeight)
				) {
					comment += `
line-height: ${
						args['lineHeight']
							? lineHeightMapping[args['lineHeight']]
							: ''
					};`;
					addComment = true;
				}
				if (
					'fontStyle' in args &&
					(typographyApiMapping[newPresetName].fontStyle !==
						args['fontStyle'] ||
						!typographyApiMapping[newPresetName].fontStyle)
				) {
					comment += `
font-style: ${args['fontStyle'] ?? ''}`;
					addComment = true;
				}

				if (!addComment) return;
				const nextQuasi = templatePath.node.quasi.quasis[index + 1];
				if (!nextQuasi) return;

				nextQuasi.value.raw = comment + nextQuasi.value.raw;
				nextQuasi.value.cooked = comment + nextQuasi.value.cooked;
			}
		});
	});

	// Iterate over all entries in sizeToPresetMapping to transform calls to new preset identifiers
	Object.entries(sizeToPresetMapping).forEach(([element, sizes]) => {
		Object.entries(sizes).forEach(([oldSize, newSize]) => {
			root.find(j.CallExpression, {
				callee: {
					object: { name: element },
					property: { name: oldSize },
				},
			}).forEach((path) => {
				let args = [];
				path.node.arguments.forEach((arg) => {
					if (arg.type === 'ObjectExpression') {
						args = getArgumentsFromObjectExpression(arg);
					}
				});
				const preset = buildPresetName(newSize, args);
				const newIdentifier = j.identifier(preset);
				j(path).replaceWith(newIdentifier);
				usedPresets.add(preset);
			});
		});
	});

	const importDeclaration = root.find(j.ImportDeclaration, {
		source: { value: '@guardian/source-foundations' },
	});

	// Add missing preset imports
	if (importDeclaration.length > 0) {
		usedPresets.forEach((preset) => {
			if (
				!importDeclaration
					.get(0)
					.node.specifiers.some(
						(specifier) => specifier.imported.name === preset,
					)
			) {
				importDeclaration
					.get(0)
					.node.specifiers.push(
						j.importSpecifier(j.identifier(preset)),
					);
			}
		});
	}

	// Dynamically check and remove unused typographic element imports
	Object.keys(sizeToPresetMapping).forEach((element) => {
		const isElementCalled =
			root
				.find(j.CallExpression, {
					callee: {
						object: { name: element },
					},
				})
				.size() > 0;

		if (!isElementCalled) {
			// Remove unused import specifier
			root.find(j.ImportDeclaration, {
				source: { value: '@guardian/source-foundations' },
			}).forEach((path) => {
				const newSpecifiers = path.node.specifiers.filter(
					(specifier) => specifier.imported.name !== element,
				);

				if (newSpecifiers.length > 0) {
					path.node.specifiers = newSpecifiers;
				} else {
					j(path).remove();
				}
			});
		}
	});

	return root.toSource({ quote: 'single' });
};
