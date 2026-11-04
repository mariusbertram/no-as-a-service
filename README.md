# bundesbehörden-nein-as-a-Service

![Projektlogo](public/assets/logo.svg)

Statische Version des Nein-Generators. Läuft komplett im Browser, ganz ohne Server.

- **Bundesbehördendeutsch**: satirische Absagen auf Bundesverwaltungsebene, mit Ressortabstimmung, Haushaltsvorbehalt, Bund-Länder-Zuständigkeit und ministerieller Mitzeichnung. Dazu kommen Fördermittel, Vergabe, Digitalisierung, der Besprechungsfreitag und die Fensterreinigung am Dienststandort. 70 feste Absagen und über 11 Millionen kombinierbare Varianten.
- **English**: zufällige Absagen aus `public/reasons-en.json`.
- **Separate Dialektauswahl für Deutsch**: Bundesbehördendeutsch (Standard), Berlin, Thüringen, Bayern, München, Ruhrgebiet, Frankfurt, Köln, Sachsen, Schwaben und Norddeutschland. Je 128 regionale Absagen (1.280 insgesamt): 32 feste Texte sowie 96 Kombinationen aus zwölf weiteren Begründungen und acht Schlussformeln. Kurze Neins, regionale Sprüche und Bürokratie-Ausreden, inklusive Besprechungsfreitag und Fensterreinigung. Die Texte sind humorvolle Dialekt-Anklänge, keine exakten Transkriptionen. Bei Englisch ist die Dialektauswahl deaktiviert; die deutsche Auswahl bleibt erhalten.
- **Nein kopieren**: kopiert die angezeigte Absage in die Zwischenablage (HTTPS oder localhost erforderlich).

Eigene SVG-Wortmarke mit Verwaltungsgebäude, schwarz-rot-goldener Leiste und
„Bundesbehörden NEIN as-a-Service“, im Frontend und als Favicon eingebunden.
Das Projekt ist Satire: keine Bundesbehörde, keine amtlichen Bescheide und keine Rechtsauskunft.

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
