import { css } from '@emotion/react';
import {
	brandAltBackground,
	from,
	headline,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgEnvelope } from '@guardian/source-react-components';
import React from 'react';
import { SecureSignup } from './SecureSignup';

type Props = {
	newsletterId: string;
	name: string;
	description: string;
	frequency: string;
};

const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				border: black 3px dashed;
				border-radius: 12px;
				padding: 10px;
			`}
		>
			{children}
		</div>
	);
};

const Title = ({ name }: { name: string }) => {
	return (
		<div
			css={css`
				${headline.xsmall({ fontWeight: 'bold' })}
				flex-grow: 1;
			`}
		>
			Sign up to {name} today
		</div>
	);
};

const Frequency = ({ frequency }: { frequency: string }) => {
	return (
		<div
			css={css`
				display: flex;
				margin-top: ${space[2]}px;
				${from.desktop} {
					margin-top: 0;
				}
			`}
		>
			<div
				css={css`
					svg {
						background: ${brandAltBackground.primary};
						border-radius: 50%;
						height: 28px;
						padding: 2px;
						margin-right: ${space[1]}px;
					}
				`}
			>
				<SvgEnvelope />
			</div>
			<div
				css={css`
					${textSans.medium({ fontWeight: 'bold' })}
				`}
			>
				{frequency}
			</div>
		</div>
	);
};

const Description = ({ description }: { description: string }) => {
	return (
		<div
			css={css`
				${textSans.medium({ lineHeight: 'tight' })}
				margin-top: ${space[1]}px;
			`}
		>
			{description}
		</div>
	);
};

const StackBelowDesktop = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
			${from.desktop} {
				flex-direction: row;
			}
		`}
	>
		{children}
	</div>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- because its implied
export const EmailSignup = ({
	newsletterId,
	name,
	description,
	frequency,
}: Props) => {
	return (
		<Container>
			<StackBelowDesktop>
				<Title name={name} />
				<Frequency frequency={frequency} />
			</StackBelowDesktop>
			<Description description={description} />
			<SecureSignup newsletterId={newsletterId} />
		</Container>
	);
};
