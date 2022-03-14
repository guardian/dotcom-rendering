import { Caption } from './Caption';

type Props = {
	captionText?: string;
	format: ArticleFormat;
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
