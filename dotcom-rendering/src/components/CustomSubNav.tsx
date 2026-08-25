import type { CustomSubnav } from '../types/customSubnav';

type Props = {
	customSubNav: CustomSubnav;
};

/**
 * Renders a custom subnav (header + links, images and further data to follow) targeted at a front.
 */
export const CustomSubNav = ({ customSubNav }: Props) => {
	return (
		<div data-component="custom-subnav" data-component-id={customSubNav.id}>
			CustomSubNav: {customSubNav.header.headerText}
			<ul>
				{customSubNav.links.map((link) => (
					<li key={`${link.linkText}-${link.dotcomPath}`}>
						<a href={link.dotcomPath}>{link.linkText}</a>
					</li>
				))}
			</ul>
		</div>
	);
};
