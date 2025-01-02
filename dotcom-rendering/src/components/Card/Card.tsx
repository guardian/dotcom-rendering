import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Hide, Link, SvgCamera } from '@guardian/source/react-components';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../../lib/articleFormat';
import { isMediaCard as isAMediaCard } from '../../lib/cardHelpers';
import { getZIndex } from '../../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../../lib/useCommentCount';
import { palette } from '../../palette';
import type { Branding } from '../../types/branding';
import type { StarRating as Rating } from '../../types/content';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontImage,
	DCRSlideshowImage,
	DCRSnapType,
	DCRSupportingContent,
} from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import type { OnwardsSource } from '../../types/onwards';
import type { PodcastSeriesImage } from '../../types/tag';
import { Avatar } from '../Avatar';
import { CardCommentCount } from '../CardCommentCount.importable';
import { CardHeadline, type ResponsiveFontSize } from '../CardHeadline';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';
import { Island } from '../Island';
import { LatestLinks } from '../LatestLinks.importable';
import { MediaDuration } from '../MediaDuration';
import { MediaMeta } from '../MediaMeta';
import { Pill } from '../Pill';
import { Slideshow } from '../Slideshow';
import { SlideshowCarousel } from '../SlideshowCarousel.importable';
import { Snap } from '../Snap';
import { SnapCssSandbox } from '../SnapCssSandbox';
import { StarRating } from '../StarRating/StarRating';
import type { Alignment } from '../SupportingContent';
import { SupportingContent } from '../SupportingContent';
import { SvgMediaControlsPlay } from '../SvgMediaControlsPlay';
import { YoutubeBlockComponent } from '../YoutubeBlockComponent.importable';
import { AvatarContainer } from './components/AvatarContainer';
import { CardAge } from './components/CardAge';
import { CardBranding } from './components/CardBranding';
import { CardFooter } from './components/CardFooter';
import { CardLayout, type GapSize } from './components/CardLayout';
import { CardLink } from './components/CardLink';
import { CardWrapper } from './components/CardWrapper';
import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import type {
	ImageFixedSizeOptions,
	ImagePositionType,
	ImageSizeType,
} from './components/ImageWrapper';
import { ImageWrapper } from './components/ImageWrapper';
import { TrailText, type TrailTextSize } from './components/TrailText';

export type Position = 'inner' | 'outer' | 'none';

export const BETA_CONTAINERS = [
	'scrollable/highlights',
	'flexible/special',
	'flexible/general',
	'scrollable/small',
	'scrollable/medium',
	'scrollable/feature',
	'static/feature/2',
	'static/medium/4',
];

export type Props = {
	linkTo: string;
	format: ArticleFormat;
	absoluteServerTimes: boolean;
	headlineText: string;
	headlineSizes?: ResponsiveFontSize;
	showQuotedHeadline?: boolean;
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	image?: DCRFrontImage;
	imagePositionOnDesktop?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
	/** Size is ignored when position = 'top' because in that case the image flows based on width */
	imageSize?: ImageSizeType;
	imageLoading: Loading;
	isCrossword?: boolean;
	isOnwardContent?: boolean;
	trailText?: string;
	avatarUrl?: string;
	showClock?: boolean;
	mainMedia?: MainMedia;
	/** Note YouTube recommends a minimum width of 480px @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size
	 * At 300px or below, the player will begin to lose functionality e.g. volume controls being omitted.
	 * Youtube requires a minimum width 200px.
	 */
	canPlayInline?: boolean;
	kickerText?: string;
	showPulsingDot?: boolean;
	starRating?: Rating;
	minWidthInPixels?: number;
	/** Used for Ophan tracking */
	dataLinkName?: string;
	/** Only used on Labs cards */
	branding?: Branding;
	/** Supporting content refers to sublinks */
	supportingContent?: DCRSupportingContent[];
	supportingContentAlignment?: Alignment;
	supportingContentPosition?: Position;
	snapData?: DCRSnapType;
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	showAge?: boolean;
	discussionApiUrl: string;
	discussionId?: string;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: boolean;
	isExternalLink: boolean;
	slideshowImages?: DCRSlideshowImage[];
	/** Determines if liveblog update links are displayed on a card */
	showLivePlayable?: boolean;
	liveUpdatesAlignment?: Alignment;
	liveUpdatesPosition?: Position;
	onwardsSource?: OnwardsSource;
	pauseOffscreenVideo?: boolean;
	showMainVideo?: boolean;
	isTagPage?: boolean;
	/** Allows the consumer to set an aspect ratio on the image of 5:3, 5:4, 4:5 or 1:1 */
	aspectRatio?: AspectRatio;
	index?: number;
	/** The Splash card in a flexible container gets a different visual treatment to other cards*/
	isFlexSplash?: boolean;
	showTopBarDesktop?: boolean;
	showTopBarMobile?: boolean;
	trailTextSize?: TrailTextSize;
	/** If specified, overrides trail text colour */
	trailTextColour?: string;
	/** The square podcast series image, if it exists for a card */
	podcastImage?: PodcastSeriesImage;
	/** A kicker image is seperate to the main media and renders as part of the kicker */
	showKickerImage?: boolean;
	galleryCount?: number;
	audioDuration?: string;
};

