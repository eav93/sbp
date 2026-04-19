<?php

declare(strict_types=1);

namespace Eav93\Sbp;

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
