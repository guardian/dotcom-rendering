import {
	ExplainerAtom,
	InteractiveAtom,
	InteractiveLayoutAtom,
	VideoAtom,
} from '@guardian/atoms-rendering';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { getSharingUrls } from '../../lib/sharing-urls';
import type { ServerSideTests, Switches } from '../../types/config';
import { AudioAtomWrapper } from '../components/AudioAtomWrapper.importable';
import { BlockquoteBlockComponent } from '../components/BlockquoteBlockComponent';
import { CalloutBlockComponent } from '../components/CalloutBlockComponent.importable';
import { CaptionBlockComponent } from '../components/CaptionBlockComponent';
import { ChartAtomWrapper } from '../components/ChartAtomWrapper.importable';
import { CodeBlockComponent } from '../components/CodeBlockComponent';
import { CommentBlockComponent } from '../components/CommentBlockComponent';
import { DisclaimerBlockComponent } from '../components/DisclaimerBlockComponent';
import { DividerBlockComponent } from '../components/DividerBlockComponent';
import { DocumentBlockComponent } from '../components/DocumentBlockComponent.importable';
import { EmailSignup } from '../components/EmailSignup';
import { EmbedBlockComponent } from '../components/EmbedBlockComponent.importable';
import { Figure } from '../components/Figure';
import { GuideAtomWrapper } from '../components/GuideAtomWrapper.importable';
import { GuVideoBlockComponent } from '../components/GuVideoBlockComponent';
import { HighlightBlockComponent } from '../components/HighlightBlockComponent';
import { ImageBlockComponent } from '../components/ImageBlockComponent';
import { InstagramBlockComponent } from '../components/InstagramBlockComponent.importable';
import { InteractiveBlockComponent } from '../components/InteractiveBlockComponent.importable';
import { InteractiveContentsBlockComponent } from '../components/InteractiveContentsBlockComponent';
import { Island } from '../components/Island';
import { ItemLinkBlockElement } from '../components/ItemLinkBlockElement';
import { KnowledgeQuizAtomWrapper } from '../components/KnowledgeQuizAtomWrapper.importable';
import { MainMediaEmbedBlockComponent } from '../components/MainMediaEmbedBlockComponent';
import { MapEmbedBlockComponent } from '../components/MapEmbedBlockComponent.importable';
import { MultiImageBlockComponent } from '../components/MultiImageBlockComponent';
import { NumberedTitleBlockComponent } from '../components/NumberedTitleBlockComponent';
import { PersonalityQuizAtomWrapper } from '../components/PersonalityQuizAtomWrapper.importable';
import { ProfileAtomWrapper } from '../components/ProfileAtomWrapper.importable';
import { PullQuoteBlockComponent } from '../components/PullQuoteBlockComponent';
import { QandaAtomWrapper } from '../components/QandaAtomWrapper.importable';
import { RichLinkComponent } from '../components/RichLinkComponent.importable';
import { SoundcloudBlockComponent } from '../components/SoundcloudBlockComponent';
import { SpotifyBlockComponent } from '../components/SpotifyBlockComponent.importable';
import { StarRatingBlockComponent } from '../components/StarRatingBlockComponent';
import { SubheadingBlockComponent } from '../components/SubheadingBlockComponent';
import { TableBlockComponent } from '../components/TableBlockComponent';
import { TextBlockComponent } from '../components/TextBlockComponent';
import { TimelineAtomWrapper } from '../components/TimelineAtomWrapper.importable';
import { TweetBlockComponent } from '../components/TweetBlockComponent.importable';
import { UnsafeEmbedBlockComponent } from '../components/UnsafeEmbedBlockComponent.importable';
import { VideoFacebookBlockComponent } from '../components/VideoFacebookBlockComponent.importable';
import { VimeoBlockComponent } from '../components/VimeoBlockComponent';
import { VineBlockComponent } from '../components/VineBlockComponent.importable';
import {
	WitnessImageBlockComponent,
	WitnessTextBlockComponent,
	WitnessVideoBlockComponent,
} from '../components/WitnessBlockComponent';
import { YoutubeBlockComponent } from '../components/YoutubeBlockComponent.importable';
import { YoutubeEmbedBlockComponent } from '../components/YoutubeEmbedBlockComponent';
import {
	interactiveLegacyFigureClasses,
	isInteractive,
} from '../layouts/lib/interactiveLegacyStyling';
import { decidePalette } from './decidePalette';

