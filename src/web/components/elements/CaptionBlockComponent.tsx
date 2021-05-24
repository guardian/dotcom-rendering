import { Caption } from '@frontend/web/components/Caption';

type Props = {
	captionText?: string;
	format: Format;
	palette: Palette;
	padCaption?: boolean;
	credit?: string;
	displayCredit?: boolean;
	shouldLimitWidth?: boolean;
	isOverlayed?: boolean;
};

export const CaptionBlockComponent = ({
	captionText,
	format,
	palette,
	padCaption = false,
	credit,
	displayCredit = true,
	shouldLimitWidth = false,
	isOverlayed,
}: Props) => (
	<Caption
		format={format}
		palette={palette}
		captionText={captionText}
		padCaption={padCaption}
		credit={credit}
		displayCredit={displayCredit}
		shouldLimitWidth={shouldLimitWidth}
		isOverlayed={isOverlayed}
	/>
);
