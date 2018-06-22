// @flow
import { styled } from '@guardian/guui';

import MainMenuLinkTitle from './MainMenuLinkTitle';

const MainMenuLink = styled('li')({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
});
MainMenuLink.displayName = 'MainMenuLink';

type Props = { link: { href: string, label: string } };

export default ({ link }: Props) => (
    <MainMenuLink role="none">
        <MainMenuLinkTitle link={link} />
    </MainMenuLink>
);
