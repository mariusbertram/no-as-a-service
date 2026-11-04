# ❌ No-as-a-Service (GitLab Pages)

Statische Version des Nein-Generators. Läuft komplett im Browser, ganz ohne Server.

- **Behördendeutsch**: Nein-Bescheide werden aus Textbausteinen kombiniert (mehrere tausend Varianten).
- **English**: zufällige Absagen aus `public/reasons-en.json`.
- **Nein kopieren**: kopiert die angezeigte Absage in die Zwischenablage (HTTPS oder localhost erforderlich).

## JSON-Abfrage

GitLab Pages liefert ausschließlich statische Dateien aus. Unter
`https://<namespace>.gitlab.io/<projekt>/reasons-en.json` ist die vollständige
englische Liste als JSON-Array abrufbar. Ein Client kann daraus zufällig eine
Absage auswählen und das bisherige Antwortformat erzeugen:

```javascript
const response = await fetch("https://<namespace>.gitlab.io/<projekt>/reasons-en.json");
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const reasons = await response.json();
const result = { reason: reasons[Math.floor(Math.random() * reasons.length)] };
```

Das ist kein dynamischer API-Endpunkt: Ein Abruf von `/no` oder `?format=json`
erzeugt auf GitLab Pages keine zufällige JSON-Antwort. Dafür ist ein separates
Backend oder eine Serverless-Funktion nötig. Behördendeutsche Absagen werden
derzeit ausschließlich im Browser erzeugt; dafür gibt es keinen JSON-Endpunkt.

## Deployment auf GitLab Pages

1. Repository nach GitLab pushen.
2. Die Pipeline in `.gitlab-ci.yml` veröffentlicht den Ordner `public/` auf dem Default-Branch.
3. Die Seite ist danach unter `https://<namespace>.gitlab.io/<projekt>/` erreichbar.

## Lokal testen

```bash
python3 -m http.server --directory public 8000
```

Lizenz: siehe `LICENSE`. Ursprung: hotheadhacker/no-as-a-service.
