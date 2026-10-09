import { isBuiltin } from 'node:module';

const MESSAGE_ID = 'prefer-node-protocol';
const messages = {
	[MESSAGE_ID]: 'Prefer `node:{{moduleName}}` over `{{moduleName}}`.',
};
const NODE_PROTOCOL = 'node:';

/**
@param {import('eslint').Rule.RuleContext} context
*/
const create = (context) => {
	return {
		Literal: (node) => {
			if (
				!(
					[
						'ImportDeclaration',
						'ExportNamedDeclaration',
						'ExportAllDeclaration',
						'ImportExpression',
						'TSImportType',
					].includes(node.parent.type) && node.parent.source === node
				)
			) {
				return;
			}

			const { value } = node;

			if (
				!(
					typeof value === 'string' &&
					!value.startsWith(NODE_PROTOCOL) &&
					isBuiltin(value) &&
					isBuiltin(`${NODE_PROTOCOL}${value}`)
				)
			) {
				return;
			}

			const insertPosition = context.sourceCode.getRange(node)[0] + 1; // After quote
			context.report({
				node,
				messageId: MESSAGE_ID,
				data: { moduleName: value },
				/**
			@param {import('eslint').Rule.RuleFixer} fixer
			*/
				fix: (fixer) =>
					fixer.insertTextAfterRange(
						[insertPosition, insertPosition],
						NODE_PROTOCOL,
					),
			});
		},
	};
};

/**
@type {import('eslint').Rule.RuleModule}
*/
export const preferNodeProtocol = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'Prefer using the `node:` protocol when importing Node.js builtin modules.',
			recommended: 'unopinionated',
		},
		fixable: 'code',
		messages,
		languages: ['js/js'],
	},
};
