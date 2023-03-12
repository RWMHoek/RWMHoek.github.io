import Part from "./Part";

class Job {
    #name: string;
    #labourRate: number = 187;
    #labour: number;
    #parts: Part[];

    constructor (name: string, labour: number = 0, parts: Part[] = []) {
        this.#name = name;
        this.#labour = labour;
        this.#parts = parts;
        this.addPart = this.addPart;
        this.updatePart = this.updatePart; 
        this.removePart = this.removePart;
        this.total = this.total;
    }

    get name(): string {
        return this.#name;
    }

    set name(n: string) {
        this.#name = n;
    }

    get labourRate(): number {
        return this.#labourRate;
    }

    set labourRate(r: number) {
        if (typeof r !== "number") {
            throw new TypeError("Labour rate must be a number!");
        }
        this.#labourRate = Math.round(r * 100) / 100;
    }

    get labour(): number {
        return this.#labour;
    }

    set labour(l: number) {
        this.#labour = l < 0 ? 0 : l;
    }

    get parts(): Part[] {
        return this.#parts;
    }

    set parts(p: Part[]) {
        this.#parts = p;
    }

    addPart() {
        this.#parts.push(new Part(""));
    }

    updatePart(index: number, part: Part) {
        this.#parts[index] = part;
    }

    removePart(index: number) {
        this.#parts.splice(index, 1);
    }

    total(): number {
        let t: number = 0;

        t += this.labour * this.labourRate;

        t += this.parts.reduce((accumulator: number, currentValue: Part) => {
            return accumulator + currentValue.retail;
        }, 0)

        return Math.round(t * 100) / 100;
    }

    clone(): Job {
        return new Job(this.name, this.labour, this.parts);
    }
}

export default Job;