# Simple Spinners

SCS is a simple utility to print spinners to the console.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install SCS.

```bash
npm i simple-spinners
```

## Usage

```javascript
import Spin from './Spin';
import {
  SpinnerBackgrounds,
  SpinnerColors,
  SpinnerNames,
  SpinnerStyles,
} from './typings';

Spin
  .color(SpinnerColors.blueBright)
  .bg(SpinnerBackgrounds.bgRed)
  .spinner(SpinnerNames.material)
  .interval(50)
  .style(SpinnerStyles.bold)
  .text('ETA CARAIIII')
  .spin();

// DO SOMETHING

Spin.stop();

```
![Result](Animation.gif)

<hr/>
 You can also just print colored text

```javascript
import Spin from './Spin';
import {
  SpinnerBackgrounds,
  SpinnerColors,
  SpinnerNames,
  SpinnerStyles,
} from './typings';

Spin
  .color(SpinnerColors.blueBright)
  .bg(SpinnerBackgrounds.bgRed)
  .style(SpinnerStyles.bold)
  .text('Slicker Than Snot On A Doorknob');

```
![Result2](Screenshot.jpg)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)