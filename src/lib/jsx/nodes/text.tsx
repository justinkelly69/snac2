import React, { useState } from 'react';
import { TextNodeType } from '../../snac2/texts';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';
import constants from '../../snac2/constants';

export interface TextArgs {
    snac: TextNodeType,
    cssMode: string,
    show: boolean,
};

export const Text = (props: TextArgs): JSX.Element => {

    const [showText, showHideText] = useState(props.snac.o);

    const colors = getColors(props.cssMode);

    return (
        <Block visible={props.show}
            Prop1={
                <Prefix _={props.snac._}
                    color={colors.Prefix}
                    showKids={showText}
                    showHideKids={e => showHideText(!showText)}
                />
            }
            Prop2={
                <Span color={colors.Text}>
                    {showText ?
                        `[${props.snac.T}]` :
                        `[${props.snac.T.substring(0, constants.TEXT_PREVIEW_LENGTH).split(/\s+/).join(' ').trim()}]`
                    }
                </Span>
            }
        />
    );
}
