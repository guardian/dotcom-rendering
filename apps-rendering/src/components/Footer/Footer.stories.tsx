// ----- Imports ----- //

import { article } from 'fixtures/item';
import Footer from './';

// ----- Stories ----- //

const WithCcpa = () => <Footer isCcpa={true} format={article} />;

const Default = () => <Footer isCcpa={false} format={article} />;

// ----- Exports ----- //

export default {
	component: Footer,
	title: 'AR/Footer',
};

export { Default, WithCcpa };
