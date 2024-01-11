import { css } from '@emotion/react';
import { ArticleElementRole } from '@guardian/libs';
import {
	background,
	border,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgCheckmark } from '@guardian/source-react-components';
import type { Option } from '../../../vendor/@guardian/types/index';
import { OptionKind, withDefault } from '../../../vendor/@guardian/types/index';
import { fold } from 'lib';
import type { FC } from 'react';
import React, { useState } from 'react';
import { darkModeCss } from 'styles';

export type ClickToViewProps = {
	children: React.ReactNode;
	role: Option<ArticleElementRole>;
	onAccept: Option<() => void>;
	source: Option<string>;
	sourceDomain: Option<string>;
};

const roleTextSize = (role: ArticleElementRole): string => {
	switch (role) {
		case ArticleElementRole.Standard:
		case ArticleElementRole.Immersive:
		case ArticleElementRole.Inline:
		case ArticleElementRole.Showcase: {
			return textSans.medium({ lineHeight: 'regular' });
		}
		case ArticleElementRole.HalfWidth:
		case ArticleElementRole.Supporting:
		case ArticleElementRole.Thumbnail: {
			return textSans.small({ lineHeight: 'regular' });
		}
	}
};

const roleHeadlineSize = (role: ArticleElementRole): string => {
	switch (role) {
		case ArticleElementRole.Standard:
		case ArticleElementRole.Immersive:
		case ArticleElementRole.Inline:
		case ArticleElementRole.Showcase: {
			return textSans.large({
				fontWeight: 'bold',
				lineHeight: 'regular',
			});
		}
		case ArticleElementRole.HalfWidth:
		case ArticleElementRole.Supporting:
		case ArticleElementRole.Thumbnail: {
			return textSans.medium({
				fontWeight: 'bold',
				lineHeight: 'regular',
			});
		}
	}
};

const roleButtonSize = (
	role: ArticleElementRole,
): 'default' | 'small' | 'xsmall' => {
	switch (role) {
		case ArticleElementRole.Standard:
		case ArticleElementRole.Immersive:
		case ArticleElementRole.Inline:
		case ArticleElementRole.Showcase: {
			return 'default';
		}
		case ArticleElementRole.HalfWidth:
		case ArticleElementRole.Supporting:
			return 'small';
		case ArticleElementRole.Thumbnail: {
			return 'xsmall';
		}
	}
};

const roleButtonText = (role: ArticleElementRole): string => {
	switch (role) {
		case ArticleElementRole.Standard:
		case ArticleElementRole.Immersive:
		case ArticleElementRole.Inline:
		case ArticleElementRole.Showcase:
		case ArticleElementRole.HalfWidth:
		case ArticleElementRole.Supporting: {
			return 'Allow and continue';
		}
		case ArticleElementRole.Thumbnail: {
			return 'Allow';
		}
	}
};

const buttonStyles = darkModeCss`
	color: ${neutral[10]};
	background-color: ${neutral[86]};

	&:hover {
		background-color: ${neutral[97]};
	}
`;

const ClickToView: FC<ClickToViewProps> = ({
	children,
	role,
	onAccept,
	source,
	sourceDomain,
}) => {
	const [isOverlayClicked, setIsOverlayClicked] = useState<boolean>(false);

	const handleClick = (): void => {
		setIsOverlayClicked(true);
		if (onAccept.kind === OptionKind.Some) {
			setTimeout(() => onAccept.value());
		}
	};

	const roleWithDefault = withDefault(ArticleElementRole.Inline)(role);

	const textSize = roleTextSize(roleWithDefault);

	if (!isOverlayClicked) {
		return (
			<div
				css={css`
					width: 100%;
					background: ${background.secondary};
					border: 1px solid ${border.secondary};
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: ${remSpace[1]} ${remSpace[6]} ${remSpace[3]};
					margin-bottom: ${remSpace[3]};
					box-sizing: border-box;

					${darkModeCss`
						background: ${neutral[20]};
						border-color: ${neutral[46]};
					`}
				`}
			>
				<div
					css={css`
						${roleHeadlineSize(roleWithDefault)}
						margin-bottom: ${remSpace[1]};
					`}
				>
					{fold(
						(sourceValue: string) =>
							`Allow ${sourceValue} content?`,
						'Allow content provided by a third party?',
					)(source)}
				</div>
				<p
					css={css`
						${textSize}
						margin: 0px;
					`}
				>
					{fold(
						(sourceValue) => (
							<>
								This article includes content provided by{' '}
								{sourceValue}. We ask for your permission before
								anything is loaded, as they may be using cookies
								and other technologies. To view this content,{' '}
								<strong>
									click &apos;Allow and continue&apos;
								</strong>
								.
							</>
						),
						<>
							This article includes content hosted on{' '}
							{withDefault('unknown')(sourceDomain)}. We ask for
							your permission before anything is loaded, as the
							provider may be using cookies and other
							technologies. To view this content,{' '}
							<strong>
								click &apos;Allow and continue&apos;
							</strong>
							.
						</>,
					)(source)}
				</p>
				<div
					css={css`
						margin-top: ${remSpace[5]};
					`}
				>
					<Button
						priority="primary"
						size={roleButtonSize(roleWithDefault)}
						icon={<SvgCheckmark />}
						iconSide="left"
						onClick={handleClick}
						css={buttonStyles}
					>
						{roleButtonText(roleWithDefault)}
					</Button>
				</div>
			</div>
		);
	}
	return <>{children}</>;
};

export default ClickToView;
