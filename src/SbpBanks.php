<?php

declare(strict_types=1);

namespace Eav93\Sbp;

use RuntimeException;
use JsonException;

class Bank
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly ?string $logo,
        public readonly ?string $schema,
        public readonly ?string $package,
        public readonly bool $isDrActive,
        public readonly bool $isWebClientActive,
        public readonly ?string $webClientUrl,
    ) {}

    public function toArray(): array
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'logo'              => $this->logo,
            'schema'            => $this->schema,
            'package'           => $this->package,
            'isDrActive'        => $this->isDrActive,
            'isWebClientActive' => $this->isWebClientActive,
            'webClientUrl'      => $this->webClientUrl,
        ];
    }
}

class SbpBanks
{
    private static ?array $cache = null;
    private static string $dataPath = __DIR__ . '/../data/banks.json';

    /** @throws RuntimeException|JsonException */
    private static function load(): array
    {
        if (self::$cache !== null) {
            return self::$cache;
        }

        $json = file_get_contents(self::$dataPath);
        if ($json === false) {
            throw new RuntimeException('Cannot read banks data file: ' . self::$dataPath);
        }

        $data = json_decode($json, true, flags: JSON_THROW_ON_ERROR);
        self::$cache = $data;

        return $data;
    }

    /**
     * @return Bank[]
     * @throws RuntimeException|JsonException
     */
    public static function getBanks(): array
    {
        $data = self::load();

        return array_map(
            static fn(array $item) => new Bank(
                id: $item['id'],
                name: $item['name'],
                logo: $item['logo'] ?? null,
                schema: $item['schema'] ?? null,
                package: $item['package'] ?? null,
                isDrActive: $item['isDrActive'] ?? false,
                isWebClientActive: $item['isWebClientActive'] ?? false,
                webClientUrl: $item['webClientUrl'] ?? null,
            ),
            $data['banks'],
        );
    }

    /** @throws RuntimeException|JsonException */
    public static function getBankById(string $id): ?Bank
    {
        foreach (self::getBanks() as $bank) {
            if ($bank->id === $id) {
                return $bank;
            }
        }

        return null;
    }

    /**
     * @return array{version: string, updatedAt: string}
     * @throws RuntimeException|JsonException
     */
    public static function getMeta(): array
    {
        $data = self::load();

        return [
            'version'   => $data['version'],
            'updatedAt' => $data['updatedAt'],
        ];
    }

    public static function clearCache(): void
    {
        self::$cache = null;
    }
}
