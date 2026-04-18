[English](README.md) | [Русский](README.ru.md)

# eav93/sbp

PHP & JS/TS library providing an up-to-date list of Russian SBP (Fast Payment System) member banks, auto-updated daily via GitHub Actions.

Data source: [nspk.ru](https://qr.nspk.ru/proxyapp/c2bmembers.json)

## Installation

**PHP (Composer)**
```bash
composer require eav93/sbp
```

**JS/TS (npm)**
```bash
npm install @eav93/sbp
```

## Usage

### PHP

```php
use Eav93\Sbp\Banks;

// All banks
$banks = Banks::getBanks();

foreach ($banks as $bank) {
    echo $bank->id;               // "100000000111"
    echo $bank->name;             // "Сбербанк"
    echo $bank->logo;             // "https://qr.nspk.ru/..."
    echo $bank->schema;           // "bank100000000111"
    echo $bank->package;          // "ru.sberbankmobile"
    echo $bank->isDrActive;       // true
    echo $bank->isWebClientActive;// false
    echo $bank->webClientUrl;     // null
}

// Find by id
$bank = Banks::getBankById('100000000111');

// Data version info
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

## Bank object

| Field              | Type             | Description                        |
|--------------------|------------------|------------------------------------|
| `id`               | `string`         | Numeric bank ID from schema        |
| `name`             | `string`         | Bank name                          |
| `logo`             | `string \| null` | Logo URL                           |
| `schema`           | `string \| null` | Deep link schema (`bank1000...`)   |
| `package`          | `string \| null` | Android package name               |
| `isDrActive`       | `bool`           | Direct payment supported           |
| `isWebClientActive`| `bool`           | Web payment supported              |
| `webClientUrl`     | `string \| null` | Web payment URL                    |

## Data updates

Banks data is fetched from NSPK daily at 03:00 UTC via GitHub Actions and committed to `data/banks.json`. Each update is tagged `data-YYYY-MM-DD`.

To update manually:
```bash
node scripts/fetch.js
```

## License

MIT
