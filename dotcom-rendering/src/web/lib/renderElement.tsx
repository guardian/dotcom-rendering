import { BlockquoteBlockComponent } from '@root/src/web/components/BlockquoteBlockComponent';
import { CalloutBlockComponent } from '@root/src/web/components/CalloutBlockComponent';
import { CaptionBlockComponent } from '@root/src/web/components/CaptionBlockComponent';
import { CommentBlockComponent } from '@root/src/web/components/CommentBlockComponent';
import { CodeBlockComponent } from '@root/src/web/components/CodeBlockComponent';
import { RichLinkComponent } from '@root/src/web/components/RichLinkComponent.importable';
import { DocumentBlockComponent } from '@root/src/web/components/DocumentBlockComponent.importable';
import { DisclaimerBlockComponent } from '@root/src/web/components/DisclaimerBlockComponent';
import { DividerBlockComponent } from '@root/src/web/components/DividerBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '@root/src/web/components/UnsafeEmbedBlockComponent';
import { GuVideoBlockComponent } from '@root/src/web/components/GuVideoBlockComponent';
import { HighlightBlockComponent } from '@root/src/web/components/HighlightBlockComponent';
import { ImageBlockComponent } from '@root/src/web/components/ImageBlockComponent';
import { InstagramBlockComponent } from '@root/src/web/components/InstagramBlockComponent.importable';
import { InteractiveBlockComponent } from '@root/src/web/components/InteractiveBlockComponent';
import { ItemLinkBlockElement } from '@root/src/web/components/ItemLinkBlockElement';
import { InteractiveContentsBlockComponent } from '@root/src/web/components/InteractiveContentsBlockComponent';
import { MainMediaEmbedBlockComponent } from '@root/src/web/components/MainMediaEmbedBlockComponent';
import { NumberedTitleBlockComponent } from '@root/src/web/components/NumberedTitleBlockComponent';
import { MapEmbedBlockComponent } from '@root/src/web/components/MapEmbedBlockComponent.importable';
import { MultiImageBlockComponent } from '@root/src/web/components/MultiImageBlockComponent';
import { PullQuoteBlockComponent } from '@root/src/web/components/PullQuoteBlockComponent';
import { SoundcloudBlockComponent } from '@root/src/web/components/SoundcloudBlockComponent';
import { SpotifyBlockComponent } from '@root/src/web/components/SpotifyBlockComponent.importable';
import { StarRatingBlockComponent } from '@root/src/web/components/StarRatingBlockComponent';
import { SubheadingBlockComponent } from '@root/src/web/components/SubheadingBlockComponent';
import { TableBlockComponent } from '@root/src/web/components/TableBlockComponent';
import { TextBlockComponent } from '@root/src/web/components/TextBlockComponent';
import { TweetBlockComponent } from '@root/src/web/components/TweetBlockComponent';
import { VideoFacebookBlockComponent } from '@root/src/web/components/VideoFacebookBlockComponent.importable';
import { VimeoBlockComponent } from '@root/src/web/components/VimeoBlockComponent';
import { VineBlockComponent } from '@root/src/web/components/VineBlockComponent.importable';
import { YoutubeEmbedBlockComponent } from '@root/src/web/components/YoutubeEmbedBlockComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/YoutubeBlockComponent';

import { TimelineAtomWrapper } from '@root/src/web/components/TimelineAtomWrapper.importable';
import { GuideAtomWrapper } from '@root/src/web/components/GuideAtomWrapper.importable';
import { ChartAtomWrapper } from '@root/src/web/components/ChartAtomWrapper.importable';
import { ProfileAtomWrapper } from '@root/src/web/components/ProfileAtomWrapper.importable';
import { QandaAtomWrapper } from '@root/src/web/components/QandaAtomWrapper.importable';

import {
	WitnessVideoBlockComponent,
	WitnessImageBlockComponent,
	WitnessTextBlockComponent,
} from '@root/src/web/components/WitnessBlockComponent';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { ClickToView } from '@root/src/web/components/ClickToView';
import {
	AudioAtom,
	ExplainerAtom,
	InteractiveAtom,
	InteractiveLayoutAtom,
	VideoAtom,
	PersonalityQuizAtom,
	KnowledgeQuizAtom,
} from '@guardian/atoms-rendering';
import { ArticleDesign, ArticleFormat } from '@guardian/libs';
import { Figure } from '../components/Figure';
import {
	isInteractive,
	interactiveLegacyFigureClasses,
} from '../layouts/lib/interactiveLegacyStyling';

import { Island } from '../components/Island';

type Props = {
	format: ArticleFormat;
	palette: Palette;
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
};

