import { ArticleFormat } from '@guardian/libs';
import Anchor from 'components/Anchor';
import ListItem from 'components/ListItem';
import OrderedList from 'components/OrderedList';
import { Outline } from 'outline';
import { FC } from 'react';

interface Props {
	format: ArticleFormat;
	outline: Outline;
}

interface SubContentsProps {
	format: ArticleFormat;
	subheadings: {
		id: string;
		doc: Node;
	}[];
}

const SubContents: FC<SubContentsProps> = ({ format, subheadings }) => {
	return (
		<OrderedList>
			{subheadings.map((heading) => (
				<ListItem format={format}>
					<Anchor format={format} href={'#' + heading.id}>
						{heading.doc.textContent}
					</Anchor>
				</ListItem>
			))}
		</OrderedList>
	);
};

const TableOfContent: FC<Props> = ({ format, outline }) => {
	return (
		<div>
			<OrderedList>
				{outline.map((ol) => (
					<ListItem format={format}>
						<Anchor format={format} href={'#' + ol.id}>
							{ol.doc.textContent}
						</Anchor>
						{ol.subheadings && (
							<SubContents
								format={format}
								subheadings={ol.subheadings}
							/>
						)}
					</ListItem>
				))}
			</OrderedList>
		</div>
	);
};

export default TableOfContent;
