import React, { useState } from 'react';
import { CDATANodeType } from '../../snac2/cdata';
import { escapeCDATA } from '../../snac2/helpers';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';
import constants from '../../snac2/constants';

export interface CDATArgs {
    snac: CDATANodeType,
    cssMode: string,
    show: boolean,
};

export const CDATA = (props: CDATArgs): JSX.Element => {

    const [showCDATA, showHideCDATA] = useState(props.snac.o);

    const colors = getColors(props.cssMode);

    return (
        <Block visible={props.show}
            Prop1={
                <Prefix _={props.snac._}
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
                        escapeCDATA(props.snac.D.substring(0, constants.CDATA_PREVIEW_LENGTH))
                    }
                    <Span color={colors.CDATAHeading}>
                        ]]&gt;
                    </Span>
                </Span>
            }
        />

    )
}
