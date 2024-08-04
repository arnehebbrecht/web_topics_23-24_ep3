// loadingWorker.js
self.onmessage = (event) => {
  console.log('LoadingWorker received message:', event.data); // Debugging line

  // Generate a random delay between 1 and 5 seconds
  let randomDelay = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;

  // Simulate work with a random timeout
  setTimeout(() => {
    self.postMessage({ done: true });
  }, randomDelay);
};
