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
			size="default"
			priority="primary"
			iconSide="right"
			icon={<SvgArrowRightStraight />}
		>
			{label}
		</Button>
	);
};
