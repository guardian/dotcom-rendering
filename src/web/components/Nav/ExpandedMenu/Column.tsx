import React from 'react';
import { css, cx } from 'emotion';

import { brand, brandText, brandAlt } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import { CollapseColumnButton } from './CollapseColumnButton';

// CSS
export const hideDesktop = css`
    ${from.desktop} {
        display: none;
    }
`;

const pillarDivider = css`
    ${from.desktop} {
        :before {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: ${brand[600]};
            z-index: 1;
        }
    }
`;

const columnLinkTitle = css`
    ${textSans.medium({ lineHeight: 'tight' })};
    background-color: transparent;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    color: ${brandText.primary};
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    outline: none;
    padding: 8px 34px 8px 50px;
    position: relative;
    text-align: left;
    width: 100%;

    ${from.tablet} {
        padding-left: 60px;
    }

    ${from.desktop} {
        font-size: 16px;
        padding: 6px 0;
    }

    :hover,
    :focus {
        color: ${brandAlt[400]};
        text-decoration: underline;
    }

    > * {
        pointer-events: none;
    }
`;

const mainMenuLinkStyle = css`
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    width: 100%;
    ${from.desktop} {
        display: list-item;
    }
`;

const columnLinks = css`
    ${textSans.medium()};
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    position: relative;
    ${from.desktop} {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        order: 1;
        height: 100%;
        width: 100%;
        padding: 0 9px;
    }
`;

const firstColumnLinks = css`
    ${from.desktop} {
        padding-left: 0;
    }
`;

const pillarColumnLinks = css`
    ${until.tablet} {
        background: ${brand[300]};
    }
`;

const hideStyles = (columnInputId: string) => css`
    ${until.desktop} {
        /* stylelint-disable-next-line selector-type-no-unknown */
        ${`#${columnInputId}`}:not(:checked) ~ & {
            display: none;
        }
    }
`;

const columnStyle = css`
    ${textSans.medium()};
    list-style: none;
    margin: 0;
    padding-bottom: 10px;
    position: relative;

    :after {
        background-color: ${brand[600]};
        top: 0;
        content: '';
        display: block;
        height: 1px;
        left: 50px;
        position: absolute;
        right: 0;
    }

    /* Remove the border from the top item on mobile */
    :first-of-type:after {
        content: none;
    }

    ${from.desktop} {
        width: 134px;
        float: left;
        position: relative;

        :after {
            content: none;
        }

        :first-of-type {
            width: 123px;
        }
    }
    ${from.leftCol} {
        width: 160px;

        :first-of-type {
            width: 150px;
        }
    }
`;

export const Column = ({
    column,
    index,
}: {
    column: PillarType;
    index: number;
}) => {
    // As the elements are dynamic we need to specify the IDs here
    const columnInputId = `${column.title}-checkbox-input`;
    const collapseColumnInputId = `${column.title}-button`;

    return (
        <li className={cx(columnStyle, pillarDivider)} role="none">
            {/*
                IMPORTANT NOTE: Supporting NoJS and accessibility is hard.

                We therefore use JS to make the Nav elements more accessibile. We add a
                keydown `addEventListener` to toggle the column drop down.
                This is not a perfect solution as not all screen readers support JS
                https://webaim.org/projects/screenreadersurvey8/#javascript
            */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.addEventListener('DOMContentLoaded', function(){
                        document.getElementById('${collapseColumnInputId}').addEventListener('keydown', function(e){
                            // keyCode: 13 => Enter key | keyCode: 32 => Space key
                            if (e.keyCode === 13 || e.keyCode === 32) {
                                e.preventDefault()
                                document.getElementById('${columnInputId}').click();
                            }
                        })
                    })`,
                }}
            />

            {/*
                IMPORTANT NOTE:
                It is important to have the input as the 1st sibling for NoJS to work
                as we use ~ to apply certain styles on checkbox checked and ~ can only
                apply to styles with elements that are preceded
            */}
            <input
                type="checkbox"
                className={css`
                    ${visuallyHidden};
                `}
                id={columnInputId}
                tabIndex={-1}
                key="OpenExpandedMenuCheckbox"
                role="menuitemcheckbox"
                aria-checked="false"
            />
            <CollapseColumnButton
                collapseColumnInputId={collapseColumnInputId}
                title={column.title}
                columnInputId={columnInputId}
                ariaControls={`${column.title.toLowerCase()}Links`}
            />

            {/* ColumnLinks */}
            <ul
                className={cx(
                    columnLinks,
                    { [firstColumnLinks]: index === 0 },
                    { [pillarColumnLinks]: !!column.pillar },
                    columnInputId && hideStyles(columnInputId),
                )}
                role="menu"
                id={`${column.title.toLowerCase()}Links`}
                data-cy={`${column.title.toLowerCase()}Links`}
            >
                {(column.children || []).map((link) => (
                    <li
                        key={link.title.toLowerCase()}
                        className={cx(mainMenuLinkStyle, {
                            [hideDesktop]: !!link.mobileOnly,
                        })}
                        role="none"
                    >
                        <a
                            className={cx(
                                'selectableMenuItem',
                                columnLinkTitle,
                            )}
                            href={link.url}
                            role="menuitem"
                            data-link-name={`nav2 : secondary : ${link.longTitle}`}
                            data-cy={`column-collapse-sublink-${link.title}`}
                            tabIndex={-1}
                        >
                            {link.longTitle}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    );
};
