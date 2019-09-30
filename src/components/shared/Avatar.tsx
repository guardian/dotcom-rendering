// ----- Imports ----- //

import { Contributor } from 'types/Capi';
import { isSingleContributor } from 'utils/capi';


// ----- Component ----- //

interface Props {
    contributors: Contributor[];
}

function Avatar({ contributors }: Props): JSX.Element | null {

    const [contributor] = contributors;

    if (isSingleContributor(contributors) && contributor.bylineLargeImageUrl) {
        return (
            <div className="avatar">
                <img src={contributor.bylineLargeImageUrl} alt={contributor.webTitle}/>
            </div>
        );
    }
    
    return null;

}


// ----- Exports ----- //

export default Avatar;
