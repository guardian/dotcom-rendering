// @flow
import { Component } from 'react';
import { headline, egyptian } from '@guardian/pasteup/fonts';

import { css, cx } from 'react-emotion';
import { pillars } from '@guardian/pasteup/palette';
import { desktop, tablet, leftCol } from '@guardian/pasteup/breakpoints';

import type { LinkType } from '../../../../Nav/__config__';

const pillarColor = pillar =>
    css`
        color: ${pillars[pillar]};
    `;
const showColumnLinksStyle = css`
    margin-top: 8px;

    transform: rotate(-135deg);
`;
const hideAfter = css`
    :after {
        display: none;
    }
`;

const MainMenuColumnButtonStyle = css`
        background-color: transparent; 
        border: 0;
        box-sizing: border-box; 
        cursor: pointer; 
        display: block; 
        font-family: ${headline}
        font-size: 24 
        font-weight: 700; 
        line-height: 1 
        outline: none; 
        padding: 6px 34px 18px 50px; 
        position: relative; 
        text-align: left; 
        width: 100%; 
        > * {
            pointer-events: none; 
        } 
        text-transform: capitalize; 
        :before {
            margin-top:  4px;
            color: #5d5f5f; 
            left: 25px;
            position: absolute; 
            border: 2px solid currentColor; 
            border-top: 0;
            border-left: 0;
            content: ""; 
            display: inline-block; 
            height: 10px;
 
            transform:rotate(45deg);
            width: 10px;
        }
        ${desktop} {
            display: none; 
        }
        :after {
            background-color: #abc2c9; 
            bottom: 0 
            content: ""; 
            display: block;
            height: 1; 
            left: 50 ;
            position: absolute; 
            width: 100%; 
        }
    
`;

const MainMenuColumnButton = ({
    column,
    showColumnLinks,
    toggleColumnLinks,
    ariaControls,
    isLastIndex,
}: {
    column: LinkType,
    showColumnLinks: boolean,
    toggleColumnLinks: () => void,
    ariaControls: string,
    isLastIndex: boolean,
}) => (
    <button
        className={cx(
            MainMenuColumnButtonStyle,
            pillarColor(pillarColor(column.title.toLowerCase())),
            {
                [showColumnLinksStyle]: showColumnLinks,
                [hideAfter]: !(isLastIndex || showColumnLinks),
            },
        )}
        onClick={() => {
            toggleColumnLinks();
        }}
        aria-haspopup="true"
        aria-controls={ariaControls}
        role="menuitem"
    >
        {column.title}
    </button>
);

const mainMenuColumnLinkTitleStyle = css`
    background-color: transparent;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    color: #121212;
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    font-family: ${egyptian};
    font-weight: 400;
    outline: none;
    padding: 8px 34px 8px 50px;
    position: relative;
    text-align: left;
    width: 100%;
    ${tablet} {
        padding-left: 60px;
    }
    ${desktop} {
        font-size: 15px;
        line-height: 1.2;
        padding: 6px 0;
    }

    > *: {
        pointer-events: none;
    }
`;

const pillarStyles = column => css`:hover: {
    color: ${column.isPillar ? pillars[column.title.toLowerCase()] : '#5d5f5f'}
    text-decoration: underline;
};
:focus: {
    color: ${column.isPillar ? pillars[column.title.toLowerCase()] : '#5d5f5f'}
    text-decoration: underline;
};`;

const mainMenuLinkStyle = css`
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    width: 100%;
`;

const mobileOnly = (() => {
    const hide = css`
        ${desktop}: {
            display: none;
        };
    `;
    const show = css`
        ${desktop}: {
            display: list-item;
        };
    `;
    return (isMobileOnly: boolean) => (isMobileOnly ? hide : show);
})();

const MainMenuLink = ({
    link,
    column,
}: {
    column: LinkType,
    link: LinkType,
}) => (
    <li
        className={cx(mainMenuLinkStyle, mobileOnly(link.mobileOnly || false))}
        role="none"
    >
        <a
            className={cx(pillarStyles(column), mainMenuColumnLinkTitleStyle)}
            href={link.url}
            role="menuitem"
        >
            {link.title}
        </a>
    </li>
);

