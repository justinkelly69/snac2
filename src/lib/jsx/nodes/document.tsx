import { SNACAttributes, SNACElement } from '../../snac2'
import { StyledFixedWidthText } from '../styled'
import { Element } from './element'

export interface DocumentArgs {
    snac: {
        _: string
        N: string
        A: SNACAttributes.AttributesNodeType
        C: Array<SNACElement.ChildNodeType>
        a: boolean
        o: boolean
        q: boolean
    }
    cssMode: string
}

export const Document = (props: DocumentArgs) => {
    return (
        <StyledFixedWidthText.FixedWidthText>
            <Element
                snac={props.snac}
                cssMode={props.cssMode}
                showTag={true}
            />
        </StyledFixedWidthText.FixedWidthText>
    )
}
