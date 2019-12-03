// ----- Imports ----- //

import React from 'react';
import { Contributor } from 'types/capi';
import { isSingleContributor } from 'types/capi';


// ----- Component ----- //

interface Props {
    contributors: Contributor[];
}

function Follow({ contributors }: Props): JSX.Element | null {

    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.apiUrl) {
        return <div className="follow">Follow { contributor.webTitle }</div>;
    }

    return null;

}


// ----- Exports ----- //

export default Follow;
