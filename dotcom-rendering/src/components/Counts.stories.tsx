import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { CommentCount } from './CommentCount.importable';
import { Counts } from './Counts';
import { ShareCount } from './ShareCount.importable';

export default {
	component: Counts,
	title: 'Components/Counts',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				margin: 40px;
			`}
		>
			{children}
		</div>
	);
};

const format = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

export const Both = () => {
	fetchMock
		.restore()
		// Share count
		.getOnce(
			'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
			{
				status: 200,
				body: {
					path: 'lifeandstyle/2015/jan/25/deborah-orr-parents-jailers-i-loved',
					share_count: 80,
					refreshStatus: true,
				},
			},
			{ overwriteRoutes: false },
		)
		// Comment count
		.getOnce(
			'begin:https://discussion.theguardian.com/getCommentCounts',
			{
				status: 200,
				body: {
					'p/fmmj65': 239,
				},
			},
			{ overwriteRoutes: false },
		)
		.spy('end:.hot-update.json');

	return (
		<Wrapper>
			<Counts format={format}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2015/jan/25/deborah-orr-parents-jailers-i-loved"
						format={format}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/fmmj65"
						format={format}
					/>
				</div>
			</Counts>
		</Wrapper>
	);
};
Both.storyName = 'with both results';

export const Themes = () => {
	fetchMock
		.restore()
		// Share count
		.getOnce(
			'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
			{
				status: 200,
				body: {
					path: 'lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved',
					share_count: 80,
					refreshStatus: true,
				},
			},
			{ overwriteRoutes: false },
		)
		// Comment count
		.getOnce(
			'begin:https://discussion.theguardian.com/getCommentCounts',
			{
				status: 200,
				body: {
					'p/3bdii8': 239,
				},
			},
			{ overwriteRoutes: false },
		)
		.spy('end:.hot-update.json');

	return (
		<Wrapper>
			<Counts format={{ ...format, theme: Pillar.News }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: Pillar.News }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: Pillar.News }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: Pillar.Culture }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: Pillar.Culture }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: Pillar.Culture }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: Pillar.Sport }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: Pillar.Sport }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: Pillar.Sport }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: Pillar.Lifestyle }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: Pillar.Lifestyle }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: Pillar.Lifestyle }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: Pillar.Opinion }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: Pillar.Opinion }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: Pillar.Opinion }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: ArticleSpecial.Labs }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: ArticleSpecial.Labs }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: ArticleSpecial.Labs }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: ArticleSpecial.SpecialReport }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{
							...format,
							theme: ArticleSpecial.SpecialReport,
						}}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{
							...format,
							theme: ArticleSpecial.SpecialReport,
						}}
					/>
				</div>
			</Counts>
		</Wrapper>
	);
};
Themes.storyName = 'with different themes';

export const CommentOnly = () => {
	fetchMock
		.restore()
		// Share count
		.getOnce(
			'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
			{
				status: 200,
				body: {
					path: 'lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved',
					share_count: 0,
					refreshStatus: true,
				},
			},
			{ overwriteRoutes: false },
		)
		// Comment count
		.getOnce(
			'begin:https://discussion.theguardian.com/getCommentCounts',
			{
				status: 200,
				body: {
					'p/sd4lki': 239,
				},
			},
			{ overwriteRoutes: false },
		)
		.spy('end:.hot-update.json');

	return (
		<Wrapper>
			<Counts format={format}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
						format={format}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/sd4lki"
						format={format}
					/>
				</div>
			</Counts>
		</Wrapper>
	);
};
CommentOnly.storyName = 'with zero shares';

export const ZeroComments = () => {
	fetchMock
		.restore()
		// Share count
		.getOnce(
			'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
			{
				status: 200,
				body: {
					path: 'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
					share_count: 60,
					refreshStatus: true,
				},
			},
			{ overwriteRoutes: false },
		)
		// Comment count
		.getOnce(
			'begin:https://discussion.theguardian.com/getCommentCounts',
			{
				status: 200,
				body: {
					'p/u7ytrg': 0,
				},
			},
			{ overwriteRoutes: false },
		)
		.spy('end:.hot-update.json');

	return (
		<Wrapper>
			<Counts format={format}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software"
						format={format}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/u7ytrg"
						format={format}
					/>
				</div>
			</Counts>
		</Wrapper>
	);
};
ZeroComments.storyName = 'with zero comments';

export const BigNumbers = () => {
	fetchMock
		.restore()
		// Share count
		.getOnce(
			'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
			{
				status: 200,
				body: {
					path: '/lifeandstyle/2019/jan/25/deborah-orr-parents-jailers-i-loved',
					share_count: 204320,
					refreshStatus: true,
				},
			},
			{ overwriteRoutes: false },
		)
		// Comment count
		.getOnce(
			'begin:https://discussion.theguardian.com/getCommentCounts',
			{
				status: 200,
				body: {
					'p/bhgyt': 4320,
				},
			},
			{ overwriteRoutes: false },
		)
		.spy('end:.hot-update.json');

	return (
		<Wrapper>
			<Counts format={format}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2019/jan/25/deborah-orr-parents-jailers-i-loved"
						format={format}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/bhgyt"
						format={format}
					/>
				</div>
			</Counts>
		</Wrapper>
	);
};
BigNumbers.storyName = 'with long numbers';

export const CommentsOff = () => {
	fetchMock
		.restore()
		// Share count
		.getOnce(
			'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
			{
				status: 200,
				body: {
					path: 'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
					share_count: 60,
					refreshStatus: true,
				},
			},
			{ overwriteRoutes: false },
		)
		.spy('end:.hot-update.json');

	return (
		<Wrapper>
			<Counts format={format}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software"
						format={format}
					/>
				</div>
				{/* When commenting is off the CommentCount component won't render at all */}
				<div className="meta-number" />
			</Counts>
		</Wrapper>
	);
};
CommentsOff.storyName = 'with commentting off';
