import { SNACOpts, SwitchStates } from "../snac/types"
import { Attribute, Prefix } from "./outFuncs"


export const PrefixSkin = (props: { prefix: string }) =>
    <span className="prefix">
        {props.prefix}
    </span>

export const OpenCaret = (props: { isClose: boolean }) =>
    props.isClose ?
        <span className='caret'>
            &lt;
            <span className='caret-slash'>/</span>
        </span> :
        <span className='caret'>&lt;</span>

export const CloseCaret = (props: { isEmpty: boolean }) =>
    props.isEmpty ?
        <span className='caret'>
            <span className='caret-slash'>/</span>
            &gt;
        </span> :
        <span className='caret'>&gt;</span>

export const TagNameSegment = (props: {
    name: string,
    path: string,
    className: string
}) => {
    return (
        <span className={props.className}
            onClick={e => console.log(props.path)}
        >
            {props.name}{' '}({props.path})
        </span>
    )
}

export const TagName = (props: {
    name: string,
    path: string,
    ClassName: string
}) => {
    const tagName = props.name.split(/:/)

    return tagName.length > 1 ?
        <>
            <TagNameSegment
                name={tagName[0]}
                path={props.path}
                className={`${props.ClassName}-ns`}
            />
            :
            <TagNameSegment
                name={tagName[1]}
                path={props.path}
                className={`${props.ClassName}-name`}
            />
        </>
        :
        <TagNameSegment
            name={props.name}
            path={props.path}
            className={`${props.ClassName}-name`}
        />
}

export const AttributeSkin = (props: {
    path: number[],
    name: string,
    value: string,
    opts: SNACOpts,
    index: number,
}) =>
    <span className="attribute">
        {
            props.index > 0 ?
                <br />
                : null
        }

        <Attribute
            path={props.path}
            name={props.name}
            value={props.value}
            opts={props.opts}
        />
    </span>

export const AttributeNSName = (props: {
    name: string,
    path: string,
    className: string
}) => {
    const tagName = props.name.split(/:/)

    return tagName.length > 1 ?
        <>
            <TagNameSegment
                name={tagName[0]}
                path={props.path}
                className={`${props.className}-ans`}
            />
            :
            <TagNameSegment
                name={tagName[1]}
                path={props.path}
                className={`${props.className}-aname`}
            />
        </>
        :
        <TagNameSegment
            name={props.name}
            path={props.path}
            className={`${props.className}-aname`}
        />
}

export const AttributeValueSkin = (props: {
    value: string
}) =>
    <>
        =&quot;
        <span className='attribute-value'>
            {props.value}
        </span>
        &quot;
    </>

export const CDATASkin = (props: {
    cdata: string,
    path: string,
}) =>
    <>
        &lt;![CDATA[
        <span className='cdata-body'
            onClick={e => console.log(`D[${props.path}]`)}
        >
            ({props.path}){props.cdata}
        </span>
        ]]&gt;
    </>

export const CommentSkin = (props: {
    comment: string,
    path: string,
}) =>
    <>
        &lt;!--
        <span className='comment-body'
            onClick={e => console.log(`M[${props.path}]`)}
        >
            ({props.path}){props.comment}
        </span>
        --&gt;

    </>

export const PISkin = (props: {
    language: string,
    body: string,
    path: string,
}) =>
    <>
        &lt;?
        <span className='pi-lang'>{props.language}</span>
        {" "}
        <span className='pi-body'
            onClick={e => console.log(`P[${props.path}]`)}
        >
            ({props.path}){props.body}
        </span>
        {" "}?&gt;
    </>

export const TextSkin = (props: {
    path: string,
    text: string,
}) =>
    <span className='text-body'
        onClick={e => console.log(`T[${props.path}]`)}
    >
        ({props.path}){props.text}
    </span>

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
