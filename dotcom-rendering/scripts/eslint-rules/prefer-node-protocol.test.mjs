/** @jest-environment node */

import { RuleTester } from 'eslint';
import { preferNodeProtocol } from './prefer-node-protocol.mjs';

const ruleTester = new RuleTester({
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
});

ruleTester.run('prefer-node-protocol', preferNodeProtocol, {
	valid: [
		"import fs from 'node:fs';",
		"import packageName from 'some-package';",
		"const moduleName = 'fs';",
		"const fs = await import('node:fs');",
	],
	invalid: [
		{
			code: "import fs from 'fs';",
			output: "import fs from 'node:fs';",
			errors: [
				{
					messageId: 'prefer-node-protocol',
					data: { moduleName: 'fs' },
				},
			],
		},
		{
			code: "export { readFile } from 'fs';",
			output: "export { readFile } from 'node:fs';",
			errors: [{ messageId: 'prefer-node-protocol' }],
		},
		{
			code: "export * from 'path';",
			output: "export * from 'node:path';",
			errors: [{ messageId: 'prefer-node-protocol' }],
		},
		{
			code: "const fs = await import('fs');",
			output: "const fs = await import('node:fs');",
			errors: [{ messageId: 'prefer-node-protocol' }],
		},
	],
});
