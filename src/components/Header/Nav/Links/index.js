// @flow
import styled from 'react-emotion';
import { Subscribe } from 'unstated';
import App from 'lib/AppContainer';

import SupportTheGuardian from './SupportTheGuardian';
import Link from './Link';
import Search from './Search';

const Links = styled('div')({
    left: 0,
    top: 0,
    position: 'absolute',
});
Links.displayName = 'Links';

export default props => (
    <Links>
        {props.isPayingMember ||
            props.isRecentContributor || (
                <SupportTheGuardian href="/">
                    Support The Guardian
                </SupportTheGuardian>
            )}
        <Subscribe to={[App]}>
            {app =>
                app.state.header.links.map(({ href, text }, i) => (
                    <Link href={href} key={text} showAtTablet={i < 2}>
                        {text}
                    </Link>
                ))
            }
        </Subscribe>
        <Search href="/">Search</Search>
    </Links>
);
