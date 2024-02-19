import { FrontPagination } from './FrontPagination';

export default {
	component: FrontPagination,
	title: 'Components/FrontPagination',
};

export const tagPageHeader = () => {
	return (
		<>
			<p>1st page, 10 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={1}
				lastPage={10}
				totalContent={1000}
			/>
			<p>2nd page, 10 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={2}
				lastPage={10}
				totalContent={1000}
			/>
			<p>3rd page, 10 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={3}
				lastPage={10}
				totalContent={1000}
			/>
			<p>5th page, 10 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={5}
				lastPage={10}
				totalContent={1000}
			/>
			<p>8th page, 10 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={8}
				lastPage={10}
				totalContent={1000}
			/>
			<p>9th page, 10 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={9}
				lastPage={10}
				totalContent={1000}
			/>
			<p>10th page, 10 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={10}
				lastPage={10}
				totalContent={1000}
			/>
			<p>1st page, 2 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={1}
				lastPage={2}
				totalContent={1000}
			/>
			<p>2nd page, 2 total pages</p>
			<FrontPagination
				pageId="tone/test"
				sectionName="Test Tone"
				currentPage={2}
				lastPage={2}
				totalContent={1000}
			/>
		</>
	);
};
