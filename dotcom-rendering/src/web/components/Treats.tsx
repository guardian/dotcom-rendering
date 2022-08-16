import { css } from '@emotion/react';
import {
	border,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { TreatType } from '../../types/front';
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
			`}
			href={linkTo}
		>
			{text}
		</Link>
	</li>
);

const ImageTreat = ({
	imageUrl,
	linkTo,
	altText,
	text,
}: {
	imageUrl: string;
	linkTo: string;
	altText?: string;
	text: string;
}) => (
	<li>
		<a
			href={linkTo}
			data-ignore="global-link-styling"
			css={css`
				text-decoration: none;
				:hover {
					/* We target the span from here like this so that hovering the image also
					   adds the underline to the text */
					span {
						text-decoration: underline;
					}
				}
			`}
		>
			<img src={imageUrl} alt={altText} width="130px" height="130px" />
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
						background-color: ${neutral[0]};
						padding: 0 5px 4px;
						box-decoration-break: clone;
						position: relative;
						color: ${neutral[100]};
					`}
				>
					{text}
				</span>
			</div>
		</a>
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
				if (treat.linkTo === '/crosswords' && treat.text) {
					// Treats that link to /crosswords are special. If any
					// treat has this exact url then an svg of a crossword
					// is displayed above the text
					return (
						<>
							<li>
								<a href={treat.linkTo}>
									<SvgCrossword />
								</a>
							</li>
							<TextTreat
								text={treat.text}
								linkTo={treat.linkTo}
								borderColour={borderColour}
							/>
						</>
					);
				}

				if (treat.imageUrl && treat.altText) {
					return (
						<ImageTreat
							imageUrl={treat.imageUrl}
							linkTo={treat.linkTo}
							altText={treat.altText}
							text={treat.text}
						/>
					);
				}

				return (
					<TextTreat
						text={treat.text}
						linkTo={treat.linkTo}
						borderColour={borderColour}
					/>
				);
			})}
		</ul>
	);
};
