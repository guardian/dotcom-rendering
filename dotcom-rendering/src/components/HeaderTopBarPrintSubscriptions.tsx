import { css } from '@emotion/react';
import { from, palette, textSansBold17 } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { addTrackingCodesToUrl } from '../lib/acquisitions';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { usePageViewId } from '../lib/usePageViewId';
import NewspaperIcon from '../static/icons/newspaper.svg';
import { useConfig } from './ConfigContext';

interface PrintSubscriptionsProps {
	editionId: EditionId;
}

const printSubscriptionStyles = css`
	display: none;

	${from.desktop} {
		display: flex;
	}
`;

const linkStyles = css`
	display: flex;
	align-items: center;
	${textSansBold17};
	font-size: 1rem;
	height: fit-content;
	line-height: 1;
	color: ${palette.brandAlt[400]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 7px 10px 7px 6px;
	}

	:hover,
	:focus {
		text-decoration: underline;
	}

	svg {
		fill: currentColor;
		float: left;
		height: 18px;
		width: 18px;
		margin: 0 4px 0 0;
	}
`;

export const HeaderTopBarPrintSubscriptions = ({
	editionId,
}: PrintSubscriptionsProps) => {
	const { renderingTarget } = useConfig();
	const pageViewId = usePageViewId(renderingTarget);

	const [referrerUrl, setReferrerUrl] = useState('');
	useEffect(() => {
		setReferrerUrl(window.location.origin + window.location.pathname);
	}, []);

	const href = addTrackingCodesToUrl({
		base: `https://support.theguardian.com/subscribe${
			editionId === 'UK' ? '' : '/weekly'
		}`,
		componentType: 'ACQUISITIONS_HEADER',
		componentId: 'PrintSubscriptionsHeaderLink',
		pageViewId,
		referrerUrl,
	});

	return (
		<div css={printSubscriptionStyles}>
			<a
				href={href}
				css={linkStyles}
				data-link-name={nestedOphanComponents(
					'nav3',
					'topbar',
					'printsubs',
				)}
			>
				<NewspaperIcon />
				<>Print subscriptions</>
			</a>
		</div>
	);
};
