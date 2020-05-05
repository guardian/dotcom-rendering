import React from 'react';
import {
    MoustacheSection,
    MoustacheTemplate,
    MoustacheVariable,
} from "@root/src/amp/components/moustache";

export const Epic: React.FC<{}> = ({}) =>
    (
        <amp-list
            layout="fixed-height"
            height="184px"
            src={"https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json"}
            credentials="include"
        >
            <MoustacheTemplate>
                <MoustacheSection name="sheets">
                    <MoustacheSection name="control">
                        <MoustacheSection name="heading">
                            <MoustacheVariable name="heading" />
                        </MoustacheSection>

                        <MoustacheVariable name="paragraphs" />
                    </MoustacheSection>
                </MoustacheSection>
            </MoustacheTemplate>
        </amp-list>
    );
