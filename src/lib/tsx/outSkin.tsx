import { SNACOpts, SwitchStates } from "../snac/types"
import { Prefix } from "./outFuncs"


export const PrefixSkin = (props: { prefix: string }) =>
    <span className="prefix">
        {props.prefix}
    </span>

export const TagNameSkinSegment = (props: {
    name: string,
    path: string,
    klass: string
}) => {
    return (
        <span className={props.klass}
            onClick={e => console.log(props.path)}
        >
            {props.name}{' '}({props.path})
        </span>
    )
}

export const TagNameSkin = (props: {
    name: string,
    path: string,
    klass: string
}) => {
    const tagName = props.name.split(/:/)

    return tagName.length > 1 ?
        <>
            <TagNameSkinSegment
                name={tagName[0]}
                path={props.path}
                klass={`${props.klass}-ns`}
            />
            :
            <TagNameSkinSegment
                name={tagName[1]}
                path={props.path}
                klass={`${props.klass}-name`}
            />
        </>
        :
        <TagNameSkinSegment
            name={props.name}
            path={props.path}
            klass={`${props.klass}-name`}
        />
}

export const AttributeSkin = (props: {
    path: number[],
    name: string,
    value: string,
    opts: SNACOpts,
    klass: string,
}) =>
    <span className='attribute'>
        <Prefix
            path={props.path}
            opts={props.opts}
        />
        {props.opts.prefix_attributePrefix}
        <AttributeNameSkin
            name={props.name}
            className={props.klass}
            path={props.path.join(',')}
        />
        =&quot;
        <span className='attribute-value'>
            {props.value}
        </span>
        &quot;
    </span>

export const AttributeNameSkin = (props: {
    name: string,
    path: string,
    className: string
}) => {
    const tagName = props.name.split(/:/)

    return tagName.length > 1 ?
        <>
            <TagNameSkinSegment
                name={tagName[0]}
                path={props.path}
                klass={`${props.className}-ans`}
            />
            :
            <TagNameSkinSegment
                name={tagName[1]}
                path={props.path}
                klass={`${props.className}-aname`}
            />
        </>
        :
        <TagNameSkinSegment
            name={props.name}
            path={props.path}
            klass={`${props.className}-aname`}
        />
}

export const ShowHideSwitchSkin = (props: {
    className: string,
    selected: SwitchStates,
    openClose: Function
    out: string,
}) => {
    return (
        <span
            className={props.className}
            onClick={e => {
                props.selected !== SwitchStates.HIDDEN && props.openClose()
            }}>
            {props.out}
        </span>
    )
}
