import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import * as emotion from 'emotion';
import { createMatchers } from 'jest-emotion';

// Add the custom matchers provided by 'jest-emotion'
expect.extend(createMatchers(emotion));
