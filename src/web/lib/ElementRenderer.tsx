import React from 'react';

import { BlockquoteBlockComponent } from '@root/src/web/components/elements/BlockquoteBlockComponent';
import { CalloutBlockComponent } from '@root/src/web/components/elements/CalloutBlockComponent';
import { CaptionBlockComponent } from '@root/src/web/components/elements/CaptionBlockComponent';
import { CommentBlockComponent } from '@root/src/web/components/elements/CommentBlockComponent';
import { CodeBlockComponent } from '@root/src/web/components/elements/CodeBlockComponent';
import { DefaultRichLink } from '@root/src/web/components/DefaultRichLink';
import { DocumentBlockComponent } from '@root/src/web/components/elements/DocumentBlockComponent';
import { DisclaimerBlockComponent } from '@root/src/web/components/elements/DisclaimerBlockComponent';
import { DividerBlockComponent } from '@root/src/web/components/elements/DividerBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/elements/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '@root/src/web/components/elements/UnsafeEmbedBlockComponent';
import { GuVideoBlockComponent } from '@root/src/web/components/elements/GuVideoBlockComponent';
import { HighlightBlockComponent } from '@root/src/web/components/elements/HighlightBlockComponent';
import { ImageBlockComponent } from '@root/src/web/components/elements/ImageBlockComponent';
import { InstagramBlockComponent } from '@root/src/web/components/elements/InstagramBlockComponent';
import { InteractiveBlockComponent } from '@root/src/web/components/elements/InteractiveBlockComponent';
import { ItemLinkBlockElement } from '@root/src/web/components/elements/ItemLinkBlockElement';
import { MainMediaEmbedBlockComponent } from '@root/src/web/components/elements/MainMediaEmbedBlockComponent';
import { NumberedTitleBlockComponent } from '@root/src/web/components/elements/NumberedTitleBlockComponent';
import { MapEmbedBlockComponent } from '@root/src/web/components/elements/MapEmbedBlockComponent';
import { MultiImageBlockComponent } from '@root/src/web/components/elements/MultiImageBlockComponent';
import { PullQuoteBlockComponent } from '@root/src/web/components/elements/PullQuoteBlockComponent';
import { SoundcloudBlockComponent } from '@root/src/web/components/elements/SoundcloudBlockComponent';
import { SpotifyBlockComponent } from '@root/src/web/components/elements/SpotifyBlockComponent';
import { StarRatingBlockComponent } from '@root/src/web/components/elements/StarRatingBlockComponent';
import { SubheadingBlockComponent } from '@root/src/web/components/elements/SubheadingBlockComponent';
import { TableBlockComponent } from '@root/src/web/components/elements/TableBlockComponent';
import { TextBlockComponent } from '@root/src/web/components/elements/TextBlockComponent';
import { TweetBlockComponent } from '@root/src/web/components/elements/TweetBlockComponent';
import { VideoFacebookBlockComponent } from '@root/src/web/components/elements/VideoFacebookBlockComponent';
import { VimeoBlockComponent } from '@root/src/web/components/elements/VimeoBlockComponent';
import { VineBlockComponent } from '@root/src/web/components/elements/VineBlockComponent';
import { YoutubeEmbedBlockComponent } from '@root/src/web/components/elements/YoutubeEmbedBlockComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/elements/YoutubeBlockComponent';
import {
	WitnessVideoBlockComponent,
	WitnessImageBlockComponent,
	WitnessTextBlockComponent,
} from '@root/src/web/components/elements/WitnessBlockComponent';
import { ClickToView } from '@root/src/web/components/ClickToView';
import { Figure } from '@root/src/web/components/Figure';

import {
	AudioAtom,
	ChartAtom,
	ExplainerAtom,
	InteractiveAtom,
	QandaAtom,
	GuideAtom,
	ProfileAtom,
	TimelineAtom,
	VideoAtom,
	PersonalityQuizAtom,
	KnowledgeQuizAtom,
} from '@guardian/atoms-rendering';
import { Design } from '@guardian/types';

