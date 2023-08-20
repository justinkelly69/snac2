import React from 'react'
import styled from 'styled-components'
import { StyledConstants } from '../styled'


const BaseButton = styled.a`
    background-color: paleblue;
    box-sizing: border-box;
    border: 0;
    padding: 0;
    height: 1em;
    width: 1em;
    margin: 0;
    align-items: center;
`

interface ButtonProps {
    onClick: Function
    show: boolean
}

export const SelectButton = (props: ButtonProps): JSX.Element => {
    const BB = styled(BaseButton)``

    return (
        <BB onClick={props.onClick}>
            {props.show ? StyledConstants.constants.BUTTON_CLOSE : StyledConstants.constants.BUTTON_OPEN}
        </BB>
    )
}

export const AttributesButton = (props: ButtonProps): JSX.Element => {
    const BB = styled(BaseButton)``

    return (
        <BB onClick={props.onClick}>
            {props.show ? StyledConstants.constants.BUTTON_CLOSE : StyledConstants.constants.BUTTON_OPEN}
        </BB>
    )
}

export const ChildrenButton = (props: ButtonProps): JSX.Element => {
    const CB = styled(BaseButton)``

    return (
        <CB onClick={props.onClick}>
            {props.show ? StyledConstants.constants.BUTTON_CLOSE : StyledConstants.constants.BUTTON_OPEN}
        </CB>
    )
}
