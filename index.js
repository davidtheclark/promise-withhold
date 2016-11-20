module.exports = function(p, time) {
  return new Promise(function(resolve, reject) {
    var errored;

    // This prevent complaints from devtools etc. about an uncaught Promise
    p.catch(function(err) {
      errored = true;
      setTimeout(function() {
        reject(err);
      }, time);
    });

    setTimeout(function() {
      if (errored) return;
      resolve(p);
    }, time);
  });
}
