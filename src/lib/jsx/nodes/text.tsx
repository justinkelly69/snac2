import React, { useState } from 'react';
import { TextNodeType } from '../../snac2/text';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';
import constants from '../../snac2/constants';
import { normalize } from '../../snac2/textprocessor';
import { getPrefix } from '../../snac2/prefix';

export interface TextArgs {
    snac: TextNodeType,
    cssMode: string,
};

export const Text = (props: TextArgs): JSX.Element => {

    const [showText, showHideText] = useState(props.snac.o);
    const colors = getColors(props.cssMode);
    const prefix = getPrefix(props.snac._);

    return (
        <Block visible={true}
            Prop1={
                <Prefix 
                    prefix={prefix}
                    color={colors.Prefix}
                    showKids={showText}
                    showHideKids={e => showHideText(!showText)}
                />
            }
            Prop2={
                <Span color={colors.Text}>
                    {showText ?
                        `[${props.snac.T}]` :
                        `[${normalize(props.snac.T , constants.TEXT_PREVIEW_LENGTH)}]`
                    }
                </Span>
            }
        />
    );
}
