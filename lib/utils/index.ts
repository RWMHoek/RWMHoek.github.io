export function getTypedValue(target: EventTarget & (HTMLInputElement)) {
    switch (target.dataset.type) {
        case 'string':
            return target.value.toString();
        case 'number':
            return extractNumber(target.value);
        case 'boolean':
            console.log(target.value);
            return target.checked;
        default:
            throw new Error("Currently unable to convert to any type other than string or number.");
    }
}

export function toCurrency(price: string | number): string {
    if (typeof price === 'string') {
        // remove commas and dollar sign and convert to number
        price = extractNumber(price);
    }

    // round to two decimals
    price = Math.round(price * 100) / 100;
    
    return '$' + price.toLocaleString('en');
}

function extractNumber(s: string): number {
    console.log(s);
    const chars = s.split("");
    console.log(chars);
    const string = chars.reduce((prev, curr) => {
        if (/\d/.test(curr) || curr === ".") {
            console.log(curr, /\d/.test(curr), curr === ".");
            return prev + curr;
        }
        return prev;
    }, "");
    console.log(string);

    return Number(string);
}