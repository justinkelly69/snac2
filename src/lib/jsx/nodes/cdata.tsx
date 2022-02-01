import React from 'react';
import { CDATANodeType } from '../../snac2/cdata';
import { escapeCDATA } from '../../snac2/helpers';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';

export interface CDATArgs {
    snac: CDATANodeType,
    cssMode: string,
};

export const CDATA = (props: CDATArgs): JSX.Element => {

    const c = getColors(props.cssMode);

    return (
        <Span color={c.CDATABody}>
            <Span color={c.CDATAHeading}>
                &lt;![
                <Span color={c.CDATALabel}>CDATA</Span>
                [
            </Span>
            {escapeCDATA(props.snac.D)}
            <Span color={c.CDATAHeading}>
                ]]&gt;
            </Span>
        </Span>
    )
}
