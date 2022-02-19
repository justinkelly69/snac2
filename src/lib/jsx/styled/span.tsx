import React from 'react';
import styled from 'styled-components';

const BaseSpan = styled.span`
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
        font-weight: ${props.fontWeight || ''};
    `;

    return (
        <BS>{props.children}</BS>
    );
}