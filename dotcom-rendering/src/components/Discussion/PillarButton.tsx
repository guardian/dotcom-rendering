import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { palette as themePalette } from '../../palette';

type Props = {
	onClick?: () => void | Promise<void>;
	children: string;
	type?: 'submit';
	priority?: 'primary' | 'secondary' | 'subdued';
	icon?: JSX.Element;
	iconSide?: 'left' | 'right';
	linkName: string;
	size?: 'xsmall' | 'small' | 'default';
};

const buttonOverrides = (priority: 'primary' | 'secondary' | 'subdued') => {
	switch (priority) {
		case 'primary':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: ${themePalette(
						'--discussion-primary-button-background',
					)};
					color: ${themePalette('--discussion-button-text')};

					:hover {
						background-color: ${themePalette(
							'--discussion-button-background-hover',
						)};
					}
				}
			`;

		case 'secondary':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: transparent;
					border: 1px solid
						${themePalette('--discussion-accent-text')};
					color: ${themePalette('--discussion-accent-text')};

					:hover {
						background-color: ${themePalette(
							'--discussion-button-background-hover',
						)};
						border: 1px solid
							${themePalette(
								'--discussion-button-background-hover',
							)};
						color: ${themePalette('--discussion-button-text')};
					}
				}
			`;
		case 'subdued':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: transparent;
					color: ${themePalette('--discussion-accent-text')};
					border-radius: 0;
				}
			`;
	}
};

export const PillarButton = ({
	onClick,
	type,
	priority = 'primary',
	children,
	icon,
	iconSide,
	linkName,
	size = 'default',
}: Props) => (
	<div css={buttonOverrides(priority)}>
		<Button
			priority={priority}
			size={size}
			onClick={onClick}
			type={type}
			icon={icon}
			iconSide={iconSide}
			data-link-name={linkName}
		>
			{children}
		</Button>
	</div>
);