const Waveform = () => {
	const waveformStyles = css`
		position: absolute;
		left: 0;
		bottom: 0;
		height: 50px;
	`;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 370 33"
			css={waveformStyles}
		>
			<path
				d="M0 28.4769H1.1824V32.9972H0V28.4769ZM1.77333 15.9098H2.95521V32.9972H1.77333V15.9098ZM3.54667 0.630946H4.72854V32.9972H3.54667V0.630946ZM5.31947 1.17377H6.50187V32.9972H5.31947V1.17377ZM7.09281 1.80587H8.27468V32.9972H7.09281V1.80587ZM8.86561 3.16254H10.048V32.998H8.86561V3.16254ZM10.6389 4.69935H11.8208V32.9972H10.6389V4.69935ZM12.4123 6.32623H13.5942V32.9972H12.4123V6.32623ZM14.1851 7.14007H15.3675V32.9972H14.1851V7.14007ZM15.9584 4.97117H17.1403V32.998H15.9584V4.97117ZM17.7312 5.87508H18.9136V32.998H17.7312V5.87508ZM19.5046 5.96515H20.6864V32.9972H19.5046V5.96515ZM21.2784 7.41189H22.4603V32.9972H21.2784V7.41189ZM23.0512 8.85863H24.2336V32.998H23.0512V8.85863ZM24.8246 5.42232H26.0064V32.9972H24.8246V5.42232ZM26.5974 6.50798H27.7798V32.9972H26.5974V6.50798ZM28.3707 4.97117H29.5526V32.998H28.3707V4.97117ZM30.144 6.14609H31.3259V32.998H30.144V6.14609ZM31.9168 7.32101H33.0992V32.9972H31.9168V7.32101ZM33.6902 8.49594H34.8721V32.9972H33.6902V8.49594ZM35.463 9.94268H36.6454V32.9972H35.463V9.94268ZM37.2363 11.2085H38.4182V32.9972H37.2363V11.2085ZM39.0097 13.1972H40.1915V32.9972H39.0097V13.1972ZM40.7825 13.0163H41.9649V32.9972H40.7825V13.0163ZM42.5558 9.03877H43.7377V32.9972H42.5558V9.03877ZM44.3286 10.0327H45.511V32.9972H44.3286V10.0327ZM46.1019 11.0283H47.2838V32.9972H46.1019V11.0283ZM47.8753 11.4795H49.0571V32.9972H47.8753V11.4795ZM49.6481 11.6604H50.8305V32.9972H49.6481V11.6604ZM51.4214 12.6552H52.6033V32.9972H51.4214V12.6552ZM53.1953 13.65H54.3771V32.998H53.1953V13.65ZM54.9681 14.7349H56.1505V32.9972H54.9681V14.7349ZM56.7414 14.8249H57.9233V32.9972H56.7414V14.8249ZM58.5142 14.463H59.6966V32.9972H58.5142V14.463ZM60.2876 15.4578H61.4694V32.998H60.2876V15.4578ZM62.0609 16.5427H63.2428V32.9972H62.0609V16.5427ZM63.8337 17.2665H65.0161V32.998H63.8337V17.2665ZM65.607 7.32101H66.7889V32.9972H65.607V7.32101ZM67.3798 8.9487H68.5622V32.9972H67.3798V8.9487ZM69.1532 9.39985H70.335V32.9972H69.1532V9.39985ZM70.9265 8.58681H72.1084V32.9972H70.9265V8.58681ZM72.6993 5.7842H73.8817V32.9972H72.6993V5.7842ZM74.4726 6.59805H75.6545V32.9972H74.4726V6.59805ZM76.2455 7.50196H77.4278V32.9972H76.2455V7.50196ZM78.0188 8.58681H79.2007V32.9972H78.0188V8.58681ZM79.7921 9.76254H80.974V32.998H79.7921V9.76254ZM81.5649 10.2145H82.7473V32.9972H81.5649V10.2145ZM83.3383 3.70457H84.5201V32.9972H83.3383V3.70457ZM85.1116 4.42834H86.294V32.9972H85.1116V4.42834ZM86.8849 3.88551H88.0668V32.9972H86.8849V3.88551ZM88.6583 5.33225H89.8401V32.9972H88.6583V5.33225ZM90.4311 6.32623H91.6135V32.9972H90.4311V6.32623ZM92.2044 7.95472H93.3863V32.998H92.2044V7.95472ZM93.9772 6.59805H95.1596V32.9972H93.9772V6.59805ZM95.7505 3.70457H96.9324V32.9972H95.7505V3.70457ZM97.5239 3.16254H98.7057V32.998H97.5239V3.16254ZM99.2967 4.15652H100.479V32.9972H99.2967V4.15652ZM101.07 2.52884H102.252V32.9972H101.07V2.52884ZM102.843 3.52443H104.025V32.9972H102.843V3.52443ZM104.616 3.16254H105.798V32.998H104.616V3.16254ZM106.389 4.42834H107.571V32.9972H106.389V4.42834ZM108.162 5.42232H109.345V32.9972H108.162V5.42232ZM109.936 7.05H111.118V32.998H109.936V7.05ZM111.709 8.13486H112.891V32.9972H111.709V8.13486ZM113.482 10.4855H114.664V32.9972H113.482V10.4855ZM115.255 12.0223H116.437V32.9972H115.255V12.0223ZM117.028 10.6665H118.211V32.998H117.028V10.6665ZM118.802 4.78942H119.984V32.9972H118.802V4.78942ZM120.575 6.59805H121.757V32.9972H120.575V6.59805ZM122.348 8.04479H123.53V32.9972H122.348V8.04479ZM124.121 8.9487H125.303V32.9972H124.121V8.9487ZM125.894 9.49153H127.076V32.9972H125.894V9.49153ZM127.667 9.85261H128.849V32.9972H127.667V9.85261ZM129.441 11.0283H130.623V32.9972H129.441V11.0283ZM131.214 4.06645H132.396V32.998H131.214V4.06645ZM132.987 4.33746H134.169V32.9972H132.987V4.33746ZM134.76 5.42232H135.942V32.9972H134.76V5.42232ZM136.533 6.59805H137.715V32.9972H136.533V6.59805ZM138.306 7.86304H139.488V32.9972H138.306V7.86304ZM140.079 7.41189H141.262V32.9972H140.079V7.41189ZM141.852 8.58681H143.034V32.9972H141.852V8.58681ZM143.625 8.22493H144.808V32.9972H143.625V8.22493ZM145.399 9.12884H146.581V32.9972H145.399V9.12884ZM147.172 9.94268H148.354V32.9972H147.172V9.94268ZM148.945 11.0283H150.128V32.9972H148.945V11.0283ZM150.719 11.6604H151.9V32.9972H150.719V11.6604ZM152.491 12.5651H153.674V32.9972H152.491V12.5651ZM154.265 12.1124H155.447V32.9972H154.265V12.1124ZM156.038 11.3894H157.22V32.9972H156.038V11.3894ZM157.811 12.3834H158.993V32.9972H157.811V12.3834ZM159.584 13.379H160.766V32.998H159.584V13.379ZM161.357 14.644H162.539V32.9972H161.357V14.644ZM163.13 15.9999H164.313V32.9972H163.13V15.9999ZM164.904 10.0327H166.086V32.9972H164.904V10.0327ZM166.677 11.0283H167.859V32.9972H166.677V11.0283ZM168.45 10.4855H169.632V32.9972H168.45V10.4855ZM170.223 11.4795H171.405V32.9972H170.223V11.4795ZM171.996 12.4751H173.178V32.998H171.996V12.4751ZM173.769 13.2881H174.951V32.9972H173.769V13.2881ZM175.542 3.07167H176.725V32.9972H175.542V3.07167ZM177.315 5.51239H178.497V32.9972H177.315V5.51239ZM179.089 5.06124H180.271V32.9972H179.089V5.06124ZM180.862 6.23616H182.045V32.9972H180.862V6.23616ZM182.635 7.32101H183.817V32.9972H182.635V7.32101ZM184.408 4.2474H185.591V32.9972H184.408V4.2474ZM186.182 6.05522H187.363V32.9972H186.182V6.05522ZM187.955 8.13486H189.137V32.9972H187.955V8.13486ZM189.728 9.30978H190.91V32.9972H189.728V9.30978ZM191.501 10.4855H192.683V32.9972H191.501V10.4855ZM193.274 11.4795H194.456V32.9972H193.274V11.4795ZM195.047 11.3894H196.229V32.9972H195.047V11.3894ZM196.821 12.7461H198.002V32.998H196.821V12.7461ZM198.593 12.4751H199.776V32.998H198.593V12.4751ZM200.367 5.42232H201.549V32.9972H200.367V5.42232ZM202.14 6.05522H203.322V32.9972H202.14V6.05522ZM203.913 6.95913H205.095V32.9972H203.913V6.95913ZM205.686 7.50196H206.868V32.9972H205.686V7.50196ZM207.459 8.85863H208.641V32.998H207.459V8.85863ZM209.232 9.21971H210.414V32.9972H209.232V9.21971ZM211.006 9.94268H212.188V32.9972H211.006V9.94268ZM212.779 11.1184H213.961V32.9972H212.779V11.1184ZM214.552 10.3046H215.734V32.9972H214.552V10.3046ZM216.325 11.3894H217.508V32.9972H216.325V11.3894ZM218.098 8.76776H219.28V32.9972H218.098V8.76776ZM219.871 9.94268H221.054V32.9972H219.871V9.94268ZM221.645 10.9375H222.826V32.998H221.645V10.9375ZM223.418 8.76776H224.6V32.9972H223.418V8.76776ZM225.191 9.85261H226.373V32.9972H225.191V9.85261ZM226.964 10.4855H228.146V32.9972H226.964V10.4855ZM228.737 7.77297H229.919V32.9972H228.737V7.77297ZM230.51 9.21971H231.692V32.9972H230.51V9.21971ZM232.284 5.7842H233.465V32.9972H232.284V5.7842ZM234.056 5.51239H235.239V32.9972H234.056V5.51239ZM235.83 6.50798H237.012V32.9972H235.83V6.50798ZM237.602 7.50196H238.785V32.9972H237.602V7.50196ZM239.376 7.59203H240.558V32.9972H239.376V7.59203ZM241.149 4.2474H242.331V32.9972H241.149V4.2474ZM242.922 0.992028H244.105V32.9972H242.922V0.992028ZM244.696 3.79544H245.878V32.9972H244.696V3.79544ZM246.469 4.87949H247.651V32.9972H246.469V4.87949ZM248.242 5.69414H249.424V32.9972H248.242V5.69414ZM250.015 7.32101H251.197V32.9972H250.015V7.32101ZM251.788 0.992028H252.971V32.9972H251.788V0.992028ZM253.561 1.89594H254.743V32.9972H253.561V1.89594ZM255.334 4.69935H256.517V32.9972H255.334V4.69935ZM257.108 6.68812H258.289V32.9972H257.108V6.68812ZM258.881 5.33225H260.063V32.9972H258.881V5.33225ZM260.654 6.68812H261.836V32.9972H260.654V6.68812ZM262.427 7.23095H263.609V32.9972H262.427V7.23095ZM264.2 8.40587H265.382V32.9972H264.2V8.40587ZM265.973 9.30978H267.155V32.9972H265.973V9.30978ZM267.747 10.3954H268.928V32.9972H267.747V10.3954ZM269.519 11.8422H270.702V32.998H269.519V11.8422ZM271.293 11.1184H272.475V32.9972H271.293V11.1184ZM273.066 10.8466H274.248V32.9972H273.066V10.8466ZM274.839 11.5704H276.021V32.998H274.839V11.5704ZM276.613 11.7513H277.795V32.9972H276.613V11.7513ZM278.385 3.07167H279.568V32.9972H278.385V3.07167ZM280.159 3.97558H281.341V32.9972H280.159V3.97558ZM281.932 5.60326H283.114V32.9972H281.932V5.60326ZM283.705 6.4163H284.887V32.9972H283.705V6.4163ZM285.478 7.32101H286.66V32.9972H285.478V7.32101ZM287.251 7.05H288.434V32.998H287.251V7.05ZM289.024 1.35472H290.206V32.998H289.024V1.35472ZM290.797 2.52884H291.98V32.9972H290.797V2.52884ZM292.571 3.52443H293.752V32.9972H292.571V3.52443ZM294.344 5.69414H295.526V32.9972H294.344V5.69414ZM296.117 -0.00195312H297.299V32.9972H296.117V-0.00195312ZM297.89 1.98762H299.072V32.998H297.89V1.98762ZM299.663 2.80065H300.845V32.9972H299.663V2.80065ZM301.436 3.70457H302.619V32.9972H301.436V3.70457ZM303.21 4.15652H304.391V32.9972H303.21V4.15652ZM304.983 2.71058H306.165V32.9972H304.983V2.71058ZM306.756 3.79544H307.938V32.9972H306.756V3.79544ZM308.53 4.69935H309.711V32.9972H308.53V4.69935ZM310.302 6.77899H311.486V32.998H310.302V6.77899ZM312.077 6.4163H313.259V32.9972H312.077V6.4163ZM313.85 7.41189H315.032V32.9972H313.85V7.41189ZM315.623 9.30978H316.805V32.9972H315.623V9.30978ZM317.396 10.3046H318.578V32.9972H317.396V10.3046ZM319.169 7.59203H320.351V32.9972H319.169V7.59203ZM320.942 8.76776H322.124V32.9972H320.942V8.76776ZM322.716 9.12884H323.898V32.9972H322.716V9.12884ZM324.489 9.94268H325.671V32.9972H324.489V9.94268ZM326.262 10.9375H327.444V32.998H326.262V10.9375ZM328.035 11.6604H329.218V32.9972H328.035V11.6604ZM329.809 11.8422H330.99V32.998H329.809V11.8422ZM331.581 12.8362H332.764V32.9972H331.581V12.8362ZM333.355 14.0119H334.536V32.9972H333.355V14.0119ZM335.128 14.9158H336.31V32.9972H335.128V14.9158ZM336.901 15.9999H338.083V32.9972H336.901V15.9999ZM338.674 11.1184H339.856V32.9972H338.674V11.1184ZM340.447 4.69935H341.629V32.9972H340.447V4.69935ZM342.22 5.87508H343.403V32.998H342.22V5.87508ZM343.994 6.14609H345.175V32.998H343.994V6.14609ZM345.766 7.77297H346.949V32.9972H345.766V7.77297ZM347.54 9.21971H348.722V32.9972H347.54V9.21971ZM349.313 11.0283H350.495V32.9972H349.313V11.0283ZM351.086 12.2033H352.268V32.9972H351.086V12.2033ZM352.859 11.8422H354.041V32.998H352.859V11.8422ZM354.633 12.2933H355.815V32.9972H354.633V12.2933ZM356.406 12.1124H357.588V32.9972H356.406V12.1124ZM358.179 13.4691H359.361V32.9972H358.179V13.4691ZM359.952 10.1236H361.134V32.9972H359.952V10.1236ZM361.725 8.04479H362.907V32.9972H361.725V8.04479ZM363.498 8.85863H364.681V32.998H363.498V8.85863ZM365.271 9.5816H366.453V32.9972H365.271V9.5816ZM367.045 10.6665H368.227V32.998H367.045V10.6665ZM368.818 12.4751H370V32.998H368.818V12.4751Z"
				fill={sourcePalette.neutral[86]}
			/>
		</svg>
	);
};

