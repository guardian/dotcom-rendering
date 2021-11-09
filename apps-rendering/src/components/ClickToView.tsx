import { css } from '@emotion/react';
import {
	background,
	border,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgCheckmark } from '@guardian/source-react-components';
import type { Option } from '@guardian/types';
import { OptionKind, Role, withDefault } from '@guardian/types';
import { fold } from 'lib';
import type { FC } from 'react';
import React, { useState } from 'react';

export type ClickToViewProps = {
	children: React.ReactNode;
	role: Option<Role>;
	onAccept: Option<() => void>;
	source: Option<string>;
	sourceDomain: Option<string>;
};

const roleTextSize = (role: Role): string => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase: {
			return textSans.medium({ lineHeight: 'regular' });
		}
		case Role.HalfWidth:
		case Role.Supporting:
		case Role.Thumbnail: {
			return textSans.small({ lineHeight: 'regular' });
		}
	}
};

const roleHeadlineSize = (role: Role): string => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase: {
			return textSans.large({
				fontWeight: 'bold',
				lineHeight: 'regular',
			});
		}
		case Role.HalfWidth:
		case Role.Supporting:
		case Role.Thumbnail: {
			return textSans.medium({
				fontWeight: 'bold',
				lineHeight: 'regular',
			});
		}
	}
};

const roleButtonSize = (role: Role): 'default' | 'small' | 'xsmall' => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase: {
			return 'default';
		}
		case Role.HalfWidth:
		case Role.Supporting:
			return 'small';
		case Role.Thumbnail: {
			return 'xsmall';
		}
	}
};

const roleButtonText = (role: Role): string => {
	switch (role) {
		case Role.Standard:
		case Role.Immersive:
		case Role.Inline:
		case Role.Showcase:
		case Role.HalfWidth:
		case Role.Supporting: {
			return 'Allow and continue';
		}
		case Role.Thumbnail: {
			return 'Allow';
		}
	}
};

export const ClickToView: FC<ClickToViewProps> = ({
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

	const roleWithDefault = withDefault(Role.Inline)(role);

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
					>
						{roleButtonText(roleWithDefault)}
					</Button>
				</div>
			</div>
		);
	}
	return <>{children}</>;
};
