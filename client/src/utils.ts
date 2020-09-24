export const checkForSameValues = (value: string) => value.split("").some(function (v: any, i: any, a: any) {
    return a.lastIndexOf(v) != i;
})