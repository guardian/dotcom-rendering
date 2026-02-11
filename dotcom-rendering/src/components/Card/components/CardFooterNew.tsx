import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSansBold12,
} from '@guardian/source/foundations';
import { Link, SvgCamera } from '@guardian/source/react-components';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../../../lib/articleFormat';
import {
	isWithinTwelveHours,
	secondsToDuration,
} from '../../../lib/formatTime';
import { getZIndex } from '../../../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../../../lib/useCommentCount';
import { palette } from '../../../palette';
import type { MainMedia } from '../../../types/mainMedia';
import type { OnwardsSource } from '../../../types/onwards';
import { CardCommentCount } from '../../CardCommentCount.importable';
import { Island } from '../../Island';
import { Pill } from '../../Pill';
import { SvgMediaControlsPlay } from '../../SvgMediaControlsPlay';
import { CardAge } from './CardAge';

const contentStyles = css`
	margin-top: auto;
	padding-top: ${space[1]}px;
	display: flex;
	justify-content: 'flex-start';
	width: fit-content;
	align-items: center;
	${textSansBold12}
`;

const dividerStyles = css`
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
				background-color: ${sourcePalette.neutral[60]};
				margin-right: ${space[1]}px;
			}
			margin-left: ${space[1]}px;
			padding-left: ${space[1]}px;
		}
	}
`;

const reserveSpaceStyles = (mobile: boolean, desktop: boolean) => css`
	min-height: ${mobile ? '14px' : 0};

	${from.tablet} {
		min-height: ${desktop ? '14px' : 0};
	}
`;

type Props = {
	format: ArticleFormat;
	showLivePlayable: boolean;
	cardBranding?: JSX.Element;
	mainMedia?: MainMedia;
	isNewsletter?: boolean;
	shouldReserveSpace?: { mobile: boolean; desktop: boolean };
	showAge?: boolean;
	showPill?: boolean;
	isStorylines: boolean;
	onwardsSource?: OnwardsSource;
	webPublicationDate?: string;
	showClock?: boolean;
	serverTime?: number;
	isTagPage: boolean;
	discussionId?: string;
	discussionApiUrl: string;
	linkTo: string;
};

const basePillStyles = css`
	margin-top: auto;
	display: flex;
`;
const storylinesPillStyles = css`
	flex-direction: column;
	gap: ${space[1]}px;
	align-items: flex-start;
`;
const liveBulletStyles = css`
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background-color: ${palette('--pill-bullet')};
	margin-right: ${space[1]}px;
`;

const MediaOrNewsletterPill = ({
	format,
	mainMedia,
	isNewsletter,
	isStorylines,
}: Pick<Props, 'format' | 'mainMedia' | 'isNewsletter' | 'isStorylines'>) => (
	<div css={[basePillStyles, isStorylines && storylinesPillStyles]}>
		{mainMedia?.type === 'YoutubeVideo' &&
			format.design === ArticleDesign.Video && (
				<>
					{mainMedia.duration === 0 ? (
						<Pill
							content="Live"
							icon={<div css={liveBulletStyles} />}
						/>
					) : (
						<Pill
							content={
								<time>
									{secondsToDuration(mainMedia.duration)}
								</time>
							}
							icon={<SvgMediaControlsPlay width={18} />}
							prefix="Video"
						/>
					)}
				</>
			)}

		{mainMedia?.type === 'Audio' && (
			<Pill
				content={<time>{mainMedia.duration}</time>}
				icon={<SvgMediaControlsPlay width={18} />}
				prefix="Podcast"
			/>
		)}

		{mainMedia?.type === 'Gallery' && (
			<Pill
				content={mainMedia.count}
				icon={<SvgCamera />}
				prefix="Gallery"
			/>
		)}

		{mainMedia?.type === 'SelfHostedVideo' &&
			(format.design === ArticleDesign.Video ? (
				<Pill
					content=""
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Video"
				/>
			) : format.design === ArticleDesign.Audio ? (
				<Pill
					content=""
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Podcast"
				/>
			) : format.design === ArticleDesign.Gallery ? (
				<Pill content="" icon={<SvgCamera />} prefix="Gallery" />
			) : null)}

		{isNewsletter && <Pill content="Newsletter" />}
	</div>
);

export const CardFooter = ({
	format,
	showLivePlayable,
	showAge,
	cardBranding,
	mainMedia,
	isNewsletter,
	shouldReserveSpace,
	showPill,
	isStorylines,
	onwardsSource,
	webPublicationDate,
	showClock,
	serverTime,
	isTagPage,
	discussionId,
	discussionApiUrl,
	linkTo,
}: Props) => {
	// We don't show the footer for live playable cards
	if (showLivePlayable) return undefined;

	const canShowBranding =
		!!cardBranding && format.theme === ArticleSpecial.Labs;

	const getAge = () => {
		if (!webPublicationDate) return undefined;
		const withinTwelveHours = isWithinTwelveHours(webPublicationDate);

		const shouldShowAge =
			isStorylines ||
			isTagPage ||
			(!!onwardsSource && !canShowBranding) ||
			(showAge && withinTwelveHours);

		if (!shouldShowAge) return undefined;

		return (
			<CardAge
				webPublication={{
					date: webPublicationDate,
					isWithinTwelveHours: withinTwelveHours,
				}}
				showClock={showClock}
				serverTime={serverTime}
				isTagPage={isTagPage}
			/>
		);
	};

	const getCommentCount = () =>
		!!discussionId && (
			<Link
				{...{
					[DISCUSSION_ID_DATA_ATTRIBUTE]: discussionId,
				}}
				data-ignore="global-link-styling"
				data-link-name="Comment count"
				href={`${linkTo}#comments`}
				cssOverrides={css`
					/* See: https://css-tricks.com/nested-links/ */
					z-index: ${getZIndex('card-nested-link')};
					/* The following styles turn off those provided by Link */
					color: inherit;
					/* stylelint-disable-next-line property-disallowed-list */
					font-family: inherit;
					font-size: inherit;
					line-height: inherit;
					text-decoration: none;
					min-height: 10px;
				`}
			>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<CardCommentCount
						discussionApiUrl={discussionApiUrl}
						discussionId={discussionId}
					/>
				</Island>
			</Link>
		);

	return (
		<footer
			css={[
				contentStyles,
				canShowBranding &&
					!!onwardsSource &&
					css`
						justify-content: flex-end;
					`,
				shouldReserveSpace &&
					reserveSpaceStyles(
						shouldReserveSpace.mobile,
						shouldReserveSpace.desktop,
					),
			]}
		>
			{/** Inner branding location for onwards content */}
			{canShowBranding && !!onwardsSource && cardBranding}

			<div css={dividerStyles}>
				{showPill && (
					<MediaOrNewsletterPill
						format={format}
						isNewsletter={isNewsletter}
						isStorylines={isStorylines}
						mainMedia={mainMedia}
					/>
				)}

				{!showPill && getAge()}

				{getCommentCount()}
			</div>

			{/** Outer branding location for non-onwards content */}
			{canShowBranding && !onwardsSource && cardBranding}
		</footer>
	);
};
