# promise-withhold

Withhold the resolution or rejection of a Promise at least some amount of time.

This sometimes comes in handy. One use-case is when you have a process that may finish immediately or may take a few seconds, but you don't want your UI to flash a temporary loading state for fewer than 1 second, because a crazy flash would be more confusing than helpful to the user — would even look like a bug.

## Installation

```
npm install withhold-promise
```

## Usage

```js
var withholdPromise = require('withhold-promise');

withholdPromise(performProcessOfUnknownLength, 100)
  .then((value) => {
    // Won't arrive here until *at least* 100ms have elapsed
  })
  .catch((err) => {
    // Also won't arrive here until *at least* 100ms have elapsed
  });
```

## API

### promiseWithhold(yourPromise, time)

Returns a Promise that resolves or rejects the same as `yourPromise` but no earlier than `time`.

#### yourPromise

Type: `Promise`

#### time

Type: `number`

Time in milliseconds, just like you'd feed to `setTimeout`.
