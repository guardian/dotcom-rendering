import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';
import { SvgAudio } from '@guardian/source/react-components';
import { buttonBaseCss } from '../styles';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Control = (props: ButtonProps) => {
	return (
		<button
			type="button"
			css={[
				buttonBaseCss,
				css`
					width: 38px;

					svg {
						height: 30px;
					}
				`,
			]}
			{...props}
		/>
	);
};

export const Volume = (props: React.ComponentPropsWithoutRef<'div'>) => (
	<div
		css={css`
			grid-area: volume;
			display: flex;
			align-items: stretch;
			justify-content: flex-end;

			span {
				display: inline-flex;
				align-items: center;
				padding-left: 5px;
				padding-right: 5px;
			}

			span + span {
				border-left: 1px solid ${palette.neutral[46]};
			}

			${from.leftCol} {
				position: absolute;
				bottom: 0;
				right: 0;
				height: 40px;
			}

			button + button {
				border-left: 1px solid ${palette.neutral[46]};
			}
		`}
		{...props}
	/>
);

Volume.Mute = ({
	isMuted,
	...props
}: { isMuted: boolean } & Omit<ButtonProps, 'children'>) => (
	<Control aria-label="Mute" {...props}>
		<SvgAudio
			theme={{
				fill: isMuted ? palette.brandAlt[400] : palette.neutral[46],
			}}
		/>
	</Control>
);

Volume.UnMute = ({
	isMuted,
	...props
}: { isMuted: boolean } & Omit<ButtonProps, 'children'>) => (
	<Control aria-label="Unmute" {...props}>
		<SvgAudio
			theme={{
				fill: !isMuted ? palette.brandAlt[400] : palette.neutral[46],
			}}
		/>
	</Control>
);
