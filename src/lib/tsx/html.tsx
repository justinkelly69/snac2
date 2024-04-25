import { SwitchStates } from "../snac/types"





export const ShowHideSwitch = (props: {
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

export const Prefix = (props: { prefix: string }) => {
    return (
        <span className="prefix">
            {props.prefix}
        </span>
    )
}

export const Div = (props: {
    className: string,
    children: any
}) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

export const Span = (props: {
    className: string,
    children: any
}) => {
    return (
        <span className={props.className}>
            {props.children}
        </span>
    )
}

export const OpenCaret = (props: { isClose: boolean }) => {
    //return isClose ? '&lt;/' : '&lt;'
    return (
        <span className="caret">
            &lt;
            {props.isClose &&
                <span className="caret-slash">
                    /
                </span>
            }
        </span>
    )
}

export const CloseCaret = (props: { isEmpty: boolean }) => {
    //return isEmpty ? '/&gt;' : '&gt;'
    return (
        <span className="caret">
            {props.isEmpty &&
                <span className="caret-slash">
                    /
                </span>
            }
            &gt;
        </span>
    )
}

export const TagNameSegment = (props: {
    name: string,
    path: number[],
    className: string
}) => {
    return (
        <span className={props.className}
            onClick={e => console.log(`N[${props.path}]`)}
        >
            {props.name}{' '}({props.path})
        </span>
    )
}

export const TagName = (props: {
    name: string,
    path: number[],
    className: string,
    separator: string,
}) => {
    const tagName = props.name.split(/:/)

    return tagName.length > 1 ? (
        <>
            <TagNameSegment
                name={tagName[0]}
                path={props.path}
                className={`${props.className}-ns`}
            />

            {props.separator}

            <TagNameSegment
                name={tagName[1]}
                path={props.path}
                className={`${props.className}-name`}
            />
        </>
    ) : (
        <TagNameSegment
            name={props.name}
            path={props.path}
            className={`${props.className}-name`}
        />
    )
}



export const AttributeNSName = (props: {
    name: string,
    path: number[],
    className: string
}) => {
    const tagName = props.name.split(/:/)

    return tagName.length > 1 ? (
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
    ) : (
        <TagNameSegment
            name={props.name}
            path={props.path}
            className={`${props.className}-aname`}
        />
    )
}

export const AttributeValue = (props: {
    value: string
}) => {
    return (
        <>
            =&quot;
            <span className='attribute-value'>
                {props.value}
            </span>
            &quot;
        </>
    )
}

export const AttributePreSpace = (props: { index: number }) => {
    return props.index > 0 ?
        <br /> :
        null
}

export const CDATA = (props: {
    cdata: string,
    path: number[],
}) => {
    return (
        <>
            &lt;![CDATA[
            <span className='cdata-body'
                onClick={e => console.log(`D[${props.path}]`)}
            >
                ({props.path}){props.cdata}
            </span>
            ]]&gt;
        </>
    )
}

export const Comment = (props: {
    comment: string,
    path: number[],
}) => {
    return (
        <>
            &lt;!--
            <span className='comment-body'
                onClick={e => console.log(`M[${props.path}]`)}
            >
                ({props.path}){props.comment}
            </span>
            --&gt;
        </>
    )
}

export const PI = (props: {
    language: string,
    body: string,
    path: number[],
}) => {
    return (
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
    )
}

export const Text = (props: {
    path: number[],
    text: string,
}) => {
    return (
        <span className='text-body'
            onClick={e => console.log(`T[${props.path}]`)}
        >
            ({props.path}){props.text}
        </span>
    )
}


