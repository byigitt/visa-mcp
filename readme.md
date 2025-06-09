# 🔍 Vize Randevu Durumu MCP Sunucusu

Bu proje, Schengen ve diğer vize randevu durumlarını `https://api.visasbot.com/api/visa/list` API'si üzerinden sorgulamak için araçlar sunan bir Model Context Protocol (MCP) sunucusudur.

## 📋 Özellikler

- 🛠️ Birden çok filtreyi aynı anda kullanarak karmaşık sorgular yapabilen esnek bir ana araç (`list_visas`)
- 🌍 Kaynak ülke koduna göre filtreleme (`get_visas_by_country_code`)
- 🚦 Duruma göre filtreleme (`get_visas_by_status`)
- 🏢 Misyon koduna göre filtreleme (`get_visas_by_mission_code`)
- 🛂 Vize kategorisine göre filtreleme (`get_visas_by_visa_category`)
- 📄 Vize türüne göre filtreleme (`get_visas_by_visa_type`)
- 📍 Başvuru merkezine göre filtreleme (`get_visas_by_center`)

## 🛠️ Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- pnpm paket yöneticisi

### Projeyi Kurma

1.  Projeyi bilgisayarınıza indirin veya klonlayın:

    ```bash
    git clone https://github.com/byigitt/visa-mcp.git
    cd visa-mcp
    ```

2.  Gerekli Node.js paketlerini yükleyin:

    ```bash
    pnpm install
    ```

## 🖥️ Sunucuyu Çalıştırma

Sunucuyu başlatmak için aşağıdaki komutu çalıştırın:

```bash
pnpm start
```

Sunucu başarıyla başladığında konsolda `MCP server started and listening on stdio.` mesajını görmelisiniz. Sunucu, standart girdi/çıktı (stdio) üzerinden MCP isteklerini dinlemeye başlayacaktır.

## 🐳 Docker ile Çalıştırma

Projeyi Docker kullanarak daha hızlı ve izole bir ortamda çalıştırabilirsiniz.

1.  **Docker Image'ı Oluşturma:**

    Projenin ana dizininde aşağıdaki komutu çalıştırarak Docker image'ını oluşturun:

    ```bash
    docker build -t visa-mcp-server .
    ```

2.  **Docker Container'ını Çalıştırma:**

    Image oluşturulduktan sonra, aşağıdaki komutla container'ı interaktif modda (`-i`) çalıştırabilirsiniz. Bu, MCP sunucusunun `stdin` üzerinden iletişim kurmasını sağlar.

    ```bash
    docker run -i --rm visa-mcp-server
    ```

## ⚙️ Araçlar (Tools)

Sunucu, vize bilgilerini sorgulamak için aşağıdaki araçları sunar.

### `list_visas`

Tüm vize bilgilerini getiren ve aynı anda birden çok alana göre filtreleme yapmanızı sağlayan kapsamlı bir araçtır.

#### Parametreler

-   `country_code` (opsiyonel, string): Ülke koduna göre filtreler (örn: 'tur', 'gbr').
-   `mission_code` (opsiyonel, string): Misyon koduna göre filtreler (örn: 'bgr', 'fin').
-   `visa_category` (opsiyonel, string): Vize kategorisine göre filtreler.
-   `visa_type` (opsiyonel, string): Vize türüne göre filtreler.
-   `center` (opsiyonel, string): Başvuru merkezine göre filtreler.
-   `status` (opsiyonel, string): Duruma göre filtreler (örn: 'open', 'closed').

---

### Özel Filtreleme Araçları

Bu araçlar, tek bir alana göre daha basit filtreleme yapmanızı sağlar.

-   **`get_visas_by_country_code(country_code: string)`**: Belirli bir ülkedeki vizeleri getirir.
-   **`get_visas_by_status(status: string)`**: Belirli bir durumdaki vizeleri getirir (örn: 'open', 'closed').
-   **`get_visas_by_mission_code(mission_code: string)`**: Belirli bir misyona ait vizeleri getirir.
-   **`get_visas_by_visa_category(visa_category: string)`**: Belirli bir vize kategorisindeki vizeleri getirir.
-   **`get_visas_by_visa_type(visa_type: string)`**: Belirli bir vize türündeki vizeleri getirir.
-   **`get_visas_by_center(center: string)`**: Belirli bir başvuru merkezindeki vizeleri getirir.

### Çıktı

Tüm araçlar, vize nesnelerinden oluşan bir diziyi temsil eden bir JSON metni döndürür.