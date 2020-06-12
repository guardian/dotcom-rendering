import { css, SerializedStyles } from '@emotion/core';
import { neutral, remSpace } from "@guardian/src-foundations";
import { basePx, darkModeCss } from "styles";
import { textSans, headline } from "@guardian/src-foundations/typography";
import React, { ReactElement } from "react";
import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime';
import { formatDate } from 'date';
import { SvgGuardianLogo } from '@guardian/src-brand'

const richLinkWidth = '8.75rem';

type MembershipLinkProps = {
    url: string;
    linkText: string;
    price?: string;
    image?: string;
    start?: CapiDateTime;
}

const membershipLinkStyles: SerializedStyles =
    css`
        background: ${neutral[97]};

        a {
            display: inline-block;
            text-decoration: none;
            color: ${neutral[7]};

            div {
                background: #B84376;
                color: white;
                padding: ${remSpace[2]} ${remSpace[9]} ${remSpace[2]} ${remSpace[2]};

                svg {
                    fill: currentColor;
                }
            }

            img {
                width: 100%;
            }
    
            section {
                padding: ${basePx(1)};
                ${textSans.xsmall()};

                h1 {
                    margin: ${basePx(0, 0, 1, 0)};
                    ${headline.xxxsmall({ fontWeight: 'bold' })}
                    hyphens: auto;
                }

                p {
                    margin-top: 0;
                }
    
                button {
                    background: none;
                    border: none;
                    ${textSans.small()};
                    padding: 0;
                    margin: 0;
                    background: #B84376;
                    color: ${neutral[100]};
                    border-radius: 24px;
                    padding: 0 12px;
                }
            }
        }

        float: left;
        clear: left;
        margin: ${basePx(1, 2, 1, 0)};

        width: ${richLinkWidth};

        ${darkModeCss`
            background-color: ${neutral[20]};
            button::before {
                border-color: ${neutral[60]};
            }

            a, h1, button {
                color: ${neutral[60]};
            }
        `}
    `;

const MembershipLink = (props: MembershipLinkProps): ReactElement => {
    const { url, image, linkText, start, price } = props;
    const headerImage = image ? <img src={image} alt="Membership event"/> : null;
    const date = start ? formatDate(new Date(start?.iso8601)) : null;
    return <aside css={membershipLinkStyles}>
        <a href={url}>
            <div><SvgGuardianLogo /></div>
            { headerImage }
            <section>
                <h1>{ linkText }</h1>
                <time>{ date }</time>
                <p>{ price }</p>
                <button>Book now</button>
            </section>
        </a>
    </aside>
}


export default MembershipLink;