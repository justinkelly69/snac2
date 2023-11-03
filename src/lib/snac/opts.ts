import { SNACOpts } from "../snac/types"

const opts:SNACOpts = {
    prefix_showPrefix: true,
    prefix_newLine: "\n",
    prefix_usePrefix: true,
    prefix_startChar: ">",
    prefix_charOn: " ",
    prefix_charOff: " ",
    prefix_spaceBefore: " ",
    prefix_spaceAfter: " ",
    prefix_attributePrefix: "    ",

    switch_selectOn: "+",
    switch_selectOff: "-",
    switch_selectHide: "#",
    switch_attributesOpen: "+",
    switch_attributesClose: "-",
    switch_attributesHide: "#",
    switch_elementOpen: "+",
    switch_elementClose: "-",
    switch_elementHide: "#",
    switch_selectChars: {
        on: "+",
        off: "-",
        hidden: "?",
    },
    switch_attributeChars: {
        on: "+",
        off: "-",
        hidden: "?",
    },
    switch_elementChars: {
        on: "+",
        off: "-",
        hidden: "?",
    },

    xml_selfCloseTags: true,
    xml_trimText: true,
    xml_showCloseTags: true,
    xml_allowComments: true,
    xml_allowPIs: true,
}

export default opts