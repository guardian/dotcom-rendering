// ----- Imports ----- //

import { css } from '@emotion/react';
import { immersiveCaptionId } from 'components/MainMedia';
import MainMedia from 'components/MainMedia';
import { getFormat, Item } from 'item';
import type { FC } from 'react';
import { grid } from 'grid/grid';
import Series from 'components/Series';
import Headline from 'components/Headline';
import Standfirst from 'components/Standfirst';

// ----- Component ----- //

const headerStyles = css`
    ${grid.container}
`;

const bodyStyles = css`
    ${grid.container}
`;

type Props = {
    item: Item;
}

const ImmersiveLayout: FC<Props> = ({ item }) => (
    <>
        <main>
            <article>
                <header css={headerStyles}>
                    <MainMedia
                        mainMedia={item.mainMedia}
                        format={getFormat(item)}
                    />
                    <Series item={item} />
                    <Headline item={item} />
                    <Standfirst item={item} />
                    <p id={immersiveCaptionId}>Immersive caption</p>
                    <div>Metadata</div>
                </header>
                <div css={bodyStyles}>
                    Body
                    <section>Tags</section>
                </div>
            </article>
        </main>
        <aside>Related content</aside>
        <aside>Comments</aside>
        <footer>Footer</footer>
    </>
)

// ----- Exports ----- //

export default ImmersiveLayout;
