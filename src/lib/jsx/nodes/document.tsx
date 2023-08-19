import React from 'react'
import { FixedWidthText } from '../styled/fwt'
import { Element } from './element'
import { ChildNodeType } from '../../snac2/element'
import { AttributesNodeType } from '../../snac2/attributes'

export interface DocumentArgs {
    snac: {
        _: string
        S: string
        N: string
        A: AttributesNodeType
        C: Array<ChildNodeType>
        a: boolean
        o: boolean
        q: boolean
    }
    cssMode: string
}

export const Document = (props: DocumentArgs) => {
    return (
        <FixedWidthText>
            <Element
                snac={props.snac}
                cssMode={props.cssMode}
                showTag={true}
            />
        </FixedWidthText>
    )
}
