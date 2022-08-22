import { css, SerializedStyles } from '@emotion/react';
import { ArticleFormat, ArticleSpecial } from '@guardian/libs';
import { headline, remSpace, textSans } from '@guardian/source-foundations';
import { withDefault } from '@guardian/types';
import Anchor from 'components/Anchor';
import HorizontalRule from 'components/HorizontalRule';
import { ReactNode } from 'react';
import { getHref } from 'renderer';
import type { HeadingTwo as HeadingTwoType } from 'bodyElement';

interface Props {
	format: ArticleFormat;
	isEditions: boolean;
	heading: HeadingTwoType;
}

const styles = (format: ArticleFormat): SerializedStyles => {
	const font =
		format.theme === ArticleSpecial.Labs
			? textSans.large({ fontWeight: 'bold' })
			: headline.xxsmall({ fontWeight: 'bold' });

	return css`
		${font}
		margin: ${remSpace[4]} 0 4px 0;

		& + p {
			margin-top: 0;
		}
	`;
};

const headingTextElement =
	(format: ArticleFormat, isEditions = false) =>
	(node: Node, key: number): ReactNode => {
		const text = node.textContent ?? '';
		const children = Array.from(node.childNodes).map(
			headingTextElement(format, isEditions),
		);

		switch (node.nodeName) {
			case '#text':
				return text;
			case 'A':
				return (
					<Anchor
						href={withDefault('')(getHref(node))}
						format={format}
						isEditions={isEditions}
						key={key}
					>
						{children}
					</Anchor>
				);
			case 'EM':
				return <em key={key}>{children}</em>;
			default:
				return null;
		}
	};

const HeadingTwo: React.FC<Props> = ({ format, isEditions, heading }) => {
	const text = heading.doc.textContent ?? '';
	const children = Array.from(heading.doc.childNodes).map(
		headingTextElement(format, isEditions),
	);

	return text.includes('* * *') ? (
		<HorizontalRule />
	) : (
		<h2
			id={heading.toc
				.map<string | undefined>((t) => t.id)
				.withDefault(undefined)}
			css={styles(format)}
		>
			{children}
		</h2>
	);
};

export default HeadingTwo;
