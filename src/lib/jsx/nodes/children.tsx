import { SNACCDATA, SNACChildren, SNACComment, SNACElement, SNACText, SNACPi } from '../../snac2'
import { StyledShowHide } from '../styled'
import { Element } from './element'
import { Text } from './text'
import { CDATA } from './cdata'
import { Comment } from './comment'
import { PI } from './pi'


interface ChildrenArgs {
    C: Array<SNACElement.ChildNodeType>
    prefix: string
    visible: boolean
    cssMode: string
}

export const Children = (props: ChildrenArgs) => {
    return (
        <StyledShowHide.ShowHide visible={props.visible}>
            {props.C.map((kid, index) => {
                switch (SNACChildren.getType(kid)) {
                    case 'N':
                        const element = kid as SNACElement.ElementNodeType
                        return (
                            <Element
                                showTag={true}
                                key={index}
                                snac={element}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'T':
                        const text = kid as SNACText.TextNodeType
                        return (
                            <Text
                                key={index}
                                snac={text}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'D':
                        const cdata = kid as SNACCDATA.CDATANodeType
                        return (
                            <CDATA
                                key={index}
                                snac={cdata}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'M':
                        const comment = kid as SNACComment.CommentNodeType
                        return (
                            <Comment
                                key={index}
                                snac={comment}
                                cssMode={props.cssMode}
                            />
                        )
                    case 'P':
                        const pi = kid as SNACPi.PINodeType
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
        </StyledShowHide.ShowHide>
    )
}
