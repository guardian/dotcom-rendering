import type { Option} from "@guardian/types";
import { OptionKind } from "@guardian/types";
import { ArticleElementRole } from "@guardian/libs";
import { Optional } from "../optional";
import { ImageSubtype } from "../image/image";
import type { Cartoon } from "../cartoon";
import type { MainMedia} from "../mainMedia";
import { MainMediaKind } from "../mainMedia";

const cartoonData: Cartoon = {
	images: [
		{
			src: 'https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=900&quality=85&fit=bounds&s=818f15deabc8e3e9472493fd3d5f34ad',
			srcset: 'https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=140&quality=85&fit=bounds&s=aaae07283466c60b1e95235f1a7d24ff 140w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=500&quality=85&fit=bounds&s=7bca6b4d02e4a076190801a7ea192083 500w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=1000&quality=85&fit=bounds&s=c9b054af20f2717f6340e49f98e7f5c6 1000w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=1500&quality=85&fit=bounds&s=61034be5a13801d6fcf08d3560e9cc1f 1500w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=2000&quality=85&fit=bounds&s=7cd9ab2f4f6bd90a5039cf3f1ab5b826 2000w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=2500&quality=85&fit=bounds&s=33e923892acb97c91122279fab8822bc 2500w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=3000&quality=85&fit=bounds&s=21fa1a48175da0d30bca04248e639c6f 3000w',
			dpr2Srcset: 'https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=140&quality=45&fit=bounds&s=9a2f1c49558a372db7fb8ea93aa44c96 140w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=500&quality=45&fit=bounds&s=09c102fced4de767f1a4542a105481c3 500w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=1000&quality=45&fit=bounds&s=bf64657fba4ba1b6d25d8ace4b9df727 1000w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=1500&quality=45&fit=bounds&s=d4190b69f96fd8ea1fe4bdb5f1dc3edb 1500w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=2000&quality=45&fit=bounds&s=fbce26279e8f933d347f754872e88e94 2000w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=2500&quality=45&fit=bounds&s=d54a70d02582a408a74bd57a23570495 2500w, https://i.guim.co.uk/img/media/40b221ee0737f5b73fd25678f432876e296732de/0_0_1981_1346/master/1981.jpg?width=3000&quality=45&fit=bounds&s=ee276a138bc477747dfc14688d0ee9cc 3000w',
			alt: {
				kind: OptionKind.Some,
				value: '1 Waiting for the next general election/Needing to turn around on a motorway – Feels like an eternity going in the wrong direction. 2 Nigel Farage saying he’ll be the next Tory leader/Scientists warning about the potential collapse of our natural systems – Alarming predictions on future peril. 3 Unregulated AI/Trampoline without a net – Fun (until catastrophic.'
			},
			width: 1981,
			height: 1346,
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg)
		},
		{
			src: 'https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=900&quality=85&fit=bounds&s=f3ec63d34766807993877edd52a28eb1',
			dpr2Srcset: 'https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=140&quality=45&fit=bounds&s=38512a22b3be9745d407beb8f43cc389 140w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=500&quality=45&fit=bounds&s=5a4fe8a6024c962119c54c018fc9834b 500w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=1000&quality=45&fit=bounds&s=18399591e91a5af96e285396e5b1f94a 1000w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=1500&quality=45&fit=bounds&s=2d80b6c25987701ef2cc15a71da7ce34 1500w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=2000&quality=45&fit=bounds&s=44b4e9b54895f982473d1f61b760caaa 2000w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=2500&quality=45&fit=bounds&s=ac1a65934ab18ff173f004a72b1fb920 2500w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=3000&quality=45&fit=bounds&s=99ad35b42b0fff0668af380d9ee22c53 3000w',
			srcset: 'https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=140&quality=85&fit=bounds&s=020a61c525ece6d60badfc07ded458a7 140w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=500&quality=85&fit=bounds&s=5d98fa46e9f4ea1f2d76689fdc63b2d0 500w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=1000&quality=85&fit=bounds&s=3d5138fe3db8bbe017d259a194e3b812 1000w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=1500&quality=85&fit=bounds&s=d7f63465c027e3bbfee50ec45bf8ce08 1500w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=2000&quality=85&fit=bounds&s=9fec665dea0488ccdb6cba817d386bc2 2000w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=2500&quality=85&fit=bounds&s=090ee8504fd1159303e4fdeb6230026f 2500w, https://i.guim.co.uk/img/media/65ec3b1f563df2e45b0b8720e6b6eb5dd86979ae/0_0_1976_1346/master/1976.jpg?width=3000&quality=85&fit=bounds&s=cccdad46cbce87f9698a9ce74d7fc4da 3000w',
			alt: {
				kind: OptionKind.Some,
				value: '1 Waiting for the next general election/Needing to turn around on a motorway – Feels like an eternity going in the wrong direction. 2 Nigel Farage saying he’ll be the next Tory leader/Scientists warning about the potential collapse of our natural systems – Alarming predictions on future peril. 3 Unregulated AI/Trampoline without a net – Fun (until catastrophic.'
			},
			width: 2700,
			height: 617,
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg)
		},
		{
			src: 'https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=900&quality=85&fit=bounds&s=c4a4230971167af71524bc379e52737f',
			dpr2Srcset: 'https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=140&quality=45&fit=bounds&s=3b536e4ad2f399fc58da6a0da0242cad 140w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=500&quality=45&fit=bounds&s=72d282affa0762774b95eddf7f1f8b60 500w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=1000&quality=45&fit=bounds&s=8f047bdb6bb611437ce48cafea22acc3 1000w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=1500&quality=45&fit=bounds&s=1cde20a4be16fb9be581aa5efe5d53fb 1500w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=2000&quality=45&fit=bounds&s=bdf9e7848ce02dd28d03f184d84f43f7 2000w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=2500&quality=45&fit=bounds&s=7aa0bce2c3574bf62ddce3d20fb5229e 2500w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=3000&quality=45&fit=bounds&s=a3f62820b9d9c4511d680aedb9b6fd78 3000w',
			srcset: 'https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=140&quality=85&fit=bounds&s=4e8444cc92d96f2e521f8f44c5cf736d 140w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=500&quality=85&fit=bounds&s=b52be4f2ae48784dbe6aa0bbceddf7a9 500w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=1000&quality=85&fit=bounds&s=75347a90e6f97f4f65457ca64c45078a 1000w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=1500&quality=85&fit=bounds&s=d70671787f95286ca840d9d47e42aaa3 1500w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=2000&quality=85&fit=bounds&s=14bba5baf6fd86b908c025e99551e3b7 2000w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=2500&quality=85&fit=bounds&s=b0a4e956104a3c14aa667c499a5c9b46 2500w, https://i.guim.co.uk/img/media/c9d74d1900986e9126fc902b62325650ec50eef3/0_0_1981_1346/master/1981.jpg?width=3000&quality=85&fit=bounds&s=69b8eaf816c9d30e882c055747f18b56 3000w',
			alt: {
				kind: OptionKind.Some,
				value: '1 Waiting for the next general election/Needing to turn around on a motorway – Feels like an eternity going in the wrong direction. 2 Nigel Farage saying he’ll be the next Tory leader/Scientists warning about the potential collapse of our natural systems – Alarming predictions on future peril. 3 Unregulated AI/Trampoline without a net – Fun (until catastrophic.'
			},
			width: 800,
			height: 356,
			role: ArticleElementRole.Standard,
			imageSubtype: Optional.some(ImageSubtype.Jpeg)
		},
	],
}

const cartoonMainMedia: Option<MainMedia> = {
	kind: OptionKind.Some,
	value: {
		kind: MainMediaKind.Cartoon,
		cartoon: cartoonData
	}
}

export { cartoonData, cartoonMainMedia }
