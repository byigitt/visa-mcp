# 🔍 Vize Randevu Durumu MCP Sunucusu

[![Install in Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=visa-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsInZpc2EtbWNwIl19)
[<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20visa-mcp%20MCP&color=0098FF">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22visa-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22visa-mcp%40latest%22%5D%7D)

Bu proje, Schengen ve diğer vize randevu durumlarını `https://api.visasbot.com/api/visa/list` API'si üzerinden sorgulamak için araçlar sunan bir Model Context Protocol (MCP) sunucusudur.

## 📋 Özellikler

- 🛠️ Birden çok filtreyi aynı anda kullanarak karmaşık sorgular yapabilen esnek bir ana araç (`list_visas`)
- 🌍 Kaynak ülke koduna göre filtreleme (`get_visas_by_country_code`)
- 🚦 Duruma göre filtreleme (`get_visas_by_status`)
- 🏢 Misyon koduna göre filtreleme (`get_visas_by_mission_code`)
- 🛂 Vize kategorisine göre filtreleme (`get_visas_by_visa_category`)
- 📄 Vize türüne göre filtreleme (`get_visas_by_visa_type`)
- 📍 Başvuru merkezine göre filtreleme (`get_visas_by_center`)

## 🛠️ Yükleme

### Gereksinimler

- Node.js (v18 veya üzeri)
- Cursor, Claude Desktop veya başka bir MCP İstemcisi

<details>
<summary><b>Cursor'a Yükle</b></summary>

Aşağıdaki yapılandırmayı Cursor `~/.cursor/mcp.json` dosyanıza yapıştırmanız önerilir. Ayrıca, projenizin klasöründe `.cursor/mcp.json` oluşturarak belirli bir projeye de yükleyebilirsiniz. Daha fazla bilgi için [Cursor MCP belgelerine](https://docs.cursor.com/context/model-context-protocol) bakınız.

```json
{
  "mcpServers": {
    "visa-mcp": {
      "command": "npx",
      "args": ["-y", "visa-mcp"]
    }
  }
}
```
</details>

<details>
<summary><b>Claude Desktop'a Yükle</b></summary>

Bu yapılandırmayı Claude Desktop `claude_desktop_config.json` dosyanıza ekleyin. Daha fazla bilgi için [Claude Desktop MCP belgelerine](https://modelcontextprotocol.io/quickstart/user) bakınız.

```json
{
  "mcpServers": {
    "visa-mcp": {
      "command": "npx",
      "args": ["-y", "visa-mcp"]
    }
  }
}
```

</details>


<details>
<summary><b>VS Code'a Yükle</b></summary>

[<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20visa-mcp%20MCP&color=0098FF">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22visa-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22visa-mcp%40latest%22%5D%7D)
[<img alt="Install in VS Code Insiders (npx)" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20visa-mcp%20MCP&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%7B%22name%22%3A%22visa-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22visa-mcp%40latest%22%5D%7D)

Bu yapılandırmayı VS Code MCP yapılandırma dosyanıza ekleyin. Daha fazla bilgi için [VS Code MCP belgelerine](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) bakınız.

#### VS Code Yerel Sunucu Bağlantısı

```json
"mcp": {
  "servers": {
    "visa-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "visa-mcp"]
    }
  }
}
```

</details>

## 🖥️ Yerel Geliştirme için Sunucuyu Çalıştırma

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