const pick = (a) => a[Math.floor(Math.random() * a.length)];

// Behördendeutsch: feste Sätze plus kombinatorisch erzeugte Bescheide
const fixed = [
  "Nein.",
  "Nein. Die Ablehnung ergeht ohne Begründung, da eine Begründung ebenfalls abgelehnt wurde.",
  "Das Amt teilt Ihnen hiermit mit: Nein.",
  "Ihrem Antrag auf Ja wird nicht stattgegeben.",
  "Nein. Dies ist ein rechtsverbindlicher Bescheid und gilt auch ohne Unterschrift.",
  "Wir bedauern, Ihnen mitteilen zu müssen, dass wir nichts bedauern: Nein.",
  "Nein – gemäß Nein, laut Nein, in Verbindung mit Nein.",
  "Der Vorgang wurde geprüft, für nichtig befunden und mit Nein abgeschlossen.",
  "Nein. Bitte beachten Sie das beigefügte Merkblatt zum Thema Nein (Merkblatt fehlt).",
  "Zuständig wäre Zimmer 214. Zimmer 214 existiert nicht. Daher: Nein.",
  "Nein, es sei denn, es wäre anders; es ist aber nicht anders. Also Nein.",
  "Im Namen des Nein-Amtes: Nein.",
  "Ihr Antrag wurde dem Aktenzeichen NEIN-0815/4711 zugeordnet und abgelehnt.",
  "Nein. Die Bearbeitungsfrist beträgt sechs bis zwölf Monate, das Ergebnis steht jedoch bereits fest.",
  "Das Nein ergeht hiermit förmlich, fristgerecht und in vollem Umfang.",
];

const subjects = ["Ihr Antrag", "Ihr Anliegen", "Ihr Widerspruch", "Ihre Anfrage", "Ihr Gesuch", "Ihr Begehren", "Ihre Eingabe", "Ihr Ersuchen"];
const verbs = [
  "wird hiermit",
  "muss leider",
  "kann nach eingehender Prüfung nur",
  "wird nach Anhörung sämtlicher Beteiligter",
  "wird gemäß ständiger Verwaltungspraxis",
  "wird kraft Amtes",
];
const outcomes = ["abgelehnt", "abschlägig beschieden", "zurückgewiesen", "verneint", "negativ verbeschieden"];
const reasonsDe = [
  "gemäß § 7 Absatz 3 des Nein-Gesetzes (NeinG)",
  "nach Maßgabe der Verordnung über die Verneinung von Anträgen (VvA)",
  "wegen fehlender Zuständigkeit des Sachbearbeiters",
  "da das Formular 27b/6 nicht in dreifacher Ausfertigung vorliegt",
  "weil die Amtsstunden bereits beendet sind",
  "mangels Stempel der Stempelstelle",
  "da der Vordruck nicht in Schreibmaschinenschrift eingereicht wurde",
  "wegen Verstoßes gegen die Nein-Richtlinie 2024/17/EG",
  "weil der zuständige Referatsleiter im Urlaub ist",
  "da die Beglaubigung der Beglaubigung fehlt",
  "aufgrund unvollständiger Unterlagen (Seite 4 von 3 fehlt)",
  "wegen höherer Gewalt im Sinne der Geschäftsordnung",
  "weil das Anliegen bereits im Jahr 1987 abgelehnt wurde",
  "da kein Termin vereinbart wurde (Termine werden nicht vergeben)",
  "aufgrund der Haushaltssperre",
  "wegen Nichteinhaltung der Antragsfrist (diese endete gestern)",
  "da das Amt im Nachbarlandkreis zuständig ist, welches wiederum auf uns verweist",
  "weil das Passfoto den biometrischen Anforderungen nicht genügt",
  "da die Gebühr in bar, passend und in Muscheln zu entrichten ist",
];
const emphasis = [
  "Nein.",
  "Nein, nein und nochmals nein.",
  "Ein Nein im Sinne des Gesetzes.",
  "Rechtsbehelfsbelehrung: Nein.",
  "Nein (siehe Anlage Nein).",
  "Nein, ohne Ausnahme.",
  "Nein, und zwar unverzüglich.",
];
const closings = [
  "Ein Widerspruch ist binnen einer Frist von drei Minuten schriftlich einzulegen.",
  "Ein Rechtsmittel ist ausdrücklich nicht vorgesehen.",
  "Bitte nehmen Sie von Nachfragen Abstand.",
  "Eine Bearbeitung erfolgt frühestens nach Ablauf der Ewigkeit.",
  "Die Entscheidung ergeht kostenpflichtig.",
  "Bitte ziehen Sie eine neue Wartenummer.",
  "Für Rückfragen steht Ihnen niemand zur Verfügung.",
  "",
  "",
];

const generateDe = () => {
  if (Math.random() < 0.1) return pick(fixed);
  const text = `${pick(subjects)} ${pick(verbs)} ${pick(outcomes)} ${pick(reasonsDe)}. ${pick(emphasis)} ${pick(closings)}`;
  return text.replace(/\s+/g, " ").trim();
};

let reasonsEn = null;
const loadEn = async () => {
  if (!reasonsEn) {
    const response = await fetch("reasons-en.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0 ||
        !data.every((reason) => typeof reason === "string" && reason.trim())) {
      throw new Error("Ungültige Absagen-Daten");
    }
    reasonsEn = data;
  }
  return reasonsEn;
};

const out = document.getElementById("reason");
const lang = document.getElementById("lang");
const copy = document.getElementById("copy");
const status = document.getElementById("status");
let requestId = 0;

const next = async () => {
  const id = ++requestId;
  status.textContent = "";
  copy.disabled = true;
  try {
    const reason = lang.value === "de" ? generateDe() : pick(await loadEn());
    if (id !== requestId) return;
    out.textContent = reason;
    out.lang = lang.value;
    copy.disabled = false;
  } catch (error) {
    if (id !== requestId) return;
    console.error("Absage konnte nicht geladen werden:", error);
    status.textContent = "Die Absage konnte nicht geladen werden. Bitte erneut versuchen.";
  }
};

copy.addEventListener("click", async () => {
  const id = requestId;
  const reason = out.textContent;
  status.textContent = "";
  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Zwischenablage nicht verfügbar");
    }
    await navigator.clipboard.writeText(reason);
    if (id === requestId) status.textContent = "Nein kopiert.";
  } catch (error) {
    console.error("Kopieren fehlgeschlagen:", error);
    if (id === requestId) {
      status.textContent = "Kopieren nicht möglich. Bitte den Text markieren und manuell kopieren.";
    }
  }
});

document.getElementById("again").addEventListener("click", next);
lang.addEventListener("change", next);
next();
