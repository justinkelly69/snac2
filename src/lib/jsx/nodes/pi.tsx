import React from 'react';
import { PINodeType } from '../../snac2/pis';
import { escapePI } from '../../snac2/helpers';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';

export interface PIArgs {
    snac: PINodeType,
    cssMode: string,
};

export const PI = (props: PIArgs): JSX.Element => {

    const c = getColors(props.cssMode);

    return (
        <Span color={c.PIBody}>
            <Span color={c.PIHeading}>
                &lt;?
            </Span>
            <Span color={c.PILang}>
                {props.snac.L} {' '}
            </Span>
            {escapePI(props.snac.B)}
            <Span color={c.PIHeading}>
                ?&gt;
            </Span>
        </Span>
    )
}
