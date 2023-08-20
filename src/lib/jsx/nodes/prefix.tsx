import { StyledButton, StyledSpan } from '../styled'


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
            <StyledButton.SelectButton
                show={props.selectedNode}
                onClick={props.selectNode}
            />
            <StyledSpan.Span color={props.color}>{props.prefix}</StyledSpan.Span>
            <StyledButton.ChildrenButton
                show={props.showKids}
                onClick={props.showHideKids}
            />
        </>
    )
}
