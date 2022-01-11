import React from 'react';

export interface AttributeArgs {
    ns: string,
    name: string,
    value: string,
    cssMode: string,
    cssPrefix: string,
}

export const Attribute = (props: AttributeArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-att-tag-${props.cssMode}`}>
            {' '}
            {props.ns !== '@' &&
                <>
                    <span className={`${props.cssPrefix}-att-ns-${props.cssMode}`}>{props.ns}</span>
                    <span className={`${props.cssPrefix}-att-colon-${props.cssMode}`}>:</span>
                </>
            }
            <span className={`${props.cssPrefix}-att-name-${props.cssMode}`}>{props.name}</span>
            <span className={`${props.cssPrefix}-att-equals-${props.cssMode}`}>=</span>
            <span className={`${props.cssPrefix}-att-quotes-${props.cssMode}`}>&quot;</span>
            <span className={`${props.cssPrefix}-att-value-${props.cssMode}`}>{props.value}</span>
            <span className={`${props.cssPrefix}-att-quotes-${props.cssMode}`}>&quot;</span>
        </span>
    );
}