// updateRole modifies the role of an element in a way appropriate for most
// article types.
const updateRole = (el: CAPIElement, format: ArticleFormat): CAPIElement => {
	const isLiveBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	switch (el._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			if (isLiveBlog && el.role !== 'thumbnail') {
				el.role = 'inline';
			}

			return el;
		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			if (isLiveBlog) {
				el.role = 'inline';
			} else {
				el.role = 'richLink';
			}

			return el;
		default:
			if (isLiveBlog && 'role' in el) {
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
	palette,
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
}: Props): [boolean, JSX.Element] => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
			return [
				true,
				<AudioAtom
					id={element.id}
					trackUrl={element.trackUrl}
					kicker={element.kicker}
					title={element.title}
					duration={element.duration}
					pillar={format.theme}
				/>,
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
					palette={palette}
					captionText={element.captionText}
					padCaption={element.padCaption}
					credit={element.credit}
					displayCredit={element.displayCredit}
					shouldLimitWidth={element.shouldLimitWidth}
					isOverlayed={element.isOverlayed}
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
					<ClickToView
						role={element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<UnsafeEmbedBlockComponent
							key={index}
							html={element.html}
							alt={element.alt || ''}
							index={index}
						/>
					</ClickToView>,
				];
			}
			return [
				true,
				<ClickToView
					role={element.role}
					isTracking={element.isThirdPartyTracking}
					isMainMedia={isMainMedia}
					source={element.source}
					sourceDomain={element.sourceDomain}
				>
					<EmbedBlockComponent
						key={index}
						html={element.html}
						caption={element.caption}
					/>
				</ClickToView>,
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
					palette={palette}
					credit={element.source}
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
					palette={palette}
					key={index}
					element={element}
					hideCaption={hideCaption}
					isMainMedia={isMainMedia}
					starRating={starRating || element.starRating}
					title={element.title}
					isAvatar={element.isAvatar}
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
			if (format.design === ArticleDesign.Interactive) {
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
				<InteractiveBlockComponent
					url={element.url}
					scriptUrl={element.scriptUrl}
					alt={element.alt}
					role={element.role}
					format={format}
					elementId={element.elementId}
				/>,
			];
		case 'model.dotcomrendering.pageElements.ItemLinkBlockElement':
			return [true, <ItemLinkBlockElement html={element.html} />];
		case 'model.dotcomrendering.pageElements.InteractiveContentsBlockElement':
			return [
				true,
				<div id={element.elementId}>
					<InteractiveContentsBlockComponent
						subheadingLinks={element.subheadingLinks}
						endDocumentElementId={element.endDocumentElementId}
					/>
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
					poster={element.posterImage && element.posterImage[0].url}
				/>,
			];
		case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
			return [
				true,
				<MultiImageBlockComponent
					format={format}
					palette={palette}
					key={index}
					images={element.images}
					caption={element.caption}
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
						<Island deferUntil="visible">
							<PersonalityQuizAtom
								id={element.id}
								questions={element.questions}
								resultBuckets={element.resultBuckets}
								sharingUrls={getSharingUrls(pageId, webTitle)}
								theme={format.theme}
							/>
						</Island>
					)}
					{element.quizType === 'knowledge' && (
						<Island deferUntil="visible">
							<KnowledgeQuizAtom
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
				<>
					<TextBlockComponent
						key={index}
						isFirstParagraph={index === 0}
						html={element.html}
						format={format}
						forceDropCap={element.dropCap}
					/>
				</>,
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
					palette={palette}
					embedUrl={element.embedUrl}
					height={element.height}
					width={element.width}
					caption={element.caption}
					credit={element.credit}
					title={element.title}
				/>,
			];
		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return [
				true,
				<YoutubeEmbedBlockComponent
					format={format}
					palette={palette}
					embedUrl={element.embedUrl}
					height={element.height}
					width={element.width}
					caption={element.caption}
					credit={element.credit}
					title={element.title}
				/>,
			];
		case 'model.dotcomrendering.pageElements.VineBlockElement':
			return [
				true,
				<Island deferUntil="visible">
					<VineBlockComponent
						element={element}
						// No role given by CAPI
						// eslint-disable-next-line jsx-a11y/aria-role
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
				<YoutubeBlockComponent
					format={format}
					key={index}
					hideCaption={hideCaption}
					// eslint-disable-next-line jsx-a11y/aria-role
					role="inline"
					adTargeting={adTargeting}
					isMainMedia={isMainMedia}
					id={element.id}
					assetId={element.assetId}
					expired={element.expired}
					overrideImage={element.overrideImage}
					posterImage={element.posterImage}
					duration={element.duration}
					mediaTitle={element.mediaTitle}
					altText={element.altText}
					origin={host}
				/>,
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
// We might assume that InteractiveBlockElement should be included in this list,
// however we can't do this while we maintain the current component abstraction.
// If no outer figure, then HydrateOnce uses the component's figure as the root
// for hydration. For InteractiveBlockElements, the result is that the state that
// determines height is never updated leaving an empty placeholder space in the
// article even after the interactive content has loaded.
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
]);

// renderArticleElement is a wrapper for renderElement that wraps elements in a
// Figure and adds metadata and (role-) styling appropriate for most article
// types.
export const renderArticleElement = ({
	format,
	palette,
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
}: Props): JSX.Element => {
	const withUpdatedRole = updateRole(element, format);

	const [ok, el] = renderElement({
		format,
		palette,
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
	});

	if (!ok) {
		return <></>;
	}

	const needsFigure = !bareElements.has(element._type);
	const role = 'role' in element ? (element.role as RoleType) : undefined;

	return needsFigure ? (
		<Figure
			isMainMedia={isMainMedia}
			id={'elementId' in element ? element.elementId : undefined}
			role={role}
			className={
				isInteractive(format.design)
					? interactiveLegacyFigureClasses(element._type, role)
					: ''
			}
		>
			{el}
		</Figure>
	) : (
		el
	);
};
