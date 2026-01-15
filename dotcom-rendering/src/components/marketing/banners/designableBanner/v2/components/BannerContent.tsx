import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { useBanner } from '../useBanner';

const phabletContentMaxWidth = '492px';

const styles = {
	contentContainer: css`
		grid-area: copy-container;

		max-width: 100%;
		align-self: start;

		${from.phablet} {
			max-width: ${phabletContentMaxWidth};
		}
		${from.desktop} {
			padding-right: ${space[5]}px;
			margin-bottom: ${space[2]}px;
		}
		${from.leftCol} {
			padding-left: ${space[3]}px;
		}
	`,
};

export const BannerContent = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element | null => {
	const { design } = useBanner();

	if (!design) {
		return null;
	}

	return <div css={styles.contentContainer}>{children}</div>;
};
