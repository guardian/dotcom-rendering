import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { FC } from 'react';
import { createTheme, styled } from '@mui/material/styles';
import { success } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { css } from '@emotion/react';

interface Props {
	defaultChecked?: boolean;
	label?: string;
	colorTheme?: 'dark' | 'light';
	device: 'ios' | 'android';
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AndroidSwitch = styled((props: Props) => (
	<Switch
		focusVisibleClassName=".Mui-focusVisible"
		disableRipple
		size="small"
		{...props}
	/>
))(({ theme }) => ({
	width: 26,
	height: 12,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		top: '-3px',
		left: '-2px',
		padding: '0',
		'&.Mui-checked': {
			transform: 'translateX(11px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				opacity: 1,
				border: 0,
				backgroundColor:
					theme.palette.mode === 'light'
						? 'rgba(153, 153, 153, 0.4)'
						: 'rgb(88,208,139, 0.5)',
			},
			'& .MuiSwitch-thumb': {
				backgroundColor: success[500],
			},
		},
	},
	overflow: 'visible',
	'& .MuiSwitch-thumb': {
		width: 18,
		height: 18,
	},
	'& .MuiSwitch-track': {
		backgroundColor:
			theme.palette.mode === 'light'
				? 'rgba(153, 153, 153, 0.4)'
				: 'rgba(256,256,256,0.6)',
	},
}));

const IOSSwitch = styled((props: Props) => (
	<Switch
		focusVisibleClassName=".Mui-focusVisible"
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	width: 50,
	height: 30,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			left: '0.25rem',
			'& + .MuiSwitch-track': {
				backgroundColor: success[500],
				opacity: 1,
				border: 0,
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 26,
		height: 26,
	},
	'& .MuiSwitch-track': {
		borderRadius: 30 / 2,
		backgroundColor:
			theme.palette.mode === 'light'
				? 'rgba(153, 153, 153, 0.4)'
				: 'rgba(256,256,256,0.25)',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));

const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const labelStyles = css`
	padding-left: 8px;
	span {
		font-size: 0.9375rem;
		${textSans.small()};
		color: #fff;
		line-height: 1;
	}
`;

export const ToggleSwitch: FC<Props> = ({
	label,
	device = 'android',
	colorTheme = 'dark',
	defaultChecked = false,
	...props
}: Props) => {
	if (label) {
		return (
			<div css={labelStyles}>
				<FormGroup>
					<FormControlLabel
						control={
							device === 'ios' ? (
								<IOSSwitch
									sx={{ m: 1 }}
									theme={
										colorTheme === 'dark'
											? darkTheme
											: lightTheme
									}
									defaultChecked={defaultChecked}
									device={device}
									{...props}
								/>
							) : (
								<AndroidSwitch
									sx={{ m: 1 }}
									theme={
										colorTheme === 'dark'
											? darkTheme
											: lightTheme
									}
									defaultChecked={defaultChecked}
									device={device}
									{...props}
								/>
							)
						}
						label={label}
					/>
				</FormGroup>
			</div>
		);
	} else {
		const ariaLabel = { inputProps: { 'aria-label': 'Toggle switch' } };
		return (
			<div css={labelStyles}>
				<IOSSwitch
					sx={{ m: 1 }}
					theme={colorTheme === 'dark' ? darkTheme : lightTheme}
					defaultChecked={defaultChecked}
					device={device}
					{...props}
					{...ariaLabel}
				/>
			</div>
		);
	}
};
