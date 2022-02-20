import React, { useState } from 'react';
import { CDATANodeType } from '../../snac2/cdata';
import { escapeCDATA } from '../../snac2/cdata';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';
import constants from '../../snac2/constants';
import { normalize } from '../../snac2/textprocessor';
import { getPrefix } from '../../snac2/prefix';

export interface CDATArgs {
    snac: CDATANodeType,
    cssMode: string,
};

export const CDATA = (props: CDATArgs): JSX.Element => {

    const [showCDATA, showHideCDATA] = useState(props.snac.o);
    const colors = getColors(props.cssMode);
    const prefix = getPrefix(props.snac._);

    return (
        <Block visible={true}
            Prop1={
                <Prefix 
                    prefix={prefix}
                    color={colors.Prefix}
                    showKids={showCDATA}
                    showHideKids={e => showHideCDATA(!showCDATA)}
                />
            }
            Prop2={
                <Span color={colors.CDATABody}>
                    <Span color={colors.CDATAHeading}>
                        &lt;![
                        <Span color={colors.CDATALabel}>CDATA</Span>
                        [
                    </Span>
                    {showCDATA ?
                        escapeCDATA(props.snac.D) :
                        escapeCDATA(normalize(props.snac.D, constants.CDATA_PREVIEW_LENGTH))
                    }
                    <Span color={colors.CDATAHeading}>
                        ]]&gt;
                    </Span>
                </Span>
            }
        />

    )
}
