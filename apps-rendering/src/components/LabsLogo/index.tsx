import { css } from '@emotion/react';
import {
	labs,
	neutral,
	remSpace,
	text,
	textSans17,
} from '@guardian/source-foundations';
import type { Logo as LogoImage } from 'capi';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

interface Props {
	logo: LogoImage;
}

const styles = css`
	display: flex;
	justify-content: space-between;
	${textSans17};
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
