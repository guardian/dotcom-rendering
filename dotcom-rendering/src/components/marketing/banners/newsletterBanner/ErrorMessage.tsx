import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	Link,
	SvgAlertRound,
	SvgReload,
} from '@guardian/source/react-components';

const responseBoxStyles = css`
	padding: 7px 12px 16px 7.5px;
	border: 1px solid ${palette.neutral[86]};
	border-radius: 4px;
	margin-top: ${space[2]}px;
	${until.tablet} {
		margin: ${space[2]}px 10px 0 10px;
	}
`;

const errorContainerStyles = css`
	display: grid;
	grid-template-columns: 32px minmax(0, 1fr);
	column-gap: 7.5px;
	color: ${palette.error[400]};

	> svg {
		width: 32px;
		height: 32px;
		fill: currentColor;
	}
`;

const errorContentStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
	padding-top: 5px;
`;

const errorTextStyles = css`
	${textSans17};
`;

const errorLinkStyles = css`
	&,
	&:visited,
	&:hover,
	&:active,
	&:focus {
		color: inherit;
		font: inherit;
	}
`;

const retryButtonStyles = css`
	min-width: 240px;
	min-height: 44px;
	svg {
		width: 24px;
		height: 24px;
	}
`;

export const FailureMessage = ({
	onRetry,
	text,
}: {
	onRetry: React.MouseEventHandler<HTMLButtonElement>;
	text: string;
}) => (
	<div css={[responseBoxStyles, errorContainerStyles]}>
		<SvgAlertRound />
		<div css={errorContentStyles}>
			<span css={errorTextStyles} role="alert">
				{text} Please try again or contact{' '}
				<Link
					href="mailto:customer.help@theguardian.com"
					target="_blank"
					rel="noreferrer"
					cssOverrides={errorLinkStyles}
				>
					customer.help@theguardian.com
				</Link>
			</span>
			<Button
				size="small"
				priority="primary"
				icon={<SvgReload />}
				iconSide="right"
				onClick={onRetry}
				cssOverrides={retryButtonStyles}
			>
				Try again
			</Button>
		</div>
	</div>
);
