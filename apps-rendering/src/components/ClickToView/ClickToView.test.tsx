import { Button } from '@guardian/source-react-components';
import { none, some } from '../../../vendor/@guardian/types/index';
import renderer from 'react-test-renderer';
import ClickToView from './';

describe('ClickToView', () => {
	it('should render a provider specific overlay if a source is present', () => {
		const component = renderer.create(
			<ClickToView
				source={some('A Third Party')}
				sourceDomain={some('athirdparty.com')}
				role={none}
				onAccept={none}
			>
				<div id="third-party-content" />
			</ClickToView>,
		);

		expect(
			component.root.findAllByProps({ id: 'third-party-content' }),
		).toStrictEqual([]);

		expect(
			component.root.findAllByType('p')[0].children.join(''),
		).toContain('This article includes content provided by A Third Party');
	});

	it('should render a provider domain specific overlay if a source is not present', () => {
		const component = renderer.create(
			<ClickToView
				source={none}
				sourceDomain={some('athirdparty.com')}
				role={none}
				onAccept={none}
			>
				<div id="third-party-content" />
			</ClickToView>,
		);

		expect(
			component.root.findAllByProps({ id: 'third-party-content' }),
		).toStrictEqual([]);

		expect(
			component.root.findAllByType('p')[0].children.join(''),
		).toContain('This article includes content hosted on athirdparty.com');
	});

	it('should render the third party content once the accept button is clicked', () => {
		const component = renderer.create(
			<ClickToView
				source={some('A Third Party')}
				sourceDomain={some('athirdparty.com')}
				role={none}
				onAccept={none}
			>
				<div id="third-party-content" />
			</ClickToView>,
		);

		void renderer.act(() =>
			(component.root.findByType(Button).props.onClick as () => void)(),
		);

		expect(
			component.root.findByProps({ id: 'third-party-content' }),
		).toBeDefined();
	});
});
