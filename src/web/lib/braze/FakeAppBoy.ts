import { createNanoEvents, Emitter } from 'nanoevents';
import { Message, Callback } from './BrazeMessages';

class FakeAppBoy {
	emitter: Emitter;

	constructor() {
		this.emitter = createNanoEvents();
	}

	subscribeToInAppMessage(fn: Callback) {
		this.emitter.on('inAppMessage', fn);
		return 'FAKE_SUBSCRIPTION_ID';
	}

	emit(payload: Message) {
		this.emitter.emit('inAppMessage', payload);
	}
}

export { FakeAppBoy };
