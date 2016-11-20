module.exports = function(p, time) {
  return new Promise(function(resolve, reject) {
    // Prevent complaints about an uncaught Promise
    var errored;
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
