// @flow
import { styled } from '@guardian/guui';

import MainMenuPillarLinkTitle from './MainMenuPillarLinkTitle';

const MainMenuPillarLink = styled('li')({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
});
MainMenuPillarLink.displayName = 'MainMenuPillarLink';

type Props = { link: { href: string, label: string } };

export default ({ link }: Props) => (
    <MainMenuPillarLink role="none">
        <MainMenuPillarLinkTitle link={link} />
    </MainMenuPillarLink>
);
