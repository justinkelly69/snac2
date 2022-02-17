import React from 'react';
import { useState } from 'react';
import { Span } from '../styled/span';
import { getPrefix } from '../../snac2/helpers';
import { ChildrenButton } from '../styled/button';

export interface PrefixArgs {
    _: string,
    color: string,
    show: boolean,
    showHide: Function,
}

export const Prefix = (props: PrefixArgs): JSX.Element => {

    const [show, showHide] = useState(props.show)

    const prefix = getPrefix(props._);

    return (
        <>
            {'+'}
            <Span
                color={props.color}
                width={prefix.length / 2}
            >
                {prefix}
            </Span>
            <ChildrenButton show={show} onClick={e => {
                showHide(!show);
                props.showHide(show);
            }} />
        </>
    );
}

