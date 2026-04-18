from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

_DATA_PATH = Path(__file__).parent.parent / "data" / "banks.json"
_cache: dict | None = None


@dataclass(frozen=True)
class Bank:
    id: str
    name: str
    logo: Optional[str]
    schema: Optional[str]
    package: Optional[str]
    is_dr_active: bool
    is_web_client_active: bool
    web_client_url: Optional[str]


@dataclass(frozen=True)
class Meta:
    version: str
    updated_at: str


def _load() -> dict:
    global _cache
    if _cache is None:
        _cache = json.loads(_DATA_PATH.read_text(encoding="utf-8"))
    return _cache


def get_banks() -> list[Bank]:
    return [
        Bank(
            id=item["id"],
            name=item["name"],
            logo=item.get("logo"),
            schema=item.get("schema"),
            package=item.get("package"),
            is_dr_active=item.get("isDrActive", False),
            is_web_client_active=item.get("isWebClientActive", False),
            web_client_url=item.get("webClientUrl"),
        )
        for item in _load()["banks"]
    ]


def get_bank_by_id(bank_id: str) -> Optional[Bank]:
    return next((b for b in get_banks() if b.id == bank_id), None)


def get_meta() -> Meta:
    data = _load()
    return Meta(version=data["version"], updated_at=data["updatedAt"])
