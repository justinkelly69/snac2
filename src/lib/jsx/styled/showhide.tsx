import React from 'react';
import styled from 'styled-components';

const BaseDiv = styled.div``;

export interface ShowHideProps {
    visible: boolean,
    children: any,
}

export const ShowHide = (props: ShowHideProps) => {
    const BD = styled(BaseDiv)`
        display: ${props.visible ? null : 'none'};
    `;
    return (
        <BD>{props.children}</BD>
    );
}