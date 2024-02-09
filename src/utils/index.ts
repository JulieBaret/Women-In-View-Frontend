export const truncate = (str: string, lastIndex: number) => {
    return str.length > lastIndex ? str.substring(0, lastIndex-3) + "..." : str;
}