export function toShortForm(num) {
    if (num % 1 == 0)
        return num;
    
    return (Math.round(num * 100) / 100).toFixed(2);
}