const starWrapper = (cardHasImage: boolean) => css`
	background-color: ${sourcePalette.brandAlt[400]};
	color: ${sourcePalette.neutral[0]};
	margin-top: ${cardHasImage ? '2' : space[1]}px;
	display: inline-block;

	${from.tablet} {
		margin-top: ${space[1]}px;
	}
`;

const StarRatingComponent = ({
	rating,
	cardHasImage,
}: {
	rating: Rating;
	cardHasImage: boolean;
}) => (
	<div css={starWrapper(cardHasImage)}>
		<StarRating rating={rating} size="small" />
	</div>
);

const HorizontalDivider = () => (
	<div
		css={css`
			${from.tablet} {
				border-top: 1px solid ${palette('--card-border-top')};
				height: 1px;
				width: 50%;
				${from.tablet} {
					width: 100px;
				}
				${from.desktop} {
					width: 140px;
				}
				margin-top: ${space[3]}px;
			}
		`}
	/>
);

const podcastImageStyles = (imageSize: ImageSizeType) => {
	switch (imageSize) {
		case 'small':
			return css`
				width: 69px;
				height: 69px;
				${from.tablet} {
					width: 98px;
					height: 98px;
				}
			`;

		case 'medium':
			return css`
				width: 98px;
				height: 98px;
				${from.tablet} {
					width: 120px;
					height: 120px;
				}
			`;
		default:
			return css`
				width: 120px;
				height: 120px;
			`;
	}
};

