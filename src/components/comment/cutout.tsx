// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { Contributor, isSingleContributor } from 'contributor';
import Img from 'components/img';
import { darkModeCss } from 'styles';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';
import { Format } from '@guardian/types/Format';


// ----- Styles ----- //

const styles = css`
    position: relative;
`;

const imageStyles = css`
    position: absolute;
    height: 160px;
    right: 0;
    top: -48px;
    background: none;

    ${darkModeCss`
        background: none;
    `}
`;


// ----- Component ----- //

interface Props {
    contributors: Contributor[];
    className: SerializedStyles;
    format: Format;
}

const Cutout = ({ contributors, className, format }: Props): JSX.Element | null => {
    const [contributor] = contributors;

    if (!isSingleContributor(contributors)) {
        return null;
    }

    return pipe2(
        contributor.image,
        map(image =>
            <div css={[className, styles]}>
                <Img
                    image={image}
                    sizes="12rem"
                    className={imageStyles}
                    format={format}
                />
            </div>
        ),
        withDefault<ReactElement | null>(null),
    );
}


// ----- Exports ----- //

export default Cutout;
