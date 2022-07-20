import { css } from "@emotion/react";
import LiveBlockContainer from "@guardian/common-rendering/src/components/liveBlockContainer";
import { ArticleDesign, ArticleDisplay, ArticleFormat, ArticlePillar } from "@guardian/libs";
import { breakpoints, from } from "@guardian/source-foundations";
import { ok } from "@guardian/types";
import { formatUTCTimeDateTz } from "date";
import { LiveBlockComp } from "components/LiveBlocks";
import { FC } from "react";
import { renderAll } from "renderer";
import { LastUpdated } from "./LastUpdated";
import { Article } from "./Layout/Layout.stories";
import { PinnedPost } from "./PinnedPost";
import { LiveBlock } from "liveBlock";
import type { Text } from "bodyElement";
import { ElementKind } from "bodyElementKind";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: 20px;
				max-width: 700px;
				${from.tablet} {
					width: 700px;
				}
			`}
		>
			{children}
		</div>
	);
};

const standard = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const bodyElement: Text = {kind: ElementKind.Text, doc: "<div>Some Text</div>"}

const pinnedBlock: LiveBlock = {
	id: '5',
	isKeyEvent: false,
	title: 'Block Five',
	firstPublished: new Date('2021-11-02T10:20:20Z'),
	lastModified: new Date('2021-11-02T11:13:13Z'),
	body: [ok()],
	contributors: [],
	isPinned: true,
};

const Default: FC = () => (
    <Wrapper>
        <PinnedPost pinnedPost={pinnedBlock} format={standard}>
            <LiveBlockComp block={pinnedBlock} format={standard} isPinnedPost={true} isOriginalPinnedPost={false}>
            </LiveBlockComp>
        </PinnedPost>
    </Wrapper>
);

export default {
	component: PinnedPost,
	title: 'AR/PinnedPost',
};

export {Default};