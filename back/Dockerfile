FROM php:8.1-fpm

# Dependencies
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    ca-certificates \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip \
    && update-ca-certificates

COPY . /var/www
# COPY cacert.pem /etc/ssl/certs/

WORKDIR /var/www


# Configure PHP (increase upload limits)
RUN echo "upload_max_filesize=10M" >> /usr/local/etc/php/php.ini
RUN echo "post_max_size=10M" >> /usr/local/etc/php/php.ini

# Composer
# RUN composer install --no-dev --optimize-autoloader

CMD ["php-fpm"]