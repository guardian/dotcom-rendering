import { transformDots } from '@root/src/model/add-dots';

export const enhanceStandfirst = (html: string): string => transformDots(html);
