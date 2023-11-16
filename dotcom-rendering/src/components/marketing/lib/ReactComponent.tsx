import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';

// This type can be used in place of React.FC<T> which was previously widespread
// in this codebase but is no longer recommended. In many cases it's possible to
// omit the type completely, but as a team we felt that it was a shame to omit
// the type for our React components. The generic prop type is optional and
// defaults to an empty object so this type can also be used for components
// which take no props.
// See also:
// https://github.com/facebook/create-react-app/pull/8177
// https://github.com/typescript-cheatsheets/react#function-components

export type ReactComponent<GenericProps = Record<string, never>> = (
	props: GenericProps,
) => EmotionJSX.Element;
