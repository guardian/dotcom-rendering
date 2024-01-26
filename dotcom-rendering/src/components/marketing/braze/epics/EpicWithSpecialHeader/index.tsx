import { Epic } from '../Epic';
import type { EpicProps } from '../Epic';

export { COMPONENT_NAME } from './canRender';

export const EpicWithSpecialHeader = (props: EpicProps) => <Epic {...props} />;
