import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';
import { coreVitals } from './coreVitals';

const init = async (): Promise<void> => {
	// Potential method for sampling
	/* const inSample = Math.floor(Math.random()*100);
	if(inSample === 1){
		coreVitals();
	} */
	coreVitals();
	return Promise.resolve();
};

startup('coreVitals', null, init);
