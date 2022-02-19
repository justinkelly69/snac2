import React from 'react';
import { Span } from '../styled/span';
import constants from '../../snac2/constants';

export interface AttributePrefixArgs {
    color: string,
    prefix: string,
}

export const AttributePrefix = (props: AttributePrefixArgs): JSX.Element => {

    return (
        <>
            {' '}
            <Span color={props.color}>
                {`${props.prefix}${constants.ATTRIBUTE_PREFIX}`}
            </Span>
        </>
    );
}