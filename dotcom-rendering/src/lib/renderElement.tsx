import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { AdPlaceholder } from '../components/AdPlaceholder.apps';
import { AudioAtomWrapper } from '../components/AudioAtomWrapper.importable';
import { BlockquoteBlockComponent } from '../components/BlockquoteBlockComponent';
import { CalloutBlockComponent } from '../components/CalloutBlockComponent.importable';
import { CalloutEmbedBlockComponent } from '../components/CalloutEmbedBlockComponent.importable';
import { CaptionBlockComponent } from '../components/CaptionBlockComponent';
import { CartoonComponent } from '../components/CartoonComponent';
import { ChartAtom } from '../components/ChartAtom.importable';
import { CodeBlockComponent } from '../components/CodeBlockComponent';
import { CommentBlockComponent } from '../components/CommentBlockComponent';
import { DividerBlockComponent } from '../components/DividerBlockComponent';
import { DocumentBlockComponent } from '../components/DocumentBlockComponent.importable';
import { EmailSignUpWrapper } from '../components/EmailSignUpWrapper';
import { EmbedBlockComponent } from '../components/EmbedBlockComponent.importable';
import { ExplainerAtom } from '../components/ExplainerAtom';
import { Figure } from '../components/Figure';
import { GuideAtomWrapper } from '../components/GuideAtomWrapper.importable';
import { GuVideoBlockComponent } from '../components/GuVideoBlockComponent';
import { HighlightBlockComponent } from '../components/HighlightBlockComponent';
import { ImageBlockComponent } from '../components/ImageBlockComponent';
import { InstagramBlockComponent } from '../components/InstagramBlockComponent.importable';
import { InteractiveAtom } from '../components/InteractiveAtom';
import { InteractiveBlockComponent } from '../components/InteractiveBlockComponent.importable';
import { InteractiveContentsBlockComponent } from '../components/InteractiveContentsBlockComponent.importable';
import { InteractiveLayoutAtom } from '../components/InteractiveLayoutAtom';
import { Island } from '../components/Island';
import { ItemLinkBlockElement } from '../components/ItemLinkBlockElement';
import { KnowledgeQuizAtom } from '../components/KnowledgeQuizAtom.importable';
import { MainMediaEmbedBlockComponent } from '../components/MainMediaEmbedBlockComponent';
import { MapEmbedBlockComponent } from '../components/MapEmbedBlockComponent.importable';
import { MultiImageBlockComponent } from '../components/MultiImageBlockComponent';
import { NumberedTitleBlockComponent } from '../components/NumberedTitleBlockComponent';
import { PersonalityQuizAtom } from '../components/PersonalityQuizAtom.importable';
import { ProfileAtomWrapper } from '../components/ProfileAtomWrapper.importable';
import { PullQuoteBlockComponent } from '../components/PullQuoteBlockComponent';
import { QandaAtom } from '../components/QandaAtom.importable';
import { RichLinkComponent } from '../components/RichLinkComponent.importable';
import { SoundcloudBlockComponent } from '../components/SoundcloudBlockComponent';
import { SpotifyBlockComponent } from '../components/SpotifyBlockComponent.importable';
import { StarRatingBlockComponent } from '../components/StarRatingBlockComponent';
import { SubheadingBlockComponent } from '../components/SubheadingBlockComponent';
import { TableBlockComponent } from '../components/TableBlockComponent';
import { TextBlockComponent } from '../components/TextBlockComponent';
import { TimelineAtom } from '../components/TimelineAtom.importable';
import { TweetBlockComponent } from '../components/TweetBlockComponent.importable';
import { UnsafeEmbedBlockComponent } from '../components/UnsafeEmbedBlockComponent.importable';
import { VideoAtom } from '../components/VideoAtom';
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
import { getSharingUrls } from '../lib/sharing-urls';
import type { ServerSideTests, Switches } from '../types/config';
import type { FEElement, RoleType } from '../types/content';
import type { EditionId } from './edition';

type Props = {
	format: ArticleFormat;
	element: FEElement;
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
	abTests: ServerSideTests;
	editionId: EditionId;
};

