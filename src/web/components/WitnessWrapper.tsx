import React from 'react';
import { css } from 'emotion';

import { neutral, space } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';

type Props = {
	authorName: string;
	dateCreated: string;
	pillar: Theme;
	children: React.ReactNode;
};

const wrapperStyles = css`
	border-width: 1px;
	border-color: ${neutral[86]};
	border-style: solid;
`;

const mainContentWrapperStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[4]}px;
`;

const witnessIconWrapperStyles = css`
	${body.small()}
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-bottom: ${space[2]}px;
`;

const witnessIconStyles = (pillar: Theme) => css`
	padding-left: ${space[1]}px;

	color: ${pillarPalette[pillar].main};
	${body.small({ fontWeight: 'bold' })}
`;

const witnessDetailsWrapperStyles = css`
	border-width: 1px;
	border-color: ${neutral[86]};
	border-style: solid;

	background-color: ${neutral[97]};
`;

const witnessDetailsSpacingStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;
`;

const authorNameStyles = (pillar: Theme) => css`
	padding-left: 5px;
	color: ${pillarPalette[pillar].main};
	${body.small({ fontWeight: 'bold' })}
`;

export const WitnessWrapper = ({
	authorName,
	dateCreated,
	pillar,
	children,
}: Props) => {
	return (
		<div className={wrapperStyles}>
			<div className={mainContentWrapperStyles}>{children}</div>
			<footer>
				<p className={witnessIconWrapperStyles}>
					Sent via
					<span className={witnessIconStyles(pillar)}>
						guardian
						<span
							className={css`
								color: ${neutral[86]};
							`}
						>
							witness
						</span>
					</span>
				</p>
				<div className={witnessDetailsWrapperStyles}>
					<div className={witnessDetailsSpacingStyles}>
						<p
							className={css`
								${body.small()}
							`}
						>
							By
							<span
								className={authorNameStyles(pillar)}
								itemProp="author"
								itemType="http://schema.org/Person"
							>
								{authorName}
							</span>
						</p>
						<p
							className={css`
								${body.small()}
							`}
						>
							<time itemProp="dateCreated" dateTime={dateCreated}>
								{new Date(dateCreated).toDateString()}
							</time>
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};
