export function getTypedValue(target: EventTarget & (HTMLInputElement)) {
    switch (target.dataset.type) {
        case 'string':
            return target.value.toString();
        case 'number':
            return extractNumber(target.value);
        case 'boolean':
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
    
    return price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function extractNumber(s: string): number {
    const chars = s.split("");
    const string = chars.reduce((prev, curr) => {
        if (/\d/.test(curr) || curr === ".") {
            return prev + curr;
        }
        return prev;
    }, "");

    return Number(string);
}