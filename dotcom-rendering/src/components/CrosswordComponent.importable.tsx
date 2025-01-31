import { css } from '@emotion/react';
import { Button } from '@guardian/source/react-components';
import React from 'preact/compat';
import { useState, version } from 'react';

export const CrosswordComponent = () => {
	const [tabIndex, setTabIndex] = useState(0);

	return (
		<>
			<Button
				size="default"
				onClick={() => {
					if (tabIndex === 0) {
						setTabIndex(-1);
					} else {
						setTabIndex(0);
					}
				}}
			/>
			<svg
				viewBox="0 0 220 100"
				onClick={() => setTabIndex(-1)}
				tabIndex={tabIndex}
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="100" height="100" />
			</svg>
			{version}
			Preact version {React.version}
			<div
				css={css`
					block-size: 100px;
					background-color: #052962;
				`}
				tabIndex={tabIndex}
			/>
		</>
	);
};
