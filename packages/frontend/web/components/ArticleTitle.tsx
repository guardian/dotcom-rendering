import React from 'react';
import { css } from 'emotion';

import { SeriesSectionLink } from './SeriesSectionLink';

const sectionStyles = css`
    height: 157px;
    padding-top: 8px;
`;

type Props = {
    CAPI: CAPIType;
    fallbackToSection: boolean;
};

export const ArticleTitle = ({ CAPI, fallbackToSection }: Props) => (
    <div className={sectionStyles}>
        <SeriesSectionLink CAPI={CAPI} fallbackToSection={fallbackToSection} />
    </div>
);
