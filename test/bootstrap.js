process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.error('UnhandledRejection', err.stack);
});
