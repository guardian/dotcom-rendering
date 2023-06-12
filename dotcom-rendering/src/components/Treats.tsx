import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import {
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { Fragment } from 'react';
import type { TreatType } from '../types/front';
import { decidePalette } from '../lib/decidePalette';
import { generateSources, getFallbackSource } from './Picture';
import { SvgCrossword } from './SvgCrossword';

const TextTreat = ({
	text,
	linkTo,
	borderColour,
	textColour,
}: {
	text: string;
	linkTo: string;
	borderColour?: string;
	textColour?: string;
}) => (
	<li
		css={css`
			margin-top: ${space[3]}px;
			border-left: 1px solid ${borderColour ?? neutral[86]};
			border-top: 1px solid ${borderColour ?? neutral[86]};
			padding-top: ${space[1]}px;
			padding-left: ${space[2]}px;
		`}
	>
		<Link
			priority="secondary"
			subdued={true}
			cssOverrides={css`
				${textSans.xxsmall()}
				text-decoration: none;
				color: ${textColour};
			`}
			href={linkTo}
		>
			{text}
		</Link>
	</li>
);

const ImageTreat = ({
	imageUrl,
	links,
	altText,
	backgroundColour,
}: {
	imageUrl: string;
	links: { text: string; title?: string; linkTo: string }[];
	altText?: string;
	backgroundColour: string;
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
									${headline.xxxsmall()};
									font-size: 16px;
									background-color: ${index % 2 === 0
										? neutral[0]
										: backgroundColour};
									padding: 0 5px 4px;
									box-decoration-break: clone;
									position: relative;
									color: ${neutral[100]};
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
	textColour,
}: {
	treats: TreatType[];
	borderColour?: string;
	textColour?: string;
}) => {
	if (treats.length === 0) return null;
	return (
		<ul
			css={css`
				display: flex;
				flex-direction: column;
			`}
		>
			{treats.map((treat) => {
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
									borderColour={borderColour}
									textColour={textColour}
								/>
							))}
						</Fragment>
					);
				}

				if (
					treat.imageUrl &&
					treat.altText &&
					treat.theme !== undefined
				) {
					const palette = decidePalette({
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: treat.theme,
					});
					return (
						<ImageTreat
							key={treat.imageUrl}
							imageUrl={treat.imageUrl}
							links={treat.links}
							altText={treat.altText}
							backgroundColour={palette.background.treat}
						/>
					);
				}

				return (
					<>
						{treat.links.map(({ text, linkTo }) => (
							<TextTreat
								key={linkTo}
								text={text}
								linkTo={linkTo}
								borderColour={borderColour}
								textColour={textColour}
							/>
						))}
					</>
				);
			})}
		</ul>
	);
};
