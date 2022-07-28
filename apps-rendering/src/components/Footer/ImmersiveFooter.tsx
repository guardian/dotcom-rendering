// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { FC } from 'react';
import { ArticleFormat } from '@guardian/libs';
import DefaultFooter, { defaultStyles } from './Footer.defaults';
import { grid } from 'grid/grid';
import LeftCentreBorder from 'grid/LeftCentreBorder';
import { from, neutral } from '@guardian/source-foundations';

// ----- Component ----- //

const styles: SerializedStyles = css`
    ${grid.container}
    background-color: ${neutral[97]};
`;

const footerStyles: SerializedStyles = css`
    ${grid.column.centre}
    padding-left: 0;
    padding-right: 0;
    grid-row: 1;

    ${from.desktop} {
        ${grid.between('centre-column-start', 'right-column-end')}
    }
`;

interface Props {
	format: ArticleFormat;
	isCcpa: boolean;
}

const ImmersiveFooter: FC<Props> = ({ format, isCcpa }) =>
    <div css={styles}>
        <LeftCentreBorder rows={[1, 2]} />
        <DefaultFooter
            css={css(defaultStyles(format), footerStyles)}
            isCcpa={isCcpa}
        />
    </div>

// ----- Exports ----- //

export default ImmersiveFooter;
