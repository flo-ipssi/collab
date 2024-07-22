FROM php:8.1-fpm

# Install the MySQL extension
RUN docker-php-ext-install pdo pdo_mysql

# Install any other dependencies your PHP application requires
# RUN apt-get update && apt-get install -y libicu-dev libpq-dev git unzip
# RUN docker-php-ext-install intl opcache
WORKDIR /var/www
COPY . .
RUN docker-php-ext-install pdo pdo_mysql