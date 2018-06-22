// @flow
import { styled } from '@guardian/guui';

import MainMenuLinkTitle from './MainMenuLinkTitle';

import type { ColumnType } from '../../../../../../Nav/__config__';

const MainMenuLink = styled('li')({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
});
MainMenuLink.displayName = 'MainMenuLink';

type Props = {
    column: ColumnType,
    isPillar: boolean,
    link: { href: string, label: string },
};

export default ({ link, column, isPillar }: Props) => (
    <MainMenuLink role="none">
        <MainMenuLinkTitle link={link} column={column} isPillar={isPillar} />
    </MainMenuLink>
);
