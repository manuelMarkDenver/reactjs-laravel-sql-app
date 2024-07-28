#!/bin/sh

# Wait for MySQL to be ready
while ! nc -z mysql 3306; do
  sleep 1
done

# Run migrations
php artisan migrate --force

# Start Laravel development server
php artisan serve --host=0.0.0.0 --port=8000

# Start PHP-FPM
exec "$@"