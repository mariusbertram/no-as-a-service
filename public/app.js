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
  "Nein. Der Abbau bürokratischer Hemmnisse umfasst nicht den Abbau der Voraussetzungen für unsere Zustimmung.",
  "Die Zustimmung wurde als Zielbild erfasst. Eine Überführung in den Regelbetrieb ist nicht vorgesehen.",
  "Nein. Die Pilotphase hat ergeben, dass sich die Ablehnung auch ohne Pilotphase hätte begründen lassen.",
  "Eine Aufnahme in die Digitalstrategie begründet keinen Anspruch auf eine digitale oder sonstige Zustimmung.",
  "Nein. Das Beteiligungsverfahren ist abgeschlossen; beteiligt wurde sich überwiegend mit Bedenken.",
  "Die Vorlage ist kabinettreif. Eine Befassung des Kabinetts ist aus Gründen der Kabinettsreife nicht angezeigt.",
  "Nein. Die Zustimmung scheitert nicht am politischen Willen, sondern an dessen bislang ausstehender Konkretisierung.",
  "Eine Zustimmung ist fachlich denkbar, haushalterisch ausgeschlossen und damit insgesamt nicht vorgesehen.",
  "Nein. Der Bericht bestätigt den Prüfbedarf. Ein Zustimmungsbedarf wurde nicht festgestellt.",
  "Das Anliegen wurde priorisiert. Innerhalb der priorisierten Anliegen wird es nachrangig behandelt.",
  "Nein. Die Beschleunigung des Verfahrens führt lediglich zu einem früheren Zugang der Ablehnung.",
  "Eine Zustimmung im Wege der Verwaltungsvereinfachung scheidet aus, da hierfür zunächst das Vereinfachungsverfahren einzuhalten wäre.",
  "Nein. Die Zuwendungsvoraussetzungen sind nicht erfüllt. Die Erfüllung Ihrer Erwartungen zählt nicht zu den Zuwendungszwecken.",
  "Der Antrag ist förderwürdig, aber nicht förderfähig. Eine Förderung scheidet damit aus.",
  "Nein. Die Mittel sind verfügbar, jedoch für Zwecke gebunden, zu denen Ihr Anliegen nicht gehört.",
  "Eine überplanmäßige Zustimmung ist weder beantragt noch haushaltsrechtlich abgebildet.",
  "Nein. Eine Verpflichtungsermächtigung zur Erteilung eines Ja wurde nicht ausgebracht.",
  "Die Bund-Länder-Arbeitsgruppe hat sich auf die Fortsetzung der Abstimmung verständigt. Eine Zustimmung ist davon nicht umfasst.",
  "Nein. Der Bund ist zur Koordinierung bereit, nicht jedoch zur Übernahme der daraus folgenden Aufgabe.",
  "Der Vollzug obliegt den Ländern. Die Ablehnung Ihres Vorschlags verbleibt beim Bund.",
  "Nein. Eine bundesweite Lösung setzt voraus, dass die bestehenden Einzellösungen eine bundesweite Lösung zulassen.",
  "Eine Zustimmung auf europäischer Ebene kann eine auf Bundesebene fehlende Zustimmung nicht vorwegnehmen.",
  "Nein. Das Verhandlungsmandat umfasst die Prüfung, nicht aber die Billigung Ihres Vorschlags.",
  "Die Position des Hauses ist unverändert. Eine Änderung des Antrags ändert daran zunächst nichts.",
  "Nein. Die Mitzeichnung erfolgte unter Vorbehalt. Der Vorbehalt betrifft die Zustimmung insgesamt.",
  "Ein Schweigen der beteiligten Stellen wird in diesem Verfahren nicht als Zustimmung gewertet. Ausdrückliche Zustimmung liegt ebenfalls nicht vor.",
  "Nein. Der Vorgang wurde eskaliert. Auf der nächsthöheren Ebene bestehen dieselben Vorbehalte.",
  "Die Entscheidungsvorlage wurde zurückgestellt. Einer Entscheidung zu Ihren Gunsten kommt dies nicht gleich.",
  "Nein. Aus der Einrichtung einer Taskforce lässt sich kein Anspruch auf die Erledigung einer konkreten Aufgabe ableiten.",
  "Die Einrichtung einer Koordinierungsstelle wird geprüft. Bis dahin wird die Nichtzustimmung dezentral fortgeführt.",
  "Nein. Die angekündigte Entlastung betrifft den Verwaltungsaufwand, nicht die Anforderungen an Ihren Antrag.",
  "Die Wirkung Ihres Vorschlags ist nicht messbar. Die Ablehnung wird gleichwohl als abgeschlossener Vorgang erfasst.",
  "Nein. Der Meilenstein wurde erreicht: Die Gründe gegen eine Umsetzung liegen nun vollständig vor.",
  "Eine Zustimmung wäre nur nach Änderung der Beschlusslage möglich. Eine Änderung der Beschlusslage ist nicht Beschlusslage.",
  "Nein. Das Vorhaben wird im nächsten Fortschrittsbericht unter den nicht fortgeschrittenen Vorhaben geführt.",
  "Die Angelegenheit wurde zur Chefsache erklärt. Eine positive Entscheidung wurde dadurch nicht angeordnet.",
  "Nein. Die angekündigte Prüfung war ergebnisoffen. Sie ist nun mit negativem Ergebnis abgeschlossen.",
  "Ihr Vorschlag wurde in die Wissensdatenbank aufgenommen. Daraus folgt kein Eingang in die Entscheidungspraxis.",
  "Nein. Die Entscheidung ist datenbasiert. Die für eine Zustimmung erforderliche Datenbasis liegt nicht vor.",
  "Eine erneute Anhörung würde die bereits dokumentierten Bedenken wiederholen. Es verbleibt beim Nein.",
  "Nein. Am Besprechungsfreitag werden ausschließlich bereits besprochene Vorgänge erneut besprochen. Ihr Anliegen ist noch nicht hinreichend vorbesprochen.",
  "Eine Entscheidung am Besprechungsfreitag ist nicht vorgesehen. Die Tagesordnung enthält ausschließlich die Abstimmung kommender Tagesordnungen.",
  "Nein. Der Besprechungsfreitag dient der ressortinternen Abstimmung. Eine Erledigung von Anliegen würde dem Besprechungszweck vorgreifen.",
  "Ihr Anliegen wird am nächsten Besprechungsfreitag beraten. Ein Freitag für die anschließende Entscheidung wurde noch nicht festgelegt.",
  "Nein. Die für den Besprechungsfreitag vorgesehene Entscheidungsrunde wurde zugunsten einer Vorbesprechung der Entscheidungsrunde umgewidmet.",
  "Eine Zustimmung kann derzeit nicht erteilt werden. Am Standort werden die Fenster geputzt; die Hausleitung erwartet zunächst klare Sicht auf die Entscheidungslage.",
  "Nein. Wegen der Fensterreinigung am Standort ist der Vorgang vorübergehend von der Fensterbank zu nehmen. Eine andere Ablagemöglichkeit ist nicht zugewiesen.",
  "Die Fensterreinigung an einem Dienststandort bindet die standortübergreifende Koordinierungsrunde. Eine Entscheidung über Ihr Anliegen muss daher zurückstehen.",
  "Nein. Die Fenster am Standort sind inzwischen sauber. Die fachlichen Vorbehalte bestehen unverändert fort.",
  "Eine Zustimmung ist auch nach der Fensterreinigung nicht vorgesehen. Verbesserte Durchsicht ersetzt keine Ressortfreigabe.",
];

