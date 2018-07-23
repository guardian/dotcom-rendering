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
            title: 'UK Edition',
            isActive: true,
        },
        {
            url: 'foo',
            title: 'US Edition',
        },
        {
            url: 'foo',
            title: 'Australian Edition',
        },
        {
            url: 'foo',
            title: 'International Edition',
        },
    ];

    return (
        <EditionDropdown>
            <Dropdown label="UK Edition" links={links} />
        </EditionDropdown>
    );
};
