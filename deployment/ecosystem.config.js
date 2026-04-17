# Pancasila Edu Portal - PM2 Ecosystem
module.exports = {
  apps: [
    {
      name: 'pancasila-backend',
      script: 'dist/index.js',
      cwd: '/var/www/pancasila-edu/backend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      error_file: '/var/log/pancasila/backend-error.log',
      out_file: '/var/log/pancasila/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      kill_timeout: 5000,
      listen_timeout: 3000,
    },
  ],
};
