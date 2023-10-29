export const escapeHtml = (text: string): string => {
    return text.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;')
}

export const unEscapeHtml = (text: string): string => {
    return text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&apos;/g, '\'')
        .replace(/&quot;/g, '"')
}

export const escapeCDATA = (text: string): string => {
    return text.replace(/]]>/g, ']]&gt;')
}

export const unEscapeCDATA = (text: string): string => {
    return text.replace(/]]&gt;/g, ']]>')
}

export const escapeComment = (text: string): string => {
    return text.replace(/--/g, ' - - ')
}

export const unEscapeComment = (text: string): string => {
    return text.replace(/ - - /g, '--')
}

export const testPILang = (text: string): boolean => {
    return text.match(/^[a-z]+[0-9]?=?/) ? true : false
}

export const escapePIBody = (text: string): string => {
    return text.replace(/\?>/g, '?&gt;')
}

export const unEscapePIBody = (text: string): string => {
    return text.replace(/\?&gt;/g, '?>')
}