const getMedia = ({
	imageUrl,
	imageAltText,
	avatarUrl,
	isCrossword,
	slideshowImages,
	mainMedia,
	canPlayInline,
	podcastImage,
	isBetaContainer,
}: {
	imageUrl?: string;
	imageAltText?: string;
	avatarUrl?: string;
	isCrossword?: boolean;
	slideshowImages?: DCRSlideshowImage[];
	mainMedia?: MainMedia;
	canPlayInline?: boolean;
	podcastImage?: PodcastSeriesImage;
	isBetaContainer: boolean;
}) => {
	if (mainMedia && mainMedia.type === 'Video' && canPlayInline) {
		return {
			type: 'video',
			mainMedia,
			...(imageUrl && { imageUrl }),
		} as const;
	}
	if (slideshowImages) return { type: 'slideshow', slideshowImages } as const;
	if (avatarUrl) return { type: 'avatar', avatarUrl } as const;
	if (podcastImage && isBetaContainer) {
		return {
			type: 'podcast',
			podcastImage,
			trailImage: { src: imageUrl, altText: imageAltText },
		} as const;
	}
	if (imageUrl) {
		const type = isCrossword ? 'crossword' : 'picture';
		return { type, imageUrl, imageAltText } as const;
	}
	return undefined;
};

