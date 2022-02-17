import React from 'react';
import styled from 'styled-components';
import { Prefix } from '../nodes/prefix';
import { ChildNodeType } from '../../snac2/elements';

const Row = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

const Col1 = styled.div`
    flex-basis: content;
    flex-shrink: 1;
`;

const Col2 = styled.div`
    flex-shrink: 1;
`;

export interface BlockArgs {
    Prop1: JSX.Element,
    Prop2: JSX.Element,
}

export const Block = (props: BlockArgs) => {
    return (
        <Row>
            <Col1>{props.Prop1}</Col1>
            <Col2>{props.Prop2}</Col2>
        </Row>
    );
}