require 'json'

module Eav93
  module Sbp
    DATA_PATH = File.expand_path('../../data/banks.json', __FILE__)

    Bank = Struct.new(
      :id, :name, :logo, :schema, :package,
      :is_dr_active, :is_web_client_active, :web_client_url,
      keyword_init: true
    )

    Meta = Struct.new(:version, :updated_at, keyword_init: true)

    @cache = nil

    def self.get_banks
      _load['banks'].map do |item|
        Bank.new(
          id: item['id'],
          name: item['name'],
          logo: item['logo'],
          schema: item['schema'],
          package: item['package'],
          is_dr_active: item['isDrActive'] || false,
          is_web_client_active: item['isWebClientActive'] || false,
          web_client_url: item['webClientUrl']
        )
      end
    end

    def self.get_bank_by_id(id)
      get_banks.find { |b| b.id == id }
    end

    def self.get_meta
      data = _load
      Meta.new(version: data['version'], updated_at: data['updatedAt'])
    end

    def self._load
      @cache ||= JSON.parse(File.read(DATA_PATH))
    end
    private_class_method :_load
  end
end
