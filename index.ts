interface MathInterface {
    abs: Function; // 20231119
    max: Function; // 20231119
    min: Function; // 20231119
    sign: Function; // 20231119
    sqrt: Function; // 20231119

    ceil: Function; // 20231119
    floor: Function; // 20231119
    round: Function; // 20231119
    
    random: Function; // 20231119

    acos: Function; // 20231119
    atanh: Function; // 20231119
    asin: Function; // 20231119
    acosh: Function; // 20231119

    log: Function;
    log1p: Function;
    log2: Function;
    log10: Function;

    asinh: Function;
    atan: Function;
    atan2: Function;
    cos: Function;
    cosh: Function;
    sin: Function;
    sinh: Function;
    tan: Function;
    tanh: Function;

    cbrt: Function;
    expm1: Function;
    clz32: Function;
    exp: Function;
    fround: Function; // 20231119
    hypot: Function;
    imul: Function;
    pow: Function; // 20231119
    trunc: Function; // 20231119

    // Constants
    readonly E: number; // 20231119
    readonly LN10: number; // 20231119
    readonly LN2: number; // 20231119
    readonly LOG10E: number; // 20231119
    readonly LOG2E: number; // 20231119
    readonly PI: number; // 20231119
    readonly SQRT1_2: number; // 20231119
    readonly SQRT2: number; // 20231119
}

export class BigIntegerMath implements MathInterface {
    readonly E = Math.E;
    readonly LN10 = Math.LN10;
    readonly LN2 = Math.LN2;
    readonly LOG10E = Math.LOG10E;
    readonly LOG2E = Math.LOG2E;
    readonly PI = Math.PI;
    readonly SQRT1_2 = Math.SQRT1_2;
    readonly SQRT2 = Math.SQRT2;

    // asinh
    // atan
    // atan2
    // cos
    // cosh


    public acos(input: number | bigint) {
        this.handleNumberOneToNegativeOne(input, Math.acos);
    }

    public acosh(input: number | bigint) {
        this.handleNumberOneToNegativeOne(input, Math.acosh);
    }

    public atanh(input: number | bigint) {
        this.handleNumberOneToNegativeOne(input, Math.atanh);
    }
    public asin(input: number | bigint) {
        this.handleNumberOneToNegativeOne(input, Math.asin);
    }

    private handleNumberOneToNegativeOne(input: number | bigint, fn: Function) {
        if (typeof input === 'number') return fn(input);
        if (input > 1n || input < -1n) return NaN;
        return fn(Number(input));
    }

    public ceil(num: number | bigint): number | bigint {
        if (typeof num === 'number') return this.ceilOfString(num.toString());
        return num;
    }

    private ceilOfString(num: string): number | bigint {
        let temp = num.split('.');
        let major = temp[0];
        let minor = temp[1];
        if (minor) {
            if (Number(minor) > 0) {
                if (Number(major)+1 < Number.MAX_SAFE_INTEGER) return Number(major)+1;
                return BigInt(major)+1n;
            }
        }
        if (Number(major) > -Number.MAX_SAFE_INTEGER && Number(major) < Number.MAX_SAFE_INTEGER) {
            return Number(major);
        }
        return BigInt(major);
    }

    public trunc = this.floor;

    public floor(num: number | bigint): number | bigint {
        if (typeof num === 'number') return this.floorOfString(num.toString());
        return num;
    }

    private floorOfString(num: string): number | bigint {
        let temp = num.split('.');
        let major = temp[0];
        if (Number.isFinite(Number(major))) 

        if (Number(major) > -Number.MAX_SAFE_INTEGER && Number(major) < Number.MAX_SAFE_INTEGER) {
            return Number(major);
        }
        return BigInt(major);
    }

    public round(num: number | bigint): number | bigint {
        if (typeof num === 'number') return this.roundString(num.toString());
        return num;
    }

    public fround(num: number | bigint): number | bigint {
        return this.floor(this.round(num))
    }

    private roundString(num: string): number | bigint {
        let temp = num.split('.');
        let major = temp[0];
        let minor = temp[1];
        let carry: number = 0;
        if (minor) carry = Math.round(Number("0."+minor));

        if (Number(major) + carry > -Number.MAX_SAFE_INTEGER && Number(major) + carry < Number.MAX_SAFE_INTEGER) {
            return Number(major) + carry;
        }
        return BigInt(major) + BigInt(carry);
    }

    public random(): bigint {
        return BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    }

    public abs(input: number | bigint): number | bigint {
        if (typeof input === 'number') return Math.abs(input);

        if (input > -Number.MAX_SAFE_INTEGER && input < Number.MAX_SAFE_INTEGER) return Math.abs(Number(input));

        return input < 0n ? -input : input;
    }

    public max(...args: (number | bigint)[]): number | bigint {
        if (args.every((v) => typeof v === 'number')) {
            return Math.max(...args as number[]);
        }
        return args.reduce((max, current) => current > max ? current : max);
    }
    
    public min(...args: (number | bigint)[]): number | bigint {
        if (args.every((v) => typeof v === 'number')) {
            return Math.min(...args as number[]);
        }
        return args.reduce((min, current) => current < min ? current : min);
    }
    
    public pow(base: number | bigint, exponent: number | bigint): number | bigint {
        if (typeof base !== typeof exponent) throw new Error("Base and Exponent must be of the same type");

        if (typeof base === 'number' && typeof exponent === 'number') return Math.pow(base, exponent);
        
        if (exponent < 0n) {
            throw new Error("Exponent must be non-negative");
        }

        let result = 1n;
        base = base as bigint;
        while (exponent > 0n) {
            result *= base;
            exponent--;
        }
        
        return result;
    }

    public sign(x: number | bigint): number | bigint {
        if (typeof x === 'number') return Math.sign(x);

        return x > 0n ? 1n : x < 0n ? -1n : 0n;
    }    

    public sqrt(x: number | bigint): number | bigint {
        if (typeof x === 'number') return Math.sqrt(x);

        if (x < 0n) {
            throw new Error("Square root of negative numbers is not supported");
        }
        let r = 0n;
        let bit = 1n << 52n;
        while (bit > x) {
            bit >>= 2n;
        }
        while (bit != 0n) {
            if (x >= r + bit) {
                x -= r + bit;
                r = (r >> 1n) + bit;
            } else {
                r >>= 1n;
            }
            bit >>= 2n;
        }
        return r;
    }
    
}