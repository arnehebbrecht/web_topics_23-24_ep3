// loadingWorker.js
self.onmessage = (event) => {
  console.log('Worker received message:', event.data); // Debugging line

  // Generate a random delay between 1 and 5 seconds
  const randomDelay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  // Simulate work with a random timeout
  setTimeout(() => {
    self.postMessage({ done: true });
  }, randomDelay);
};
