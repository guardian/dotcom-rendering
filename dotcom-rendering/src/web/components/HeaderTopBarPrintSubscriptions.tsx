import { css } from '@emotion/react';
import { brand, brandAlt, from, textSans } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { ReactComponent as NewspaperIcon } from '../../static/icons/newspaper.svg';
import { addTrackingCodesToUrl } from '../lib/acquisitions';
import type { EditionId } from '../lib/edition';

interface PrintSubscriptionsProps {
	editionId: EditionId;
}

const printSubscriptionStyles = css`
	display: none;

	:before {
		content: '';
		border-left: 1px solid ${brand[600]};
		height: 24px;
	}

	${from.desktop} {
		display: flex;
	}
`;

const linkStyles = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${brandAlt[400]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 7px 10px 7px 5px;
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
		margin: 3px 4px 0 0;
	}
`;

export const HeaderTopBarPrintSubscriptions = ({
	editionId,
}: PrintSubscriptionsProps) => {
	const [pageViewId, setPageViewId] = useState('');
	const [referrerUrl, setReferrerUrl] = useState('');
	useEffect(() => {
		setPageViewId(window.guardian.config.ophan.pageViewId);
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
			<a href={href} css={linkStyles} data-link-name="">
				<NewspaperIcon />
				<>Print subscriptions</>
			</a>
		</div>
	);
};
