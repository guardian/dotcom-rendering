import React from 'react';
// import { css } from 'emotion';
import { Caption } from '@frontend/web/components/Caption';

type Props = {
	captionText?: string;
	format: Format;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
	shouldLimitWidth?: boolean;
	isOverlayed?: boolean;
};

export const CaptionBlockComponent = ({
	captionText,
	format,
	padCaption = false,
	credit,
	displayCredit = true,
	shouldLimitWidth = false,
	isOverlayed,
}: Props) => (
	<Caption
		format={format}
		captionText={captionText}
		padCaption={padCaption}
		credit={credit}
		displayCredit={displayCredit}
		shouldLimitWidth={shouldLimitWidth}
		isOverlayed={isOverlayed}
	/>
);
