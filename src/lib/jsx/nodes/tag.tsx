import React, { useState } from 'react';
import { AttributesNodeType } from '../../snac2/attributes';
import { Attributes } from './attributes';
import { Prefix } from './prefix';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';
import { Block } from '../styled/block';
import { AttributesButton } from '../styled/button';

export enum TagType {
    open, close, empty,
}

export interface TagArgs {
    snac: {
        _: string,
        S: string,
        N: string,
        A: AttributesNodeType,
        a: boolean,
    },
    show: boolean,
    showHide: Function,
    cssMode: string,
    tagType: TagType,
}

export const Tag = (props: TagArgs): JSX.Element => {

    const [atts, showAtts] = useState(props.snac.a);

    const c = getColors(props.cssMode);

    return (
        <Block visible={props.show}
            Prop1={
                <Prefix _={props.snac._} color={c.Prefix} show={props.show} showHide={props.showHide} />
            }
            Prop2={
                <Span color={c.Node}>
                    &lt;
                    {props.tagType === TagType.close &&
                        <Span color={c.NodeSlash}>{'/'}</Span>
                    }
                    {props.snac.S !== '@' &&
                        <>
                            <Span color={c.NS} fontWeight='bold'>{props.snac.S}</Span>
                            <Span color={c.NodeColon}>:</Span>
                        </>
                    }
                    <Span color={c.Name} fontWeight='bold'>{props.snac.N}</Span>
                    {props.tagType !== TagType.close &&
                        <Block visible={false}
                            Prop1={<></>}
                            Prop2={
                                <Attributes _={props.snac._} atts={props.snac.A} cssMode={props.cssMode} />
                            }
                        />
                    }
                    {props.tagType === TagType.empty &&
                        <Span color={c.NodeSlash}>{' /'}</Span>
                    }
                    &gt;
                    {props.tagType !== TagType.close &&
                        <AttributesButton show={atts} onClick={e => {
                            console.log('atts', atts)
                            showAtts(!atts)
                        }} />
                    }
                </Span>
            }
        />
    );
}
