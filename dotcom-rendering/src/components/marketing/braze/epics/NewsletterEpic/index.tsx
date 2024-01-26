import { css, ThemeProvider } from '@emotion/react';
import {
	body,
	brand,
	from,
	headline,
	neutral,
	news,
	space,
	until,
} from '@guardian/source-foundations';
import { CTA, NewsletterFrequency } from '../../common/newsletter';
import type { NewsletterSubscribeCallback } from '../../types/dcrTypes';
import type { TrackClick } from '../../utils/tracking';
import { canRender, COMPONENT_NAME } from './canRender';

const styles = {
	epicContainer: css`
		padding: 4px 8px 12px;
		border-top: 1px solid ${news[400]};
		background-color: ${neutral[97]};
		display: flex;
		flex-direction: row;
		max-width: 620px;
	`,
	rightSection: css`
		padding-left: 12px;
	`,
	image: css`
		width: 196px;

		${until.desktop} {
			width: 96px;
		}
	`,
	heading: css`
		${headline.small({ fontWeight: 'bold' })};
		margin: 0;
		max-width: 100%;

		${from.mobileLandscape} {
			${headline.small({ fontWeight: 'bold' })};
		}

		${from.tablet} {
			max-width: 100%;
		}
	`,
	paragraph: css`
		${body.medium()}
		line-height: 135%;
		margin: ${space[5]}px 0 ${space[5]}px;
		max-width: 100%;
		color: ${neutral[0]};

		${from.phablet} {
			max-width: 90%;
		}

		${from.tablet} {
			max-width: 100%;
		}

		${from.desktop} {
			margin: ${space[3]}px 0 ${space[4]}px;
			max-width: 42rem;
		}

		${from.leftCol} {
			max-width: 37rem;
		}

		${from.wide} {
			max-width: 42rem;
		}
	`,
};

export type BrazeMessageProps = {
	header?: string;
	frequency?: string;
	paragraph1?: string;
	paragraph2?: string;
	imageUrl?: string;
	newsletterId?: string;
	ophanComponentId?: string;
};

export type Props = {
	brazeMessageProps: BrazeMessageProps;
	subscribeToNewsletter: NewsletterSubscribeCallback;
	trackClick: TrackClick;
};

export const NewsletterEpic = (props: Props) => {
	const {
		brazeMessageProps: {
			header,
			frequency,
			paragraph1,
			paragraph2,
			imageUrl,
			newsletterId,
			ophanComponentId,
		},
		subscribeToNewsletter,
		trackClick,
	} = props;

	if (!canRender(props.brazeMessageProps)) {
		return <></>;
	}

	return (
		<ThemeProvider theme={brand}>
			<section css={styles.epicContainer}>
				<div>
					<img alt="" css={styles.image} src={imageUrl}></img>
				</div>
				<div css={styles.rightSection}>
					<span css={styles.heading}>{header}</span>
					<NewsletterFrequency frequency={frequency} />
					<p css={styles.paragraph}>{paragraph1}</p>
					{paragraph2 ? (
						<p css={styles.paragraph}>{paragraph2}</p>
					) : null}
					<CTA
						subscribeToNewsletter={subscribeToNewsletter}
						newsletterId={newsletterId as string}
						ophanComponentId={ophanComponentId}
						trackClick={trackClick}
					/>
				</div>
			</section>
		</ThemeProvider>
	);
};

export { COMPONENT_NAME };
