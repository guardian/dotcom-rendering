import type { ReactNode } from 'react';

type HeadingProps = React.ComponentProps<
	'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
> & {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: ReactNode;
};

/**
 * For choosing between different heading sizes based on a prop.
 *
 * @example
 * const MyComponent = ({ nested }: { nested: boolean }) =>
 *   <section>
 *     <Heading level={nested ? 3 : 2}>A Section</Heading>
 *     <p>Some copy.</p>
 *   </section>
 */
export function Heading({ level, children, ...headingProps }: HeadingProps) {
	switch (level) {
		case 1:
			return <h1 {...headingProps}>{children}</h1>;
		case 2:
			return <h2 {...headingProps}>{children}</h2>;
		case 3:
			return <h3 {...headingProps}>{children}</h3>;
		case 4:
			return <h4 {...headingProps}>{children}</h4>;
		case 5:
			return <h5 {...headingProps}>{children}</h5>;
		case 6:
			return <h6 {...headingProps}>{children}</h6>;
	}
}
