import { devServer } from './server.dev';
import { prodServer } from './server.prod';

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
	prodServer();
} else {
	void devServer();
}
