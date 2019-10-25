import React from 'react';
import { css } from 'emotion';

import { SeriesSectionLink } from './SeriesSectionLink';

const sectionStyles = css`
    height: 157px;
    padding-top: 8px;
`;

type Props = {
    CAPI: CAPIType;
};

export const ArticleTitle = ({ CAPI }: Props) => (
    <div className={sectionStyles}>
        <SeriesSectionLink CAPI={CAPI} fallbackToSection={true} />
    </div>
);