const decideSublinkPosition = (
	supportingContent?: DCRSupportingContent[],
	imagePositionOnDesktop?: ImagePositionType,
	alignment?: Alignment,
	supportingContentPosition?: Position,
	showLivePlayable?: boolean,
): 'inner' | 'outer' | 'none' => {
	if (!supportingContent || supportingContent.length === 0) {
		return 'none';
	}

	if (supportingContentPosition) {
		return supportingContentPosition;
	}

	if (
		imagePositionOnDesktop === 'top' ||
		imagePositionOnDesktop === 'bottom' ||
		showLivePlayable
	) {
		return 'outer';
	}

	return alignment === 'vertical' ? 'inner' : 'outer';
};

const getHeadlinePosition = ({
	isFlexSplash,
	containerType,
	showLivePlayable,
	isMediaCard,
}: {
	containerType?: DCRContainerType;
	isFlexSplash?: boolean;
	showLivePlayable: boolean;
	isMediaCard: boolean;
}) => {
	if (isMediaCard) return 'inner';
	if (containerType === 'flexible/special' && isFlexSplash) {
		return 'outer';
	}

	if (
		containerType === 'flexible/general' &&
		isFlexSplash &&
		showLivePlayable
	) {
		return 'outer';
	}

	return 'inner';
};

export const isWithinTwelveHours = (webPublicationDate: string): boolean => {
	const timeDiffMs = Math.abs(
		new Date().getTime() - new Date(webPublicationDate).getTime(),
	);
	const timeDiffHours = timeDiffMs / (1000 * 60 * 60);
	return timeDiffHours <= 12;
};

