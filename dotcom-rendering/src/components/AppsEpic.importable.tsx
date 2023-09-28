import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { IEpic } from '@guardian/bridget/Epic';
import {
	body as bodySizes,
	from,
	headline,
	palette,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { getAcquisitionsClient, getUserClient } from '../lib/bridgetApi';
import { EpicContent } from './EpicContent.apps';

export const AppsEpic = () => {
	const [isPremium, setIsPremium] = useState<boolean>(true); // Default to true, so we initially don't show the epic
	const [epic, setEpic] = useState<IEpic | undefined>(undefined);

	useEffect(() => {
		void getUserClient()
			.isPremium()
			.then(setIsPremium)
			.catch(() => undefined);
	}, []);

	useEffect(() => {
		void getAcquisitionsClient()
			.getEpics()
			.then((maybeEpic) => {
				setEpic(maybeEpic?.epic);
			})
			.catch(() => undefined);
	}, []);

	if (!isPremium && epic) {
		const { title, body, firstButton, secondButton } = epic;
		const epicProps = {
			title,
			body,
			firstButton,
			secondButton,
		};
		return (
			<div css={epicStyles}>
				<EpicContent {...epicProps} />
			</div>
		);
	}
	return null;
};

const epicStyles: SerializedStyles = css`
	& > div {
		${from.wide} {
			margin: ${remSpace[3]} 0;
		}

		border-top: 1px solid ${palette.brandAlt[400]};
		background: ${palette.neutral[97]};
		padding: ${remSpace[3]};
		${bodySizes.medium()}
		clear: left;
	}

	h1:first-of-type {
		margin-top: 0;
		${headline.xsmall()}
	}

	button {
		margin: 0 ${remSpace[3]} ${remSpace[3]} 0;
	}

	.button-container {
		margin-top: ${remSpace[9]};
	}

	mark {
		background: ${palette.brandAlt[400]};
		padding: 0.1rem 0.125rem;
	}

	/* Source Button styles */
	.button-container svg {
		margin-right: -4px;
		flex: 0 0 auto;
		display: block;
		fill: currentColor;
		position: relative;
		width: 30px;
		height: auto;
	}

	.src-button-space {
		width: 12px;
	}

	button {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: 0.3s ease-in-out;
		text-decoration: none;
		white-space: nowrap;
		${textSans.medium()}
		line-height: 1.5;
		font-weight: 700;
		height: 44px;
		min-height: 44px;
		padding: 0 20px;
		border-radius: 44px;
		padding-bottom: 2px;
		background-color: ${palette.brandAlt[400]};
		color: ${palette.brand[400]};
		margin: 0 ${remSpace[3]} ${remSpace[3]} 0;
	}
`;
