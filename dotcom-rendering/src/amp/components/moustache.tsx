import React from 'react';

const open = (name: string, invert?: boolean) =>
	`{{${invert ? '^' : '#'}${name}}}`;
const close = (name: string) => `{{/${name}}}`;
export const moustacheVariable = (name: string) => `{{${name}}}`;

export const MoustacheSection: React.FC<{
	name: string;
	invert?: boolean;
}> = ({ name, children, invert }) => (
	<>
		{open(name, invert)}
		{children}
		{close(name)}
	</>
);

export const MoustacheVariable: React.FC<{ name: string }> = ({ name }) => (
	<>{moustacheVariable(name)}</>
);

export const MoustacheTemplate: React.FC = ({ children }) => {
	// this next line is necessary cos react has a 'template' object with no 'type' property.
	// By saying 'as {}' we can pretend we're not adding the 'type' property and thus avoid unhappy type errors
	const props = { type: 'amp-mustache' } as { [key: string]: any };
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <template {...props}>{children}</template>;
};
