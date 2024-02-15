function toShortForm(num) {
    if (num % 1 == 0)
        return num;
    
    return (Math.round(num * 100) / 100).toFixed(2);
}

function toHumanReadable(num) {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
    const shortNum = (num / Math.pow(10, suffixIndex * 3)).toFixed(2);
    const suffix = suffixes[suffixIndex]
    if (suffix == undefined) {
        return toShortForm(num);
    }

    return shortNum + suffix;
}


export {
    toShortForm,
    toHumanReadable
}