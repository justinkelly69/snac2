import React from 'react'
import { getType } from '../../snac2/children'
import { ChildNodeType, ElementNodeType } from '../../snac2/element'
import { ShowHide } from '../styled/showhide'
import { Element } from './element'
import { Text } from './text'
import { TextNodeType } from '../../snac2/text'
import { CDATA } from './cdata'
import { CDATANodeType } from '../../snac2/cdata'
import { Comment } from './comment'
import { CommentNodeType } from '../../snac2/comment'
import { PI } from './pi'
import { PINodeType } from '../../snac2/pi'

interface ChildrenArgs {
    C: Array<ChildNodeType>
    prefix: string
    visible: boolean
    cssMode: string
}

export const Children = (props: ChildrenArgs) => {
    return (
        <ShowHide visible={props.visible}>
            {props.C.map((kid, index) => {
                switch (getType(kid)) {
                    case 'N':
                        const element = kid as ElementNodeType
                        return (
                            <Element
                                showTag={true}
                                key={index}
                                snac={element}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'T':
                        const text = kid as TextNodeType
                        return (
                            <Text
                                key={index}
                                snac={text}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'D':
                        const cdata = kid as CDATANodeType
                        return (
                            <CDATA
                                key={index}
                                snac={cdata}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'M':
                        const comment = kid as CommentNodeType
                        return (
                            <Comment
                                key={index}
                                snac={comment}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'P':
                        const pi = kid as PINodeType
                        return (
                            <PI
                                key={index}
                                snac={pi}
                                cssMode={props.cssMode}
                            />
                        )
                    default:
                        return null
                }
            })}
        </ShowHide>
    )
}
