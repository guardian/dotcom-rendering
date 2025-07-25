import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	headlineMedium17,
	space,
	textSans12,
} from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { Fragment } from 'react';
import { ArticleDesign, ArticleDisplay } from '../lib/articleFormat';
import { palette } from '../palette';
import type { TreatType } from '../types/front';
import { FormatBoundary } from './FormatBoundary';
import { generateSources, getFallbackSource } from './Picture';
import { SvgCrossword } from './SvgCrossword';

const TextTreat = ({
	text,
	linkTo,
	index,
	borderColour,
}: {
	text: string;
	linkTo: string;
	index: number;
	borderColour?: string;
}) => (
	<li
		css={css`
			margin-top: ${space[3]}px;
			border-left: 1px solid
				${borderColour ?? palette('--article-border')};
			border-top: 1px solid ${borderColour ?? palette('--article-border')};
			padding-top: ${space[1]}px;
			padding-left: ${space[2]}px;
		`}
	>
		<Link
			priority="secondary"
			subdued={true}
			cssOverrides={css`
				${textSans12}
				text-decoration: none;
				color: inherit;
			`}
			href={linkTo}
			data-link-name={`treat | ${index + 1} | ${text}`}
		>
			{text}
		</Link>
	</li>
);

const ImageTreat = ({
	imageUrl,
	links,
	altText,
}: {
	imageUrl: string;
	links: { text: string; title?: string; linkTo: string }[];
	altText?: string;
}) => {
	const sources = generateSources(imageUrl, [
		{ breakpoint: 320, width: 130 },
	]);
	const fallbackSource = getFallbackSource(sources);

	return (
		<li>
			<div
				css={css`
					${from.wide} {
						margin-bottom: -10px;
					}
					${from.leftCol} {
						margin-bottom: -25px;
					}
				`}
			>
				<picture>
					{sources.map((source) => {
						return (
							<Fragment key={source.breakpoint}>
								{/* High resolution (HDPI) sources*/}
								<source
									srcSet={source.hiResUrl}
									media={`(min-width: ${source.breakpoint}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${source.breakpoint}px) and (min-resolution: 120dpi)`}
								/>
								{/* Low resolution (MDPI) source*/}
								<source
									srcSet={source.lowResUrl}
									media={`(min-width: ${source.breakpoint}px)`}
								/>
							</Fragment>
						);
					})}
					<img
						src={fallbackSource.lowResUrl}
						alt={altText}
						width="130px"
						height="auto"
					/>
				</picture>
			</div>
			{links.map((link, index) => {
				return (
					<a
						key={link.linkTo}
						href={link.linkTo}
						data-ignore="global-link-styling"
						data-link-name={`treat | ${index + 1} | ${link.text}`}
						css={css`
							text-decoration: none;
						`}
					>
						<div
							css={css`
								margin-bottom: 8px;
								display: block;
								width: 253px;
								margin-top: 6px;
								margin-left: 10px;
								${from.leftCol} {
									margin-left: 0;
									width: 140px;
								}
								${from.wide} {
									width: 168px;
								}
							`}
						>
							<span
								css={css`
									${headlineMedium17};
									font-size: 16px;
									background-color: ${palette(
										'--treat-background',
									)};
									padding: 0 5px 4px;
									box-decoration-break: clone;
									position: relative;
									color: ${palette('--treat-text')};
									text-decoration: none;
									:hover {
										text-decoration: underline;
									}
								`}
							>
								<span
									css={css`
										font-weight: bold;
									`}
								>
									{link.title}
								</span>
								{link.text}
							</span>
						</div>
					</a>
				);
			})}
		</li>
	);
};

export const Treats = ({
	treats,
	borderColour,
}: {
	treats: TreatType[];
	borderColour?: string;
}) => {
	if (treats.length === 0) return null;

	return (
		<ul
			css={css`
				display: flex;
				flex-direction: column;
			`}
		>
			{treats.map((treat, index) => {
				const [link] = treat.links;

				if (link?.linkTo === '/crosswords' && link.text) {
					// Treats that link to /crosswords are special. If any
					// treat has this exact url then an svg of a crossword
					// is displayed above the text
					return (
						<Fragment key={link.linkTo}>
							<li>
								<a href={link.linkTo}>
									<SvgCrossword />
								</a>
							</li>
							{treat.links.map(({ linkTo, text }) => (
								<TextTreat
									key={linkTo}
									text={text}
									linkTo={linkTo}
									index={index}
									borderColour={borderColour}
								/>
							))}
						</Fragment>
					);
				}

				if (
					treat.imageUrl &&
					treat.altText &&
					!isUndefined(treat.theme)
				) {
					return (
						<FormatBoundary
							key={treat.imageUrl}
							format={{
								display: ArticleDisplay.Standard,
								design: ArticleDesign.Standard,
								theme: treat.theme,
							}}
						>
							<ImageTreat
								imageUrl={treat.imageUrl}
								links={treat.links}
								altText={treat.altText}
							/>
						</FormatBoundary>
					);
				}

				return (
					<Fragment key={index}>
						{treat.links.map(({ text, linkTo }) => (
							<TextTreat
								key={linkTo}
								text={text}
								linkTo={linkTo}
								index={index}
								borderColour={borderColour}
							/>
						))}
					</Fragment>
				);
			})}
		</ul>
	);
};
