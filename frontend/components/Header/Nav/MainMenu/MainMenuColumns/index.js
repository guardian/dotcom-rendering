// @flow
import styled from 'react-emotion';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { egyptian } from '@guardian/pasteup/fonts';

import MainMenuColumn from './MainMenuColumn';

const MainMenuColumns = styled('ul')({
    boxSizing: 'border-box',
    maxWidth: 'none',
    [desktop]: {
        maxWidth: 980,
        backgroundColor: '#e9eff1',
        padding: '0 20px',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
    },
    [leftCol]: {
        maxWidth: 1140,
    },
    [wide]: {
        maxWidth: 1300,
    },
});

const BrandExtensionColumn = styled('li')({
    display: 'none',
    position: 'absolute',
    right: 20,
    top: 18,
    bottom: 0,
    [desktop]: {
        display: 'block',
    },
});

const BrandExtensionList = styled('ul')({
    width: 186,
    boxSizing: 'border-box',
    fontSize: 18,
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 0,
    [leftCol]: {
        width: 220,
    },
    [wide]: {
        width: 300,
    },
});

const BrandExtensionListItem = styled('li')({
    marginRight: 0,
    marginTop: -6,
    paddingBottom: 0,
});

const BrandExtensionLink = styled('a')({
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.1,
    backgroundColor: 'transparent',
    border: 0,
    boxSizing: 'border-box',
    color: '#121212',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: egyptian,
    outline: 'none',
    padding: '8px 34px 8px 50px',
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    textDecoration: 'none',
    [tablet]: {
        paddingLeft: 60,
    },
    [desktop]: {
        padding: '6px 0',
    },
    ':hover': {
        color: '#5d5f5f',
        textDecoration: 'underline',
    },
    ':focus': {
        color: '#5d5f5f',
        textDecoration: 'underline',
    },
    '> *': {
        pointerEvents: 'none',
    },
});

type Props = {
    columns: Array<LinkType>,
    brandExtensions: Array<LinkType>,
};

export default ({ columns, brandExtensions }: Props) => (
    <MainMenuColumns role="menubar" tabindex="-1">
        {columns.map((column, i) => (
            <MainMenuColumn
                column={column}
                key={column.title.toLowerCase()}
                isLastIndex={i === columns.length - 1}
                brandExtensions={brandExtensions}
            />
        ))}
        <BrandExtensionColumn role="none">
            <BrandExtensionList role="menu">
                {brandExtensions.map(brandExtension => (
                    <BrandExtensionListItem key={brandExtension.title}>
                        <BrandExtensionLink
                            href={brandExtension.url}
                            key={brandExtension.title}
                            role="menuitem"
                        >
                            {brandExtension.longTitle || brandExtension.title}
                        </BrandExtensionLink>
                    </BrandExtensionListItem>
                ))}
            </BrandExtensionList>
        </BrandExtensionColumn>
    </MainMenuColumns>
);
