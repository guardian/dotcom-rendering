import { css } from '@emotion/react';

import { ArticleDesign, ArticleDisplay, ArticlePillar, ArticleSpecial } from '@guardian/libs';
import { breakpoints } from '@guardian/src-foundations';
import { Pagination } from './Pagination';

export default {
	component: Pagination,
	title: 'Components/Pagination',
	parameters: {
		layout: 'padded'
	}
	// breakpoints:
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

const formatMap = {
	news: { ...defaultFormat, theme: ArticlePillar.News  },
	sport: { ...defaultFormat, theme: ArticlePillar.Sport  },
	culture: { ...defaultFormat, theme: ArticlePillar.Culture  },
	lifestyle: { ...defaultFormat, theme: ArticlePillar.Lifestyle  },
	opinion: { ...defaultFormat, theme: ArticlePillar.Opinion  },
	specialReport: { ...defaultFormat, theme: ArticleSpecial.SpecialReport  },
	labs: { ...defaultFormat, theme: ArticleSpecial.Labs  },
}


export const defaultStory = () => {

	return (
		<>
			<Pagination currentPage={2} totalPages={6} format={formatMap.news} />
			<Pagination currentPage={2} totalPages={6} format={formatMap.sport} />
			<Pagination currentPage={2} totalPages={6} format={formatMap.culture} />
			<Pagination currentPage={2} totalPages={6} format={formatMap.lifestyle} />
			<Pagination currentPage={2} totalPages={6} format={formatMap.opinion} />
			<Pagination currentPage={2} totalPages={6} format={formatMap.specialReport} />
			<Pagination currentPage={2} totalPages={6} format={formatMap.labs} />

		</>
	);
};
defaultStory.story = { name: 'default', parameters: { chromatic : { viewports: [breakpoints.mobile, breakpoints.wide]}}};
