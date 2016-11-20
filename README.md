# promise-withhold

Withhold the settlement (fulfillment or rejection) of a Promise at least some amount of time.

This sometimes comes in handy. One use-case is when you have a process that may finish immediately or may take a few seconds, but you don't want your UI to flash a temporary loading state for less than 1 second, because a super-fast flash would be more confusing than helpful to the user — might even look like a bug.

## Installation

```
npm install withhold-promise
```

## Usage

```js
var withholdPromise = require('withhold-promise');

withholdPromise(performProcessOfUnknownLength, 1000)
  .then((value) => {
    // Won't arrive here until *at least* 1000ms have elapsed
  })
  .catch((err) => {
    // Also won't arrive here until *at least* 1000ms have elapsed
  });
```

## API

### promiseWithhold(yourPromise, time)

Returns a Promise that settles (resolves or rejects) the same way as `yourPromise` but no sooner than `time`.

#### yourPromise

Type: `Promise`

#### time

Type: `number`

Time in milliseconds (as you'd feed to `setTimeout`) that the Promise's settlement should be withheld.
