import { SNACOpts } from "./types"

export const getPrefixString = (
    path: number[],
    opts: SNACOpts
): string => {
    const init = ""
    return path.reduce((out) => out + opts.prefix_charOn, init)
}