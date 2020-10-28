// ----- Imports ----- //

import type { FC } from "react";
import React from "react";

// ----- Component ----- //

interface Props {
    title: string;
    cspString: string;
}

const Meta: FC<Props> = ({ title, cspString }) => (
    <>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <meta name="description" content={title} />
        <meta httpEquiv="Content-Security-Policy" content={cspString} />
    </>
);

// ----- Exports ----- //

export default Meta;
