import { ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { FC } from 'react';
import DefaultHeadingTwo, { DefaultProps, defaultStyles } from './HeadingTwo.defaults';
import ImmersiveHeadingTwo from './ImmersiveHeadingTwo';
import LabsHeadingTwo from './LabsHeadingTwo';

const HeadingTwo: FC<DefaultProps> = ({
    format,
	isEditions,
	heading,
}) => {
    if (format.display === ArticleDisplay.Immersive) {
        return (
            <ImmersiveHeadingTwo
                format={format}
                isEditions={isEditions}
                heading={heading}
            />
        );
    }

    if (format.theme === ArticleSpecial.Labs) {
        return (
            <LabsHeadingTwo
                format={format}
                isEditions={isEditions}
                heading={heading}
            />
        );
    }

    return (
        <DefaultHeadingTwo
            format={format}
            isEditions={isEditions}
            heading={heading}
            css={defaultStyles}
        />
    );
}

export default HeadingTwo;
