const apps = [
{
  active: true,
  def: {
      name: 'api-orders',
      script: './api-orders/application/www.js',
      instances: 1,
      restart_delay: 3000,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // log_type: 'json',
      watch: false,
      autorestart: true,
      max_memory_restart: '1G'
  }
},
{
    active: true,
    def: {
        name: 'api-deliveries',
        script: './api-deliveries/application/www.js',
        instances: 1,
        restart_delay: 3000,
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        // log_type: 'json',
        watch: false,
        autorestart: true,
        max_memory_restart: '1G'
    }
},
{
    active: true,
    def: {
        name: 'frontend-delivery',
        script: './frontend-delivery/start.js',
        instances: 1,
        restart_delay: 3000,
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        // log_type: 'json',
        watch: false,
        autorestart: true,
        max_memory_restart: '1G'
    }
  }
];

module.exports = { apps: apps.filter(app => app.active).map(app => app.def) };
