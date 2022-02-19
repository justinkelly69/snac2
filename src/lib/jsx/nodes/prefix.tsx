import React from 'react';
import { Span } from '../styled/span';
import { getPrefix } from '../../snac2/helpers';
import { ChildrenButton } from '../styled/button';

export interface PrefixArgs {
    _: string,
    color: string,
    showKids: boolean,
    showHideKids: Function,
}

export const Prefix = (props: PrefixArgs): JSX.Element => {

    const prefix = getPrefix(props._);

    return (
        <>
            {'+'}
            <Span color={props.color}>
                {prefix}
            </Span>
            <ChildrenButton show={props.showKids}
                onClick={e => {
                    props.showHideKids(props.showKids);
                }}
            />
        </>
    );
}

