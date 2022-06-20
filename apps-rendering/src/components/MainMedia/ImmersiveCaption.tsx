// ----- Imports ----- //

import { MainMedia, MainMediaKind } from 'mainMedia';
import type { FC } from 'react';
import { Option, OptionKind } from '@guardian/types';
import { maybeRender } from 'lib';
import { ArticleFormat } from '@guardian/libs';
import Caption from 'components/caption';
import { immersiveCaptionId } from './MainMedia.defaults';
import { css } from '@emotion/react';
import { from, neutral, remSpace, textSans } from '@guardian/source-foundations';
import { grid } from 'grid/grid';

// ----- Component ----- //

const styles = css`
    ${textSans.xsmall()}
    color: ${neutral[46]};
    ${grid.column.centre}
    padding-top: ${remSpace[9]};

    ${from.leftCol} {
        ${grid.column.left}
        grid-row: 4;
        padding-top: ${remSpace[1]};
    }
`;

type Props = {
    mainMedia: Option<MainMedia>;
    format: ArticleFormat;
}

const ImmersiveCaption: FC<Props> = ({ mainMedia, format }) =>
    maybeRender(mainMedia, (media) => {
        if (media.kind === MainMediaKind.Video) {
            return null;
        }

        const { caption, credit} = media.image;

        if (
            caption.kind === OptionKind.None &&
            credit.kind === OptionKind.None
        ) {
            return null;
        }
    
        return (
            <p id={immersiveCaptionId} css={styles}>
                {maybeRender(caption, (cap) =>
                    <Caption caption={cap} format={format} />
                )}
                {' '}
                {maybeRender(credit, (cred) => <>{cred}</>)}
            </p>
        );
    });

// ----- Exports ----- //

export default ImmersiveCaption;