const subjects = ["Ihr Antrag", "Ihr Anliegen", "Ihr Regelungsvorschlag", "Ihr Ersuchen", "Ihr Förderantrag", "Ihr Umsetzungsvorschlag", "Ihr Änderungsantrag", "Ihr Beschlussvorschlag"];
const verbs = [
  "wird nach abschließender ressortübergreifender Prüfung",
  "wird im Einvernehmen mit den beteiligten Ressorts",
  "wird unter Berücksichtigung der Stellungnahme der Fachabteilung",
  "wird nach Befassung der zuständigen Leitungsebene",
  "wird auf Grundlage der abgestimmten Hausposition",
  "wird unter Würdigung der finanzwirksamen Folgen",
  "wird nach Auswertung der Verbändebeteiligung",
  "wird nach Abstimmung mit den nachgeordneten Bundesbehörden",
  "wird unter Berücksichtigung der Bund-Länder-Beratungen",
  "wird nach Auswertung der ressortinternen Folgenabschätzung",
  "wird unter Beachtung der geltenden Fördergrundsätze",
  "wird nach Prüfung der unionsrechtlichen Rahmenbedingungen",
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
  "Der vorgesehene Förderzweck deckt den beantragten Mitteleinsatz nicht ab.",
  "Ein erhebliches Bundesinteresse wurde in der Antragsbegründung nicht hinreichend dargelegt.",
  "Die Zusätzlichkeit gegenüber bereits bestehenden Maßnahmen konnte nicht nachgewiesen werden.",
  "Eine Doppelförderung lässt sich auf Grundlage der vorgelegten Unterlagen nicht ausschließen.",
  "Die langfristige Finanzierung nach Ablauf der Projektförderung ist nicht gesichert.",
  "Die vorgesehenen Eigenmittel sind bislang nicht verbindlich nachgewiesen.",
  "Der Verwendungsnachweis des vorausgegangenen Förderzeitraums ist noch nicht abschließend geprüft.",
  "Die erforderliche Wirtschaftlichkeitsuntersuchung berücksichtigt die Fortführung des bisherigen Zustands nicht ausreichend.",
  "Die Erfolgskriterien lassen eine belastbare spätere Evaluation nicht zu.",
  "Die Maßnahme ist im geltenden Haushaltstitel nicht veranschlagt.",
  "Die verfügbaren Verpflichtungsermächtigungen sind bereits vollständig gebunden.",
  "Eine Ausnahme von der bestehenden Haushaltssperre wurde nicht zugelassen.",
  "Die Beschaffung setzt eine Bedarfsfeststellung voraus, die bislang nicht gebilligt wurde.",
  "Die vergaberechtlichen Voraussetzungen einer unmittelbaren Beauftragung sind nicht dargelegt.",
  "Die technische Leistungsbeschreibung enthält noch nicht aufgelöste herstellerspezifische Festlegungen.",
  "Ein tragfähiges Betriebskonzept für die Zeit nach der Einführung fehlt.",
  "Die Anbindung an die bestehenden Fachverfahren ist nicht Bestandteil der vorgelegten Planung.",
  "Die datenschutzrechtliche Bewertung setzt ein bislang nicht abgestimmtes Verarbeitungskonzept voraus.",
  "Das erforderliche Informationssicherheitskonzept liegt lediglich als Gliederungsentwurf vor.",
  "Die Schnittstellen zu den Verfahren der Länder sind nicht einheitlich spezifiziert.",
  "Die Barrierefreiheit der vorgesehenen digitalen Lösung wurde noch nicht nachgewiesen.",
  "Der Personalbedarf kann mit den im Stellenplan ausgewiesenen Kapazitäten nicht gedeckt werden.",
  "Die Übertragung zusätzlicher Aufgaben ist vom geltenden Organisationsplan nicht umfasst.",
  "Die Beteiligung der zuständigen Interessenvertretungen ist noch nicht abgeschlossen.",
  "Der vorgesehene Zeitplan berücksichtigt die erforderlichen Beteiligungsfristen nicht.",
  "Die Verbändeanhörung hat zusätzlichen, bislang nicht ausgeräumten Klärungsbedarf ergeben.",
  "Die vorgelegte Synopse enthält noch widersprüchliche Fassungen des Regelungsvorschlags.",
  "Die Abgrenzung zu den Aufgaben anderer Ressorts ist weiterhin offen.",
  "Die Rückmeldungen der nachgeordneten Behörden lassen keine einheitliche Vollzugspraxis erwarten.",
  "Die geplante Berichtspflicht würde einen bislang nicht bezifferten zusätzlichen Verwaltungsaufwand verursachen.",
  "Die vorgesehene Ausnahmeregelung würde den Anwendungsbereich der Regel zur Ausnahme machen.",
  "Die Überführung des Modellvorhabens in eine Daueraufgabe ist nicht beschlossen.",
  "Die angekündigte Entlastungswirkung ist in der vorliegenden Berechnung lediglich als Annahme enthalten.",
  "Die erforderlichen Ausführungsvorschriften müssten vor einer belastbaren Umsetzungsentscheidung abgestimmt werden.",
  "Der Vorschlag enthält keine belastbare Abgrenzung zwischen Projektabschluss und dauerhaftem Weiterbetrieb.",
  "Die Anschlussfähigkeit an die gemeinsam vereinbarte Verwaltungsarchitektur ist noch nicht belegt.",
  "Der Besprechungsfreitag ist vollständig mit der Vorbereitung des nächsten Besprechungsfreitags belegt.",
  "Die zuständige Entscheidungsrunde tagt ausschließlich am Besprechungsfreitag, an dem keine Entscheidungen vorgesehen sind.",
  "Die Protokollfreigabe des letzten Besprechungsfreitags steht einer erneuten Sachbefassung noch entgegen.",
  "Am Besprechungsfreitag konnte keine Einigung über die Aufnahme des Anliegens in die Tagesordnung erzielt werden.",
  "Die Fensterreinigung an einem Dienststandort erfordert zunächst eine abgestimmte Freigabe der betroffenen Büroräume.",
  "Wegen der Fensterreinigung am Standort ist der für die Mitzeichnung vorgesehene Besprechungsraum vorübergehend gesperrt.",
  "Die standortbezogene Fensterreinigung hat Vorrang vor der noch nicht terminierten Befassung mit dem Vorgang.",
  "Die Terminabstimmung zwischen Fensterreinigung und Besprechungsfreitag ist noch nicht abgeschlossen.",
];
const emphasis = [
  "Eine Zustimmung kann daher nicht erteilt werden.",
  "Im Ergebnis verbleibt es beim Nein.",
  "Ein abweichendes Votum wird nicht in Aussicht gestellt.",
  "Für eine positive Entscheidung besteht somit keine Grundlage.",
  "Das ablehnende Votum bleibt aufrechterhalten.",
  "Eine Freigabe kommt unter diesen Voraussetzungen nicht in Betracht.",
  "Die Entscheidung lautet demnach: Nein.",
  "Eine positive Bescheidung wird nicht in Aussicht gestellt.",
  "Dem Vorschlag wird daher nicht zugestimmt.",
  "Die ablehnende Hausposition wird unverändert fortgeführt.",
  "Eine Umsetzung wird auch nach erneuter Würdigung nicht empfohlen.",
  "Eine Zustimmung unter Auflagen kommt ebenfalls nicht in Betracht.",
  "Für eine abweichende Entscheidung ist kein Raum.",
  "Der beantragten Ausnahme wird nicht entsprochen.",
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
  "Der Vorgang wird für die nächste Berichterstattung als abschließend bewertet erfasst.",
  "Eine grundsätzliche Gesprächsbereitschaft bleibt von dieser Ablehnung unberührt.",
  "Eine Weiterleitung an andere Stellen ist nicht als fachliche Unterstützung zu verstehen.",
  "Die Entscheidung entfaltet keine Bindungswirkung für ebenfalls ablehnende Entscheidungen anderer Ressorts.",
  "Eine erneute Vorlage ist auf dem regulären Dienstweg einzubringen.",
  "Eine Befassung außerhalb der bestehenden Gremienstruktur ist nicht vorgesehen.",
  "Die zuständige Fachaufsicht erhält einen Abdruck zur Kenntnis.",
  "Die Aufnahme in eine spätere Arbeitsplanung bleibt ausdrücklich offen.",
  "Eine Änderung der Prioritätensetzung kann hieraus nicht abgeleitet werden.",
  "Der Abschluss des Vorgangs steht einer weiteren Dokumentation seiner Nichtumsetzung nicht entgegen.",
  "Eine erneute Beratung bleibt dem nächsten freien Besprechungsfreitag vorbehalten.",
  "Das Protokoll des Besprechungsfreitags wird nach gesonderter Abstimmung zur Abstimmung gestellt.",
  "Der Abschluss der Fensterreinigung begründet keinen Anspruch auf eine positive Entscheidung.",
  "Die Hausverwaltung wurde gebeten, die Fensterreinigung bei der weiteren Terminplanung zu berücksichtigen.",
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
const dialect = document.getElementById("dialect");
const copy = document.getElementById("copy");
const status = document.getElementById("status");
let requestId = 0;

for (const [value, { label }] of Object.entries(dialects)) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  dialect.append(option);
}

const next = async () => {
  const id = ++requestId;
  status.textContent = "";
  copy.disabled = true;
  dialect.disabled = lang.value !== "de";
  try {
    let reason;
    if (lang.value === "en") {
      reason = pick(await loadEn());
    } else if (dialect.value === "standard") {
      reason = generateDe();
    } else {
      const variant = dialects[dialect.value];
      if (!variant) throw new Error("Unbekannte Dialektvariante");
      reason = pick(variant.reasons);
    }
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
dialect.addEventListener("change", next);
next();
