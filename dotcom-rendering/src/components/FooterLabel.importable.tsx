import { useShouldAdapt } from '../lib/useShouldAdapt';

/**
 * Choose the correct label for the footer, which may indicate
 * that the page was adapted.
 *
 * ## Why does this need to be an Island?
 *
 * Deciding on whether to adapt can only be determined client-side.
 */
export const FooterLabel = () => {
	const adapted = useShouldAdapt();

	return adapted ? <>(dcr, adapted)</> : <>(dcr)</>;
};
