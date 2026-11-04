const source = await Deno.readTextFile(new URL("../public/dialects.js", import.meta.url)) +
  "\n" + await Deno.readTextFile(new URL("../public/app.js", import.meta.url));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function setup(
  fetch = async () => ({ ok: true, json: async () => ["English rejection"] }),
  random = Math.random,
) {
  const elements = Object.fromEntries(
    ["reason", "lang", "dialect", "copy", "status", "again"].map((id) => [id, {
      value: id === "dialect" ? "standard" : "de",
      textContent: "",
      disabled: false,
      events: {},
      children: [],
      addEventListener(event, handler) { this.events[event] = handler; },
      append(child) { this.children.push(child); },
    }]),
  );
  const copied = [];
  const errors = [];
  const variants = new Function("document", "navigator", "fetch", "console", "Math",
    source + "\nreturn dialects;")(
    { getElementById: (id) => elements[id], createElement: () => ({}) },
    { clipboard: { writeText: async (text) => { copied.push(text); } } },
    fetch,
    { error: (...args) => errors.push(args) },
    Object.assign(Object.create(Math), { random }),
  );
  return { elements, variants, copied, errors };
}

Deno.test("all regional options have at least 100 distinct, reachable reasons", async () => {
  const { elements, variants, copied } = setup();
  assert(elements.reason.textContent && !elements.copy.disabled, "Default reason missing");
  assert(elements.dialect.children.length === 10, "Missing dialect options");
  for (const [key, variant] of Object.entries(variants)) {
    assert(variant.reasons.length >= 100, `${key}: too few reasons`);
    assert(new Set(variant.reasons).size === variant.reasons.length, `${key}: duplicates`);
    assert(variant.reasons.every((text) => text.trim() === text && text.length > 0), key);
    assert(variant.reasons.some((text) => /Freid|Freit|Fried/.test(text)), `${key}: Friday`);
    assert(variant.reasons.some((text) => /Fenster|Fensder|Fenschter|Finster/.test(text)), `${key}: windows`);
    const option = elements.dialect.children.find((child) => child.value === key);
    assert(option?.textContent === variant.label, `${key}: label`);
    elements.dialect.value = key;
    await elements.dialect.events.change();
    assert(variant.reasons.includes(elements.reason.textContent), `${key}: selection`);
    assert(elements.reason.lang === "de", `${key}: language`);
    await elements.copy.events.click();
    assert(copied.at(-1) === elements.reason.textContent, `${key}: copying`);
    await elements.again.events.click();
    assert(variant.reasons.includes(elements.reason.textContent), `${key}: regenerate`);
    assert(elements.status.textContent === "", `${key}: feedback reset`);
  }
});

Deno.test("every one of the 128 dialect reasons is selectable through the UI", async () => {
  let random = 0;
  const { elements, variants } = setup(undefined, () => random);
  const allReasons = [];
  for (const [key, variant] of Object.entries(variants)) {
    assert(variant.reasons.length === 128, `${key}: documented count mismatch`);
    elements.dialect.value = key;
    for (const [index, reason] of variant.reasons.entries()) {
      random = (index + 0.5) / variant.reasons.length;
      await elements.again.events.click();
      assert(elements.reason.textContent === reason, `${key}: unreachable reason ${index}`);
      assert(!elements.copy.disabled && elements.reason.lang === "de", `${key}: UI state`);
    }
    allReasons.push(...variant.reasons);
  }
  assert(allReasons.length === 1280, "Incorrect overall count");
  assert(new Set(allReasons).size === allReasons.length, "Duplicate reasons across dialects");
});

Deno.test("English disables dialect selection and German restores the previous choice", async () => {
  const { elements, variants } = setup();
  elements.dialect.value = "berlin";
  await elements.dialect.events.change();
  elements.lang.value = "en";
  await elements.lang.events.change();
  assert(elements.dialect.disabled && elements.reason.lang === "en", "English mode");
  assert(elements.reason.textContent === "English rejection", "English output");
  elements.lang.value = "de";
  await elements.lang.events.change();
  assert(!elements.dialect.disabled && elements.dialect.value === "berlin", "Selection lost");
  assert(variants.berlin.reasons.includes(elements.reason.textContent), "Dialect not restored");
  elements.dialect.value = "standard";
  await elements.dialect.events.change();
  assert(elements.reason.textContent && !elements.copy.disabled, "Standard mode broken");
});

Deno.test("a stale English request cannot overwrite a regional reason", async () => {
  let resolve;
  const { elements, variants } = setup(() => new Promise((done) => { resolve = done; }));
  elements.lang.value = "en";
  const pending = elements.lang.events.change();
  elements.lang.value = "de";
  elements.dialect.value = "muenchen";
  await elements.lang.events.change();
  resolve({ ok: true, json: async () => ["Stale English"] });
  await pending;
  assert(variants.muenchen.reasons.includes(elements.reason.textContent), "Stale output");
  assert(!elements.copy.disabled && !elements.dialect.disabled, "Stale UI state");
});

Deno.test("load errors and unknown dialects are reported, then recoverable", async () => {
  const { elements, errors } = setup(async () => ({ ok: false, status: 503 }));
  elements.lang.value = "en";
  await elements.lang.events.change();
  assert(elements.copy.disabled && elements.status.textContent.includes("nicht geladen"), "Hidden fetch error");
  elements.lang.value = "de";
  elements.dialect.value = "unknown";
  await elements.lang.events.change();
  assert(elements.copy.disabled && errors.length === 2, "Hidden variant error");
  elements.dialect.value = "frankfurt";
  await elements.dialect.events.change();
  assert(!elements.copy.disabled && elements.status.textContent === "", "Recovery failed");
});
