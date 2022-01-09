import React from 'react';

export interface AttributeArgs {
    ns: string,
    name: string,
    value: string,
    cssPrefix: string,
}

export const Attribute = (props: AttributeArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-att-tag`}>
            {' '}
            {props.ns !== '@' &&
                <>
                    <span className={`${props.cssPrefix}-att-ns`}>{props.ns}</span>
                    <span className={`${props.cssPrefix}-att-colon`}>:</span>
                </>
            }
            <span className={`${props.cssPrefix}-att-name`}>{props.name}</span>
            <span className={`${props.cssPrefix}-att-equals`}>=</span>
            <span className={`${props.cssPrefix}-att-quotes`}>&quot;</span>
            <span className={`${props.cssPrefix}-att-value`}>{props.value}</span>
            <span className={`${props.cssPrefix}-att-quotes`}>&quot;</span>
        </span>
    );
}