type Props = {
	format: Format;
	palette: Palette;
	element: CAPIElement;
	adTargeting?: AdTargeting;
	host?: string;
	index: number;
	isMainMedia: boolean;
	hideCaption?: boolean;
	starRating?: number;
};

function decideImageRole(role: RoleType, isLiveBlog: boolean): RoleType {
	switch (role) {
		case 'inline':
		case 'thumbnail':
			return role;
		default:
			return isLiveBlog ? 'inline' : role;
	}
}

export const ElementRenderer = ({
	format,
	palette,
	element,
	adTargeting,
	host,
	index,
	hideCaption,
	isMainMedia,
	starRating,
}: Props) => {
	const isLiveBlog =
		format.design === Design.LiveBlog || format.design === Design.DeadBlog;

	switch (element._type) {
		case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					id={element.elementId}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<AudioAtom
						id={element.id}
						trackUrl={element.trackUrl}
						kicker={element.kicker}
						title={element.title}
						pillar={format.theme}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
			return (
				<BlockquoteBlockComponent
					key={index}
					html={element.html}
					palette={palette}
					quoted={element.quoted}
				/>
			);
		case 'model.dotcomrendering.pageElements.CalloutBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					id={element.elementId}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<CalloutBlockComponent
						callout={element}
						palette={palette}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.CaptionBlockElement':
			return (
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
				/>
			);
		case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<ChartAtom id={element.id} html={element.html} />
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.CodeBlockElement':
			return (
				<CodeBlockComponent
					code={element.code}
					language={element.language}
				/>
			);
		case 'model.dotcomrendering.pageElements.CommentBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<CommentBlockComponent
						body={element.body}
						avatarURL={element.avatarURL}
						profileURL={element.profileURL}
						profileName={element.profileName}
						dateTime={element.dateTime}
						permalink={element.permalink}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<DisclaimerBlockComponent html={element.html} />
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.DividerBlockElement':
			return <DividerBlockComponent size={element.size} />;
		case 'model.dotcomrendering.pageElements.DocumentBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<ClickToView
						role={isLiveBlog ? 'inline' : element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<DocumentBlockComponent
							embedUrl={element.embedUrl}
							height={element.height}
							width={element.width}
							title={element.title}
							source={element.source}
						/>
					</ClickToView>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.EmbedBlockElement':
			if (!element.safe) {
				if (isMainMedia) {
					return (
						<Figure
							isMainMedia={isMainMedia}
							role={element.role}
							id={element.elementId}
						>
							<MainMediaEmbedBlockComponent
								title={element.alt || ''}
								srcDoc={element.html}
							/>
						</Figure>
					);
				}

				return (
					<Figure
						isMainMedia={isMainMedia}
						role={isLiveBlog ? 'inline' : element.role}
						id={element.elementId}
					>
						<ClickToView
							role={isLiveBlog ? 'inline' : element.role}
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
						</ClickToView>
					</Figure>
				);
			}
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<ClickToView
						role={isLiveBlog ? 'inline' : element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<EmbedBlockComponent
							key={index}
							html={element.html}
							alt={element.alt}
						/>
					</ClickToView>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<ExplainerAtom
						key={index}
						id={element.id}
						title={element.title}
						html={element.body}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					id={element.elementId}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<GuideAtom
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
						pillar={format.theme}
						likeHandler={() => {}}
						dislikeHandler={() => {}}
						expandCallback={() => {}}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<GuVideoBlockComponent
						html={element.html}
						format={format}
						palette={palette}
						credit={element.source}
						caption={element.caption}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.HighlightBlockElement':
			return <HighlightBlockComponent key={index} html={element.html} />;
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={decideImageRole(element.role, isLiveBlog)}
				>
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
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.InstagramBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<ClickToView
						role={isLiveBlog ? 'inline' : element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<InstagramBlockComponent
							key={index}
							element={element}
							index={index}
						/>
					</ClickToView>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<InteractiveAtom
						id={element.id}
						html={element.html}
						js={element.js}
						css={element.css}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.InteractiveBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<InteractiveBlockComponent
						url={element.url}
						scriptUrl={element.scriptUrl}
						alt={element.alt}
						role={element.role}
						format={format}
						palette={palette}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.ItemLinkBlockElement':
			return <ItemLinkBlockElement html={element.html} />;
		case 'model.dotcomrendering.pageElements.MapBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<ClickToView
						role={isLiveBlog ? 'inline' : element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<MapEmbedBlockComponent
							format={format}
							palette={palette}
							embedUrl={element.embedUrl}
							height={element.height}
							width={element.width}
							caption={element.caption}
							credit={element.source}
							title={element.title}
						/>
					</ClickToView>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.MediaAtomBlockElement':
			return (
				<VideoAtom
					assets={element.assets}
					poster={element.posterImage && element.posterImage[0].url}
				/>
			);
		case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<MultiImageBlockComponent
						format={format}
						palette={palette}
						key={index}
						images={element.images}
						caption={element.caption}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.NumberedTitleBlockElement':
			return (
				<Figure isMainMedia={isMainMedia} id={element.elementId}>
					<NumberedTitleBlockComponent
						position={element.position}
						html={element.html}
						format={element.format}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					id={element.elementId}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<ProfileAtom
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
						pillar={format.theme}
						likeHandler={() => {}}
						dislikeHandler={() => {}}
						expandCallback={() => {}}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
			return (
				<PullQuoteBlockComponent
					key={index}
					html={element.html}
					palette={palette}
					design={format.design}
					attribution={element.attribution}
					role={isLiveBlog ? 'inline' : element.role}
				/>
			);
		case 'model.dotcomrendering.pageElements.QABlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					id={element.elementId}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<QandaAtom
						id={element.id}
						title={element.title}
						html={element.html}
						image={element.img}
						credit={element.credit}
						pillar={format.theme}
						likeHandler={() => {}}
						dislikeHandler={() => {}}
						expandCallback={() => {}}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.QuizAtomBlockElement':
			return (
				<Figure isMainMedia={isMainMedia} id={element.elementId}>
					<>
						{element.quizType === 'personality' && (
							<PersonalityQuizAtom
								id={element.id}
								questions={element.questions}
								resultBuckets={element.resultBuckets}
							/>
						)}
						{element.quizType === 'knowledge' && (
							<KnowledgeQuizAtom
								id={element.id}
								questions={element.questions}
							/>
						)}
					</>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			return (
				<Figure
					id={element.elementId}
					isMainMedia={isMainMedia}
					key={index}
					role={isLiveBlog ? 'inline' : 'richLink'}
				>
					<DefaultRichLink
						index={index}
						headlineText={element.text}
						url={element.url}
						isPlaceholder={true}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					key={index}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<SoundcloudBlockComponent element={element} />
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.SpotifyBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<ClickToView
						role={isLiveBlog ? 'inline' : element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<SpotifyBlockComponent
							embedUrl={element.embedUrl}
							height={element.height}
							width={element.width}
							title={element.title}
							format={format}
							palette={palette}
							caption={element.caption}
							credit="Spotify"
						/>
					</ClickToView>
				</Figure>
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
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<TableBlockComponent element={element} />
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.TextBlockElement':
			return (
				<>
					<TextBlockComponent
						key={index}
						isFirstParagraph={index === 0}
						html={element.html}
						format={format}
						forceDropCap={element.dropCap}
					/>
				</>
			);
		case 'model.dotcomrendering.pageElements.TimelineBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<TimelineAtom
						id={element.id}
						title={element.title}
						pillar={format.theme}
						events={element.events}
						likeHandler={() => {}}
						dislikeHandler={() => {}}
						expandCallback={() => {}}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.TweetBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					key={index}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<TweetBlockComponent element={element} />
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<ClickToView
						role={isLiveBlog ? 'inline' : element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={isMainMedia}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<VideoFacebookBlockComponent
							format={format}
							palette={palette}
							embedUrl={element.embedUrl}
							height={element.height}
							width={element.width}
							caption={element.caption}
							credit={element.caption}
							title={element.caption}
						/>
					</ClickToView>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<VimeoBlockComponent
						format={format}
						palette={palette}
						embedUrl={element.embedUrl}
						height={element.height}
						width={element.width}
						caption={element.caption}
						credit={element.credit}
						title={element.title}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
				>
					<YoutubeEmbedBlockComponent
						format={format}
						palette={palette}
						embedUrl={element.embedUrl}
						height={element.height}
						width={element.width}
						caption={element.caption}
						credit={element.credit}
						title={element.title}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.VineBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					// No role given by CAPI
					// eslint-disable-next-line jsx-a11y/aria-role
					role="inline"
					id={element.elementId}
				>
					<ClickToView
						// No role given by CAPI
						// eslint-disable-next-line jsx-a11y/aria-role
						role="inline"
						isTracking={element.isThirdPartyTracking}
						source={element.source}
						sourceDomain={element.sourceDomain}
					>
						<VineBlockComponent element={element} />
					</ClickToView>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.WitnessBlockElement': {
			const witnessType = element.witnessTypeData._type;
			switch (witnessType) {
				case 'model.dotcomrendering.pageElements.WitnessTypeDataImage':
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
					const witnessTypeDataImage = element.witnessTypeData as WitnessTypeDataImage;
					return (
						<Figure isMainMedia={isMainMedia}>
							<WitnessImageBlockComponent
								assets={element.assets}
								caption={witnessTypeDataImage.caption}
								title={witnessTypeDataImage.title}
								authorName={witnessTypeDataImage.authorName}
								dateCreated={witnessTypeDataImage.dateCreated}
								alt={witnessTypeDataImage.alt}
								palette={palette}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.WitnessTypeDataVideo':
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
					const witnessTypeDataVideo = element.witnessTypeData as WitnessTypeDataVideo;
					return (
						<Figure isMainMedia={isMainMedia}>
							<WitnessVideoBlockComponent
								title={witnessTypeDataVideo.title}
								description={witnessTypeDataVideo.description}
								authorName={witnessTypeDataVideo.authorName}
								youtubeHtml={witnessTypeDataVideo.youtubeHtml}
								dateCreated={witnessTypeDataVideo.dateCreated}
								palette={palette}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.WitnessTypeDataText':
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
					const witnessTypeDataText = element.witnessTypeData as WitnessTypeDataText;
					return (
						<Figure isMainMedia={isMainMedia}>
							<WitnessTextBlockComponent
								title={witnessTypeDataText.title}
								description={witnessTypeDataText.description}
								authorName={witnessTypeDataText.authorName}
								dateCreated={witnessTypeDataText.dateCreated}
								palette={palette}
							/>
						</Figure>
					);
				default:
					return null;
			}
		}
		case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
			return (
				<Figure
					isMainMedia={isMainMedia}
					role={isLiveBlog ? 'inline' : element.role}
					id={element.elementId}
				>
					<YoutubeBlockComponent
						format={format}
						palette={palette}
						key={index}
						hideCaption={hideCaption}
						// eslint-disable-next-line jsx-a11y/aria-role
						role="inline"
						adTargeting={adTargeting}
						isMainMedia={isMainMedia}
						id={element.id}
						assetId={element.assetId}
						channelId={element.channelId}
						expired={element.expired}
						overrideImage={element.overrideImage}
						posterImage={element.posterImage}
						duration={element.duration}
						mediaTitle={element.mediaTitle}
						altText={element.altText}
						origin={host}
					/>
				</Figure>
			);
		case 'model.dotcomrendering.pageElements.AudioBlockElement':
		case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
		case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
		case 'model.dotcomrendering.pageElements.VideoBlockElement':
		default:
			return null;
	}
};
