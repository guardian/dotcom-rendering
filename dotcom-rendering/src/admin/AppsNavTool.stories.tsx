import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { parse } from 'valibot';
import { ukNav } from '../../fixtures/manual/appsNav/uk';
import { AppsNavSchema } from './appsNav';
import { AppsNavTool as AppsNavToolComponent } from './AppsNavTool';

const meta = {
	title: 'Admin/Apps Nav Tool',
	component: AppsNavToolComponent,
} satisfies Meta<typeof AppsNavToolComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppsNavTool = {
	args: {
		ukNav: parse(AppsNavSchema, ukNav),
		guardianBaseUrl: 'https://www.theguardian.com',
	},
} satisfies Story;
