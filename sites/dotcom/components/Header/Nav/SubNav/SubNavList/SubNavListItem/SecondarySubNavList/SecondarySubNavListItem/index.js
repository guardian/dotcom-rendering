// @flow
import { styled } from '@guardian/guui';

import SubNavTitle from './SubNavTitle';

const SecondarySubNavListItem = styled('li')({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
});
SecondarySubNavListItem.displayName = 'SecondarySubNavListItem';

type Props = { link: { href: string, label: string } };

export default ({ link }: Props) => (
    <SecondarySubNavListItem>
        <SubNavTitle link={link} />
    </SecondarySubNavListItem>
);
