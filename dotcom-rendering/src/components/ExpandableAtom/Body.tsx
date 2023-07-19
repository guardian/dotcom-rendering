import { css } from '@emotion/react';
import { body, neutral, textSans } from '@guardian/source-foundations';
import { SvgInfo } from '@guardian/source-react-components';
import { decidePalette } from '../../lib/decidePalette';

const imageStyling = css`
	float: left;
	margin-right: 16px;
	margin-bottom: 6px;
	object-fit: cover;
	border-radius: 50%;
	display: block;
	border: 0px;
	width: 100px;
	height: 100px;
`;

const creditStyling = css`
	${textSans.xsmall()};
	margin: 12px 0;
	display: flex;
	align-items: center;
	svg {
		width: 30px;
		fill: ${neutral[60]};
	}
`;

const bodyStyling = css`
	${body.medium()}
	p {
		margin-bottom: 0.5rem;
	}

	ol {
		list-style: decimal;
		list-style-position: inside;
		margin-bottom: 1rem;
	}

	ul {
		list-style: none;
		margin: 0 0 0.75rem;
		padding: 0;
		margin-bottom: 1rem;
	}

	ul li {
		margin-bottom: 0.375rem;
		padding-left: 1.25rem;
	}

	ul li:before {
		display: inline-block;
		content: '';
		border-radius: 0.375rem;
		height: 0.75rem;
		width: 0.75rem;
		margin-right: 0.5rem;
		background-color: ${neutral[86]};
		margin-left: -1.25rem;
	}

	/* Without this bold elements are overridden */
	b {
		font-weight: 700;
	}

	i {
		font-style: italic;
	}
`;

const linkStyling = (format: ArticleFormat) => css`
	a {
		color: ${decidePalette(format).text.expandableAtom};
		text-decoration: none;
		border-bottom: 0.0625rem solid ${neutral[86]};
		transition: border-color 0.15s ease-out;
	}

	a:hover {
		border-bottom: solid 0.0625rem
			${decidePalette(format).text.expandableAtomHover};
	}
`;

export const Body = ({
	html,
	image,
	credit,
	format,
}: {
	html: string;
	image?: string;
	credit?: string;
	format: ArticleFormat;
}): JSX.Element => {
	return (
		<div>
			{!!image && <img css={imageStyling} src={image} alt="" />}
			<div
				css={[bodyStyling, linkStyling(format)]}
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			/>
			{!!credit && (
				<div css={creditStyling}>
					<SvgInfo />
					{credit}
				</div>
			)}
		</div>
	);
};
