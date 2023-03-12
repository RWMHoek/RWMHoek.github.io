class Part {
    #name: string;
    #isAftermarket: boolean = false;
    #cost: number = 0;
    #isCostIn: boolean = false;
    /**
     * The margin on aftermarket parts.
     * Multiply the cost excluding GST by this margin to get the retail price including GST.
     */
    #aftermarketMargin: number = 1.55;
    #retail: number = 0;
    
    constructor (name: string) {
        this.#name = name;
    }

    get name(): string {
        return this.#name;
    }

    set name(n: string) {
        this.#name = n;
    }

    get isAftermarket(): boolean {
        return this.#isAftermarket
    }

    set isAftermarket(bool: boolean) {
        this.cost = bool ? this.cost : 0;
        this.#isAftermarket = bool;
    }

    get cost(): number {
        // if (!this.isAftermarket) {
        //     throw new Error("Can not return cost for a genuine part.");
        // }
        return Math.round(this.#cost * 100) / 100;
    }

    set cost(price: number) {
        // if (!this.isAftermarket) {
        //     throw new Error("Can not set the cost of a genuine part.");
        // }
        
        this.#cost = price;
        this.recalculateRetail();
    }

    get isCostIn(): boolean {
        // if (!this.isAftermarket) {
        //     throw new Error("Can not return GST status of the cost for a genuine part.");
        // }
        return this.#isCostIn
    }

    set isCostIn(bool: boolean) {
        // if (!this.isAftermarket) {
        //     throw new Error("Can not set GST status of the cost for a genuine part.");
        // }
        this.#isCostIn = bool;
        this.recalculateRetail();
    }

    get retail(): number {
        return Math.round(this.#retail*100)/100;
    }

    set retail(price: number) {
        this.#retail = price;
    }

    recalculateRetail(): void {
        const price = this.cost * this.#aftermarketMargin;
        this.retail = this.#isCostIn ? price / 1.1 : price;
    }
}

export default Part;