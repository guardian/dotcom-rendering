import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	headlineBold17,
	neutral,
	remSpace,
	textSans14,
	textSans15,
} from '@guardian/source-foundations';
import { SvgGuardianLiveLogo } from '@guardian/source-react-components';
import type { ReactElement } from 'react';
import { darkModeCss } from 'styles';

const richLinkWidth = '8.75rem';

type LiveEventLinkProps = {
	url: string;
	linkText: string;
	price?: string;
	image?: string;
	start?: string;
};

const liveEventLinkStyles: SerializedStyles = css`
	background: ${neutral[97]};

	a {
		display: inline-block;
		text-decoration: none;
		color: ${neutral[7]};

		div {
			background: #b84376;
			color: white;
			padding: ${remSpace[3]} ${remSpace[9]} ${remSpace[3]} ${remSpace[3]};

			svg {
				fill: currentColor;
			}
		}

		img {
			width: 100%;
		}

		section {
			padding: ${remSpace[3]};
			${textSans14};

			h1 {
				margin: 0 0 ${remSpace[3]} 0;
				${headlineBold17}
				hyphens: auto;
			}

			p {
				margin-top: 0;
			}

			button {
				background: none;
				border: none;
				${textSans15};
				padding: 0;
				margin: 0;
				background: #b84376;
				color: ${neutral[100]};
				border-radius: 1.5rem;
				padding: 0 ${remSpace[3]};
			}
		}
	}

	float: left;
	clear: left;
	margin: ${remSpace[3]} ${remSpace[4]} ${remSpace[3]} 0;

	width: ${richLinkWidth};

	${darkModeCss`
            background-color: ${neutral[20]};
            button::before {
                border-color: ${neutral[60]};
            }

            a, h1, button {
                color: ${neutral[60]};
            }
        `}
`;

const LiveEventLink = (props: LiveEventLinkProps): ReactElement => {
	const { url, image, linkText, start, price } = props;
	const headerImage = image ? <img src={image} alt="Live event" /> : null;
	return (
		<aside css={liveEventLinkStyles}>
			<a href={url}>
				<div>
					<SvgGuardianLiveLogo />
				</div>
				{headerImage}
				<section>
					<h1>{linkText}</h1>
					<time>{start}</time>
					<p>{price}</p>
					<button>Book now</button>
				</section>
			</a>
		</aside>
	);
};

export default LiveEventLink;
