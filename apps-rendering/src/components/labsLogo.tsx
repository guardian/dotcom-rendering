import { css } from '@emotion/react';
import { labs, neutral, remSpace, text } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import type { Logo as LogoImage } from 'capi';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	logo: LogoImage;
}

const styles = css`
	display: flex;
	justify-content: space-between;
	${textSans.medium()}
	color: ${text.supporting};

	a {
		color: ${labs[300]};
	}

	${darkModeCss`
        color: ${neutral[60]};
        img {
            padding: ${remSpace[3]};
            background: ${neutral[86]};
        }

        a {
            color: ${neutral[7]};
        }
    `}
`;

const LabsLogo: FC<Props> = ({ logo }: Props) => (
	<section css={styles}>
		<span>Paid for by</span>
		<span>
			<a href={logo.url}>
				<img src={logo.src} alt={logo.alt} />
			</a>
		</span>
	</section>
);

export default LabsLogo;
