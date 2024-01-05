import { css } from '@emotion/react';
import { headline, palette, textSans } from '@guardian/source-foundations';
import Camera from '../static/icons/camera.svg';
import Clock from '../static/icons/clock.svg';
import Quote from '../static/icons/quote.svg';
import VideoIcon from '../static/icons/video-icon.svg';
import VolumeHigh from '../static/icons/volume-high.svg';
import {
	MoustacheSection,
	MoustacheTemplate,
	moustacheVariable,
	MoustacheVariable,
} from './Moustache.amp';
import { ShowMoreButton } from './ShowMoreButton.amp';

const inner = css`
	padding-top: 3px;
	overflow: hidden;
	position: relative;
	border-top: 1px solid ${palette.neutral[86]};
	margin-top: 24px;
`;
const header = css`
	padding-bottom: 12px;
	font-weight: 500;
	position: relative;
	${headline.xxsmall()};
	text-transform: capitalize;
`;
const item = css`
	background-color: ${palette.neutral[93]};
	border-top: 1px solid ${palette.neutral[93]};
	padding-left: 126px;
	position: relative;
	height: 75px;
	margin-bottom: 12px;
	overflow: hidden;
`;
const imageContainer = css`
	position: absolute;
	left: 0;
`;
const itemContent = css`
	min-height: 60px;
	padding: 0 5px;
	position: relative;
	overflow: hidden;
`;
const link = css`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	opacity: 0;
	overflow: hidden;
	text-indent: 200%;
	white-space: nowrap;
	background: transparent;
`;
const headlineCSS = css`
	padding: 0;
	margin: 1px 0 4px;
	font-weight: 500;
	word-wrap: break-word;
	${headline.xxxsmall()};
`;
const description = css`
	${headline.xxxsmall()};
	margin-bottom: 16px;
`;
const iconCSS = css`
	svg {
		fill: ${palette.neutral[7]};
		padding-right: 2px;
		height: 13px;
		width: 16px;
	}
`;
const quoteIconCSS = css`
	svg {
		fill: ${palette.neutral[60]};
		padding-right: 2px;
		height: 13px;
		width: 16px;
	}
`;
const ageWarning = css`
	color: ${palette.neutral[20]};
	fill: ${palette.neutral[20]};
	${textSans.xxsmall()};
`;
const showMore = css`
	background-color: ${palette.neutral[100]};
	&[overflow] {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
`;

export const OnwardContainer = ({
	guardianBaseURL,
	path,
	componentName,
}: {
	guardianBaseURL: string;
	path: string;
	componentName: string;
}) => (
	<amp-list
		layout="fixed-height"
		height="184px"
		src={path}
		credentials="include"
	>
		<MoustacheTemplate>
			<MoustacheSection name="showContent">
				<div
					className="js-has-click-event"
					css={inner}
					data-vars-component={componentName}
				>
					<div css={header}>
						<MoustacheVariable name="displayName" />
					</div>
					<MoustacheSection name="description">
						{/*  Don't show if there is not description WHAT STYLES HERE */}
						<div css={description}>
							<MoustacheVariable name="description" />
						</div>
					</MoustacheSection>

					<MoustacheSection name="content">
						<MoustacheSection name="headline">
							{/* Don't show if headline is empty */}
							<div css={item}>
								<div css={imageContainer}>
									<amp-img
										src={moustacheVariable('thumbnail')}
										layout="fixed"
										width="126"
										height="75"
									/>
								</div>
								<div css={itemContent}>
									<div>
										<h2 css={headlineCSS}>
											<span css={iconCSS}>
												<MoustacheSection name="isVideo">
													<VideoIcon />
												</MoustacheSection>
												<MoustacheSection name="isGallery">
													<Camera />
												</MoustacheSection>
												<MoustacheSection name="isAudio">
													<VolumeHigh />
												</MoustacheSection>
											</span>
											<span css={quoteIconCSS}>
												<MoustacheSection name="isComment">
													<Quote />
												</MoustacheSection>
											</span>
											<MoustacheVariable name="headline" />
										</h2>
										<MoustacheSection name="isComment">
											<div>
												<MoustacheVariable name="byline" />
											</div>
										</MoustacheSection>
									</div>
									<aside css={ageWarning}>
										<time>
											<MoustacheSection name="showWebPublicationDate">
												<Clock />{' '}
												<MoustacheVariable name="webPublicationDate" />
											</MoustacheSection>
										</time>
									</aside>
								</div>
								<a
									css={link}
									href={
										guardianBaseURL +
										moustacheVariable('url')
									}
								>
									<MoustacheVariable name="headline" />
								</a>
							</div>
						</MoustacheSection>
					</MoustacheSection>
				</div>
			</MoustacheSection>
		</MoustacheTemplate>
		<div overflow="" css={showMore}>
			<ShowMoreButton />
		</div>
	</amp-list>
);
