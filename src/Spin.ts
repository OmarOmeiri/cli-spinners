import spinners from './spinners';
import {
  SpinnerBackgrounds,
  SpinnerColors,
  ISpin,
  SpinnerNames,
  SpinnerStyles,
} from './typings';
import { colors, styles, backgrounds } from './styles';

class Spin implements ISpin {
  private Ccolor?: SpinnerColors
  private Cstyle?: SpinnerStyles
  private Cbg?: SpinnerBackgrounds
  private Ctext?: string
  private Cspinner: SpinnerNames = SpinnerNames.dots12
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
      ] as (SpinnerColors | SpinnerStyles | SpinnerBackgrounds | undefined)[];

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

  /**
   * Selects the spinner Type. {@link SpinnerNames}
   *
   * If no spinner is chosen, the default is {@link SpinnerNames.dots12}
   * @param name
   * @returns
   */
  spinner(name: SpinnerNames): this {
    this.Cspinner = name;
    return this;
  }

  /**
   * Sets the speed of th spinner
   * @param interval
   * @returns
   */
  interval(interval: number): this {
    this.Cinterval = interval;
    return this;
  }

  /**
   * Sets the spinner color {@link SpinnerColors}
   * @param color
   * @returns
   */
  color(color: SpinnerColors): this {
    this.Ccolor = color;
    return this;
  }

  /**
   * Sets the spinner background color. {@link SpinnerBackgrounds}
   * @param color
   * @returns
   */
  bg(bg: SpinnerBackgrounds): this {
    this.Cbg = bg;
    return this;
  }

  /**
   * Sets the spinner style. {@link SpinnerStyles}
   * @param color
   * @returns
   */
  style(style: SpinnerStyles): this {
    this.Cstyle = style;
    return this;
  }

  /**
   * Sets the spinner text.
   *
   * You can also pass the text to the `spin()` function.
   * @param text
   * @returns
   */
  text(text: string): this {
    this.Ctext = text;
    return this;
  }

  /**
   * Stops the spinner
   */
  stop(): void {
    if (this.timeout) clearInterval(this.timeout);
    process.stdout.clearLine(0);
    process.stderr.write('\x1B[?25h');
  }

  /**
   * Starts the spinner
   * @param [text]
   */
  spin(text?: string): void {
    if (text) this.Ctext = text;

    let styledText = this.Ctext ?? '';
    const styled = this.setStyle();
    if (styled) {
      styledText = `${styled.before}${this.Ctext}${styled.after}${styled.reset}`;
    }

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

  /**
   * Just prints a styled text instead of a spinner
   * @param text
   */
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
