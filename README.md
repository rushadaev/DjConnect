# Order Me

Stack: Vue 3 + TypeScript + Vite

DEV: npm run dev

PROD: npm run build

### Deploy

Настроены GitHub action, пуш в мастер -> запускает action и разворачивает на https://rushadaev.github.io/DjConnect/

В vite.config.ts прописывается base: '/DjConnect/', чтобы правильно работал vue router на GitHub
Pages https://rushadaev.github.io/DjConnect/

### QR-code

Изображение доступно по адресу https://dj-connect.xyz/dj/1/qr-code, где *1* - id диджея

QR код ведет на ссылку https://t.me/DjConnect_bot/track?startapp={$dj_id}

Этот параметр следует обрабатывать с помощью TWA.initDataUnsafe.start_param

**Например:**

```
const startParam = TWA.initDataUnsafe.start_param

this.$router.push({ name: 'DJProfile', params: { dj_id: startParam } });
```

### Выплаты в приложении

Выплаты можно делать тремя способами:

1. **Банковская карта (`bank_card`)**
2. **СБП (Система быстрых платежей, `sbp`)**
3. **YooMoney (`yoo_money`)**

## Создание выплаты

### API Endpoint

Для создания выплаты отправьте POST запрос на:

```
POST /payouts
```

### Тело запроса

В теле запроса укажите следующие поля:

- **`dj_id`** (integer, обязательное): ID диджея.
- **`amount`** (float, обязательное): Сумма выплаты.
- **`payout_type`** (string, обязательное): Тип выплаты (`bank_card`, `sbp`, `yoo_money`).
- **`payout_details`** (object, обязательное): Данные для выплаты в зависимости от `payout_type`:

#### 1. Банковская карта (`bank_card`)

```json
{
  "dj_id": 1,
  "amount": 320.00,
  "payout_type": "bank_card",
  "payout_details": {
    "card_number": "5555555555554477"
  }
}
```

- **`card_number`** (string): Номер банковской карты.

#### 2. СБП (`sbp`)

```json
{
  "dj_id": 1,
  "amount": 320.00,
  "payout_type": "sbp",
  "payout_details": {
    "bank_id": "100000000111",
    "phone": "79000000000"
  }
}
```

- **`bank_id`** (string): ID банка-участника СБП.
- **`phone`** (string): Телефон, привязанный к счету.

#### 3. YooMoney (`yoo_money`)

```json
{
  "dj_id": 1,
  "amount": 320.00,
  "payout_type": "yoo_money",
  "payout_details": {
    "account_number": "41001614575714"
  }
}
```

- **`account_number`** (string): Номер кошелька YooMoney.

## Получение списка банков СБП

Чтобы сделать выплату через СБП, сначала нужно получить список банков-участников.

### API Endpoint

```
GET /sbp-participants
```

### Ответ

Пример ответа:

```json
[
  {
    "bank_id": "100000000111",
    "name": "Сбербанк",
    "bic": "044525225"
  }
]
```

Используйте `bank_id` из списка при создании выплаты через СБП.

## Пример процесса

1. **Получить банки СБП**: Запрос `GET /sbp-participants`.
2. **Создать выплату**: Запрос `POST /payouts` с нужными данными.
3. **Следить за статусом выплаты**: Выплата будет либо `pending`, либо `succeeded`, либо `canceled`.
