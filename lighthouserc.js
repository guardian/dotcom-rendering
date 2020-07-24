module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:9000/Article?url=https://www.theguardian.com/commentisfree/2020/feb/08/hungary-now-for-the-new-right-what-venezuela-once-was-for-the-left'],
      startServerCommand: 'NODE_ENV=production node dist/frontend.server.js',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
