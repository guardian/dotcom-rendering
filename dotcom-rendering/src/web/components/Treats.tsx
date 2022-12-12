import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import {
	border,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { TreatType } from '../../types/front';
import { decidePalette } from '../lib/decidePalette';
import { SvgCrossword } from './SvgCrossword';

const TextTreat = ({
	text,
	linkTo,
	borderColour,
}: {
	text: string;
	linkTo: string;
	borderColour?: string;
}) => (
	<li
		css={css`
			margin-top: ${space[3]}px;
			border-left: 1px solid ${borderColour ?? border.secondary};
			border-top: 1px solid ${borderColour ?? border.secondary};
			padding-top: ${space[1]}px;
			padding-left: ${space[2]}px;
		`}
	>
		<Link
			priority="secondary"
			subdued={true}
			cssOverrides={css`
				${textSans.xsmall()}
				text-decoration: none;
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
	links: { text: string; linkTo: string }[];
	altText?: string;
	backgroundColour: string;
}) => (
	<li>
		<img src={imageUrl} alt={altText} width="130px" height="auto" />
		{links.map((link, index) => (
			<a
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
						width: 80%;
					`}
				>
					<span
						css={css`
							${headline.xxxsmall({ fontWeight: 'bold' })};
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
						{link.text}
					</span>
				</div>
			</a>
		))}
	</li>
);

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
			{treats.map((treat) => {
				const [link] = treat.links;
				if (link && link.linkTo === '/crosswords' && link.text) {
					// Treats that link to /crosswords are special. If any
					// treat has this exact url then an svg of a crossword
					// is displayed above the text
					return (
						<>
							<li>
								<a href={link.linkTo}>
									<SvgCrossword />
								</a>
							</li>
							{treat.links.map((link) => (
								<TextTreat
									text={link.text}
									linkTo={link.linkTo}
									borderColour={borderColour}
								/>
							))}
						</>
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
							imageUrl={treat.imageUrl}
							links={treat.links}
							altText={treat.altText}
							backgroundColour={palette.background.treat}
						/>
					);
				}

				return (
					<>
						{treat.links.map((link) => (
							<TextTreat
								text={link.text}
								linkTo={link.linkTo}
								borderColour={borderColour}
							/>
						))}
					</>
				);
			})}
		</ul>
	);
};
