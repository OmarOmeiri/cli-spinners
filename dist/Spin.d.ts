import { SpinnerBackgrounds, SpinnerColors, ISpin, SpinnerNames, SpinnerStyles } from './typings';
declare class Spin implements ISpin {
    private Ccolor?;
    private Cstyle?;
    private Cbg?;
    private Ctext?;
    private Cspinner?;
    private timeout?;
    private Cinterval;
    private setStyle;
    spinner(name: SpinnerNames): this;
    interval(interval: number): this;
    color(color: SpinnerColors): this;
    bg(bg: SpinnerBackgrounds): this;
    style(style: SpinnerStyles): this;
    text(text: SpinnerStyles): this;
    stop(): void;
    spin(text?: string): void;
    print(text: string): void;
}
declare const spin: Spin;
export default spin;
