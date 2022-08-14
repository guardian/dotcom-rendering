import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { CommentCount } from './CommentCount.importable';
import { Counts } from './Counts';
import { ShareCount } from './ShareCount.importable';

export default {
	component: Counts,
	title: 'Components/Counts',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin: 40px;
		`}
	>
		{children}
	</div>
);

const format = {
	theme: ArticlePillar.News,
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
			'begin:https://discussion.theguardian.com/discussion/p/fmmj65',
			{
				status: 200,
				body: {
					discussion: {
						commentCount: 239,
						isClosedForComments: false,
					},
				},
			},
			{ overwriteRoutes: false },
		);

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
Both.story = { name: 'with both results' };

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
			'begin:https://discussion.theguardian.com/discussion/p/3bdii8',
			{
				status: 200,
				body: {
					discussion: {
						commentCount: 239,
						isClosedForComments: false,
					},
				},
			},
			{ overwriteRoutes: false },
		);

	return (
		<Wrapper>
			<Counts format={{ ...format, theme: ArticlePillar.News }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: ArticlePillar.News }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: ArticlePillar.News }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: ArticlePillar.Culture }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: ArticlePillar.Culture }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: ArticlePillar.Culture }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: ArticlePillar.Sport }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: ArticlePillar.Sport }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: ArticlePillar.Sport }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: ArticlePillar.Lifestyle }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: ArticlePillar.Lifestyle }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: ArticlePillar.Lifestyle }}
					/>
				</div>
			</Counts>
			<Counts format={{ ...format, theme: ArticlePillar.Opinion }}>
				<div className="meta-number">
					<ShareCount
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						pageId="/lifeandstyle/2010/jan/25/deborah-orr-parents-jailers-i-loved"
						format={{ ...format, theme: ArticlePillar.Opinion }}
					/>
				</div>
				<div className="meta-number">
					<CommentCount
						discussionApiUrl="https://discussion.theguardian.com"
						shortUrlId="p/3bdii8"
						format={{ ...format, theme: ArticlePillar.Opinion }}
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
Themes.story = { name: 'with different themes' };

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
			'begin:https://discussion.theguardian.com/discussion/p/sd4lki',
			{
				status: 200,
				body: {
					discussion: {
						commentCount: 239,
						isClosedForComments: false,
					},
				},
			},
			{ overwriteRoutes: false },
		);

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
CommentOnly.story = { name: 'with zero shares' };

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
			'begin:https://discussion.theguardian.com/discussion/p/u7ytrg',
			{
				status: 200,
				body: {
					discussion: {
						commentCount: 0,
						isClosedForComments: false,
					},
				},
			},
			{ overwriteRoutes: false },
		);

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
ZeroComments.story = { name: 'with zero comments' };

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
			'begin:https://discussion.theguardian.com/discussion/p/bhgyt',
			{
				status: 200,
				body: {
					discussion: {
						commentCount: 4320,
						isClosedForComments: false,
					},
				},
			},
			{ overwriteRoutes: false },
		);

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
BigNumbers.story = { name: 'with long numbers' };

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
		);

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
CommentsOff.story = { name: 'with commentting off' };
