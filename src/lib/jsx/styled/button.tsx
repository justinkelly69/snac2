import React from 'react';
import styled from 'styled-components';
import C from '../../snac2/constants';

const BaseButton = styled.button`
    box-sizing: content-box;
    display: inline-flex;
    padding: 0;
    height: 1em;
    width: 1em;
    margin: 0;
    & first-child: {
        align-items: center;
    }
`;

interface ButtonProps {
    onClick: Function,
    onOff: boolean,
}

export const AttributesButton = (props:ButtonProps):JSX.Element => {
    const BB = styled(BaseButton)``;

    return (
        <BB onClick={props.onClick}>
            {props.onOff ? C.BUTTON_CLOSE : C.BUTTON_OPEN}
        </BB>
    )
}

export const ChildrenButton = (props:ButtonProps):JSX.Element => {
    const BB = styled(BaseButton)``;

    return (
        <BB onClick={props.onClick}>
            {props.onOff ? C.BUTTON_CLOSE : C.BUTTON_OPEN}
        </BB>
    )
}