// ----- Imports ----- //

import React, { ReactNode } from 'react';

// ----- Component ----- //

interface Props {
    children: ReactNode[];
}

const Interactive = ({ children }: Props): JSX.Element =>
    <main>
        <article>
            {children}
        </article>
    </main>


// ----- Exports ----- //

export default Interactive;
