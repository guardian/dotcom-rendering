import { css } from '@emotion/react';
import { ArticleDesign, ArticlePillar, ArticleSpecial } from '@guardian/libs';
import {
	DottedLines,
	StraightLines,
} from '@guardian/source-react-components-development-kitchen';
import { GuardianLabsLines } from './GuardianLabsLines';

type Props = {
	format: ArticleFormat;
	color?: string;
	useLabsLines?: boolean;
};

export const DecideLines = ({ format, color, useLabsLines }: Props) => {
	const count = format.design === ArticleDesign.Comment ? 8 : 4;

	if (useLabsLines && format.theme === ArticleSpecial.Labs) {
		return <GuardianLabsLines />;
	}

	switch (format.theme) {
		case ArticlePillar.Sport:
			return (
				<DottedLines
					cssOverrides={css`
						display: block;
					`}
					count={count}
					color={color}
				/>
			);
		default:
			return (
				<StraightLines
					cssOverrides={css`
						display: block;
					`}
					count={count}
					color={color}
				/>
			);
	}
};
