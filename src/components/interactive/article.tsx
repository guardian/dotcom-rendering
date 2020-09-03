// ----- Imports ----- //

import React, { ReactNode, FC } from 'react';

// ----- Component ----- //

interface Props {
    children: ReactNode[];
}

const Interactive:FC<Props> = ({ children }) =>
    <main>
        <article>
            {children}
        </article>
    </main>


// ----- Exports ----- //

export default Interactive;
