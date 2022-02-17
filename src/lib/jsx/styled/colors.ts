export const colors = {
    light: {
        Node: 'sienna',
        NodeBracket: 'darkgreen',
        NS: 'red',
        Name: 'blue',
        NodeColon: 'black',
        NodeSlash: 'darkblue',
        NodeToggle: 'navy',
        Attribute: 'sienna',
        AttributeNS: 'rgb(204, 4, 204)',
        AttributeColon: 'black',
        AttributeName: 'rgb(180, 24, 3)',
        AttributeEquals: 'black',
        AttributeQuote: 'maroon',
        AttributeValue: 'rgb(5, 197, 181)',
        AttributeToggle: 'purple',
        AttributeAtSign: 'magenta',
        CDATA: 'darkbrown',
        CDATAHeading: 'rgb(104, 10, 4)',
        CDATALabel: 'magenta',
        CDATABody: 'orange',
        CDATAToggle: 'brown',
        Comment: 'darkgreen',
        CommentHeading: 'olive',
        CommentBody: 'rgb(7, 201, 33)',
        CommentToggle: 'brown',
        PI: 'black',
        PIHeading: 'olive',
        PILang: 'darkorange',
        PIBody: 'darkgreen',
        PIToggle: 'brown',
        Text: 'black',
        TextToggle: 'brown',
        TextBracket: 'navy',
        Prefix: 'olive',
        IsDeleted: 'green',
        NotDeleted: 'red',
        TextInputBackground: 'none',
        TextInputBorder: '#ccc',
        TextAreaBackground: 'none',
        TextAreaBorder: '#ccc',
        PrefixButtonShow: 'red',
        PrefixButtonHide: 'transparent',
        SelectedBackground: '#ccffcc',
        UnselectedBackground: 'transparent',
        Odd: '#eee',
        Even: '#fff',
    },
    dark: {
        Node: 'sienna',
        NodeBracket: 'darkgreen',
        NS: 'red',
        Name: 'blue',
        NodeSeparator: 'black',
        NodeToggle: 'navy',
        Attribute: 'sienna',
        AttributeNS: 'rgb(204, 4, 204)',
        AttributeSeparator: 'black',
        AttributeName: 'rgb(180, 24, 3)',
        AttributeValue: 'rgb(5, 197, 181)',
        AttributeToggle: 'purple',
        AttributeAtSign: 'magenta',
        CDATAHeading: 'rgb(104, 10, 4)',
        CDATALabel: 'magenta',
        CDATABody: 'orange',
        CDATAToggle: 'brown',
        CommentHeading: 'olive',
        CommentBody: 'rgb(7, 201, 33)',
        CommentToggle: 'brown',
        PIHeading: 'olive',
        PILang: 'darkorange',
        PIBody: 'darkgreen',
        PIToggle: 'brown',
        Text: 'black',
        TextToggle: 'brown',
        TextBracket: 'navy',
        Prefix: 'olive',
        IsDeleted: 'green',
        NotDeleted: 'red',
        TextInputBackground: 'none',
        TextInputBorder: '#ccc',
        TextAreaBackground: 'none',
        TextAreaBorder: '#ccc',
        PrefixButtonShow: 'red',
        PrefixButtonHide: 'transparent',
        SelectedBackground: '#ccffcc',
        UnselectedBackground: 'transparent',
        Odd: '#eee',
        Even: '#fff',
    }
};

interface ColorType {
    [name: string]: string
}

export const getColors = (mode?:string): ColorType => {
    if(!mode || !colors[mode]) {
        return colors['light'];
    }
    return colors[mode];
}