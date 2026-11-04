const pick = (a) => a[Math.floor(Math.random() * a.length)];

// Fiktive Bundesverwaltungssprache, keine tatsächlichen Bescheide.
const fixed = [
  "Nein. Die Bundesregierung sieht derzeit keinen über die bestehende Ablehnung hinausgehenden Handlungsbedarf.",
  "Eine Zustimmung kann nicht in Aussicht gestellt werden. Die Ressortabstimmung hat ein einvernehmliches Nein ergeben.",
  "Nein. Die Federführung liegt beim Bund; die Verantwortung für ein etwaiges Ja wird dort jedoch nicht verortet.",
  "Dem Anliegen kann nicht entsprochen werden. Die Bereitstellung eines Ja ist im geltenden Bundeshaushalt nicht vorgesehen.",
  "Nein. Der Prüfauftrag wurde erfüllt. Ein Auftrag zur Zustimmung war damit ausdrücklich nicht verbunden.",
  "Eine Zustimmung ist derzeit nicht Gegenstand der regierungsinternen Willensbildung. Das Nein bleibt hiervon unberührt.",
  "Nein. Die Angelegenheit wurde auf Arbeitsebene erörtert und auf Leitungsebene nicht weiterverfolgt.",
  "Das Anliegen wird grundsätzlich begrüßt. Eine Umsetzung wird ebenso grundsätzlich ausgeschlossen.",
  "Nein. Aus der Aufnahme in einen Maßnahmenkatalog ergibt sich kein Anspruch auf eine Maßnahme.",
  "Ein Ja scheidet aus. Die hierfür erforderliche Bund-Länder-Verständigung setzt eine Verständigung über die Verständigung voraus.",
  "Nein. Die Hausleitung hat die Vorlage zur Kenntnis genommen. Eine Billigung ist damit nicht verbunden.",
  "Die Prüfung einer möglichen Zustimmung wird geprüft. Bis zum Abschluss dieser Prüfung verbleibt es beim Nein.",
  "Nein. Der Vorgang wurde dem zuständigen Referat zur abschließenden Nichtbefassung zugeleitet.",
  "Der Bund bekennt sich ausdrücklich zum Ziel Ihres Anliegens. Daraus folgt keine Zustimmung zum Anliegen selbst.",
  "Nein. Die Ablehnung erfolgt ressortübergreifend und unter Wahrung sämtlicher Mitzeichnungsrechte.",
  "Ein Ja wäre ein präjudizierender Einzelfall. Zur Wahrung einer einheitlichen Ablehnungspraxis verbleibt es beim Nein.",
  "Nein. Eine abweichende Entscheidung bleibt einer künftigen, derzeit nicht vorgesehenen Entscheidung vorbehalten.",
  "Ihr Anliegen wurde im Rahmen der verfügbaren Zuständigkeit abschließend nicht aufgegriffen.",
  "Nein. Die Zustimmung steht unter einem Haushaltsvorbehalt; der Haushaltsvorbehalt steht nicht zur Disposition.",
  "Die Angelegenheit ist von grundsätzlicher Bedeutung. Gerade deshalb kommt eine Entscheidung zu Ihren Gunsten derzeit nicht in Betracht.",
];

