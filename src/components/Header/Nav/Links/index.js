// @flow
import styled from 'react-emotion';

import SupportTheGuardian from './SupportTheGuardian';
import Link from './Link';
import Search from './Search';

const Links = styled('div')({
    left: 0,
    top: 0,
    position: 'absolute',
});
Links.displayName = 'Links';

export default ({ links, ...props }) => (
    <Links>
        {props.isPayingMember ||
            props.isRecentContributor || (
                <SupportTheGuardian href="/">
                    Support The Guardian
                </SupportTheGuardian>
            )}
        {links.map(link => (
            <Link href={link.href} key={link.text}>
                {link.text}
            </Link>
        ))}

        <Search href="/">Search</Search>
    </Links>
);
