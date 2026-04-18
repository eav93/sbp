[English](README.md) | [Русский](README.ru.md)

# eav93/sbp

PHP и JS/TS библиотека со списком банков — участников СБП (Системы быстрых платежей), обновляемым ежедневно через GitHub Actions.

Источник данных: [nspk.ru](https://qr.nspk.ru/proxyapp/c2bmembers.json)

## Установка

**PHP (Composer)**
```bash
composer require eav93/sbp
```

**JS/TS (npm)**
```bash
npm install @eav93/sbp
```

## Использование

### PHP

```php
use Eav93\Sbp\Banks;

// Все банки
$banks = Banks::getBanks();

foreach ($banks as $bank) {
    echo $bank->id;                // "100000000111"
    echo $bank->name;              // "Сбербанк"
    echo $bank->logo;              // "https://qr.nspk.ru/..."
    echo $bank->schema;            // "bank100000000111"
    echo $bank->package;           // "ru.sberbankmobile"
    echo $bank->isDrActive;        // true
    echo $bank->isWebClientActive; // false
    echo $bank->webClientUrl;      // null
}

// Найти банк по id
$bank = Banks::getBankById('100000000111');

// Информация об актуальности данных
$meta = Banks::getMeta();
// ['version' => '1.0', 'updatedAt' => '2026-04-19T03:00:00.000Z']
```

### JavaScript (ESM)

```js
import { getBanks, getBankById, getMeta } from '@eav93/sbp';

const banks = getBanks();
const bank = getBankById('100000000111');
const meta = getMeta();
```

### JavaScript (CommonJS)

```js
const { getBanks, getBankById, getMeta } = require('@eav93/sbp');

const banks = getBanks();
```

### TypeScript

```ts
import { getBanks, getBankById, Bank, Meta } from '@eav93/sbp';

const banks: Bank[] = getBanks();
const bank: Bank | null = getBankById('100000000111');
```

### Python

```python
from src.banks import get_banks, get_bank_by_id, get_meta

banks = get_banks()
bank  = get_bank_by_id('100000000111')
meta  = get_meta()
```

### Go

```go
import "github.com/eav93/sbp"

banks := sbp.GetBanks()
bank  := sbp.GetBankByID("100000000111")
meta  := sbp.GetMeta()
```

### Ruby

```ruby
require_relative 'src/banks'

banks = Eav93::Sbp.get_banks
bank  = Eav93::Sbp.get_bank_by_id('100000000111')
meta  = Eav93::Sbp.get_meta
```

## Структура объекта банка

| Поле               | Тип              | Описание                                  |
|--------------------|------------------|-------------------------------------------|
| `id`               | `string`         | Числовой идентификатор банка из схемы     |
| `name`             | `string`         | Название банка                            |
| `logo`             | `string \| null` | URL логотипа                              |
| `schema`           | `string \| null` | Схема диплинка (`bank1000...`)            |
| `package`          | `string \| null` | Название Android-пакета                   |
| `isDrActive`       | `bool`           | Поддерживается прямая оплата              |
| `isWebClientActive`| `bool`           | Поддерживается веб-оплата                 |
| `webClientUrl`     | `string \| null` | URL веб-оплаты                            |

## Обновление данных

Данные о банках загружаются с НСПК ежедневно в 03:00 UTC через GitHub Actions и сохраняются в `data/banks.json`. Каждое обновление помечается тегом `data-YYYY-MM-DD`.

Обновить вручную:
```bash
node scripts/fetch.js
```

## Лицензия

MIT
