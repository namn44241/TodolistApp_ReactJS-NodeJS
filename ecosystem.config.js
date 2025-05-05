module.exports = {
    apps: [
      {
        name: 'todolist-backend',
        cwd: './server',
        script: 'app.js',
        env: {
          NODE_ENV: 'production',
          PORT: 5001
        },
        watch: true,
        ignore_watch: ['node_modules', 'logs']
      },
      {
        name: 'todolist-frontend',
        cwd: './client',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
          PORT: 3001,
          BROWSER: 'none'
        },
        watch: false
      }
    ]
  };