// updateRole modifies the role of an element in a way appropriate for most
// article types.
const updateRole = (el: FEElement, format: ArticleFormat): FEElement => {
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

// renderElement converts a Frontend element to JSX. A boolean 'ok' flag is returned
// along with the element to indicate if the element is null, in which case
// callers can e.g. avoid further work/wrapping as required. Unfortunately,
// there is no straightforward way to tell if a React element is null by direct
// inspection.
export const renderElement = ({
	format,
	element,
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
	editionId,
}: Props) => {
	const isBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	const isInLightboxTest = abTests.lightboxVariant === 'variant';

	switch (element._type) {
		case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
			return (
				<Island priority="critical" defer={{ until: 'visible' }}>
					<AudioAtomWrapper
						id={element.id}
						trackUrl={element.trackUrl}
						kicker={element.kicker}
						title={element.title}
						duration={element.duration}
						format={format}
						contentIsNotSensitive={!isSensitive}
						aCastisEnabled={!!switches.acast}
						readerCanBeShownAds={!isAdFreeUser}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
			return (
				<BlockquoteBlockComponent
					key={index}
					html={element.html}
					quoted={element.quoted}
				/>
			);

		case 'model.dotcomrendering.pageElements.CalloutBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<CalloutEmbedBlockComponent
						callout={element}
						format={format}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.CalloutBlockElementV2':
			if (switches.callouts) {
				return (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<CalloutBlockComponent
							callout={element}
							pageId={pageId}
						/>
					</Island>
				);
			}
			return null;

		case 'model.dotcomrendering.pageElements.CaptionBlockElement':
			return (
				<CaptionBlockComponent
					key={index}
					format={format}
					captionText={element.captionText}
					padCaption={element.padCaption}
					credit={element.credit}
					displayCredit={element.displayCredit}
					shouldLimitWidth={element.shouldLimitWidth}
					isOverlaid={element.isOverlaid}
				/>
			);
		case 'model.dotcomrendering.pageElements.CartoonBlockElement':
			return (
				<CartoonComponent
					format={format}
					element={element}
					switches={switches}
				/>
			);
		case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ChartAtom
						id={element.id}
						html={element.html}
						title={element.title}
					/>
				</Island>
			);

		case 'model.dotcomrendering.pageElements.CodeBlockElement':
			return (
				<CodeBlockComponent
					code={element.html}
					language={element.language}
				/>
			);
		case 'model.dotcomrendering.pageElements.CommentBlockElement':
			return (
				<CommentBlockComponent
					body={element.body}
					avatarURL={element.avatarURL}
					profileURL={element.profileURL}
					profileName={element.profileName}
					dateTime={element.dateTime}
					permalink={element.permalink}
				/>
			);
		case 'model.dotcomrendering.pageElements.DividerBlockElement':
			return (
				<DividerBlockComponent
					size={element.size}
					spaceAbove={element.spaceAbove}
				/>
			);
		case 'model.dotcomrendering.pageElements.DocumentBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
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
				</Island>
			);
		case 'model.dotcomrendering.pageElements.EmbedBlockElement':
			if (!element.safe) {
				if (isMainMedia) {
					return (
						<MainMediaEmbedBlockComponent
							title={element.alt ?? ''}
							srcDoc={element.html}
						/>
					);
				}

				return (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<UnsafeEmbedBlockComponent
							key={index}
							html={element.html}
							alt={element.alt ?? ''}
							index={index}
							role={element.role}
							isTracking={element.isThirdPartyTracking}
							isMainMedia={isMainMedia}
							source={element.source}
							sourceDomain={element.sourceDomain}
							isPinnedPost={isPinnedPost}
						/>
					</Island>
				);
			}
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
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
				</Island>
			);
		case 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement':
			return (
				<ExplainerAtom
					key={index}
					id={element.id}
					title={element.title}
					html={element.body}
				/>
			);
		case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<GuideAtomWrapper
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
			return (
				<GuVideoBlockComponent
					html={element.html}
					format={format}
					credit={element.source}
					isMainMedia={isMainMedia}
					caption={element.caption}
				/>
			);
		case 'model.dotcomrendering.pageElements.HighlightBlockElement':
			return <HighlightBlockComponent key={index} html={element.html} />;
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return (
				<ImageBlockComponent
					format={format}
					key={index}
					element={element}
					hideCaption={hideCaption}
					isMainMedia={isMainMedia}
					starRating={starRating ?? element.starRating}
					title={element.title}
					isAvatar={element.isAvatar}
					isInLightboxTest={isInLightboxTest}
				/>
			);
		case 'model.dotcomrendering.pageElements.InstagramBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<InstagramBlockComponent
						key={index}
						element={element}
						index={index}
						isMainMedia={isMainMedia}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
			if (
				format.design === ArticleDesign.Interactive ||
				format.design === ArticleDesign.FullPageInteractive
			) {
				return (
					<InteractiveLayoutAtom
						id={element.id}
						elementHtml={element.html}
						elementJs={element.js}
						elementCss={element.css}
					/>
				);
			}
			return (
				<InteractiveAtom
					isMainMedia={isMainMedia}
					id={element.id}
					elementHtml={element.html}
					elementJs={element.js}
					elementCss={element.css}
					format={format}
					title={element.title}
				/>
			);
		case 'model.dotcomrendering.pageElements.InteractiveBlockElement': {
			return (
				// Deferring interactives until CPU idle achieves the lowest Cumulative Layout Shift (CLS)
				// For more information on the experiment we ran see: https://github.com/guardian/dotcom-rendering/pull/4942
				<Island priority="critical" defer={{ until: 'visible' }}>
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
				</Island>
			);
		}
		case 'model.dotcomrendering.pageElements.ItemLinkBlockElement':
			return <ItemLinkBlockElement html={element.html} />;
		case 'model.dotcomrendering.pageElements.InteractiveContentsBlockElement':
			return (
				<div id={element.elementId}>
					<Island priority="critical" defer={{ until: 'visible' }}>
						<InteractiveContentsBlockComponent
							subheadingLinks={element.subheadingLinks}
							endDocumentElementId={element.endDocumentElementId}
						/>
					</Island>
				</div>
			);
		case 'model.dotcomrendering.pageElements.MapBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
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
				</Island>
			);
		case 'model.dotcomrendering.pageElements.MediaAtomBlockElement':
			return (
				<VideoAtom
					assets={element.assets}
					poster={element.posterImage?.[0]?.url}
				/>
			);
		case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
			return (
				<MultiImageBlockComponent
					format={format}
					key={index}
					images={element.images}
					caption={element.caption}
					isInLightboxTest={isInLightboxTest}
				/>
			);
		case 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement':
			const emailSignUpProps = {
				index,
				identityName: element.newsletter.identityName,
				description: element.newsletter.description,
				name: element.newsletter.name,
				frequency: element.newsletter.frequency,
				successDescription: element.newsletter.successDescription,
				theme: element.newsletter.theme,
			};

			return <EmailSignUpWrapper {...emailSignUpProps} />;
		case 'model.dotcomrendering.pageElements.AdPlaceholderBlockElement':
			return <AdPlaceholder />;
		case 'model.dotcomrendering.pageElements.NumberedTitleBlockElement':
			return (
				<NumberedTitleBlockComponent
					position={element.position}
					html={element.html}
					format={format}
				/>
			);
		case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ProfileAtomWrapper
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
			return (
				<PullQuoteBlockComponent
					key={index}
					html={element.html}
					format={format}
					attribution={element.attribution}
					role={element.role}
				/>
			);
		case 'model.dotcomrendering.pageElements.QABlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<QandaAtom
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.QuizAtomBlockElement':
			return (
				<>
					{element.quizType === 'personality' && (
						<Island
							priority="critical"
							defer={{ until: 'visible' }}
						>
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
						<Island
							priority="critical"
							defer={{ until: 'visible' }}
						>
							<KnowledgeQuizAtom
								id={element.id}
								questions={element.questions}
								resultGroups={element.resultGroups}
								sharingUrls={getSharingUrls(pageId, webTitle)}
								theme={format.theme}
							/>
						</Island>
					)}
				</>
			);
		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'idle' }}>
					<RichLinkComponent
						richLinkIndex={index}
						element={element}
						ajaxUrl={ajaxUrl}
						format={format}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
			return <SoundcloudBlockComponent element={element} />;
		case 'model.dotcomrendering.pageElements.SpotifyBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
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
				</Island>
			);
		case 'model.dotcomrendering.pageElements.StarRatingBlockElement':
			return (
				<StarRatingBlockComponent
					key={index}
					rating={element.rating}
					size={element.size}
				/>
			);
		case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
			return <SubheadingBlockComponent key={index} html={element.html} />;
		case 'model.dotcomrendering.pageElements.TableBlockElement':
			return <TableBlockComponent element={element} />;

		case 'model.dotcomrendering.pageElements.TextBlockElement':
			return (
				<TextBlockComponent
					key={index}
					isFirstParagraph={index === 0}
					html={element.html}
					format={format}
					forceDropCap={element.dropCap}
				/>
			);
		case 'model.dotcomrendering.pageElements.TimelineBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<TimelineAtom
						id={element.id}
						title={element.title}
						events={element.events}
						description={element.description}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.TweetBlockElement':
			if (switches.enhanceTweets) {
				return (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<TweetBlockComponent element={element} />
					</Island>
				);
			}
			return <TweetBlockComponent element={element} />;
		case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
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
				</Island>
			);
		case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
			return (
				<VimeoBlockComponent
					format={format}
					embedUrl={element.embedUrl}
					height={element.height}
					width={element.width}
					caption={element.caption}
					credit={element.credit}
					title={element.title}
					isMainMedia={isMainMedia}
				/>
			);
		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return (
				<YoutubeEmbedBlockComponent
					format={format}
					embedUrl={element.embedUrl}
					height={element.height}
					width={element.width}
					caption={element.caption}
					credit={element.credit}
					title={element.title}
					isMainMedia={isMainMedia}
				/>
			);
		case 'model.dotcomrendering.pageElements.VineBlockElement':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<VineBlockComponent
						element={element}
						// No role given by CAPI

						role="inline"
						isTracking={element.isThirdPartyTracking}
						source={element.source}
						sourceDomain={element.sourceDomain}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.WitnessBlockElement': {
			const witnessType = element.witnessTypeData._type;
			switch (witnessType) {
				case 'model.dotcomrendering.pageElements.WitnessTypeDataImage': {
					const { caption, title, authorName, dateCreated, alt } =
						element.witnessTypeData;
					return (
						<WitnessImageBlockComponent
							assets={element.assets}
							caption={caption}
							title={title}
							authorName={authorName}
							dateCreated={dateCreated}
							alt={alt}
							editionId={editionId}
						/>
					);
				}
				case 'model.dotcomrendering.pageElements.WitnessTypeDataVideo': {
					const {
						title,
						description,
						authorName,
						youtubeHtml,
						dateCreated,
					} = element.witnessTypeData;
					return (
						<WitnessVideoBlockComponent
							title={title}
							description={description}
							authorName={authorName}
							youtubeHtml={youtubeHtml}
							dateCreated={dateCreated}
							editionId={editionId}
						/>
					);
				}
				case 'model.dotcomrendering.pageElements.WitnessTypeDataText': {
					const witnessTypeDataText = element.witnessTypeData;
					return (
						<WitnessTextBlockComponent
							title={witnessTypeDataText.title}
							description={witnessTypeDataText.description}
							authorName={witnessTypeDataText.authorName}
							dateCreated={witnessTypeDataText.dateCreated}
							editionId={editionId}
						/>
					);
				}
				default:
					return <></>;
			}
		}
		case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
			return (
				<Island priority="critical" defer={{ until: 'visible' }}>
					<YoutubeBlockComponent
						format={format}
						key={index}
						hideCaption={hideCaption}
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
						stickyVideos={!!(isBlog && switches.stickyVideos)}
					/>
				</Island>
			);
		case 'model.dotcomrendering.pageElements.AudioBlockElement':
		case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
		case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
		case 'model.dotcomrendering.pageElements.VideoBlockElement':
		case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
		default:
			return <></>;
	}
};

// bareElements is the set of element types that don't get wrapped in a Figure
// for most article types, either because they don't need it or because they
// add the figure themselves.
const bareElements = new Set<FEElement['_type']>([
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
	abTests,
	editionId,
}: Props) => {
	const withUpdatedRole = updateRole(element, format);

	const el = renderElement({
		format,
		element: withUpdatedRole,
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
		isPinnedPost,
		abTests,
		editionId,
	});

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
