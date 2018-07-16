// @flow
import { styled } from '@guardian/guui';
import { connect } from 'unistore/react';

import SupportTheGuardian from './SupportTheGuardian';
import Link from './Link';
import Search from './Search';

const Links = styled('div')({
    left: 0,
    top: 0,
    position: 'absolute',
});

const userLinks = [
    {
        text: 'Subscribe',
        href: '/',
    },
    {
        text: 'Find a job',
        href: '/',
    },
    {
        text: 'Sign in',
        href: '/',
    },
];

export default connect('header')(({ isPayingMember, isRecentContributor }) => (
    <Links>
        {isPayingMember ||
            isRecentContributor || (
                <SupportTheGuardian href="/">
                    Support The Guardian
                </SupportTheGuardian>
            )}
        {userLinks.map(({ href, text }, i) => (
            <Link href={href} key={text} showAtTablet={i < 2}>
                {text}
            </Link>
        ))}
        <Search href="/">Search</Search>
    </Links>
));
