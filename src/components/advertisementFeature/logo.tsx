import React from 'react';
import { Item } from 'item';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import { css } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';

interface Props {
    item: Item;
}

const styles = css`
    display: flex;
    justify-content: space-between;
    ${textSans.medium()}
`;

const Logo = ({ item }: Props): JSX.Element => {
    const sponsorship = item.tags.find(tag => tag.type === TagType.PAID_CONTENT)?.activeSponsorships?.pop()
    const logo = sponsorship?.sponsorLogo;
    const link = sponsorship?.sponsorLink;
    const alt = sponsorship?.sponsorName ?? "";

    if (!logo || !link) return <></>;

    return <section css={styles}>
        <span>Paid for by</span>
        <span>
            <a href={link}>
                <img src={logo} alt={alt} />
            </a>
        </span>
    </section>
}


export default Logo;
