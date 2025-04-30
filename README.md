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

Модуль NestJS для интеграции платежной системы FreeKassa в ваши приложения. Предоставляет удобный интерфейс для работы с API FreeKassa.

## Установка

```bash
npm install @exact-team/freekassa-sdk-nestjs && npm instal @exact-team/freekassa-sdk
```

## Возможности

- 🚀 Простая интеграция с приложениями NestJS
- ⚡ Поддержка синхронной и асинхронной конфигурации
- 🔄 Автоматическая очистка при завершении работы приложения
- 🌐 Глобальная доступность модуля
- 🎯 Пользовательский декоратор для простого внедрения зависимостей
- 🔒 Типизация всех параметров и ответов API
- 📦 Поддержка всех методов API FreeKassa

## Быстрый старт

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
      payUrl: 'https://your-custom-pay-url.com',
      apiUrl: 'https://your-custom-api-url.com',
    }),
  ],
})
export class AppModule {}
```

### Асинхронная конфигурация

```typescript
import { FreeKassaSdkNestjsModule } from '@exact-team/freekassa-sdk-nestjs';

@Module({
  imports: [
    FreeKassaSdkNestjsModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        key: configService.get('FREEEKASSA_API_KEY'),
        secretWord1: configService.get('FREEEKASSA_SECRET_WORD_1'),
        secretWord2: configService.get('FREEEKASSA_SECRET_WORD_2'),
        shopId: configService.get('FREEEKASSA_SHOP_ID'),
        lang: configService.get('FREEEKASSA_LANG', 'ru'),
        currency: configService.get('FREEEKASSA_CURRENCY', 'RUB'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Использование в сервисах

### Внедрение через декоратор

```typescript
import { Injectable } from '@nestjs/common';
import { InjectFreeKassa } from '@exact-team/freekassa-sdk-nestjs';
import { FreeKassa } from '@exact-team/freekassa-sdk';

@Injectable()
export class PaymentService {
  constructor(@InjectFreeKassa() private readonly freeKassa: FreeKassa) {}

  async createPayment(amount: number, currency: string) {
    return this.freeKassa.createPayment({
      amount,
      currency,
      orderId: 'unique-order-id',
      email: 'customer@example.com',
    });
  }
}
```

### Типы и интерфейсы

Модуль предоставляет следующие основные типы:

```typescript
interface IFreekassaModuleOptions {
  key: string; // API ключ
  secretWord1: string; // Первый секретный ключ
  secretWord2: string; // Второй секретный ключ
  shopId: number; // ID магазина
  lang: 'ru' | 'en'; // Язык интерфейса
  currency: 'RUB' | 'USD' | 'EUR' | 'UAH' | 'KZT'; // Валюта
  payUrl?: string; // URL SCI для платежей
  apiUrl?: string; // Опциональный URL API
}
```

## Опции конфигурации

| Опция       | Тип                                       | Обязательно | Описание                        |
| ----------- | ----------------------------------------- | ----------- | ------------------------------- |
| key         | string                                    | Да          | API ключ FreeKassa              |
| secretWord1 | string                                    | Да          | Первый секретный ключ           |
| secretWord2 | string                                    | Да          | Второй секретный ключ           |
| shopId      | number                                    | Да          | ID магазина в системе FreeKassa |
| lang        | 'ru' \| 'en'                              | Да          | Язык интерфейса                 |
| currency    | 'RUB' \| 'USD' \| 'EUR' \| 'UAH' \| 'KZT' | Да          | Валюта платежей                 |
| payUrl      | string                                    | Да          | Кастомный URL для платежей      |
| apiUrl      | string                                    | Да          | Кастомный URL API               |

## Справочник API

### FreeKassaSdkNestjsModule

- `forRoot(options: IFreekassaModuleOptions)`: Статический метод для синхронной конфигурации модуля
- `forRootAsync(options: AsyncModuleOptions)`: Статический метод для асинхронной конфигурации модуля

### Основные методы FreeKassa API

- `createPayment(data: IPaymentRequest)`: Создание нового платежа
- `getPaymentStatus(orderId: string)`: Получение статуса платежа
- `getBalance()`: Получение баланса мерчанта
- `getPaymentMethods()`: Получение доступных методов оплаты
- `getExchangeRates()`: Получение курсов валют
- `verifyNotification(body: INotification)`: Верифаикация body вашего вебхука

### Декораторы

- `@InjectFreeKassa()`: Декоратор для внедрения экземпляра FreeKassa SDK

## Обработка ошибок

Модуль предоставляет типизированные ошибки для всех возможных ситуаций:

```typescript
try {
  await this.freeKassa.createPayment({
    methodId: 1, //number
    email: 'example@mail.ru',
    ip: '127.0.0.1', //ip
    amount: 10, // 10 RUB
    paymentId: new Date().getTime().toString(), // ID your system!!!!!!
  });
} catch (error) {
  if (error instanceof FreeKassaError) {
    // Обработка ошибок FreeKassa
    console.error(error.message);
  }
}
```

## Примеры использования

### Создание платежа

```typescript
const payment = await this.freeKassa.createPayment({
  methodId: 1, //number
  email: 'example@mail.ru',
  ip: '127.0.0.1', //ip
  amount: 10, // 10 RUB
  paymentId: new Date().getTime().toString(), // ID your system!!!!!!
});
```

### Проверка статуса платежа

```typescript
const status = await this.freeKassa.getPaymentStatus('order-123');

//=========
const randomBody = {
  MERCHANT_ID: '1', // YOUR SHOP ID
  AMOUNT: '10', // 10 RUB
  intid: '196646649', // initID
  MERCHANT_ORDER_ID: '1746001556454', // ID YOUR SYSTEM
  P_EMAIL: 'example@mail.ru',
  P_PHONE: '',
  CUR_ID: '1',
  commission: '0',
  SIGN: 'a242444ec9b2cf63e5fa1ea1ef1bd991',
};
const verify = freekassa.verifyNotification(randomBody);
console.log(verify); //bool
```

## Лицензия

AGPL-3.0-only

## Вклад в проект

Приветствуются любые вклады! Пожалуйста, не стесняйтесь отправлять Pull Request.

## Поддержка

Для получения поддержки, пожалуйста, создайте issue в репозитории GitHub.
