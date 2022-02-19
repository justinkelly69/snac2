import React from 'react';
import styled from 'styled-components';

const BaseSpan = styled.span`
    font: Courier New, monospace;
    font-weight: normal;
`;

export interface SpanArgs {
    color: string,
    width?: number,
    display?: string,
    fontWeight?: string,
    children: any,
}

export const Span = (props: SpanArgs):JSX.Element => {
    const BS = styled(BaseSpan)`
        color: ${props.color};
        font-weight: ${props.fontWeight || 'normal'};
    `;

    return (
        <BS>{props.children}</BS>
    );
}