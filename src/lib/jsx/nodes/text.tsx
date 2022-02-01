import React from 'react';
import { TextNodeType } from '../../snac2/texts';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';

export interface TextArgs {
    snac: TextNodeType,
    cssMode: string,
};

export const Text = (props: TextArgs): JSX.Element => {

    const c = getColors(props.cssMode);

    return (
        <Span color={c.Text}>
            [{props.snac.T}]
        </Span>
    );
}
