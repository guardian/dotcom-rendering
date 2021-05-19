import React from 'react';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';

import { CodeBlockComponent } from './CodeBlockComponent';

export default {
	component: CodeBlockComponent,
	title: 'Components/CodeBlockComponent',
};

export const CodeStory = () => {
	const code = `
export const CodeBlockComponent = ({
	code,
	language = 'text',
}: Props) => {
	return (
		<pre className={codeStyles}>
			<code>
				<div dangerouslySetInnerHTML={{ __html: code }} />
			</code>
		</pre>
	);
};
    `;
	return (
		<ContainerLayout>
			<CodeBlockComponent code={code} language="text" />
		</ContainerLayout>
	);
};
CodeStory.story = {
	name: 'default',
};
