import { MostViewedFooterLayout } from './MostViewedFooterLayout';

type Props = {
	sectionName?: string;
	format: ArticleFormat;
	ajaxUrl: string;
};

export const MostViewedFooter = ({ sectionName, format, ajaxUrl }: Props) => {
	return (
		<MostViewedFooterLayout
			sectionName={sectionName}
			format={format}
			ajaxUrl={ajaxUrl}
		/>
	);
};
