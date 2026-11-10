module.exports = {
  apps: [
    {
      name: "bargazlive",
      script: "./node_modules/next/dist/bin/next",
      args: "start website -H 127.0.0.1 -p 3100",
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