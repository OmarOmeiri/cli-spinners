"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spinners_1 = __importDefault(require("./spinners"));
const styles_1 = require("./styles");
class Spin {
    Ccolor;
    Cstyle;
    Cbg;
    Ctext;
    Cspinner;
    timeout;
    Cinterval = 300;
    setStyle() {
        const allStyles = { ...styles_1.colors, ...styles_1.styles, ...styles_1.backgrounds };
        const reset = `\x1b[${styles_1.styles.reset[0]}m`;
        if (this.Ctext) {
            let styledBefore = '';
            let styledAfter = '';
            const stls = [
                this.Ccolor,
                this.Cbg,
                this.Cstyle,
            ];
            stls.forEach((s) => {
                if (s) {
                    const d = allStyles[s];
                    styledBefore = `\x1b[${d[0]}m${styledBefore}`;
                    styledAfter = `\x1b[${d[1]}m${styledAfter}`;
                }
            });
            return {
                before: styledBefore,
                after: styledAfter,
                reset,
            };
        }
        return undefined;
    }
    spinner(name) {
        this.Cspinner = name;
        return this;
    }
    interval(interval) {
        this.Cinterval = interval;
        return this;
    }
    color(color) {
        this.Ccolor = color;
        return this;
    }
    bg(bg) {
        this.Cbg = bg;
        return this;
    }
    style(style) {
        this.Cstyle = style;
        return this;
    }
    text(text) {
        this.Ctext = text;
        return this;
    }
    stop() {
        if (this.timeout)
            clearInterval(this.timeout);
        process.stdout.clearLine(0);
        process.stderr.write('\x1B[?25h');
    }
    spin(text) {
        if (text)
            this.Ctext = text;
        let styledText = this.Ctext ?? '';
        const styled = this.setStyle();
        if (styled) {
            styledText = `${styled.before}${this.Ctext}${styled.after}${styled.reset}`;
        }
        if (!this.Cspinner) {
            this.print(text ?? '');
        }
        else {
            process.stderr.write('\x1B[?25l');
            const { frames } = spinners_1.default[this.Cspinner];
            const lng = frames.length;
            const textLength = text?.length ? text.length + 1 : 0;
            let i = 0;
            let count = 0;
            this.timeout = setInterval(() => {
                if (!count) {
                    // process.stdout.cursorTo(0);
                    if (styled)
                        process.stdout.write(`${styled.before}${`${styledText}d`}${frames[i]}${styled.after}${styled.reset}`);
                    else
                        process.stdout.write(`${`${styledText} `}${frames[i]}`);
                }
                else {
                    process.stdout.cursorTo(textLength);
                    process.stdout.clearLine(1);
                    if (styled)
                        process.stdout.write(`${styled.before}${frames[i]}${styled.after}${styled.reset}`);
                    else
                        process.stdout.write(frames[i]);
                }
                i += 1;
                if (i > lng - 1)
                    i = 0;
                count += 1;
            }, this.Cinterval);
        }
    }
    print(text) {
        this.Ctext = text;
        const styledText = this.setStyle();
        // eslint-disable-next-line no-console
        console.log(styledText);
    }
}
process.on('SIGINT', () => {
    // eslint-disable-next-line no-console
    console.log('\nGracefully shutting down from SIGINT (Crtl-C)');
    process.stderr.write('\x1B[?25h');
    process.exit();
});
const spin = new Spin();
exports.default = spin;
