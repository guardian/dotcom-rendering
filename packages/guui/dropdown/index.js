// @flow
/*
 * A dropdown component
 */

import { styled } from '@guardian/guui';

type Link = {
    url: string,
    title: string,
};

type Props = {
    links: Array<Link>,
};

const Ul = styled('ul')({
    position: 'absolute',
    right: '15px',
});

export default ({ links }: Props) => (
    <Ul>
        {links.map(link => (
            <li>
                <a href={link.url}>{link.title}</a>
            </li>
        ))}
    </Ul>
);
