// Apps Script behind the station checklist map. Lives in a Google Sheet with one tab,
// "done" (created on first use), deployed as a web app that executes as the
// owner and that anyone may call. One row per station, updated in place.

const HEADERS = ['station_id', 'number', 'name', 'done', 'updated'];

function setup() {
  sheet();
}

// Everyone may read which stations are done: { station_id: updated-ISO-string }.
function doGet() {
  const rows = sheet().getDataRange().getValues().slice(1);
  const done = {};
  for (const r of rows) if (r[0] && r[3] === true) done[r[0]] = new Date(r[4]).toISOString();
  return json(done);
}

// Body: { id, num, name, done: true|false }. Marks or unmarks one station.
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (!body.id || typeof body.done !== 'boolean') return json({ error: 'invalid' });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const s = sheet();
    const ids = s.getRange(1, 1, s.getLastRow(), 1).getValues().map((r) => String(r[0]));
    // The leading ' keeps long numeric ids as text; Sheets would otherwise round them.
    const row = [`'${body.id}`, `'${body.num || ''}`, String(body.name || ''), body.done, new Date()];
    const i = ids.indexOf(String(body.id));
    if (i > 0) s.getRange(i + 1, 1, 1, row.length).setValues([row]);
    else s.appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// The "done" tab, created with its headers the first time it's needed.
function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName('done');
  if (!s) {
    s = ss.insertSheet('done');
    s.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    s.setFrozenRows(1);
  }
  return s;
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
