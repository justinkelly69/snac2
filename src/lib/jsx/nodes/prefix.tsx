import React from 'react';
import { Span } from '../styled/span';
import { ChildrenButton } from '../styled/button';

export interface PrefixArgs {
    prefix: string,
    color: string,
    showKids: boolean,
    showHideKids: Function,
}

export const Prefix = (props: PrefixArgs): JSX.Element => {
    return (
        <>
            {'+'}
            <Span color={props.color}>
                {props.prefix}
            </Span>
            <ChildrenButton show={props.showKids}
                onClick={e => {
                    props.showHideKids(props.showKids);
                }}
            />
        </>
    );
}

