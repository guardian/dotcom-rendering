// @flow
import Dropdown from '@guardian/guui/dropdown';

import { styled } from '@guardian/guui';

const EditionDropdown = styled('div')({
    position: 'absolute',
    right: '15px',
});

export default () => {
    const links = [
        {
            url: 'foo',
            title: 'bar1',
        },
        {
            url: 'foo',
            title: 'bar2',
        },
        {
            url: 'foo',
            title: 'bar3',
        },
    ];

    return (
        <EditionDropdown>
            <Dropdown label="edition" links={links} />
        </EditionDropdown>
    );
};