const mainMenuColumnLinksSTYLES = css`    box-sizing: border-box;
 
display: flex;
 font-size: 18,
 flex-wrap: wrap;
 list-style: none;
 margin: 0,
 padding: 0 0 12px;
 position: relative;
 background-color:#e9eff1 ;
 ${desktop} {
     display: flex;
     flex-direction: column;
     flex-wrap: nowrap;
     order: 1,
     padding-bottom: 0,
     background-color: #e9eff1;
     width: 100%;
     padding: 0 5px;
 },`;

const isPillarStyle = css`
    background-color: #d9e4e7;
`;
const hide = css`
    display: none;
`;
const MainMenuColumnLinksInner = ({
    showColumnLinks,
    isPillar,
    children,
    ...props
}: any) => (
    <ul
        className={cx(mainMenuColumnLinksSTYLES, {
            [hide]: isPillar && !showColumnLinks,
            [isPillarStyle]: isPillar,
        })}
        {...props}
    >
        {' '}
        {children}
    </ul>
);

const MainMenuColumnLinks = ({
    column,
    showColumnLinks,
    id,
    brandExtensions,
}: {
    column: LinkType,
    brandExtensions: Array<LinkType>,
    showColumnLinks: boolean,
    id: string,
}) => {
    const links =
        column.title.toLowerCase() === 'more'
            ? [
                  ...brandExtensions.map(brandExtension => ({
                      ...brandExtension,
                      mobileOnly: true,
                  })),
                  ...(column.children || []),
              ]
            : column.children || [];

    return (
        <MainMenuColumnLinksInner
            showColumnLinks={showColumnLinks}
            isPillar={column.isPillar}
            aria-expanded={showColumnLinks}
            role="menu"
            id={id}
        >
            {links.map(link => (
                <MainMenuLink
                    link={link}
                    key={link.title.toLowerCase()}
                    column={column}
                />
            ))}
        </MainMenuColumnLinksInner>
    );
};

const mainMenuColumnPillarStyle = css` ${desktop} {
:after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1;
    background-color: #abc2c9;
}`;

const mainMenuColumnStyled = css`
    font-size: 18px;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    ${desktop} {
        width: 118px;
        float: left;
        position: relative;
    }
    ${leftCol}: {
        width: 140px;
    }
`;

const MainMenuColumnStyled = ({ isPillar, children, ...props }: any) => (
    <li
        className={cx(mainMenuColumnStyled, {
            [mainMenuColumnPillarStyle]: isPillar,
        })}
        {...props}
    >
        {children}
    </li>
);

type Props = {
    column: LinkType,
    isLastIndex: boolean,
    brandExtensions: Array<LinkType>,
};

export default class MainMenuColumn extends Component<
    Props,
    { showColumnLinks: boolean },
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showColumnLinks: false,
        };
    }

    toggleColumnLinks() {
        this.setState({
            showColumnLinks: !this.state.showColumnLinks,
        });
    }

    render() {
        const { showColumnLinks } = this.state;
        const { column, isLastIndex, brandExtensions } = this.props;
        const subNavId = `${column.title.toLowerCase()}Links`;
        const ColumnButton = () => {
            if (column.isPillar) {
                return (
                    <MainMenuColumnButton
                        column={column}
                        showColumnLinks={showColumnLinks}
                        toggleColumnLinks={() => {
                            this.toggleColumnLinks();
                        }}
                        ariaControls={subNavId}
                        isLastIndex={isLastIndex}
                        brandExtensions={brandExtensions}
                    />
                );
            }
            return '';
        };

        return (
            <MainMenuColumnStyled role="none" isPillar={column.isPillar}>
                <ColumnButton />
                <MainMenuColumnLinks
                    column={column}
                    showColumnLinks={showColumnLinks}
                    id={subNavId}
                    brandExtensions={brandExtensions}
                />
            </MainMenuColumnStyled>
        );
    }
}
