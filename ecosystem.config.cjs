const pkg = require("./package.json");

module.exports = {
  apps: [
    {
      name: "bargazlive",
      cwd: __dirname,
      script: "./node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3100",
      version: pkg.version,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      kill_timeout: 65000,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
