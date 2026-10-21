const declarationPattern = /(?:^|[;{])\s*z-index\s*:\s*([^;}]+)/gim;
const expressionPattern = /^\s*__EXPRESSION_(\d+)__\s*(?:!important\s*)?$/i;

const isGetZIndexCall = (expression) =>
	expression?.type === 'CallExpression' &&
	expression.callee.type === 'Identifier' &&
	expression.callee.name === 'getZIndex';

const isStyleObject = (node) => {
	let current = node.parent;

	while (current) {
		if (
			current.type === 'JSXAttribute' &&
			['css', 'style'].includes(current.name.name)
		) {
			return true;
		}

		if (
			current.type === 'CallExpression' &&
			current.callee.type === 'Identifier' &&
			current.callee.name === 'css'
		) {
			return true;
		}

		current = current.parent;
	}

	return false;
};

const getPropertyName = (property) => {
	if (property.key.type === 'Identifier') {
		return property.key.name;
	}

	if (
		property.key.type === 'Literal' &&
		typeof property.key.value === 'string'
	) {
		return property.key.value;
	}

	return undefined;
};

export const noUnmanagedZIndex = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Require getZIndex for CSS z-index declarations',
		},
		messages: {
			unmanagedZIndex: 'Use getZIndex(...) for CSS z-index values.',
		},
		schema: [],
	},
	create(context) {
		return {
			TemplateLiteral(node) {
				const source = node.quasis
					.map(
						(quasi, index) =>
							`${quasi.value.raw}${index < node.expressions.length ? `__EXPRESSION_${index}__` : ''}`,
					)
					.join('');

				for (const match of source.matchAll(declarationPattern)) {
					const valueMatch = expressionPattern.exec(match[1]);
					const expressionIndex = Number(valueMatch?.[1]);
					const expression = node.expressions[expressionIndex];

					if (!valueMatch || !isGetZIndexCall(expression)) {
						context.report({
							node,
							messageId: 'unmanagedZIndex',
						});
					}
				}
			},
			Property(node) {
				if (
					!isStyleObject(node) ||
					!['zIndex', 'z-index'].includes(getPropertyName(node)) ||
					isGetZIndexCall(node.value)
				) {
					return;
				}

				context.report({
					node,
					messageId: 'unmanagedZIndex',
				});
			},
		};
	},
};
