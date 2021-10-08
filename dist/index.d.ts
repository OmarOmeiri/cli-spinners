import { backgroundsEnum, colorsEnum, ISpin, SpinnerNames, stylesEnum } from './typings';
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
    color(color: colorsEnum): this;
    bg(bg: backgroundsEnum): this;
    style(style: stylesEnum): this;
    text(text: stylesEnum): this;
    stop(): void;
    spin(text?: string): void;
    print(text: string): void;
}
declare const spin: Spin;
export default spin;
