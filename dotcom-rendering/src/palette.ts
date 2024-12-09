import type { ColourName } from './paletteDeclarations';

/**
 * Looks up a palette colour by name. Retrieves a CSS value for the specified
 * colour, for use in CSS declarations. See the examples for how this is
 * commonly used with our Emotion-based styles.
 *
 * @param a The name of a palette colour; for example `--headline-colour`.
 * @returns A CSS `var` function call; for example `var(--headline-colour)`.
 * @example
 * const styles = css`
 *   color: ${palette('--headline-colour')};
 *   background-color: ${palette('--headline-background-colour')};
 * `;
 */
const palette = (colour: ColourName): string => `var(${colour})`;

// ----- Exports ----- //

export { palette };
