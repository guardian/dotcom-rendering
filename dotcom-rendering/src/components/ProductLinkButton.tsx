import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';

type ProductLinkButtonProps = {
	label: string;
	url: string;
};

export const ProductLinkButton = ({ label, url }: ProductLinkButtonProps) => {
	return (
		<LinkButton
			href={url}
			rel="sponsored noreferrer noopener"
			target="_blank"
			iconSide="right"
			aria-label={`Open ${label} in a new tab`}
			icon={<SvgArrowRightStraight />}
			data-ignore="global-link-styling"
			data-link-name="in body link"
			data-spacefinder-role="inline"
		>
			{label}
		</LinkButton>
	);
};
