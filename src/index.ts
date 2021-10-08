import spinners from './spinners';
import {
  backgroundsEnum,
  colorsEnum,
  ISpin,
  SpinnerNames,
  stylesEnum,
} from './typings';
import { colors, styles, backgrounds } from './styles';

class Spin implements ISpin {
  private Ccolor?: colorsEnum
  private Cstyle?: stylesEnum
  private Cbg?: backgroundsEnum
  private Ctext?: string
  private Cspinner?: SpinnerNames
  private timeout?: NodeJS.Timer
  private Cinterval = 300;

  private setStyle(): {
    before: string,
    after: string,
    reset: string
  } | undefined {
    const allStyles = { ...colors, ...styles, ...backgrounds };
    const reset = `\x1b[${styles.reset[0]}m`;

    if (this.Ctext) {
      let styledBefore = '';
      let styledAfter = '';
      const stls = [
        this.Ccolor,
        this.Cbg,
        this.Cstyle,
      ] as (colorsEnum | stylesEnum | backgroundsEnum | undefined)[];

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

  spinner(name: SpinnerNames): this {
    this.Cspinner = name;
    return this;
  }

  interval(interval: number): this {
    this.Cinterval = interval;
    return this;
  }

  color(color: colorsEnum): this {
    this.Ccolor = color;
    return this;
  }

  bg(bg: backgroundsEnum): this {
    this.Cbg = bg;
    return this;
  }

  style(style: stylesEnum): this {
    this.Cstyle = style;
    return this;
  }

  text(text: stylesEnum): this {
    this.Ctext = text;
    return this;
  }

  stop(): void {
    if (this.timeout) clearInterval(this.timeout);
    process.stdout.clearLine(0);
    process.stderr.write('\x1B[?25h');
  }

  spin(text?: string): void {
    if (text) this.Ctext = text;

    let styledText = this.Ctext ?? '';
    const styled = this.setStyle();
    if (styled) {
      styledText = `${styled.before}${this.Ctext}${styled.after}${styled.reset}`;
    }

    if (!this.Cspinner) {
      this.print(text ?? '');
    } else {
      process.stderr.write('\x1B[?25l');
      const { frames } = spinners[this.Cspinner];
      const lng = frames.length;
      const textLength = text?.length ? text.length + 1 : 0;
      let i = 0;
      let count = 0;
      this.timeout = setInterval(() => {
        if (!count) {
          // process.stdout.cursorTo(0);
          if (styled) process.stdout.write(`${styled.before}${`${styledText}d`}${frames[i]}${styled.after}${styled.reset}`);
          else process.stdout.write(`${`${styledText} `}${frames[i]}`);
        } else {
          process.stdout.cursorTo(textLength);
          process.stdout.clearLine(1);
          if (styled) process.stdout.write(`${styled.before}${frames[i]}${styled.after}${styled.reset}`);
          else process.stdout.write(frames[i]);
        }
        i += 1;
        if (i > lng - 1) i = 0;
        count += 1;
      }, this.Cinterval);
    }
  }

  print(text: string): void {
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

export default spin;
