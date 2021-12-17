import { Placeholder } from './Placeholder';

interface Props {
	componentName: string;
	when?: 'immediate' | 'idle' | 'visible';
	props?: any;
	placeholderHeight?: number;
}

/**
 * Inserts content into the dom client side only
 *
 * @param when - When insertion should take place.
 * 		- immediate - Insert without delay
 * 		- idle - Insert when browser idle
 * 		- visible - Insert when the gu-portal element appears in viewport
 * @param componentName - The name of the component to insert
 * @param props - An object containing the props for the component
 * @param placeholderHeight - Height in pixels. If provided, a Placeholder is server rendered
 *
 */
export const Portal = ({
	componentName,
	when = 'immediate',
	props = {},
	placeholderHeight,
}: Props) => (
	<gu-portal name={componentName} when={when} props={JSON.stringify(props)}>
		{placeholderHeight && <Placeholder height={placeholderHeight} />}
	</gu-portal>
);
