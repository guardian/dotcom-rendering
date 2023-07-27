import { TagFrontHeader } from './TagFrontHeader';

export default {
	component: TagFrontHeader,
	title: 'Components/TagFrontHeader',
};

export const tagFrontHeader = () => {
	return (
		<>
			<p>Only a title</p>
			<TagFrontHeader title={'Only a title'} />
			<p>A title & a description</p>
			<TagFrontHeader
				title={'Example title'}
				description="<p>And a much longer description with lots of text, other thoughts and musings</p>"
			/>
			<p>A title & a description with links</p>
			<TagFrontHeader
				title={'Example title'}
				description={`<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`}
			/>
			<p>A title & a description & an image</p>
			<TagFrontHeader
				title={'Example title'}
				description={`<p>And a much longer description with lots of text, other thoughts and musings <a href="#">and a link</a></p>`}
				image={
					'https://uploads.guim.co.uk/2023/02/17/Josh_Halliday.jpg'
				}
			/>
		</>
	);
};
