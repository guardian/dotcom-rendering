import React from 'react';

const open = (name: string, invert?: boolean) =>
	`{{${invert ? '^' : '#'}${name}}}`;
const close = (name: string) => `{{/${name}}}`;
export const moustacheVariable = (name: string) => `{{${name}}}`;

export const MoustacheSection = ({
	name,
	children,
	invert,
}: {
	name: string;
	children: React.ReactNode;
	invert?: boolean;
}) => (
	<>
		{open(name, invert)}
		{children}
		{close(name)}
	</>
);

type Props = { name: string };

export const MoustacheVariable = ({ name }: Props) => (
	<>{moustacheVariable(name)}</>
);

export const MoustacheTemplate = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// this next line is necessary cos react has a 'template' object with no 'type' property.
	// By saying 'as {}' we can pretend we're not adding the 'type' property and thus avoid unhappy type errors
	const props = { type: 'amp-mustache' } as { [key: string]: any };

	return <template {...props}>{children}</template>;
};
