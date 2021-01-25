import React from 'react';
import { css } from 'emotion';

import { BlockquoteBlockComponent } from '@root/src/web/components/elements/BlockquoteBlockComponent';
import { CalloutBlockComponent } from '@root/src/web/components/elements/CalloutBlockComponent';
import { CaptionBlockComponent } from '@root/src/web/components/elements/CaptionBlockComponent';
import { CommentBlockComponent } from '@root/src/web/components/elements/CommentBlockComponent';
import { CodeBlockComponent } from '@root/src/web/components/elements/CodeBlockComponent';
import { DefaultRichLink } from '@root/src/web/components/RichLink';
import { DocumentBlockComponent } from '@root/src/web/components/elements/DocumentBlockComponent';
import { DisclaimerBlockComponent } from '@root/src/web/components/elements/DisclaimerBlockComponent';
import { DividerBlockComponent } from '@root/src/web/components/elements/DividerBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/elements/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '@root/src/web/components/elements/UnsafeEmbedBlockComponent';
import { GuVideoBlockComponent } from '@root/src/web/components/elements/GuVideoBlockComponent';
import { HighlightBlockComponent } from '@root/src/web/components/elements/HighlightBlockComponent';
import { ImageBlockComponent } from '@root/src/web/components/elements/ImageBlockComponent';
import { InstagramBlockComponent } from '@root/src/web/components/elements/InstagramBlockComponent';
import { MapEmbedBlockComponent } from '@root/src/web/components/elements/MapEmbedBlockComponent';
import { MultiImageBlockComponent } from '@root/src/web/components/elements/MultiImageBlockComponent';
import { PullQuoteBlockComponent } from '@root/src/web/components/elements/PullQuoteBlockComponent';
import { SoundcloudBlockComponent } from '@root/src/web/components/elements/SoundcloudBlockComponent';
import { SpotifyBlockComponent } from '@root/src/web/components/elements/SpotifyBlockComponent';
import { SubheadingBlockComponent } from '@root/src/web/components/elements/SubheadingBlockComponent';
import { TableBlockComponent } from '@root/src/web/components/elements/TableBlockComponent';
import { TextBlockComponent } from '@root/src/web/components/elements/TextBlockComponent';
import { TweetBlockComponent } from '@root/src/web/components/elements/TweetBlockComponent';
import { VideoFacebookBlockComponent } from '@root/src/web/components/elements/VideoFacebookBlockComponent';
import { VimeoBlockComponent } from '@root/src/web/components/elements/VimeoBlockComponent';
import { YoutubeEmbedBlockComponent } from '@root/src/web/components/elements/YoutubeEmbedBlockComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/elements/YoutubeBlockComponent';
import { WitnessVideoBlockComponent } from '@root/src/web/components/elements/WitnessVideoBlockComponent';
import { WitnessImageBlockComponent } from '@root/src/web/components/elements/WitnessImageBlockComponent';
import { WitnessTextBlockComponent } from '@root/src/web/components/elements/WitnessTextBlockComponent';

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
import { Display, Design } from '@guardian/types';
import { withSignInGateSlot } from '@root/src/web/lib/withSignInGateSlot';
import { themeToPillar } from '@root/src/web/lib/themeToPillar';

// This is required for spacefinder to work!
const commercialPosition = css`
	position: relative;
`;