type Props = {
	format: ArticleFormat;
	element: CAPIElement;
	adTargeting?: AdTargeting;
	host?: string;
	index: number;
	isMainMedia: boolean;
	hideCaption?: boolean;
	starRating?: number;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	switches: Switches;
	isPinnedPost?: boolean;
	abTests?: ServerSideTests;
	isMainMediaTest?: boolean;
};

// updateRole modifies the role of an element in a way appropriate for most
// article types.
const updateRole = (el: CAPIElement, format: ArticleFormat): CAPIElement => {
	const isBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	switch (el._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			if (isBlog && el.role !== 'thumbnail') {
				el.role = 'inline';
			}

			return el;
		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			if (isBlog) {
				el.role = 'inline';
			} else {
				el.role = 'richLink';
			}

			return el;
		default:
			if (isBlog && 'role' in el) {
				el.role = 'inline';
			}

			return el;
	}
};

// renderElement converts a CAPI element to JSX. A boolean 'ok' flag is returned
// along with the element to indicate if the element is null, in which case
// callers can e.g. avoid further work/wrapping as required. Unfortunately,
// there is no straightforward way to tell if a React element is null by direct
// inspection.
export const renderElement = ({
	format,
	element,
	adTargeting,
	host,
	index,
	hideCaption,
	isMainMedia,
	starRating,
	pageId,
	webTitle,
	ajaxUrl,
	isAdFreeUser,
	switches,
	isSensitive,
	isPinnedPost,
	abTests,
	isMainMediaTest,
}: Props): [boolean, JSX.Element] => {
	const palette = decidePalette(format);

	const isBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	const shouldLazyLoadInteractives =
		!!abTests?.commercialEndOfQuarterMegaTestControl;

	switch (element._type) {
		case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
			return [
				true,
				<Island>
					<AudioAtomWrapper
						id={element.id}
						trackUrl={element.trackUrl}
						kicker={element.kicker}
						title={element.title}
						duration={element.duration}
						pillar={format.theme}
						contentIsNotSensitive={!isSensitive}
						aCastisEnabled={!!switches.acast}
						readerCanBeShownAds={!isAdFreeUser}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
			return [
				true,
				<BlockquoteBlockComponent
					key={index}
					html={element.html}
					palette={palette}
					quoted={element.quoted}
				/>,
			];

		case 'model.dotcomrendering.pageElements.CalloutBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<CalloutBlockComponent callout={element} format={format} />
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.CaptionBlockElement':
			return [
				true,
				<CaptionBlockComponent
					key={index}
					format={format}
					captionText={element.captionText}
					padCaption={element.padCaption}
					credit={element.credit}
					displayCredit={element.displayCredit}
					shouldLimitWidth={element.shouldLimitWidth}
					isOverlaid={element.isOverlaid}
				/>,
			];
		case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<ChartAtomWrapper id={element.id} html={element.html} />
				</Island>,
			];

		case 'model.dotcomrendering.pageElements.CodeBlockElement':
			return [
				true,
				<CodeBlockComponent
					code={element.html}
					language={element.language}
				/>,
			];
		case 'model.dotcomrendering.pageElements.CommentBlockElement':
			return [
				true,
				<CommentBlockComponent
					body={element.body}
					avatarURL={element.avatarURL}
					profileURL={element.profileURL}
					profileName={element.profileName}
					dateTime={element.dateTime}
					permalink={element.permalink}
				/>,
			];
		case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
			return [true, <DisclaimerBlockComponent html={element.html} />];
		case 'model.dotcomrendering.pageElements.DividerBlockElement':
			return [
				true,
				<DividerBlockComponent
					size={element.size}
					spaceAbove={element.spaceAbove}
				/>,
			];
		case 'model.dotcomrendering.pageElements.DocumentBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<DocumentBlockComponent
						embedUrl={element.embedUrl}
						height={element.height}
						isMainMedia={isMainMedia}
						isTracking={element.isThirdPartyTracking}
						role={element.role}
						source={element.source}
						sourceDomain={element.sourceDomain}
						title={element.title}
						width={element.width}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.EmbedBlockElement':
			if (!element.safe) {
				if (isMainMedia) {
					return [
						true,
						<MainMediaEmbedBlockComponent
							title={element.alt || ''}
							srcDoc={element.html}
						/>,
					];
				}

				return [
					true,
					<Island deferUntil="visible">
						<UnsafeEmbedBlockComponent
							key={index}
							html={element.html}
							alt={element.alt || ''}
							index={index}
							role={element.role}
							isTracking={element.isThirdPartyTracking}
							isMainMedia={isMainMedia}
							source={element.source}
							sourceDomain={element.sourceDomain}
							isPinnedPost={isPinnedPost}
						/>
					</Island>,
				];
			}
			return [
				true,
				<Island deferUntil="visible">
					<EmbedBlockComponent
						key={index}
						html={element.html}
						caption={element.caption}
						role={element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement':
			return [
				true,
				<ExplainerAtom
					key={index}
					id={element.id}
					title={element.title}
					html={element.body}
				/>,
			];
		case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<GuideAtomWrapper
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
						pillar={format.theme}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
			return [
				true,
				<GuVideoBlockComponent
					html={element.html}
					format={format}
					credit={element.source}
					isMainMedia={isMainMedia}
					caption={element.caption}
				/>,
			];
		case 'model.dotcomrendering.pageElements.HighlightBlockElement':
			return [
				true,
				<HighlightBlockComponent key={index} html={element.html} />,
			];
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return [
				true,
				<ImageBlockComponent
					format={format}
					key={index}
					element={element}
					hideCaption={hideCaption}
					isMainMedia={isMainMedia}
					starRating={starRating || element.starRating}
					title={element.title}
					isAvatar={element.isAvatar}
					isMainMediaTest={isMainMediaTest}
				/>,
			];
		case 'model.dotcomrendering.pageElements.InstagramBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<InstagramBlockComponent
						key={index}
						element={element}
						index={index}
						isMainMedia={isMainMedia}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
			if (
				format.design === ArticleDesign.Interactive ||
				format.design === ArticleDesign.FullPageInteractive
			) {
				return [
					true,
					<InteractiveLayoutAtom
						id={element.id}
						elementHtml={element.html}
						elementJs={element.js}
						elementCss={element.css}
					/>,
				];
			}
			return [
				true,
				<InteractiveAtom
					isMainMedia={isMainMedia}
					id={element.id}
					elementHtml={element.html}
					elementJs={element.js}
					elementCss={element.css}
					format={format}
				/>,
			];
		case 'model.dotcomrendering.pageElements.InteractiveBlockElement':
			return [
				true,
				// Deferring interactives until CPU idle achieves the lowest Cumulative Layout Shift (CLS)
				// For more information on the experiment we ran see: https://github.com/guardian/dotcom-rendering/pull/4942
				<Island
					deferUntil={shouldLazyLoadInteractives ? 'visible' : 'idle'}
				>
					<InteractiveBlockComponent
						url={element.url}
						scriptUrl={element.scriptUrl}
						alt={element.alt}
						role={element.role}
						format={format}
						elementId={element.elementId}
						caption={element.caption}
						isMainMedia={isMainMedia}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.ItemLinkBlockElement':
			return [true, <ItemLinkBlockElement html={element.html} />];
		case 'model.dotcomrendering.pageElements.InteractiveContentsBlockElement':
			return [
				true,
				<div id={element.elementId}>
					<Island deferUntil="visible">
						<InteractiveContentsBlockComponent
							subheadingLinks={element.subheadingLinks}
							endDocumentElementId={element.endDocumentElementId}
						/>
					</Island>
				</div>,
			];
		case 'model.dotcomrendering.pageElements.MapBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<MapEmbedBlockComponent
						format={format}
						embedUrl={element.embedUrl}
						height={element.height}
						width={element.width}
						caption={element.caption}
						credit={element.source}
						title={element.title}
						role={element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.MediaAtomBlockElement':
			return [
				true,
				<VideoAtom
					assets={element.assets}
					poster={element.posterImage?.[0]?.url}
				/>,
			];
		case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
			return [
				true,
				<MultiImageBlockComponent
					format={format}
					key={index}
					images={element.images}
					caption={element.caption}
				/>,
			];
		case 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement':
			return [
				true,
				<EmailSignup
					identityName={element.newsletter.identityName}
					description={element.newsletter.description}
					name={element.newsletter.name}
					frequency={element.newsletter.frequency}
					successDescription={element.newsletter.successDescription}
					theme={element.newsletter.theme}
				/>,
			];
		case 'model.dotcomrendering.pageElements.NumberedTitleBlockElement':
			return [
				true,
				<NumberedTitleBlockComponent
					position={element.position}
					html={element.html}
					format={element.format}
				/>,
			];
		case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<ProfileAtomWrapper
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
						pillar={format.theme}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
			return [
				true,
				<PullQuoteBlockComponent
					key={index}
					html={element.html}
					palette={palette}
					design={format.design}
					attribution={element.attribution}
					role={element.role}
				/>,
			];
		case 'model.dotcomrendering.pageElements.QABlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<QandaAtomWrapper
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
						pillar={format.theme}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.QuizAtomBlockElement':
			return [
				true,
				<>
					{element.quizType === 'personality' && (
						<Island>
							<PersonalityQuizAtomWrapper
								id={element.id}
								questions={element.questions}
								resultBuckets={element.resultBuckets}
								sharingUrls={getSharingUrls(pageId, webTitle)}
								theme={format.theme}
							/>
						</Island>
					)}
					{element.quizType === 'knowledge' && (
						<Island>
							<KnowledgeQuizAtomWrapper
								id={element.id}
								questions={element.questions}
								resultGroups={element.resultGroups}
								sharingUrls={getSharingUrls(pageId, webTitle)}
								theme={format.theme}
							/>
						</Island>
					)}
				</>,
			];
		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			return [
				true,
				<Island deferUntil="idle">
					<RichLinkComponent
						richLinkIndex={index}
						element={element}
						ajaxUrl={ajaxUrl}
						format={format}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
			return [true, <SoundcloudBlockComponent element={element} />];
		case 'model.dotcomrendering.pageElements.SpotifyBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<SpotifyBlockComponent
						embedUrl={element.embedUrl}
						height={element.height}
						width={element.width}
						title={element.title}
						format={format}
						caption={element.caption}
						credit="Spotify"
						role={element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.StarRatingBlockElement':
			return [
				true,
				<StarRatingBlockComponent
					key={index}
					rating={element.rating}
					size={element.size}
				/>,
			];
		case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
			return [
				true,
				<SubheadingBlockComponent key={index} html={element.html} />,
			];
		case 'model.dotcomrendering.pageElements.TableBlockElement':
			return [true, <TableBlockComponent element={element} />];

		case 'model.dotcomrendering.pageElements.TextBlockElement':
			return [
				true,
				<TextBlockComponent
					key={index}
					isFirstParagraph={index === 0}
					html={element.html}
					format={format}
					forceDropCap={element.dropCap}
				/>,
			];
		case 'model.dotcomrendering.pageElements.TimelineBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<TimelineAtomWrapper
						id={element.id}
						title={element.title}
						pillar={format.theme}
						events={element.events}
						description={element.description}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.TweetBlockElement':
			if (switches.enhanceTweets) {
				return [
					true,
					<Island deferUntil="visible">
						<TweetBlockComponent element={element} />
					</Island>,
				];
			}
			return [true, <TweetBlockComponent element={element} />];
		case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<VideoFacebookBlockComponent
						role={element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
						format={format}
						embedUrl={element.embedUrl}
						height={element.height}
						width={element.width}
						caption={element.caption}
						credit={element.caption}
						title={element.caption}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
			return [
				true,
				<VimeoBlockComponent
					format={format}
					embedUrl={element.embedUrl}
					height={element.height}
					width={element.width}
					caption={element.caption}
					credit={element.credit}
					title={element.title}
					isMainMedia={isMainMedia}
				/>,
			];
		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return [
				true,
				<YoutubeEmbedBlockComponent
					format={format}
					embedUrl={element.embedUrl}
					height={element.height}
					width={element.width}
					caption={element.caption}
					credit={element.credit}
					title={element.title}
					isMainMedia={isMainMedia}
				/>,
			];
		case 'model.dotcomrendering.pageElements.VineBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<VineBlockComponent
						element={element}
						// No role given by CAPI

						role="inline"
						isTracking={element.isThirdPartyTracking}
						source={element.source}
						sourceDomain={element.sourceDomain}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.WitnessBlockElement': {
			const witnessType = element.witnessTypeData._type;
			switch (witnessType) {
				case 'model.dotcomrendering.pageElements.WitnessTypeDataImage':
					const witnessTypeDataImage = element.witnessTypeData;
					return [
						true,
						<WitnessImageBlockComponent
							assets={element.assets}
							caption={witnessTypeDataImage.caption}
							title={witnessTypeDataImage.title}
							authorName={witnessTypeDataImage.authorName}
							dateCreated={witnessTypeDataImage.dateCreated}
							alt={witnessTypeDataImage.alt}
							palette={palette}
						/>,
					];
				case 'model.dotcomrendering.pageElements.WitnessTypeDataVideo':
					const witnessTypeDataVideo = element.witnessTypeData;
					return [
						true,
						<WitnessVideoBlockComponent
							title={witnessTypeDataVideo.title}
							description={witnessTypeDataVideo.description}
							authorName={witnessTypeDataVideo.authorName}
							youtubeHtml={witnessTypeDataVideo.youtubeHtml}
							dateCreated={witnessTypeDataVideo.dateCreated}
							palette={palette}
						/>,
					];
				case 'model.dotcomrendering.pageElements.WitnessTypeDataText':
					const witnessTypeDataText = element.witnessTypeData;
					return [
						true,
						<WitnessTextBlockComponent
							title={witnessTypeDataText.title}
							description={witnessTypeDataText.description}
							authorName={witnessTypeDataText.authorName}
							dateCreated={witnessTypeDataText.dateCreated}
							palette={palette}
						/>,
					];
				default:
					return [false, <></>];
			}
		}
		case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
			return [
				true,
				<Island>
					<YoutubeBlockComponent
						format={format}
						key={index}
						hideCaption={hideCaption}
						role="inline"
						adTargeting={adTargeting}
						isMainMedia={isMainMedia}
						id={element.id}
						elementId={element.elementId}
						assetId={element.assetId}
						expired={element.expired}
						overrideImage={element.overrideImage}
						posterImage={element.posterImage}
						duration={element.duration}
						mediaTitle={element.mediaTitle}
						altText={element.altText}
						origin={host}
						stickyVideos={!!(isBlog && switches.stickyVideos)}
					/>
				</Island>,
			];
		case 'model.dotcomrendering.pageElements.AudioBlockElement':
		case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
		case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
		case 'model.dotcomrendering.pageElements.VideoBlockElement':
		default:
			return [false, <></>];
	}
};

// bareElements is the set of element types that don't get wrapped in a Figure
// for most article types, either because they don't need it or because they
// add the figure themselves.
const bareElements = new Set([
	'model.dotcomrendering.pageElements.BlockquoteBlockElement',
	'model.dotcomrendering.pageElements.CaptionBlockElement',
	'model.dotcomrendering.pageElements.CodeBlockElement',
	'model.dotcomrendering.pageElements.DividerBlockElement',
	'model.dotcomrendering.pageElements.MediaAtomBlockElement',
	'model.dotcomrendering.pageElements.PullquoteBlockElement',
	'model.dotcomrendering.pageElements.StarRatingBlockElement',
	'model.dotcomrendering.pageElements.SubheadingBlockElement',
	'model.dotcomrendering.pageElements.TextBlockElement',
	'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
	'model.dotcomrendering.pageElements.InteractiveBlockElement',
]);

// RenderArticleElement is a wrapper for renderElement that wraps elements in a
// Figure and adds metadata and (role-) styling appropriate for most article
// types.
export const RenderArticleElement = ({
	format,
	element,
	adTargeting,
	ajaxUrl,
	host,
	index,
	hideCaption,
	isMainMedia,
	starRating,
	pageId,
	webTitle,
	isAdFreeUser,
	isSensitive,
	switches,
	isPinnedPost,
	isMainMediaTest,
}: Props) => {
	const withUpdatedRole = updateRole(element, format);

	const [ok, el] = renderElement({
		format,
		element: withUpdatedRole,
		adTargeting,
		ajaxUrl,
		host,
		index,
		isMainMedia,
		hideCaption,
		starRating,
		pageId,
		webTitle,
		isAdFreeUser,
		isSensitive,
		switches,
		isMainMediaTest,
		isPinnedPost,
	});

	if (!ok) {
		return <></>;
	}

	const needsFigure = !bareElements.has(element._type);
	const role = 'role' in element ? (element.role as RoleType) : undefined;

	return needsFigure ? (
		<Figure
			key={'elementId' in element ? element.elementId : index}
			isMainMedia={isMainMedia}
			id={'elementId' in element ? element.elementId : undefined}
			role={role}
			className={
				isInteractive(format.design)
					? interactiveLegacyFigureClasses(element._type, role)
					: ''
			}
			type={element._type}
			format={format}
		>
			{el}
		</Figure>
	) : (
		el
	);
};
