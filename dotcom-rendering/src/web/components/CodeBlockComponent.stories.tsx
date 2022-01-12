import { ContainerLayout } from '@frontend/web/components/ContainerLayout';

import { CodeBlockComponent } from './CodeBlockComponent';

export default {
	component: CodeBlockComponent,
	title: 'Components/CodeBlockComponent',
};

export const CodeStory = () => {
	const code = `
wget https://github.com/buger/goreplay/releases/download/v0.16.0.2/gor_0.16.0_x64.tar.gz

tar -xzf gor_0.16.0_x64.tar.gz gor

sudo gor --input-raw :80 --output-http http://apiv2.code.co.uk
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
