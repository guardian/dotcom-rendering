import React from 'react';
import { css, cx } from 'emotion';
import Logo from '@guardian/pasteup/logos/the-guardian.svg';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { headline } from '@guardian/pasteup/typography';
import { pillarPalette } from '../../lib/pillars';
import { palette } from '@guardian/pasteup/palette';
import { ReaderRevenueButton } from '@root/packages/frontend/amp/components/ReaderRevenueButton';
import { AmpSubscriptionGoogle } from '@frontend/amp/components/elements/AmpSubscriptionGoogle';
import { mobileLandscape } from '@guardian/pasteup/breakpoints';

const headerStyles = css`
    background-color: ${palette.brand.main};
`;

const row = css`
    display: flex;
    justify-content: space-between;
    position: relative;
`;

const logoStyles = css`
    align-self: flex-start;
    height: 57px;
    width: 175px;
    margin-top: 3px;
    margin-right: 20px;
    margin-bottom: 35px;

    path {
        fill: ${palette.neutral[100]};
    }
`;

const pillarListStyles = css`
    list-style: none;
    line-height: 0;
`;

const pillarListItemStyle = css`
    display: inline-block;

    :first-of-type {
        a {
            padding-left: 20px;

            :before {
                display: none;
            }
        }
    }
`;

const pillarLinkStyle = (pillar: Pillar) => css`
    text-decoration: none;
    cursor: pointer;
    display: block;
    ${headline(2)};
    height: 36px;
    padding: 9px 4px;
    color: ${palette.neutral[100]};
    position: relative;
    overflow: hidden;

    font-weight: 900;
    font-size: 15.4px;

    ${mobileLandscape} {
        font-size: 18px;
        padding: 7px 4px 0;
    }

    :before {
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        top: 0;
        z-index: 1;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        bottom: 0;
    }

    :after {
        content: '';
        display: block;
        top: 0;
        left: 0;
        right: 0;
        position: absolute;
        border-top: 4px solid ${pillarPalette[pillar].bright};
        transition: transform 0.3s ease-in-out;
    }
`;

const veggieStyles = css`
    background-color: ${palette.highlight.main};
    color: ${palette.neutral[97]};
    height: 42px;
    min-width: 42px;
    border: 0;
    border-radius: 50%;
    outline: none;
    z-index: 1;
    bottom: -3px;
    right: 20px;
    position: absolute;
`;

const lineStyles = css`
    height: 2px;
    position: absolute;
    width: 20px;
    background-color: ${palette.neutral[7]};
`;

const pattyStyles = css`
    left: 11px;

    ${lineStyles};

    :before {
        content: '';
        top: -6px;
        left: 0;
        ${lineStyles};
    }

    :after {
        content: '';
        top: 6px;
        left: 0;
        ${lineStyles};
    }
`;

const navRow = css`
    border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const pillarLinks = (pillars: PillarType[], activePillar: Pillar) => (
    <nav>
        <ul className={pillarListStyles}>
            {pillars.map((p, i) => (
                <li className={pillarListItemStyle} key={p.title}>
                    <a className={pillarLinkStyle(p.pillar)} href={p.url}>
                        {p.title}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

export const Header: React.FC<{
    nav: NavType;
    activePillar: Pillar;
    config: ConfigType;
}> = ({ nav, activePillar, config }) => (
    <header className={headerStyles}>
        <div className={row}>
            <ReaderRevenueButton
                nav={nav}
                rrLink={'ampHeader'}
                rrCategory={'support'}
                linkLabel={'Support Us'}
            />

            {config.switches.subscribeWithGoogle && <AmpSubscriptionGoogle />}

            <a className={logoStyles} href="/">
                <span
                    className={css`
                        ${screenReaderOnly};
                    `}
                >
                    The Guardian - Back to home
                </span>
                <Logo className={logoStyles} />
            </a>
        </div>

        <div className={cx(row, navRow)}>
            {pillarLinks(nav.pillars, activePillar)}

            {/* Note, the actual sidebar lives directly in the body as AMP requires this :( */}
            <button className={veggieStyles} on="tap:sidebar1.toggle">
                <span className={pattyStyles} />
            </button>
        </div>
    </header>
);
