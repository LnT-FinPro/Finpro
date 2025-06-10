FROM php:8.2-alpine

# Install sistem dependensi
RUN apk add --no-cache \
    nodejs \
    npm \
    bash \
    curl \
    git \
    zip \
    unzip \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    sqlite-dev

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    pdo_pgsql \
    pdo_sqlite \
    mbstring \
    zip \
    exif \
    pcntl \
    gd

# Salin file composer dan package.json terlebih dahulu
COPY composer.json composer.lock ./
COPY package*.json ./

# Salin seluruh proyek setelah dependency terpasang
COPY . .

# Buat script startup
RUN echo '#!/bin/sh' > /start-dev.sh && \
    echo 'composer run dev'
