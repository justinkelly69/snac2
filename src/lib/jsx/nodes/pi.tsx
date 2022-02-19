import React, {useState} from 'react';
import { PINodeType } from '../../snac2/pis';
import { escapePI } from '../../snac2/helpers';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';
import C from '../../snac2/constants';

export interface PIArgs {
    snac: PINodeType,
    cssMode: string,
    show: boolean,
};

export const PI = (props: PIArgs): JSX.Element => {

    const [showPI, showHidePI] = useState(props.snac.o);

    const colors = getColors(props.cssMode);

    return (
        <Block visible={props.show}
            Prop1={
                <Prefix _={props.snac._}
                    color={colors.Prefix}
                    show={props.show}
                    showHide={e => showHidePI(!showPI)}
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
                    {showPI ?
                        escapePI(props.snac.B) :
                        escapePI(props.snac.B.substring(0, C.PI_PREVIEW_LENGTH))
                    }
                    <Span color={colors.PIHeading}>
                        ?&gt;
                    </Span>
                </Span>
            }
        />
    )
}
