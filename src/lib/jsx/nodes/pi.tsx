import React from 'react';
import { PINodeType } from '../../snac2/pis';
import { escapePI } from '../../snac2/helpers';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';

export interface PIArgs {
    snac: PINodeType,
    cssMode: string,
    show: boolean,
    showHide: Function,
};

export const PI = (props: PIArgs): JSX.Element => {

    const colors = getColors(props.cssMode);

    return (
        <Block visible={props.show}
            Prop1={
                <Prefix _={props.snac._}
                    color={colors.Prefix}
                    show={props.show}
                    showHide={props.showHide}
                />
            }
            Prop2={
                <Span color={colors.PIBody}>
                    <Span color={colors.PIHeading}>
                        &lt;?
                    </Span>
                    <Span color={colors.PILang}>
                        {props.snac.L} {' '}
                    </Span>
                    {escapePI(props.snac.B)}
                    <Span color={colors.PIHeading}>
                        ?&gt;
                    </Span>
                </Span>
            }
        />
    )
}
