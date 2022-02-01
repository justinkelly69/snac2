import React from 'react';
import { Prefix } from './prefix';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';
import { Block } from '../styled/block';
import C from '../../snac2/constants';

export interface AttributeArgs {
    _: string,
    ns: string,
    name: string,
    value: string,
    cssMode: string,
}

export const Attribute = (props: AttributeArgs): JSX.Element => {

    const c = getColors(props.cssMode);

    return (
        <Block
            Prop1={<Span color={c.Prefix} width={3}>{C.ATTRIBUTE_PREFIX}</Span>}
            Prop2={<Span color={c.Attribute} display='block'>
                {props.ns !== '@' &&
                    <>
                        <Span color={c.AttributeNS} fontWeight='bold'>{props.ns}</Span>
                        <Span color={c.AttributeColon}>:</Span>
                    </>
                }
                <Span color={c.AttributeName} fontWeight='bold'>{props.name}</Span>
                <Span color={c.AttributeEquals}>=</Span>
                <Span color={c.AttributeQuote}>&quot;</Span>
                <Span color={c.AttributeValue} fontWeight='bold'>{props.value}</Span>
                <Span color={c.AttributeQuote}>&quot;</Span>
            </Span>}
        />
    );
}
