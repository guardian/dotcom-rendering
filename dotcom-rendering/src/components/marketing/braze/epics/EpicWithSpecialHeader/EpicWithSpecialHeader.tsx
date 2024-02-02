import { Epic } from '../Epic/Epic';
import type { EpicProps } from '../Epic/Epic';

export { COMPONENT_NAME } from './canRender';

export const EpicWithSpecialHeader = (props: EpicProps) => <Epic {...props} />;
