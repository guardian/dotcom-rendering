import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	textSans12,
} from '@guardian/source/foundations';

const textStyles = css`
	${textSans12};
	color: ${sourcePalette.neutral[46]};
`;

export const HostedContentDisclaimer = () => {
	return (
		<p css={textStyles}>
			This article was paid for, produced and controlled by the advertiser
			rather than the publisher. It is subject to regulation by the
			Advertising Standards Authority. This content is produced by the
			advertiser with no involvement from Guardian News and Media staff.
		</p>
	);
};
