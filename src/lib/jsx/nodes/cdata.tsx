import React from 'react';
import { CDATANodeType } from '../../snac2/cdata';
import { escapeCDATA } from '../../snac2/helpers';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix';
import { getColors } from '../styled/colors';

export interface CDATArgs {
    snac: CDATANodeType,
    cssMode: string,
    show: boolean,
    showHide: Function,
};

export const CDATA = (props: CDATArgs): JSX.Element => {

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
                <Span color={colors.CDATABody}>
                    <Span color={colors.CDATAHeading}>
                        &lt;![
                        <Span color={colors.CDATALabel}>CDATA</Span>
                        [
                    </Span>
                    {escapeCDATA(props.snac.D)}
                    <Span color={colors.CDATAHeading}>
                        ]]&gt;
                    </Span>
                </Span>
            }
        />

    )
}
