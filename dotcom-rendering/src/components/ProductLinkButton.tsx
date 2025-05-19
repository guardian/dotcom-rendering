import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';

type ProductLinkButtonProps = {
	label: string;
	url: string;
};

export const ProductLinkButton = ({ label, url }: ProductLinkButtonProps) => {
	return (
		<Button
			onClick={() => {
				window.open(url, '_blank');
			}}
			iconSide="right"
			aria-label={`Open ${label} in a new tab`}
			icon={<SvgArrowRightStraight />}
		>
			{label}
		</Button>
	);
};