export const ArticleRenderer: React.FC<{
	display: Display;
	elements: CAPIElement[];
	pillar: Theme;
	design: Design;
	adTargeting?: AdTargeting;
	host?: string;
}> = ({ display, elements, pillar, design, adTargeting, host }) => {
	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.

	const output = elements
		.map((element, i) => {
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
					return (
						<Figure id={`audio-atom-${i}`} role={element.role}>
							<AudioAtom
								id={element.id}
								trackUrl={element.trackUrl}
								kicker={element.kicker}
								title={element.title}
								pillar={themeToPillar(pillar)}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
					return (
						<BlockquoteBlockComponent
							key={i}
							html={element.html}
							pillar={pillar}
							quoted={element.quoted}
						/>
					);
				case 'model.dotcomrendering.pageElements.CaptionBlockElement':
					return (
						<CaptionBlockComponent
							key={i}
							display={display}
							design={design}
							pillar={pillar}
							captionText={element.captionText}
							padCaption={element.padCaption}
							credit={element.credit}
							displayCredit={element.displayCredit}
							shouldLimitWidth={element.shouldLimitWidth}
							isOverlayed={element.isOverlayed}
						/>
					);
				case 'model.dotcomrendering.pageElements.CommentBlockElement':
					return (
						<Figure role={element.role}>
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
						<Figure role={element.role}>
							<DisclaimerBlockComponent
								html={element.html}
								pillar={pillar}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.DividerBlockElement':
					return <DividerBlockComponent />;
				case 'model.dotcomrendering.pageElements.CalloutBlockElement':
					return (
						<Figure id={`callout-${i}`} role={element.role}>
							<CalloutBlockComponent
								callout={element}
								pillar={pillar}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
					return (
						<Figure role={element.role}>
							<ChartAtom id={element.id} html={element.html} />
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.QuizAtomBlockElement':
					return (
						<Figure id={`quiz-atom-${i}`}>
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
				case 'model.dotcomrendering.pageElements.DocumentBlockElement':
					return (
						<Figure role={element.role}>
							<DocumentBlockComponent
								embedUrl={element.embedUrl}
								height={element.height}
								width={element.width}
								title={element.title}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.EmbedBlockElement':
					if (!element.safe) {
						return (
							<Figure role={element.role}>
								<UnsafeEmbedBlockComponent
									key={i}
									html={element.html}
									alt={element.alt || ''}
									index={i}
								/>
							</Figure>
						);
					}
					return (
						<Figure role={element.role}>
							<EmbedBlockComponent
								key={i}
								html={element.html}
								alt={element.alt}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement':
					return (
						<Figure role={element.role}>
							<ExplainerAtom
								key={i}
								id={element.id}
								title={element.title}
								html={element.body}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
					return (
						<Figure id={`guide-atom-${i}`} role={element.role}>
							<GuideAtom
								id={element.id}
								title={element.title}
								html={element.html}
								image={element.img}
								credit={element.credit}
								pillar={themeToPillar(pillar)}
								likeHandler={() => {}}
								dislikeHandler={() => {}}
								expandCallback={() => {}}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
					return (
						<Figure role={element.role}>
							<GuVideoBlockComponent
								html={element.html}
								pillar={pillar}
								design={design}
								display={display}
								credit={element.source}
								caption={element.caption}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.HighlightBlockElement':
					return (
						<HighlightBlockComponent key={i} html={element.html} />
					);
				case 'model.dotcomrendering.pageElements.ImageBlockElement':
					return (
						<Figure role={element.role}>
							<ImageBlockComponent
								display={display}
								design={design}
								key={i}
								element={element}
								pillar={pillar}
								title={element.title}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.InstagramBlockElement':
					return (
						<Figure role={element.role}>
							<InstagramBlockComponent
								key={i}
								element={element}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
					return (
						<Figure role={element.role}>
							<InteractiveAtom
								id={element.id}
								html={element.html}
								js={element.js}
								css={element.css}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.MapBlockElement':
					return (
						<Figure role={element.role}>
							<MapEmbedBlockComponent
								pillar={pillar}
								embedUrl={element.embedUrl}
								height={element.height}
								width={element.width}
								caption={element.caption}
								credit={element.source}
								title={element.title}
								display={display}
								design={design}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
					return (
						<Figure role={element.role}>
							<MultiImageBlockComponent
								design={design}
								key={i}
								images={element.images}
								caption={element.caption}
								pillar={pillar}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
					return (
						<Figure id={`profile-atom-${i}`} role={element.role}>
							<ProfileAtom
								id={element.id}
								title={element.title}
								html={element.html}
								image={element.img}
								credit={element.credit}
								pillar={themeToPillar(pillar)}
								likeHandler={() => {}}
								dislikeHandler={() => {}}
								expandCallback={() => {}}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
					return (
						<PullQuoteBlockComponent
							key={i}
							html={element.html}
							pillar={pillar}
							design={design}
							attribution={element.attribution}
							role={element.role}
						/>
					);
				case 'model.dotcomrendering.pageElements.QABlockElement':
					return (
						<Figure id={`qanda-atom-${i}`} role={element.role}>
							<QandaAtom
								id={element.id}
								title={element.title}
								html={element.html}
								image={element.img}
								credit={element.credit}
								pillar={themeToPillar(pillar)}
								likeHandler={() => {}}
								dislikeHandler={() => {}}
								expandCallback={() => {}}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
					return (
						<div key={i} id={`rich-link-${i}`}>
							<DefaultRichLink
								index={i}
								headlineText={element.text}
								url={element.url}
								isPlaceholder={true}
							/>
						</div>
					);
				case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
					return (
						<Figure key={i} role={element.role}>
							<SoundcloudBlockComponent element={element} />
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.SpotifyBlockElement':
					return (
						<Figure role={element.role}>
							<SpotifyBlockComponent
								embedUrl={element.embedUrl}
								height={element.height}
								width={element.width}
								title={element.title}
								pillar={pillar}
								caption={element.caption}
								design={design}
								display={display}
								credit="Spotify"
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
					return (
						<SubheadingBlockComponent key={i} html={element.html} />
					);
				case 'model.dotcomrendering.pageElements.TableBlockElement':
					return (
						<Figure role={element.role}>
							<TableBlockComponent element={element} />
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.TextBlockElement':
					return (
						<>
							<TextBlockComponent
								key={i}
								isFirstParagraph={i === 0}
								html={element.html}
								pillar={pillar}
								display={display}
								design={design}
								forceDropCap={element.dropCap}
							/>
						</>
					);
				case 'model.dotcomrendering.pageElements.TweetBlockElement':
					return (
						<Figure key={i} role={element.role}>
							<TweetBlockComponent element={element} />
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
					return (
						<Figure role={element.role}>
							<VideoFacebookBlockComponent
								pillar={pillar}
								embedUrl={element.embedUrl}
								height={element.height}
								width={element.width}
								caption={element.caption}
								display={display}
								design={design}
								credit={element.caption}
								title={element.caption}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
					return (
						<Figure role={element.role}>
							<VimeoBlockComponent
								pillar={pillar}
								embedUrl={element.embedUrl}
								height={element.height}
								width={element.width}
								caption={element.caption}
								credit={element.credit}
								title={element.title}
								display={display}
								design={design}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
					return (
						<Figure role={element.role}>
							<YoutubeEmbedBlockComponent
								pillar={pillar}
								embedUrl={element.embedUrl}
								height={element.height}
								width={element.width}
								caption={element.caption}
								credit={element.credit}
								title={element.title}
								display={display}
								design={design}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
					return (
						<Figure
							key={i}
							role={element.role}
							id={`youtube-block-${i}`}
						>
							<YoutubeBlockComponent
								display={display}
								design={design}
								key={i}
								pillar={pillar}
								hideCaption={false}
								// eslint-disable-next-line jsx-a11y/aria-role
								role="inline"
								adTargeting={adTargeting}
								isMainMedia={false}
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
				case 'model.dotcomrendering.pageElements.TimelineBlockElement':
					return (
						<Figure role={element.role} id={`timeline-atom-${i}`}>
							<TimelineAtom
								id={element.id}
								title={element.title}
								pillar={themeToPillar(pillar)}
								events={element.events}
								likeHandler={() => {}}
								dislikeHandler={() => {}}
								expandCallback={() => {}}
							/>
						</Figure>
					);
				case 'model.dotcomrendering.pageElements.MediaAtomBlockElement':
					return (
						<VideoAtom
							assets={element.assets}
							poster={
								element.posterImage &&
								element.posterImage[0].url
							}
						/>
					);
				case 'model.dotcomrendering.pageElements.CodeBlockElement':
					return (
						<CodeBlockComponent
							code={element.code}
							language={element.language}
						/>
					);
				case 'model.dotcomrendering.pageElements.WitnessBlockElement': {
					const witnessType = element.witnessTypeData._type;
					switch (witnessType) {
						case 'model.dotcomrendering.pageElements.WitnessTypeDataImage':
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
							const witnessTypeDataImage = element.witnessTypeData as WitnessTypeDataImage;
							return (
								<Figure>
									<WitnessImageBlockComponent
										assets={element.assets}
										caption={witnessTypeDataImage.caption}
										title={witnessTypeDataImage.title}
										authorName={
											witnessTypeDataImage.authorName
										}
										dateCreated={
											witnessTypeDataImage.dateCreated
										}
										alt={witnessTypeDataImage.alt}
										pillar={pillar}
									/>
								</Figure>
							);
						case 'model.dotcomrendering.pageElements.WitnessTypeDataVideo':
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
							const witnessTypeDataVideo = element.witnessTypeData as WitnessTypeDataVideo;
							return (
								<Figure>
									<WitnessVideoBlockComponent
										title={witnessTypeDataVideo.title}
										description={
											witnessTypeDataVideo.description
										}
										authorName={
											witnessTypeDataVideo.authorName
										}
										youtubeHtml={
											witnessTypeDataVideo.youtubeHtml
										}
										dateCreated={
											witnessTypeDataVideo.dateCreated
										}
										pillar={pillar}
									/>
								</Figure>
							);
						case 'model.dotcomrendering.pageElements.WitnessTypeDataText':
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
							const witnessTypeDataText = element.witnessTypeData as WitnessTypeDataText;
							return (
								<Figure>
									<WitnessTextBlockComponent
										title={witnessTypeDataText.title}
										description={
											witnessTypeDataText.description
										}
										authorName={
											witnessTypeDataText.authorName
										}
										dateCreated={
											witnessTypeDataText.dateCreated
										}
										pillar={pillar}
									/>
								</Figure>
							);
						default:
							return null;
					}
				}

				case 'model.dotcomrendering.pageElements.AudioBlockElement':
				case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
				case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
				case 'model.dotcomrendering.pageElements.VideoBlockElement':
					return null;
			}
		})
		.filter((_) => _ != null);

	return (
		<div
			className={`article-body-commercial-selector ${commercialPosition} article-body-viewer-selector`}
		>
			{/* Insert the placeholder for the sign in gate on the 2nd article element */}
			{withSignInGateSlot(output)}
		</div>
	); // classname that space finder is going to target for in-body ads in DCR
};
