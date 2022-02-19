import React from 'react';
import styled from 'styled-components';

const BaseDiv = styled.div`
    font-family: Courier New, monospace;
    font-weight: bold;
    font-size: .75em;
    white-space: pre;
`;

export interface FixedWidthTextArgs {
    children: any,
}

export const FixedWidthText = (props: FixedWidthTextArgs) => {
    return (
        <BaseDiv>
            {props.children}
        </BaseDiv>
    );
}
