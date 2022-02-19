import React, { useState } from 'react';
import { AttributesNodeType } from '../../snac2/attributes';
import { Attributes } from './attributes';
import { Prefix } from './prefix';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';
import { Block } from '../styled/block';
import { AttributesButton } from '../styled/button';
import { getPrefix } from '../../snac2/helpers';
import constants from '../../snac2/constants';

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
    showTag: boolean,
    showKids: boolean,
    showHideKids: Function,
    cssMode: string,
    tagType: TagType,
}

export const Tag = (props: TagArgs): JSX.Element => {

    const [atts, showAtts] = useState(props.snac.a);
    const prefix = getPrefix(props.snac._);
    const colors = getColors(props.cssMode);

    return (
        <Block visible={props.showTag}
            Prop1={
                <Prefix
                    _={props.snac._}
                    color={colors.Prefix}
                    showKids={props.showKids}
                    showHideKids={props.showHideKids}
                />
            }
            Prop2={
                <Span color={colors.Node}>
                    &lt;
                    {props.tagType === TagType.close &&
                        <Span color={colors.NodeSlash}>{'/'}</Span>
                    }
                    {props.snac.S !== '@' &&
                        <>
                            <Span color={colors.NS} fontWeight='bold'>{props.snac.S}</Span>
                            <Span color={colors.NodeColon}>:</Span>
                        </>
                    }
                    <Span color={colors.Name} fontWeight='bold'>{props.snac.N}</Span>
                    {props.tagType !== TagType.close &&
                        <Block visible={atts}
                            Prop1={<></>}
                            Prop2={
                                <Attributes
                                    _={props.snac._}
                                    atts={props.snac.A}
                                    cssMode={props.cssMode}
                                />
                            }
                        />
                    }
                    {props.tagType === TagType.empty &&
                        <Span color={colors.NodeSlash}>{' /'}</Span>
                    }
                    {atts ? `${constants.PREFIX_START}${prefix}` : null}&gt;
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
