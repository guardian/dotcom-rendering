// @flow
import { styled } from '@guardian/guui';
import { connect } from 'unistore/react';

import SupportTheGuardian from './SupportTheGuardian';
import Link from './Link';
import Search from './Search';

import type { LinkType } from '../__config__';

const Links = styled('div')({
    left: 0,
    top: 0,
    position: 'absolute',
});

const userLinks: Array<LinkType> = [
    {
        title: 'Subscribe',
        longTitle: 'Subscribe',
        url: '/',
    },
    {
        title: 'Find a job',
        longTitle: 'Find a job',
        url: '/',
    },
    {
        title: 'Sign in',
        longTitle: 'Sign in',
        url: '/',
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
        {userLinks.map(({ url, title }, i) => (
            <Link href={url} key={title} showAtTablet={i < 2}>
                {title}
            </Link>
        ))}
        <Search href="/">Search</Search>
    </Links>
));
