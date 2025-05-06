import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';

type ProductLinkButtonProps = {
	label: string;
	link: string;
};

export const ProductLinkButton = ({ label, link }: ProductLinkButtonProps) => {
	return (
		<Button
			onClick={() => {
				window.open(link, '_blank');
			}}
			iconSide="right"
			aria-label={`Open ${label} in a new tab`}
			icon={<SvgArrowRightStraight />}
		>
			{label}
		</Button>
	);
};
