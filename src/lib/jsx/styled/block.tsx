import React from 'react'
import styled from 'styled-components'
import { colors } from './colors'

const BaseRow = styled.div`
  white-space: pre;
`

export interface RowArgs {
    visible?: boolean
    selected?: boolean
    children: any
}

const Row = (props: RowArgs): JSX.Element => {
    const bgColor = props.selected
        ? colors.light.SelectedBackground
        : colors.light.UnselectedBackground
    const R = styled(BaseRow)`
    display: ${props.visible ? '' : 'none'};
    background-color: ${bgColor};
  `
    return <R>{props.children}</R>
}

export interface BlockArgs {
    Prop1: JSX.Element
    Prop2: JSX.Element
    visible?: boolean
    selected?: boolean
}

export const Block = (props: BlockArgs) => {
    return (
        <Row visible={props.visible} selected={props.selected}>
            {props.Prop1}
            {props.Prop2}
        </Row>
    )
}
