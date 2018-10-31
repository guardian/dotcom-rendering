import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as emotion from 'emotion';
import { createMatchers } from 'jest-emotion';

// Add the custom matchers provided by 'jest-emotion'
expect.extend(createMatchers(emotion));

Enzyme.configure({
    adapter: new Adapter(),
});
