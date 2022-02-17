import React from 'react';
import styled from 'styled-components';
import C from '../../snac2/constants';

const BaseButton = styled.button`
    box-sizing: border-box;
    display: inline-flex;
    padding: 0.1em;
    height: 1em;
    width: 1em;
    margin: 0;
   
        align-items: center;
        vertical-align:middle;
   
`;

interface ButtonProps {
    onClick: Function,
    show: boolean,
}

export const AttributesButton = (props: ButtonProps): JSX.Element => {
    const BB = styled(BaseButton)``;

    return (
        <BB onClick={props.onClick}>
            {props.show ? C.BUTTON_CLOSE : C.BUTTON_OPEN}
        </BB>
    )
}

export const ChildrenButton = (props: ButtonProps): JSX.Element => {
    const CB = styled(BaseButton)``;

    return (
        <CB onClick={props.onClick}>
            {props.show ? C.BUTTON_CLOSE : C.BUTTON_OPEN}
        </CB>
    )
}