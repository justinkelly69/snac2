import { useState } from 'react';
import { SNACCDATA, SNACPrefix, SNACText } from '../../snac2'
import { StyledBlock, StyledColors, StyledConstants, StyledSpan } from '../styled'
import { Prefix } from './prefix';


export interface CDATArgs {
    snac: SNACCDATA.CDATANodeType,
    cssMode: string,
};

export const CDATA = (props: CDATArgs): JSX.Element => {

    const [showCDATA, showHideCDATA] = useState(props.snac.o);
    const [selected, setSelected] = useState(props.snac.q);
    const colors = StyledColors.getColors(props.cssMode);
    const prefix = SNACPrefix.getPrefix(props.snac._, StyledConstants.constants.PREFIX_START, StyledConstants.constants.PREFIX_ON, StyledConstants.constants.PREFIX_END);

    return (
        <StyledBlock.Block visible={true} selected={selected}
            Prop1={
                <Prefix
                    prefix={prefix}
                    color={colors.Prefix}
                    selectedNode={selected}
                    selectNode={e => setSelected(!selected)}
                    showKids={showCDATA}
                    showHideKids={e => showHideCDATA(!showCDATA)}
                />
            }
            Prop2={
                <StyledSpan.Span color={colors.CDATABody}>
                    <StyledSpan.Span color={colors.CDATAHeading}>
                        &lt;![
                        <StyledSpan.Span color={colors.CDATALabel}>CDATA</StyledSpan.Span>
                        [
                    </StyledSpan.Span>
                    {showCDATA ?
                        SNACCDATA.escapeCDATA(props.snac.D) :
                        SNACCDATA.escapeCDATA(SNACText.normalize(props.snac.D, StyledConstants.constants.CDATA_PREVIEW_LENGTH))
                    }
                    <StyledSpan.Span color={colors.CDATAHeading}>
                        ]]&gt;
                    </StyledSpan.Span>
                </StyledSpan.Span>
            }
        />

    )
}
