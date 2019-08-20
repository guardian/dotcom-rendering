import { init as initGa, sendPageView } from './ga';

const init = () => {
    initGa();
    sendPageView();
};

init();
