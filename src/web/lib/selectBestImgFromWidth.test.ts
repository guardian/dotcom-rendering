import { selectBestImgFromWidth } from './selectBestImgFromWidth';

const exampleImages = [
    {
        url:
            'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1000.jpg',
        width: 1000,
    },
    {
        url:
            'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/500.jpg',
        width: 500,
    },
    {
        url:
            'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/140.jpg',
        width: 140,
    },
    {
        url:
            'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg',
        width: 1920,
    },
];

describe('selectBestImgFromWidth', () => {
    it('should select smallest image', () => {
        expect(selectBestImgFromWidth(1, exampleImages)).toEqual({
            url:
                'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/140.jpg',
            width: 140,
        });
    });
    it('should select closest image thats width is superior to 300', () => {
        expect(selectBestImgFromWidth(300, exampleImages)).toEqual({
            url:
                'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/500.jpg',
            width: 500,
        });
    });
    it('should select biggest image', () => {
        expect(selectBestImgFromWidth(2200, exampleImages)).toEqual({
            url:
                'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg',
            width: 1920,
        });
    });
});
