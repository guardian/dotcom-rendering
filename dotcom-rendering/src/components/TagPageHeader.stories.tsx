import { TagPageHeader } from './TagPageHeader';

export default {
	component: TagPageHeader,
	title: 'Components/TagPageHeader',
};

export const tagPageHeader = () => {
	return (
		<>
			<p>Only a title</p>
			<TagPageHeader title={'Only a title'} />
			<p>A title & a description</p>
			<TagPageHeader
				title={'Example title'}
				description="<p>And a much longer description with lots of text, other thoughts and musings</p>"
			/>
			<p>A title & a description with links</p>
			<TagPageHeader
				title={'Example title'}
				description={`<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`}
			/>
			<p>A title & a description & an image</p>
			<TagPageHeader
				title={'Example title'}
				description={`<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`}
				image={
					'https://uploads.guim.co.uk/2023/02/17/Josh_Halliday.jpg'
				}
			/>
			<p>A title & a description & an football crest</p>
			<TagPageHeader
				title={'Aston Villa'}
				description={`<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`}
				image={'https://sport.guim.co.uk/football/crests/120/2.png'}
			/>
		</>
	);
};
