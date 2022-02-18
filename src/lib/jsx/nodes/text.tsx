import React, { useState } from 'react';
import { TextNodeType } from '../../snac2/texts';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';
import C from '../../snac2/constants';

export interface TextArgs {
    snac: TextNodeType,
    cssMode: string,
    show: boolean,
    showHide: Function,
};

export const Text = (props: TextArgs): JSX.Element => {

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
                <Span color={colors.Text}>
                    {props.snac.o ?
                        props.snac.T :
                        props.snac.T.substring(0, C.TEXT_PREVIEW_LENGTH)
                    }
                </Span>
            }
        />
    );
}
