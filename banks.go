package sbp

import (
	_ "embed"
	"encoding/json"
	"sync"
)

//go:embed data/banks.json
var banksJSON []byte

type Bank struct {
	ID                string  `json:"id"`
	Name              string  `json:"name"`
	Logo              *string `json:"logo"`
	Schema            *string `json:"schema"`
	Package           *string `json:"package"`
	IsDrActive        bool    `json:"isDrActive"`
	IsWebClientActive bool    `json:"isWebClientActive"`
	WebClientURL      *string `json:"webClientUrl"`
}

type Meta struct {
	Version   string `json:"version"`
	UpdatedAt string `json:"updatedAt"`
}

type banksData struct {
	Version   string `json:"version"`
	UpdatedAt string `json:"updatedAt"`
	Banks     []Bank `json:"banks"`
}

var (
	cache *banksData
	once  sync.Once
)

func load() *banksData {
	once.Do(func() {
		var data banksData
		if err := json.Unmarshal(banksJSON, &data); err != nil {
			panic("sbp: failed to parse banks.json: " + err.Error())
		}
		cache = &data
	})
	return cache
}

func GetBanks() []Bank {
	return load().Banks
}

func GetBankByID(id string) *Bank {
	for i := range load().Banks {
		if load().Banks[i].ID == id {
			return &load().Banks[i]
		}
	}
	return nil
}

func GetMeta() Meta {
	d := load()
	return Meta{Version: d.Version, UpdatedAt: d.UpdatedAt}
}
