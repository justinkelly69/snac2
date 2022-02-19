import React from 'react';
import { Prefix } from './prefix';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';
import { Block } from '../styled/block';
import constants from '../../snac2/constants';

export interface AttributeArgs {
    _: string,
    ns: string,
    name: string,
    value: string,
    cssMode: string,
}

export const Attribute = (props: AttributeArgs): JSX.Element => {

    const colors = getColors(props.cssMode);

    return (
        <Block visible={true}
            Prop1={
                <Span color={colors.Prefix} width={3}>{constants.ATTRIBUTE_PREFIX}</Span>
            }
            Prop2={
                <Span color={colors.Attribute}>
                    {props.ns !== '@' &&
                        <>
                            <Span color={colors.AttributeNS} fontWeight='bold'>{props.ns}</Span>
                            <Span color={colors.AttributeColon}>:</Span>
                        </>
                    }
                    <Span color={colors.AttributeName} fontWeight='bold'>{props.name}</Span>
                    <Span color={colors.AttributeEquals}>=</Span>
                    <Span color={colors.AttributeQuote}>&quot;</Span>
                    <Span color={colors.AttributeValue} fontWeight='bold'>{props.value}</Span>
                    <Span color={colors.AttributeQuote}>&quot;</Span>
                </Span>
            }
        />
    );
}
