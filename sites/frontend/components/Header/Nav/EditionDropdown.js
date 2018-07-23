// @flow
// import styled from '@guardian/guui';
import Dropdown from '@guardian/guui/dropdown';

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
    return <Dropdown links={links} />;
};
