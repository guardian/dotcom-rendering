// @flow
import styled from 'react-emotion';

import SupportTheGuardian from './SupportTheGuardian';
import Link from './Link';
import Search from './Search';

const TopBar = styled('div')({
    left: 0,
    position: 'absolute',
    top: 0,
});

export default ({ items, ...props }) => (
    <TopBar>
        {props.isPayingMember ||
            props.isRecentContributor || (
                <SupportTheGuardian href="/">
                    Support The Guardian
                </SupportTheGuardian>
            )}
        {items.map(item => (
            <Link href={item.href} key={item.text}>
                {item.text}
            </Link>
        ))}

        <Search href="/">Search</Search>
    </TopBar>
);
