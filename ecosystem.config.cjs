module.exports = {
  apps: [
    {
      name: "bargazlive",
      script: "./server.cjs",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      kill_timeout: 65000,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
