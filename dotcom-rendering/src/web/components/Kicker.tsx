import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { PulsingDot } from './PulsingDot.importable';

// Defines a prefix to be used with a headline (e.g. 'Live /')
type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	showSlash?: boolean;
};

const kickerStyles = (colour: string) => css`
	color: ${colour};
	font-weight: 700;
	margin-right: 4px;
	display: inline-block;
`;

const slashStyles = css`
	&::after {
		content: '/';
		display: inline-block;
		margin-left: 4px;
	}
`;

export const Kicker = ({
	text,
	color,
	showPulsingDot,
	showSlash = true,
}: Props) => {
	const [removeKickerSlash, setRemoveKickerSlash] = useState(false);

	useEffect(() => {
		setRemoveKickerSlash(
			window?.guardian.config.tests.removeKickerSlashesVariant ===
				'variant',
		);
	}, []);

	if (removeKickerSlash) {
		return (
			<>
				<span css={kickerStyles(color)}>
					{showPulsingDot && <PulsingDot colour={color} />}
					{text}
				</span>
				{showSlash && <br />}
			</>
		);
	}
	return (
		<span css={kickerStyles(color)}>
			{showPulsingDot && <PulsingDot colour={color} />}
			<span css={showSlash && slashStyles}>{text}</span>
		</span>
	);
};
