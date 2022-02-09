import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { WithABProvider } from './WithABProvider';

type Props = {
	sectionName?: string;
	format: ArticleFormat;
	ajaxUrl: string;
	switches: Switches;
	pageIsSensitive: boolean;
	isDev?: boolean;
};

export const MostViewedFooter = ({
	sectionName,
	format,
	ajaxUrl,
	switches,
	pageIsSensitive,
	isDev,
}: Props) => {
	return (
		<WithABProvider
			abTestSwitches={switches}
			pageIsSensitive={pageIsSensitive}
			isDev={!!isDev}
		>
			<MostViewedFooterLayout
				sectionName={sectionName}
				format={format}
				ajaxUrl={ajaxUrl}
			/>
		</WithABProvider>
	);
};
