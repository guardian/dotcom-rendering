// ----- Section ----- //

import type { Option } from "@guardian/types/option";
import { map, withDefault } from "@guardian/types/option";
import { pipe2 } from "lib";
import type { FC, ReactElement } from "react";
import React from "react";

// ----- Sub-Components ----- //

interface ClientJsProps {
    src: Option<string>;
}

const ClientJs: FC<ClientJsProps> = ({ src }) =>
    pipe2(
        src,
        map((s) => <script src={s}></script>),
        withDefault<ReactElement | null>(null)
    );

// ----- Component ----- //

interface Props {
    clientScript: Option<string>;
    twitter: boolean;
}

const Scripts: FC<Props> = ({ clientScript, twitter }) => (
    <>
        <ClientJs src={clientScript} />
        {twitter ? (
            <script src="https://platform.twitter.com/widgets.js"></script>
        ) : null}
    </>
);

// ----- Exports ----- //

export default Scripts;
