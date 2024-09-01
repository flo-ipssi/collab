FROM php:8.1-fpm

# Dependencies
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip

COPY . /var/www

WORKDIR /var/www

# Composer
# RUN composer install --no-dev --optimize-autoloader

CMD ["php-fpm"]