export const Card = ({
	linkTo,
	format,
	headlineText,
	headlineSizes,
	showQuotedHeadline,
	byline,
	showByline,
	webPublicationDate,
	image,
	imagePositionOnDesktop = 'top',
	imagePositionOnMobile = 'left',
	imageSize = 'small',
	imageLoading,
	trailText,
	avatarUrl,
	showClock,
	mainMedia,
	canPlayInline,
	kickerText,
	showPulsingDot,
	starRating,
	minWidthInPixels,
	dataLinkName,
	branding,
	supportingContent,
	supportingContentAlignment = 'vertical',
	supportingContentPosition,
	snapData,
	containerPalette,
	containerType,
	showAge = true,
	discussionApiUrl,
	discussionId,
	isDynamo,
	isCrossword,
	isOnwardContent = false,
	isExternalLink,
	slideshowImages,
	showLivePlayable = false,
	liveUpdatesAlignment = 'vertical',
	liveUpdatesPosition = 'inner',
	onwardsSource,
	pauseOffscreenVideo = false,
	showMainVideo = true,
	absoluteServerTimes,
	isTagPage = false,
	aspectRatio,
	index = 0,
	isFlexSplash,
	showTopBarDesktop = true,
	showTopBarMobile = false,
	trailTextSize,
	trailTextColour,
	podcastImage,
	showKickerImage = false,
	galleryCount,
	audioDuration,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;
	const sublinkPosition = decideSublinkPosition(
		supportingContent,
		imagePositionOnDesktop,
		supportingContentAlignment,
		supportingContentPosition,
		showLivePlayable,
	);
	const showQuotes = !!showQuotedHeadline;

	const isOpinion =
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter;

	const isBetaContainer = BETA_CONTAINERS.includes(containerType ?? '');

	const decideAge = () => {
		if (!webPublicationDate) return undefined;
		const withinTwelveHours = isWithinTwelveHours(webPublicationDate);

		const shouldShowAge =
			isTagPage || !!onwardsSource || (showAge && withinTwelveHours);

		if (!shouldShowAge) return undefined;

		return (
			<CardAge
				webPublication={{
					date: webPublicationDate,
					isWithinTwelveHours: withinTwelveHours,
				}}
				showClock={showClock}
				absoluteServerTimes={absoluteServerTimes}
				isTagPage={isTagPage}
			/>
		);
	};

	const CommentCount = () =>
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

	const MediaPill = () => (
		<div
			css={css`
				margin-top: auto;
			`}
		>
			{mainMedia?.type === 'Audio' && (
				<Pill
					content={audioDuration ?? ''}
					icon={<SvgMediaControlsPlay />}
				/>
			)}
			{mainMedia?.type === 'Gallery' && (
				<Pill
					prefix="Gallery"
					content={galleryCount?.toString() ?? ''}
					icon={<SvgCamera />}
					iconSide="right"
				/>
			)}
		</div>
	);

	if (snapData?.embedHtml) {
		return (
			<SnapCssSandbox snapData={snapData}>
				<Snap snapData={snapData} dataLinkName={dataLinkName} />
			</SnapCssSandbox>
		);
	}

	/**
	 * Check media type to determine if pill, or article metadata & icon shown.
	 * Currently pills are only shown within beta containers.
	 */
	const showPill =
		isBetaContainer &&
		mainMedia &&
		(mainMedia.type === 'Audio' || mainMedia.type === 'Gallery');

	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		avatarUrl,
		isCrossword,
		slideshowImages,
		mainMedia,
		canPlayInline,
		podcastImage,
		isBetaContainer,
	});

	// For opinion type cards with avatars (which aren't onwards content)
	// we render the footer in a different location
	const showCommentFooter =
		isOpinion && !isOnwardContent && media?.type === 'avatar';

	/**
-	 * Media cards have contrasting background colours. We add additional
	 * padding to these cards to keep the text readable.
-	 */
	const isMediaCard = isAMediaCard(format);

	const backgroundColour = isMediaCard
		? palette('--card-media-background')
		: palette('--card-background');

	/* Whilst we migrate to the new container types, we need to check which container we are in. */
	const isFlexibleContainer =
		containerType === 'flexible/special' ||
		containerType === 'flexible/general';

	const isSmallCard = containerType === 'scrollable/small';

	const imageFixedSizeOptions = (): ImageFixedSizeOptions => {
		if (isSmallCard) {
			return {
				mobile: 'tiny',
				tablet: 'small',
				desktop: 'small',
			};
		}
		if (isFlexibleContainer) return { mobile: 'small' };
		return { mobile: 'medium' };
	};

	const headlinePosition = getHeadlinePosition({
		containerType,
		isFlexSplash,
		showLivePlayable,
		isMediaCard,
	});

	const hideTrailTextUntil = () => {
		if (isFlexibleContainer) {
			return undefined;
		} else if (
			imageSize === 'large' &&
			imagePositionOnDesktop === 'right' &&
			media?.type !== 'avatar'
		) {
			return 'desktop';
		} else {
			return 'tablet';
		}
	};

	/** Determines the gap of between card components based on card properties */
	const getGapSize = (): GapSize => {
		if (isOnwardContent) return 'none';
		if (isMediaCard && !isFlexibleContainer) return 'tiny';
		if (!!isFlexSplash || (isFlexibleContainer && imageSize === 'jumbo')) {
			return 'small';
		}
		if (isSmallCard) return 'medium';

		if (
			isFlexibleContainer &&
			(imagePositionOnDesktop === 'left' ||
				imagePositionOnDesktop === 'right')
		) {
			return 'large';
		}
		return 'small';
	};

	/**
	 * Determines how and when to render the `SupportingContent` component in the "outer" position:
	 * - Returns `null` if `supportingContent` is unavailable or `sublinkPosition` is `none`.
	 * - Renders `SupportingContent` for all breakpoints if `sublinkPosition` is `outer`.
	 * - If `sublinkPosition` is `inner`, hides `SupportingContent` from tablet but displays it on smaller breakpoints.
	 *
	 */
	const decideOuterSublinks = () => {
		if (!hasSublinks) return null;
		if (sublinkPosition === 'none') return null;
		if (sublinkPosition === 'outer') {
			return (
				<SupportingContent
					supportingContent={supportingContent}
					containerPalette={containerPalette}
					alignment={supportingContentAlignment}
					isDynamo={isDynamo}
					fillBackgroundOnMobile={isFlexSplash}
				/>
			);
		}
		return (
			<Hide from={isFlexSplash ? 'desktop' : 'tablet'}>
				<SupportingContent
					supportingContent={supportingContent}
					containerPalette={containerPalette}
					alignment={supportingContentAlignment}
					isDynamo={isDynamo}
					fillBackgroundOnMobile={isFlexSplash}
				/>
			</Hide>
		);
	};

	const decideInnerSublinks = () => {
		if (!hasSublinks) return null;
		if (sublinkPosition !== 'inner') return null;
		return (
			<Hide until={isFlexSplash ? 'desktop' : 'tablet'}>
				<SupportingContent
					supportingContent={supportingContent}
					/* inner links are always vertically stacked */
					alignment="vertical"
					containerPalette={containerPalette}
					isDynamo={isDynamo}
					fillBackgroundOnMobile={isFlexSplash}
				/>
			</Hide>
		);
	};

	const determinePadContent = (
		mediaCard: boolean,
		betaContainer: boolean,
		onwardContent: boolean,
	): 'large' | 'small' | undefined => {
		if (mediaCard && betaContainer) return 'large';
		if (mediaCard || onwardContent) return 'small';
		return undefined;
	};

	return (
		<CardWrapper
			format={format}
			showTopBarDesktop={!isOnwardContent && showTopBarDesktop}
			showTopBarMobile={showTopBarMobile}
			containerPalette={containerPalette}
			isOnwardContent={isOnwardContent}
		>
			<CardLink
				linkTo={linkTo}
				headlineText={headlineText}
				dataLinkName={dataLinkName}
				isExternalLink={isExternalLink}
			/>
			{headlinePosition === 'outer' && (
				<div
					css={css`
						padding-bottom: ${space[5]}px;
					`}
					style={{ backgroundColor: backgroundColour }}
				>
					<CardHeadline
						headlineText={headlineText}
						format={format}
						fontSizes={headlineSizes}
						showQuotes={showQuotes}
						kickerText={
							format.design === ArticleDesign.LiveBlog &&
							!kickerText
								? 'Live'
								: kickerText
						}
						showPulsingDot={
							format.design === ArticleDesign.LiveBlog ||
							showPulsingDot
						}
						byline={byline}
						showByline={showByline}
						isExternalLink={isExternalLink}
						isBetaContainer={isBetaContainer}
					/>
					{!isUndefined(starRating) ? (
						<StarRatingComponent
							rating={starRating}
							cardHasImage={!!image}
						/>
					) : null}
					{!!mainMedia && mainMedia.type !== 'Video' && !showPill && (
						<MediaMeta
							mediaType={mainMedia.type}
							hasKicker={!!kickerText}
						/>
					)}
				</div>
			)}

			<CardLayout
				cardBackgroundColour={backgroundColour}
				imagePositionOnDesktop={imagePositionOnDesktop}
				imagePositionOnMobile={imagePositionOnMobile}
				minWidthInPixels={minWidthInPixels}
				imageType={media?.type}
				containerType={containerType}
				gapSize={getGapSize()}
			>
				{media && (
					<ImageWrapper
						imageSize={imageSize}
						imageFixedSizes={imageFixedSizeOptions()}
						imageType={media.type}
						imagePositionOnDesktop={imagePositionOnDesktop}
						imagePositionOnMobile={imagePositionOnMobile}
						hideImageOverlay={
							media.type === 'slideshow' && isFlexibleContainer
						}
						padImage={isMediaCard && isBetaContainer}
					>
						{media.type === 'slideshow' &&
							(isFlexibleContainer ? (
								<div
									css={css`
										position: relative;
										z-index: ${getZIndex(
											'card-nested-link',
										)};
									`}
								>
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
										<SlideshowCarousel
											images={media.slideshowImages}
											imageSize={imageSize}
										/>
									</Island>
								</div>
							) : (
								<Slideshow
									images={media.slideshowImages}
									imageSize={imageSize}
									isDynamo={isDynamo}
								/>
							))}
						{media.type === 'avatar' && (
							<AvatarContainer
								imageSize={imageSize}
								imagePositionOnDesktop={imagePositionOnDesktop}
							>
								<Avatar
									src={media.avatarUrl}
									alt={byline ?? ''}
								/>
							</AvatarContainer>
						)}
						{media.type === 'video' && (
							<>
								{showMainVideo ? (
									<div
										data-chromatic="ignore"
										data-component="youtube-atom"
										css={css`
											display: block;
											position: relative;
											z-index: ${getZIndex(
												'card-nested-link',
											)};
										`}
									>
										<Island
											priority="critical"
											defer={{ until: 'visible' }}
										>
											<YoutubeBlockComponent
												id={media.mainMedia.id}
												assetId={
													media.mainMedia.videoId
												}
												index={index}
												duration={
													media.mainMedia.duration
												}
												posterImage={
													media.mainMedia.images
												}
												overrideImage={media.imageUrl}
												width={media.mainMedia.width}
												height={media.mainMedia.height}
												origin={media.mainMedia.origin}
												mediaTitle={headlineText}
												expired={
													media.mainMedia.expired
												}
												format={format}
												isMainMedia={true}
												hideCaption={true}
												stickyVideos={false}
												kickerText={kickerText}
												pauseOffscreenVideo={
													pauseOffscreenVideo
												}
												showTextOverlay={
													containerType ===
													'fixed/video'
												}
												imagePositionOnMobile={
													imagePositionOnMobile
												}
												//** TODO: IMPROVE THIS MAPPING */
												// image size defaults to small if not provided. However, if the headline size is large or greater, we want to assume the image is also large so that the play icon is correctly sized.
												imageSize={
													[
														'small',
														'medium',
														'large',
														'xlarge',
														'xxlarge',
													].includes(
														headlineSizes?.desktop ??
															'',
													)
														? 'large'
														: imageSize
												}
												enableAds={false}
												aspectRatio={aspectRatio}
											/>
										</Island>
									</div>
								) : (
									<div>
										<CardPicture
											mainImage={
												media.imageUrl
													? media.imageUrl
													: media.mainMedia.images.reduce(
															(prev, current) =>
																prev.width >
																current.width
																	? prev
																	: current,
													  ).url
											}
											imageSize={imageSize}
											alt={headlineText}
											loading={imageLoading}
											roundedCorners={isOnwardContent}
											aspectRatio={aspectRatio}
										/>
									</div>
								)}
							</>
						)}
						{media.type === 'picture' && (
							<>
								<CardPicture
									mainImage={media.imageUrl}
									imageSize={imageSize}
									alt={media.imageAltText}
									loading={imageLoading}
									roundedCorners={isOnwardContent}
									aspectRatio={aspectRatio}
								/>
								{mainMedia?.type === 'Video' &&
									mainMedia.duration > 0 && (
										<MediaDuration
											mediaDuration={mainMedia.duration}
											imagePositionOnDesktop={
												imagePositionOnDesktop
											}
											imagePositionOnMobile={
												imagePositionOnMobile
											}
										/>
									)}
							</>
						)}
						{media.type === 'crossword' && (
							<img src={media.imageUrl} alt="" />
						)}

						{media.type === 'podcast' && (
							<>
								{media.podcastImage.src && !showKickerImage ? (
									<div css={[podcastImageStyles(imageSize)]}>
										<CardPicture
											mainImage={media.podcastImage.src}
											imageSize={'small'}
											alt={media.imageAltText}
											loading={imageLoading}
											roundedCorners={isOnwardContent}
											aspectRatio={'1:1'}
										/>
									</div>
								) : (
									<CardPicture
										mainImage={media.trailImage.src ?? ''}
										imageSize={imageSize}
										alt={media.trailImage.altText}
										loading={imageLoading}
										aspectRatio={aspectRatio}
									/>
								)}
							</>
						)}
					</ImageWrapper>
				)}

				{containerType != 'fixed/video' && (
					<ContentWrapper
						imageType={media?.type}
						imageSize={imageSize}
						imagePositionOnDesktop={imagePositionOnDesktop}
						padContent={determinePadContent(
							isMediaCard,
							isBetaContainer,
							isOnwardContent,
						)}
						isFlexibleContainer={isFlexibleContainer}
					>
						{/**
						 * Podcast waveform image is absolutely positioned at
						 * bottom of card and appears behind everything else
						 */}
						{mainMedia?.type === 'Audio' && <Waveform />}
						{/* This div is needed to keep the headline and trail text justified at the start */}
						<div
							css={css`
								position: relative;
								display: flex;
								flex-direction: column;
								justify-content: flex-start;
								flex-grow: 1;
							`}
						>
							{headlinePosition === 'inner' && (
								<HeadlineWrapper>
									<CardHeadline
										headlineText={headlineText}
										format={format}
										fontSizes={headlineSizes}
										showQuotes={showQuotes}
										kickerText={
											format.design ===
												ArticleDesign.LiveBlog &&
											!kickerText
												? 'Live'
												: kickerText
										}
										showPulsingDot={
											format.design ===
												ArticleDesign.LiveBlog ||
											showPulsingDot
										}
										byline={byline}
										showByline={showByline}
										isExternalLink={isExternalLink}
										isBetaContainer={isBetaContainer}
										kickerImage={
											showKickerImage &&
											media?.type === 'podcast'
												? media?.podcastImage
												: undefined
										}
									/>
									{!isUndefined(starRating) ? (
										<StarRatingComponent
											rating={starRating}
											cardHasImage={!!image}
										/>
									) : null}
									{!!mainMedia &&
										mainMedia.type !== 'Video' &&
										!showPill && (
											<MediaMeta
												mediaType={mainMedia.type}
												hasKicker={!!kickerText}
											/>
										)}
								</HeadlineWrapper>
							)}

							{!!trailText && media?.type !== 'podcast' && (
								<TrailText
									trailText={trailText}
									trailTextColour={trailTextColour}
									trailTextSize={trailTextSize}
									padTop={headlinePosition === 'inner'}
									hideUntil={hideTrailTextUntil()}
								/>
							)}

							{!showCommentFooter && (
								<>
									{showPill ? (
										<>
											<MediaPill />
											{format.theme ===
												ArticleSpecial.Labs &&
												branding && (
													<CardBranding
														branding={branding}
														format={format}
														onwardsSource={
															onwardsSource
														}
														containerPalette={
															containerPalette
														}
													/>
												)}
										</>
									) : (
										<CardFooter
											format={format}
											age={decideAge()}
											commentCount={<CommentCount />}
											cardBranding={
												branding ? (
													<CardBranding
														branding={branding}
														format={format}
														onwardsSource={
															onwardsSource
														}
														containerPalette={
															containerPalette
														}
													/>
												) : undefined
											}
											showLivePlayable={showLivePlayable}
										/>
									)}
								</>
							)}
							{showLivePlayable &&
								liveUpdatesPosition === 'inner' && (
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
										<LatestLinks
											id={linkTo}
											isDynamo={isDynamo}
											direction={
												isFlexibleContainer
													? liveUpdatesAlignment
													: supportingContentAlignment
											}
											containerPalette={containerPalette}
											absoluteServerTimes={
												absoluteServerTimes
											}
											displayHeader={isFlexibleContainer}
											directionOnMobile={
												isFlexibleContainer
													? 'horizontal'
													: undefined
											}
										></LatestLinks>
									</Island>
								)}
						</div>

						{/* This div is needed to push this content to the bottom of the card */}
						<div
							style={isOnwardContent ? { marginTop: 'auto' } : {}}
						>
							{decideInnerSublinks()}
						</div>

						{sublinkPosition === 'outer' &&
							supportingContentAlignment === 'horizontal' &&
							imagePositionOnDesktop === 'right' && (
								<HorizontalDivider />
							)}
					</ContentWrapper>
				)}
			</CardLayout>

			<div
				css={
					/** If beta containers have liveblog links or sublink links in the outer position, we set flex-basis so that they sit below the image */
					isBetaContainer &&
					(liveUpdatesPosition === 'outer' ||
						sublinkPosition === 'outer') &&
					css`
						flex-basis: 100%;
					`
				}
				style={{
					padding:
						isMediaCard || isOnwardContent ? `0 ${space[2]}px` : 0,
				}}
			>
				{showLivePlayable && liveUpdatesPosition === 'outer' && (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<LatestLinks
							id={linkTo}
							isDynamo={isDynamo}
							direction={
								isFlexibleContainer
									? liveUpdatesAlignment
									: supportingContentAlignment
							}
							containerPalette={containerPalette}
							absoluteServerTimes={absoluteServerTimes}
							displayHeader={isFlexibleContainer}
							directionOnMobile={'horizontal'}
						></LatestLinks>
					</Island>
				)}
				{decideOuterSublinks()}

				{showCommentFooter && (
					<CardFooter
						format={format}
						age={decideAge()}
						commentCount={<CommentCount />}
						cardBranding={
							branding ? (
								<CardBranding
									branding={branding}
									format={format}
									onwardsSource={onwardsSource}
								/>
							) : undefined
						}
						showLivePlayable={showLivePlayable}
					/>
				)}
			</div>
		</CardWrapper>
	);
};
