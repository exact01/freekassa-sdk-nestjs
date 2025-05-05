# NestJS FreeKassa SDK Module

![GitHub top language](https://img.shields.io/github/languages/top/exact01/freekassa-sdk-nestjs)
![GitHub Repo stars](https://img.shields.io/github/stars/exact01/freekassa-sdk-nestjs)

![npm version](https://img.shields.io/npm/v/@exact-team/freekassa-sdk-nestjs)
![GitHub Tag](https://img.shields.io/github/v/tag/exact01/freekassa-sdk-nestjs)

![Build Status](https://img.shields.io/github/actions/workflow/status/exact01/freekassa-sdk-nestjs/.github/workflows/deploy-lib.yml)
![Downloads](https://img.shields.io/npm/dt/@exact-team/freekassa-sdk-nestjs)
![License](https://img.shields.io/npm/l/@exact-team/freekassa-sdk-nestjs)
![NPM Last Update](https://img.shields.io/npm/last-update/%40exact-team%2Ffreekassa-sdk-nestjs)

![Known Vulnerabilities](https://snyk.io/test/github/exact01/freekassa-sdk-nestjs/badge.svg)
![Coverage Status](https://img.shields.io/codecov/c/github/exact01/freekassa-sdk-nestjs)

## Описание

FreeKassa SDK Module для NestJS - это модуль для интеграции платежной системы FreeKassa в ваши NestJS приложения. Модуль предоставляет удобный интерфейс для работы с API FreeKassa и автоматически управляет жизненным циклом SDK.

## Установка

```bash
npm install @exact-team/freekassa-sdk-nestjs @exact-team/freekassa-sdk
```

## Структура проекта

```
src/
├── common/        # Общие утилиты и константы
├── decorators/    # Декораторы для внедрения зависимостей
├── interfaces/    # Интерфейсы и типы
├── freekassa-sdk-nestjs.module.ts  # Основной модуль
└── freekassa-sdk-nestjs.builder.ts # Билдер для конфигурации
```

## Основные возможности

- 🚀 Простая интеграция с NestJS приложениями
- ⚡ Поддержка синхронной и асинхронной конфигурации
- 🔄 Автоматическая очистка при завершении работы приложения
- 🌐 Глобальная доступность модуля
- 🎯 Пользовательский декоратор для простого внедрения зависимостей
- 🔒 Типизация всех параметров и ответов API
- 📦 Поддержка всех методов API FreeKassa

## Конфигурация

### Обязательные параметры

- `key` - API ключ для подписи запросов
- `secretWord1` - Первое секретное слово для подписи платежных форм
- `secretWord2` - Второе секретное слово для проверки уведомлений
- `shopId` - ID вашего магазина
- `lang` - Язык интерфейса (`ru` или `en`)
- `currency` - Валюта платежей (`RUB`, `USD`, `EUR`, `UAH`, `KZT`)
- `payUrl` - URL платежной формы (по умолчанию: `https://pay.fk.money/`)
- `apiUrl` - URL API (по умолчанию: `https://api.fk.life/v1/`)

## Использование

### Синхронная конфигурация

```typescript
import { FreeKassaSdkNestjsModule } from '@exact-team/freekassa-sdk-nestjs';

@Module({
  imports: [
    FreeKassaSdkNestjsModule.forRoot({
      key: 'your-api-key',
      secretWord1: 'your-secret-word-1',
      secretWord2: 'your-secret-word-2',
      shopId: 12345,
      lang: 'ru',
      currency: 'RUB',
      payUrl: 'https://pay.fk.money/',
      apiUrl: 'https://api.fk.life/v1/',
    }),
  ],
})
export class AppModule {}
```

### Асинхронная конфигурация

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { FreeKassaSdkNestjsModule } from '@exact-team/freekassa-sdk-nestjs';
import { IFreekassaModuleOptions } from '@exact-team/freekassa-sdk-nestjs';

@Module({
  imports: [
    FreeKassaSdkNestjsModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<IFreekassaModuleOptions> => ({
        key: configService.getOrThrow('FREEKASSA_API_KEY'),
        secretWord1: configService.getOrThrow('FREEKASSA_SECRET_WORD_1'),
        secretWord2: configService.getOrThrow('FREEKASSA_SECRET_WORD_2'),
        shopId: Number(configService.getOrThrow('FREEKASSA_SHOP_ID')),
        lang: 'ru',
        currency: 'RUB',
        payUrl: 'https://pay.fk.money/',
        apiUrl: 'https://api.fk.life/v1/',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

### Использование в сервисах

```typescript
import { Injectable } from '@nestjs/common';
import { InjectFreeKassa } from '@exact-team/freekassa-sdk-nestjs';
import { FreeKassa } from '@exact-team/freekassa-sdk';

@Injectable()
export class PaymentService {
  constructor(@InjectFreeKassa() private readonly freekassa: FreeKassa) {}

  async createPayment(amount: number, currency: string) {
    return this.freekassa.createPayment({
      methodId: 1,
      email: 'customer@example.com',
      ip: '127.0.0.1',
      amount,
      paymentId: new Date().getTime().toString(),
    });
  }

  async verifyNotification(notification: any) {
    return this.freekassa.verifyNotification(notification);
  }
}
```

## API

### FreeKassaSdkNestjsModule

- `forRoot(options: IFreekassaModuleOptions)`: Статический метод для синхронной конфигурации модуля
- `forRootAsync(options: AsyncModuleOptions)`: Статический метод для асинхронной конфигурации модуля

### Декораторы

- `@InjectFreeKassa()`: Декоратор для внедрения экземпляра FreeKassa SDK

## Обработка ошибок

Модуль предоставляет типизированные ошибки для всех возможных ситуаций:

```typescript
try {
  await this.freekassa.createPayment({
    methodId: 1,
    email: 'example@mail.ru',
    ip: '127.0.0.1',
    amount: 10,
    paymentId: new Date().getTime().toString(),
  });
} catch (error) {
  if (error instanceof FreeKassaError) {
    // Обработка ошибок FreeKassa
    console.error(error.message);
  }
}
```

## Требования

- Node.js 20+
- NestJS 10+
- TypeScript 5.0+

## Разработка

### Сборка

```bash
# Сборка проекта
npm run build

# Запуск линтера
npm run lint
```

### Линтинг

Проект использует ESLint и Prettier для поддержания качества кода.

### Тестирование

Для тестирования модуля рекомендуется:

1. Использовать тестовые API-ключи
2. Проверять все сценарии обработки ошибок
3. Верифицировать подписи платежных форм
4. Тестировать обработку уведомлений

## Лицензия

AGPL-3.0-only

## Автор

exact01

## Поддержка

Для получения поддержки или сообщения об ошибках, пожалуйста, создайте issue в репозитории проекта.