const subjects = ["Ihr Antrag", "Ihr Anliegen", "Ihr Regelungsvorschlag", "Ihr Ersuchen", "Ihr Förderantrag", "Ihr Umsetzungsvorschlag", "Ihr Änderungsantrag", "Ihr Beschlussvorschlag"];
const verbs = [
  "wird nach abschließender ressortübergreifender Prüfung",
  "wird im Einvernehmen mit den beteiligten Ressorts",
  "wird unter Berücksichtigung der Stellungnahme der Fachabteilung",
  "wird nach Befassung der zuständigen Leitungsebene",
  "wird auf Grundlage der abgestimmten Hausposition",
  "wird unter Würdigung der finanzwirksamen Folgen",
];
const outcomes = ["abgelehnt", "nicht befürwortet", "nicht weiterverfolgt", "nicht aufgegriffen", "nicht zur Umsetzung empfohlen"];
const reasonsDe = [
  "Eine hinreichende Zuständigkeit des Bundes lässt sich aus der vorgelegten Begründung nicht ableiten.",
  "Die erforderliche Gegenfinanzierung ist im geltenden Finanzplan des Bundes nicht abgebildet.",
  "Die Zustimmung des für den Haushalt zuständigen Ressorts liegt nicht vor.",
  "Die abschließende Mitzeichnung der beteiligten Ressorts konnte nicht herbeigeführt werden.",
  "Die Maßnahme ist mit der beschlossenen Ausgabenobergrenze nicht vereinbar.",
  "Eine Umsetzung würde zusätzliche Planstellen voraussetzen, deren Ausbringung nicht vorgesehen ist.",
  "Der Vorschlag greift dem Ergebnis einer noch einzusetzenden interministeriellen Arbeitsgruppe vor.",
  "Die erforderliche Verständigung mit den Ländern steht weiterhin aus.",
  "Eine belastbare Gesetzesfolgenabschätzung liegt nicht in entscheidungsreifer Form vor.",
  "Der dargelegte Erfüllungsaufwand steht außer Verhältnis zum bislang nicht nachgewiesenen Regelungsnutzen.",
  "Die europarechtliche Anschlussfähigkeit bedarf einer gesonderten, derzeit nicht priorisierten Prüfung.",
  "Die Hausleitung sieht gegenwärtig keinen Anlass, von der abgestimmten Ressortposition abzuweichen.",
  "Der Vorschlag ist im aktuellen Arbeitsprogramm der Bundesregierung nicht vorgesehen.",
  "Eine Befassung des Kabinetts ist mangels Ressorteinigung derzeit nicht vorgesehen.",
  "Die Maßnahme würde eine Vorfestlegung für künftige Haushaltsjahre bewirken.",
  "Die vorgelegten Eckpunkte erreichen noch nicht die für eine Eckpunkteabstimmung erforderliche Konkretisierung.",
  "Die Zweckmäßigkeit einer bundeseinheitlichen Regelung konnte nicht hinreichend belegt werden.",
  "Die Auswirkungen auf nachgeordnete Bundesbehörden sind bislang nicht abschließend beziffert.",
  "Die bestehende Erlasslage lässt für eine abweichende Verwaltungspraxis keinen Raum.",
  "Die interministerielle Beteiligung hat nicht ausgeräumte fachliche Vorbehalte ergeben.",
  "Eine Finanzierung aus vorhandenen Haushaltsansätzen kommt mangels verfügbarer Mittel nicht in Betracht.",
  "Die vorgesehene Umsetzung ist mit der geltenden Kompetenzverteilung zwischen Bund und Ländern nicht vereinbar.",
  "Der Entwurf begründet einen Präzedenzfall, dessen Folgewirkungen derzeit nicht absehbar sind.",
  "Eine Freigabe auf Staatssekretärsebene konnte nicht erzielt werden.",
  "Der Vorschlag setzt eine Änderung der Rahmenbedingungen voraus, deren Änderung nicht beabsichtigt ist.",
  "Die Digitalisierung des Verfahrens ersetzt nicht die bislang fehlende Entscheidung über das Verfahren.",
  "Ein zusätzlicher Koordinierungsmechanismus würde zunächst einen abgestimmten Koordinierungsbedarf voraussetzen.",
  "Die Evaluation der bisherigen Nichtumsetzung bleibt abzuwarten.",
];
const emphasis = [
  "Eine Zustimmung kann daher nicht erteilt werden.",
  "Im Ergebnis verbleibt es beim Nein.",
  "Ein abweichendes Votum wird nicht in Aussicht gestellt.",
  "Für eine positive Entscheidung besteht somit keine Grundlage.",
  "Das ablehnende Votum bleibt aufrechterhalten.",
  "Eine Freigabe kommt unter diesen Voraussetzungen nicht in Betracht.",
  "Die Entscheidung lautet demnach: Nein.",
];
const closings = [
  "Eine erneute Befassung setzt eine wesentlich veränderte Sachlage voraus.",
  "Eine darüber hinausgehende Aussage ist zum gegenwärtigen Zeitpunkt nicht möglich.",
  "Die weitere Entwicklung bleibt im Rahmen der bestehenden Zuständigkeiten zu beobachten.",
  "Die beteiligten Ressorts wurden entsprechend unterrichtet.",
  "Die grundsätzliche Bedeutung des Anliegens wird hierdurch nicht infrage gestellt.",
  "Diese Bewertung erfolgt unbeschadet einer etwaigen späteren Neubewertung.",
  "Eine Aufnahme in die nächste Ressortbesprechung ist damit nicht verbunden.",
  "Von einer erneuten Vorlage ohne ergänzende Entscheidungsgrundlagen wird abgesehen.",
  "Ein Zeitplan für die Änderung dieser Bewertung besteht nicht.",
  "",
];

const generateDe = () => {
  if (Math.random() < 0.1) return pick(fixed);
  const text = `${pick(subjects)} ${pick(verbs)} ${pick(outcomes)}. ${pick(reasonsDe)} ${pick(emphasis)} ${pick(closings)}`;
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
