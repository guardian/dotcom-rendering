import { ThemeProvider } from '@emotion/react';
import { Button, buttonThemeBrandAlt } from '@guardian/source-react-components';
import { FC, ReactElement } from 'react';

type Props = {
	className: string;
	paragraph: number;
};

const AdSlot: FC<Props> = ({ className, paragraph }): ReactElement => (
	<aside className={className} key={`ad-after-${paragraph}-para`}>
		<div className="ad-labels">
			<h1>Advertisement</h1>
		</div>
		<div className="ad-slot"></div>
		<div className="upgrade-banner">
			<h1>Support the Guardian and enjoy the app ad-free.</h1>
			<ThemeProvider theme={buttonThemeBrandAlt}>
				<Button>Support the Guardian</Button>
			</ThemeProvider>
		</div>
	</aside>
);

export default AdSlot;
