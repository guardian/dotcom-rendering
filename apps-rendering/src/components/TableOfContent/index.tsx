import { css, SerializedStyles } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
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

const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.paragraph(format)};
	border-bottom: none;
	:hover {
		border-bottom: 0.0625rem solid ${neutral[86]};
	}
`;

const listStyles = css`
	> li::before {
		content: none;
	}

	padding-left: ${remSpace[3]};
`;

const listItemStyles = css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'regular' })}
`;

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
			<OrderedList className={listStyles}>
				{outline.map((ol) => (
					<ListItem format={format} className={listItemStyles}>
						<Anchor
							format={format}
							href={'#' + ol.id}
							className={anchorStyles(format)}
						>
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
