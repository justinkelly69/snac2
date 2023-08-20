import { useState } from 'react';
import { SNACAttributes, SNACElement, SNACPrefix } from '../../snac2'
import { StyledConstants } from '../styled'
import { TagType, Tag } from './tag'
import { Children } from './children'

export interface ElementArgs {
    snac: {
        _: string,
        N: string,
        A: SNACAttributes.AttributesNodeType,
        C: Array<SNACElement.ChildNodeType>,
        a: boolean,
        o: boolean,
        q: boolean
    },
    cssMode: string,
    showTag: boolean,
};

export const Element = (props: ElementArgs): JSX.Element => {

    const prefix = SNACPrefix.getPrefix(props.snac._, StyledConstants.constants.PREFIX_START, StyledConstants.constants.PREFIX_ON, StyledConstants.constants.PREFIX_END)
    const [showKids, showHideKids] = useState(props.snac.o)


    return (
        <>
            <Tag
                prefix={prefix}
                showTag={props.showTag}
                showKids={showKids}
                showHideKids={e => showHideKids(!showKids)}
                snac={props.snac}
                tagType={TagType.open}
                cssMode={props.cssMode}
            />
            <Children
                prefix={prefix}
                C={props.snac.C}
                visible={showKids}
                cssMode={props.cssMode}
            />
            <Tag
                prefix={prefix}
                showTag={props.showTag}
                showKids={showKids}
                showHideKids={e => showHideKids(!showKids)}
                snac={props.snac}
                tagType={TagType.close}
                cssMode={props.cssMode}
            />
        </>
    );
};
