/** @jest-environment node */

import { RuleTester } from 'eslint';
import { noUnmanagedZIndex } from './no-unmanaged-z-index.mjs';

const ruleTester = new RuleTester({
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
});

ruleTester.run('no-unmanaged-z-index', noUnmanagedZIndex, {
	valid: [
		'const styles = css`color: red;`;',
		"const styles = css`z-index: ${getZIndex('modal')};`;",
		"const element = <div css={{ zIndex: getZIndex('modal') }} />;",
		"const styles = css({ '&:hover': { 'z-index': getZIndex('modal') } });",
		'const config = { zIndex: 1 };',
	],
	invalid: [
		{
			code: 'const styles = css`z-index: 2;`;',
			errors: [{ messageId: 'unmanagedZIndex' }],
		},
		{
			code: "const styles = css`z-index: ${getZIndex('modal')}; z-index: 1;`;",
			errors: [{ messageId: 'unmanagedZIndex' }],
		},
		{
			code: 'const element = <div css={{ zIndex: 1 }} />;',
			errors: [{ messageId: 'unmanagedZIndex' }],
		},
		{
			code: "const element = <div css={{ '&:hover': { 'z-index': 2 } }} />;",
			errors: [{ messageId: 'unmanagedZIndex' }],
		},
	],
});
