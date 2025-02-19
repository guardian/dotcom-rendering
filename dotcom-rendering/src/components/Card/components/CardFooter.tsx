import { css } from '@emotion/react';
import { palette, space, textSansBold12 } from '@guardian/source/foundations';
import { SvgCamera } from '@guardian/source/react-components';
import { Pill } from '../../../components/Pill';
import { SvgMediaControlsPlay } from '../../../components/SvgMediaControlsPlay';
import { type ArticleFormat, ArticleSpecial } from '../../../lib/articleFormat';
import { secondsToDuration } from '../../../lib/formatTime';

const contentStyles = css`
	margin-top: auto;
	padding-top: ${space[1]}px;
	display: flex;
	justify-content: 'flex-start';
	width: fit-content;
	align-items: center;
	${textSansBold12}
	> {
		/* The dividing line is applied only to the second child. This ensures that no
		   dividing line is added when there is only one child in the container. */
		:nth-child(2) {
			::before {
				content: '';
				display: block;
				width: 1px;
				height: 12px;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: ${palette.neutral[60]};
				margin-right: ${space[1]}px;
			}
			margin-left: ${space[1]}px;
			padding-left: ${space[1]}px;
		}
	}
`;

const labStyles = css`
	margin-top: ${space[1]}px;
`;

type MainMedia =
	| { type: 'Video'; duration: number }
	| { type: 'Audio'; duration: string }
	| { type: 'Gallery'; count: string };

type Props = {
	format: ArticleFormat;
	showLivePlayable: boolean;
	age?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	mainMedia?: MainMedia;
};

export const CardFooter = ({
	format,
	showLivePlayable,
	age,
	commentCount,
	cardBranding,
	mainMedia,
}: Props) => {
	if (showLivePlayable) return null;

	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer css={labStyles}>{cardBranding}</footer>;
	}

	if (mainMedia?.type === 'Video' && mainMedia.duration !== undefined) {
		return (
			<footer css={contentStyles}>
				<Pill
					content={
						<time>{secondsToDuration(mainMedia.duration)}</time>
					}
					icon={<SvgMediaControlsPlay />}
				/>
			</footer>
		);
	}

	if (mainMedia?.type === 'Audio' && mainMedia.duration !== undefined) {
		return (
			<footer css={contentStyles}>
				<Pill
					content={<time>{mainMedia.duration}</time>}
					icon={<SvgMediaControlsPlay />}
				/>
			</footer>
		);
	}

	if (mainMedia?.type === 'Gallery') {
		return (
			<footer css={contentStyles}>
				<Pill
					content={mainMedia.count}
					prefix="Gallery"
					icon={<SvgCamera />}
					iconSide="right"
				/>
			</footer>
		);
	}

	if (age === undefined && commentCount === undefined) {
		return null;
	}

	return (
		<footer css={contentStyles}>
			{age}
			{commentCount}
		</footer>
	);
};
