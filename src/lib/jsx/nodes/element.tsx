import React, { useState } from 'react';
import { TagType, Tag } from './tag';
import { Children } from './children';
import { ChildNodeType } from '../../snac2/elements';
import { AttributesNodeType } from '../../snac2/attributes';

export interface ElementArgs {
    snac: {
        _: string,
        S: string,
        N: string,
        A: AttributesNodeType,
        C: Array<ChildNodeType>,
        a: boolean,
        o: boolean,
        q: boolean
    },
    cssMode: string,
    show: boolean,
    showHide?: Function,
};

export const Element = (props: ElementArgs): JSX.Element => {

    const [showKids, showHideKids] = useState(props.snac.o);

    return (
        <>
            <Tag
                show={props.show}
                showHide={e => {
                    showHideKids(!showKids)
                }}
                snac={props.snac}
                tagType={TagType.open}
                cssMode={props.cssMode}
            />
            <Children
                C={props.snac.C}
                visible={showKids}
                cssMode={props.cssMode}
            />
            <Tag
                show={showKids}
                showHide={showHideKids}
                snac={props.snac}
                tagType={TagType.close}
                cssMode={props.cssMode}
            />
        </>
    );
};
