import React, { useState } from 'react'
import { Span } from '../styled/span'
import { ChildrenButton, SelectButton } from '../styled/button'

export interface PrefixArgs {
    prefix: string
    color: string
    selectedNode: boolean
    selectNode: Function
    showKids: boolean
    showHideKids: Function
}

export const Prefix = (props: PrefixArgs): JSX.Element => {
    return (
        <>
            <SelectButton
                show={props.selectedNode}
                onClick={props.selectNode}
            />
            <Span color={props.color}>{props.prefix}</Span>
            <ChildrenButton
                show={props.showKids}
                onClick={props.showHideKids}
            />
        </>
    )
}
