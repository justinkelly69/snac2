import React from 'react';
import styled from 'styled-components';
import { Prefix } from '../nodes/prefix';
import { ChildNodeType } from '../../snac2/elements';

const BaseRow = styled.div`
    white-space: pre;
`;

export interface RowArgs {
    visible: boolean,
    children: any,
}

const Row = (props: RowArgs):JSX.Element => {
    const R = styled(BaseRow)`
        display: ${props.visible ? '' : 'none'}
    `;
    return (
        <R>{props.children}</R>
    )
}

const Col = styled.span``;

export interface BlockArgs {
    Prop1: JSX.Element,
    Prop2: JSX.Element,
    visible: boolean,
}

export const Block = (props: BlockArgs) => {
    return (
        <Row visible={props.visible}>
            <Col>{props.Prop1}</Col>
            <Col>{props.Prop2}</Col>
        </Row>
    );
}