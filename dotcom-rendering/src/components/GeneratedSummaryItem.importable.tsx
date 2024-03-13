import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { body, until } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
// import { useEffect, useState } from 'react';
import { palette } from '../palette';
import type { DCRFrontImage } from '../types/front';
import { AgeWarning } from './AgeWarning';
import { BigNumber } from './BigNumber';
import { FormatBoundary } from './FormatBoundary';
import { LinkHeadline } from './LinkHeadline';
import { ShareButton } from './ShareButton.importable';

const gridItem = (position: number) => {
	const borderTop = css`
		/* Below leftCol always set top border */
		${until.leftCol} {
			border-top: 1px solid ${palette('--article-border')};
		}
	`;
	return css`
		position: relative;

		${borderTop}

		/* Above leftCol, don't apply a top border on the 1st and 6th
		items to prevent double borders */
		border-top: ${`1px solid ${palette('--article-border')};`};

		/* The left border is set on the container */
		min-height: 52px;

		&:hover {
			cursor: pointer;
		}

		&:hover,
		:focus {
			background: ${palette('--most-viewed-footer-hover')};
		}
	`;
};

const bigNumber = css`
	position: absolute;
	top: 6px;
	left: 10px;
	fill: ${palette('--article-text')};
	svg {
		height: 40px;
	}
`;

const headlineHeader = css`
	padding: 3px 10px 18px 75px;
	word-wrap: break-word;
	overflow: hidden;
`;
const ageWarningStyles = css`
	padding-left: 75px;
	margin-top: -16px;
	margin-bottom: 16px;
`;

const summaryStyle = css`
	${body.small()};
	margin-right: 4px;
	display: flex;
	flex-direction: column;
`;
const loadingSummaryStyle = css`
	${body.small()};
	margin-right: 486px;
`;
const subSummaryStyle = css`
	margin-top: 8px;
	${body.small()};
	font-style: italic;
`;
const summaryAndImage = css`
	margin-top: 8px;
	display: flex;
	flex: auto;
	justify-content: space-between;
	padding: 4px;
`;

const summaryLinkShareStyle = css`
	padding: 4px;
	display: flex;
	flex: auto;
	flex-direction: column;
	justify-content: space-between;
`;
const linkShareStyle = css`
	display: flex;
	flex-direction: column;
`;

const linkStyle = css`
	margin-top: 8px;
	padding: 4px;
	margin-left: -8px;
	margin-right: 16px;
`;
const shareStyle = css`
	padding: 8px;
	margin-left: -8px;
`;

type Props = {
	position: number;
	url: string;
	format: ArticleFormat;
	headlineText: string;
	ageWarning?: string;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	image?: DCRFrontImage;
	webPublicationDate: string;
};

async function getBodyText(url: string): Promise<string> {
	//query capi for body text
	const capiURL = 'https://content.guardianapis.com';
	const capiKey = '';
	const params = `?show-fields=all&format=json&api-key=${capiKey}`;
	const query = capiURL + url + params;
	const response = await fetch(query);
	const reply = await response.json();
	return reply?.response?.content?.fields?.bodyText;
}

async function getSummaryText(url: string) {
	const bodyText: string = await getBodyText(url);
	const prompt =
		// 'summarize the following in a short paragraph in the style of the Guardian in no more than two sentences, and include a prompt to read the article: ' +
		`summarize the following in the style of the Guardian in no more than two sentences. Also provide a reason that would motivate someone to read it, when they would not normally be interested in reading it. Ensure that this portion of your answer starts with the words "You should read this"` +
		bodyText;

	const openAI_KEY = '';

	const apiRequestBody = {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: prompt,
			},
		],
	};

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + openAI_KEY,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(apiRequestBody),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}
	const responseData = await response.json();
	const summary: string = responseData.choices[0]?.message.content;

	return summary;
}

export const GeneratedSummaryItem = ({
	position,
	url,
	format,
	headlineText,
	ageWarning,
	cssOverrides,
	image,
	webPublicationDate,
}: Props) => {
	const summaryText = 'summary text here';
	const readMorePrompt = 'read more here';

	// const [summaryText, setSummaryText] = useState<string | null>(null);
	// const [readMorePrompt, setReadMorePrompt] = useState<string | null>(null);

	// function splitSummaryAndPrompt(summary: string): string[] {
	// 	const splitSummary = summary.split('You should read this');
	// 	return splitSummary;
	// }

	// useEffect(() => {
	// 	getSummaryText(url)
	// 		.then((text: string) => {
	// 			const splitSummary = splitSummaryAndPrompt(text);
	// 			splitSummary[0] && setSummaryText(splitSummary[0]);
	// 			splitSummary[1] && setReadMorePrompt(splitSummary[1]);
	// 		})
	// 		.catch((error: string) => {
	// 			console.log('error: ' + error);
	// 		});
	// }, []);

	return (
		<li
			css={[gridItem(position), cssOverrides]}
			data-link-name={`${position} | text`}
		>
			{/* <a css={headlineLink} href={url} data-link-name="article"> */}
			<span css={bigNumber}>
				<BigNumber index={position} />
			</span>

			<div css={[headlineHeader]}>
				<FormatBoundary format={format}>
					<div></div>
					{format.design === ArticleDesign.LiveBlog ? (
						<LinkHeadline
							headlineText={headlineText}
							format={format}
							size="small"
							kickerText="Live"
							hideLineBreak={false}
							showPulsingDot={true}
							showQuotes={false}
						/>
					) : (
						<LinkHeadline
							headlineText={headlineText}
							format={format}
							size="medium"
							showQuotes={
								format.design === ArticleDesign.Comment ||
								format.design === ArticleDesign.Letter
							}
						/>
					)}
					<div css={summaryAndImage}>
						<div css={summaryLinkShareStyle}>
							<div>
								<span>
									{' '}
									{summaryText === null ? (
										<div css={loadingSummaryStyle}>
											Loading...
										</div>
									) : (
										<>
											<div css={summaryStyle}>
												<span>{summaryText}</span>

												<span
													css={{
														fontStyle: 'italic',
													}}
												>
													<br />
													Why should you read this?
												</span>
												<span>
													You should read this{' '}
													{readMorePrompt}
												</span>
											</div>
										</>
									)}
								</span>
							</div>
							<div css={linkShareStyle}>
								<span css={linkStyle}>
									<a href={url}>
										<Button size={'small'}>
											Dive Deeper
										</Button>
									</a>
								</span>
								<span css={linkStyle}>
									<Button size={'small'}>
										Listen to this
									</Button>
								</span>
								<span css={shareStyle}>
									{' '}
									<ShareButton
										pageId={url}
										webTitle={headlineText}
										format={format}
										context="ArticleMeta"
									/>
								</span>
							</div>
						</div>
						<div id="image">
							{image && (
								<span css={subSummaryStyle}>
									<img
										width="420px"
										src={image.src}
										alt={image.altText}
									/>
									{image.altText}
								</span>
							)}
						</div>
					</div>
				</FormatBoundary>
			</div>
			{!!ageWarning && (
				<div css={ageWarningStyles}>
					<AgeWarning age={ageWarning} size="small" />
				</div>
			)}
			{/* </a> */}
		</li>
	);
};
