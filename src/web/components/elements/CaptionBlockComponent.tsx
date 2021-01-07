import React from 'react';
// import { css } from 'emotion';
import { Caption } from '@frontend/web/components/Caption';
import { Display } from '@guardian/types/Format';

type Props = {
	display: Display;
	design: Design;
	captionText?: string;
	pillar: CAPIPillar;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
	shouldLimitWidth?: boolean;
	isOverlayed?: boolean;
};

export const CaptionBlockComponent = ({
	display,
	design,
	captionText,
	pillar,
	padCaption = false,
	credit,
	displayCredit = true,
	shouldLimitWidth = false,
	isOverlayed,
}: Props) => (
	<Caption
		display={display}
		design={design}
		captionText={captionText}
		pillar={pillar}
		padCaption={padCaption}
		credit={credit}
		displayCredit={displayCredit}
		shouldLimitWidth={shouldLimitWidth}
		isOverlayed={isOverlayed}
	/>
);
