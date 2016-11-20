var test = require('ava');
var withholdPromise = require('./index');

test('resolves no sooner than minimum time', (t) => {
  const subject = Promise.resolve('foo');
  let minimumTimeoutReached = false;
  setTimeout(() => {
    minimumTimeoutReached = true;
  }, 49);

  return withholdPromise(subject, 50).then((value) => {
    t.is(minimumTimeoutReached, true, 'minimum time was reached');
    t.is(value, 'foo', 'resolution value was passed');
  });
});

test('resolves later than minimum time', (t) => {
  let promiseCompleted = false;
  const subject = new Promise((resolve) => {
    setTimeout(() => {
      promiseCompleted = true;
      resolve('foo');
    }, 100);
  });

  let minimumTimeoutReached = false;
  setTimeout(() => {
    minimumTimeoutReached = true;
  }, 49);

  return withholdPromise(subject, 50).then((value) => {
    t.is(minimumTimeoutReached, true, 'minimum time was reached');
    t.is(promiseCompleted, true, 'promise was definitely fulfilled');
    t.is(value, 'foo', 'resolution value was passed');
  });
});

test('rejects no sooner than minimum time', (t) => {
  const expectedError = new Error('bar');
  const subject = Promise.reject(expectedError);
  let minimumTimeoutReached = false;
  setTimeout(() => {
    minimumTimeoutReached = true;
  }, 49);

  return withholdPromise(subject, 50)
    .then(() => {
      t.fail('should have rejected');
    })
    .catch((err) => {
      t.is(minimumTimeoutReached, true, 'minimum time was reached');
      t.is(err, expectedError, 'error was passed');
    });
});

test('rejects later than minimum time', (t) => {
  const expectedError = new Error('bar');
  let promiseCompleted = false;
  const subject = new Promise((resolve, reject) => {
    setTimeout(() => {
      promiseCompleted = true;
      reject(expectedError);
    }, 100);
  });

  let minimumTimeoutReached = false;
  setTimeout(() => {
    minimumTimeoutReached = true;
  }, 49);

  return withholdPromise(subject, 50)
    .then(() => {
      t.fail('should have rejected');
    })
    .catch((err) => {
      t.is(minimumTimeoutReached, true, 'minimum time was reached');
      t.is(promiseCompleted, true, 'promise was definitely fulfilled');
      t.is(err, expectedError, 'error was passed');
    });
});
