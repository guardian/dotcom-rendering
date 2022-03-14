import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';
import { Flex } from './Flex';
import { RightColumn } from './RightColumn';
import { AdSlot } from './AdSlot';
import { Island } from './Island';
import { DiscussionContainer } from './DiscussionContainer.importable';
import { DiscussionMeta } from './DiscussionMeta.importable';

interface DiscussionLayoutProps {
	format: ArticleFormat;
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	isAdFreeUser: boolean;
	shouldHideAds: boolean;
	expanded?: boolean;
}

export const DiscussionLayout = ({
	format,
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	isAdFreeUser,
	shouldHideAds,
	expanded,
}: DiscussionLayoutProps) => {
	const hideAd = isAdFreeUser || shouldHideAds;
	return (
		<>
			<ContainerLayout
				padSides={false}
				padContent={false}
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
						<Island clientOnly={true} deferUntil="visible">
							<DiscussionContainer
								format={format}
								discussionApiUrl={discussionApiUrl}
								shortUrlId={shortUrlId}
								discussionD2Uid={discussionD2Uid}
								discussionApiClientHeader={
									discussionApiClientHeader
								}
								enableDiscussionSwitch={enableDiscussionSwitch}
								expanded={expanded}
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
