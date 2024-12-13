import type { Meta } from '@storybook/react';
import { TableBlockComponent } from './TableBlockComponent';

const tableHtml = `<table data-embed-type="table" class="table table--football table--striped">
        <thead>
            <tr>
                <th class="football-stat--postition table-column--sub"><abbr title="Position">Pos</abbr></th>
                <th class="football-stat--team table-column--main">Team</th>
                <th class="football-stat--played"><abbr title="Played">P</abbr></th>
                <th class="football-stat--difference"><abbr title="Goal difference">GD</abbr></th>
                <th class="football-stat--points"><abbr title="Points">Pts</abbr></th>
            </tr>
        </thead>
        <tbody>

            <tr class="
            ">
                <td class="football-stat--postition table-column--sub">1</td>
                <td class="football-stat--team table-column--main">Liverpool</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">15</td>
                <td class="football-stat--points">28</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">2</td>
                <td class="football-stat--team table-column--main">Man City</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">9</td>
                <td class="football-stat--points">23</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">3</td>
                <td class="football-stat--team table-column--main">Nottm Forest</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">5</td>
                <td class="football-stat--points">19</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">4</td>
                <td class="football-stat--team table-column--main">Brighton</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">4</td>
                <td class="football-stat--points">19</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">5</td>
                <td class="football-stat--team table-column--main">Chelsea</td>
                <td class="football-stat--played">10</td>
                <td class="football-stat--difference">8</td>
                <td class="football-stat--points">18</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">6</td>
                <td class="football-stat--team table-column--main">Arsenal</td>
                <td class="football-stat--played">10</td>
                <td class="football-stat--difference">6</td>
                <td class="football-stat--points">18</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">7</td>
                <td class="football-stat--team table-column--main">Fulham</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">3</td>
                <td class="football-stat--points">18</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">8</td>
                <td class="football-stat--team table-column--main">Newcastle</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">2</td>
                <td class="football-stat--points">18</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">9</td>
                <td class="football-stat--team table-column--main">Aston Villa</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">0</td>
                <td class="football-stat--points">18</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">10</td>
                <td class="football-stat--team table-column--main">Tottenham Hotspur</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">10</td>
                <td class="football-stat--points">16</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">11</td>
                <td class="football-stat--team table-column--main">Brentford</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">0</td>
                <td class="football-stat--points">16</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">12</td>
                <td class="football-stat--team table-column--main">AFC Bournemouth</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">0</td>
                <td class="football-stat--points">15</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">13</td>
                <td class="football-stat--team table-column--main">Man Utd</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">0</td>
                <td class="football-stat--points">15</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">14</td>
                <td class="football-stat--team table-column--main">West Ham</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">-6</td>
                <td class="football-stat--points">12</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">15</td>
                <td class="football-stat--team table-column--main">Leicester</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">-7</td>
                <td class="football-stat--points">10</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">16</td>
                <td class="football-stat--team table-column--main">Everton</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">-7</td>
                <td class="football-stat--points">10</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">17</td>
                <td class="football-stat--team table-column--main">Ipswich</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">-10</td>
                <td class="football-stat--points">8</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">18</td>
                <td class="football-stat--team table-column--main">Crystal Palace</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">-7</td>
                <td class="football-stat--points">7</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">19</td>
                <td class="football-stat--team table-column--main">Wolverhampton</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">-11</td>
                <td class="football-stat--points">6</td>
            </tr>

            <tr class="
             ">
                <td class="football-stat--postition table-column--sub">20</td>
                <td class="football-stat--team table-column--main">Southampton</td>
                <td class="football-stat--played">11</td>
                <td class="football-stat--difference">-14</td>
                <td class="football-stat--points">4</td>
            </tr>

        </tbody>
    </table>`;

const meta = {
	title: 'Components/TableBlockComponent',
	component: TableBlockComponent,
	render: (args) => <TableBlockComponent {...args} />,
	args: {
		element: {
			isMandatory: true,
			elementId: 'table',
			_type: 'model.dotcomrendering.pageElements.TableBlockElement',
			html: tableHtml,
		},
	},
} satisfies Meta<typeof TableBlockComponent>;

export default meta;

export const Default = {};
