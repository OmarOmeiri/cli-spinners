export enum SpinnerNames {
  dots ='dots',
  dots2 ='dots2',
  dots3 ='dots3',
  dots4 ='dots4',
  dots5 ='dots5',
  dots6 ='dots6',
  dots7 ='dots7',
  dots8 ='dots8',
  dots9 ='dots9',
  dots10 ='dots10',
  dots11 ='dots11',
  dots12 ='dots12',
  dots8Bit ='dots8Bit',
  line ='line',
  line2 ='line2',
  pipe ='pipe',
  simpleDots ='simpleDots',
  simpleDotsScrolling ='simpleDotsScrolling',
  star ='star',
  star2 ='star2',
  flip ='flip',
  hamburger ='hamburger',
  growVertical ='growVertical',
  growHorizontal ='growHorizontal',
  balloon ='balloon',
  balloon2 ='balloon2',
  noise ='noise',
  bounce ='bounce',
  boxBounce ='boxBounce',
  boxBounce2 ='boxBounce2',
  triangle ='triangle',
  arc ='arc',
  circle ='circle',
  squareCorners ='squareCorners',
  circleQuarters ='circleQuarters',
  circleHalves ='circleHalves',
  squish ='squish',
  toggle ='toggle',
  toggle2 ='toggle2',
  toggle3 ='toggle3',
  toggle4 ='toggle4',
  toggle5 ='toggle5',
  toggle6 ='toggle6',
  toggle7 ='toggle7',
  toggle8 ='toggle8',
  toggle9 ='toggle9',
  toggle10 ='toggle10',
  toggle11 ='toggle11',
  toggle12 ='toggle12',
  toggle13 ='toggle13',
  arrow ='arrow',
  arrow2 ='arrow2',
  arrow3 ='arrow3',
  bouncingBar ='bouncingBar',
  bouncingBall ='bouncingBall',
  smiley ='smiley',
  monkey ='monkey',
  hearts ='hearts',
  clock ='clock',
  earth ='earth',
  material ='material',
  moon ='moon',
  runner ='runner',
  pong ='pong',
  shark ='shark',
  dqpb ='dqpb',
  christmas ='christmas',
  grenade ='grenade',
  point ='point',
  layer ='layer',
  betaWave ='betaWave',
  fistBump ='fistBump',
  soccerHeader ='soccerHeader',
  speaker ='speaker',
  orangePulse ='orangePulse',
  bluePulse ='bluePulse',
  orangeBluePulse ='orangeBluePulse',
  timeTravel ='timeTravel',
  aesthetic ='aesthetic'
}

export type SpinnersType = {
  [key in keyof typeof SpinnerNames]: {
    interval: number,
    frames: string[],
  }
}

export enum SpinnerColors {
  blue = 'blue',
  yellow = 'yellow',
  red = 'red',
  cyan = 'cyan',
  green = 'green',
  magenta = 'magenta',
  white = 'white',
  gray = 'gray',
  redBright = 'redBright',
  greenBright = 'greenBright',
  yellowBright = 'yellowBright',
  blueBright = 'blueBright',
  magentaBright = 'magentaBright',
  cyanBright = 'cyanBright',
  whiteBright = 'whiteBright',
}

export enum SpinnerBackgrounds {
  bgBlack = 'bgBlack',
  bgRed = 'bgRed',
  bgGreen = 'bgGreen',
  bgYellow = 'bgYellow',
  bgBlue = 'bgBlue',
  bgMagenta = 'bgMagenta',
  bgCyan = 'bgCyan',
  bgWhite = 'bgWhite',
  bgBlackBright = 'bgBlackBright',
  bgRedBright = 'bgRedBright',
  bgGreenBright = 'bgGreenBright',
  bgYellowBright = 'bgYellowBright',
  bgBlueBright = 'bgBlueBright',
  bgMagentaBright = 'bgMagentaBright',
  bgCyanBright = 'bgCyanBright',
  bgWhiteBright = 'bgWhiteBright',
}

export enum SpinnerStyles {
  reset = 'reset',
  bold = 'bold',
  dim = 'dim',
  italic = 'italic',
  underline = 'underline',
  inverse = 'inverse',
  // hidden = 'hidden',
  strikethrough = 'strikethrough',
}

export type colorsType = {
  [key in keyof typeof SpinnerColors]: [number, number]
}

export type backgroundsType = {
  [key in keyof typeof SpinnerBackgrounds]: [number, number]
}

export type stylesType = {
  [key in keyof typeof SpinnerStyles]: [number, number]
}

export interface ISpin {
  spinner(name: SpinnerNames): this
  color(color: SpinnerColors): this
  style(style: SpinnerStyles): this
  bg(bg: SpinnerBackgrounds): this
  spin(): void
  stop(): void
  interval(interval: number): this
  print(text: string): void
}
