import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { AdSlot } from './AdSlot';
import { ContainerLayout } from './ContainerLayout';
import { DiscussionContainer } from './DiscussionContainer.importable';
import { DiscussionMeta } from './DiscussionMeta.importable';
import { Flex } from './Flex';
import { Island } from './Island';
import { RightColumn } from './RightColumn';

type Props = {
	format: ArticleFormat;
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	isAdFreeUser: boolean;
	shouldHideAds: boolean;
};

export const DiscussionLayout = ({
	format,
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	isAdFreeUser,
	shouldHideAds,
}: Props) => {
	const hideAd = isAdFreeUser || shouldHideAds;
	return (
		<>
			<ContainerLayout
				padSides={false}
				padContent={false}
				showTopBorder={false}
				showSideBorders={false}
				// If we're not hiding an advert stretch to the right
				stretchRight={!hideAd}
				leftContent={
					<Island clientOnly={true} deferUntil="visible">
						<DiscussionMeta
							format={format}
							discussionApiUrl={discussionApiUrl}
							shortUrlId={shortUrlId}
							enableDiscussionSwitch={enableDiscussionSwitch}
						/>
					</Island>
				}
				leftColSize={
					format.display === ArticleDisplay.Standard
						? 'wide'
						: 'compact'
				}
			>
				<Flex>
					<div
						css={css`
							${from.leftCol} {
								padding-left: 10px;
							}
							width: 100%;
							max-width: 100%;
						`}
					>
						<Island
							clientOnly={true}
							deferUntil="visible"
							placeholderHeight={324}
						>
							<DiscussionContainer
								format={format}
								discussionApiUrl={discussionApiUrl}
								shortUrlId={shortUrlId}
								discussionD2Uid={discussionD2Uid}
								discussionApiClientHeader={
									discussionApiClientHeader
								}
								enableDiscussionSwitch={enableDiscussionSwitch}
							/>
						</Island>
					</div>
					<>
						{!hideAd && (
							<RightColumn>
								<div
									css={css`
										position: static;
										height: 100%;
										padding-left: 20px;
									`}
								>
									<AdSlot
										position="comments"
										display={format.display}
									/>
								</div>
							</RightColumn>
						)}
					</>
				</Flex>
			</ContainerLayout>
		</>
	);
};
