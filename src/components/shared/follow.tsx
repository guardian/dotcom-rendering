// ----- Imports ----- //

import React from 'react';
import { Contributor } from 'capi';
import { isSingleContributor } from 'capi';


// ----- Component ----- //

interface Props {
    contributors: Contributor[];
}

function Follow({ contributors }: Props): JSX.Element | null {

    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.apiUrl) {
        return <div className="js-follow follow" data-id={contributor.id}><span className="js-status">Follow</span> { contributor.webTitle }</div>;
    }

    return null;

}


// ----- Exports ----- //

export default Follow;
