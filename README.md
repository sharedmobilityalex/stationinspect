# Station inspection

A map of Alexandria's Capital Bikeshare stations, made to be embedded in a Tally form. Click a station to see its name, number and dock count, and mark it done. Done marks are shared live through Firebase (Firestore, project `stationinspect-3d591`).

- `index.html` is the page. `FIREBASE` near the top of its script holds the project's web settings, which are public by design.
- `stations.json` is the station list (id, number, name, docks, location).
- `firestore.rules` are the database rules. Paste them in the Firebase console under Firestore Database, Rules, and publish. They allow anyone to mark or unmark a station, but not to delete records, add other fields or set the time.

## Data

One document per station in the `stations` collection, keyed by station id: `done` (true/false), `num`, `name`, `updated` (server time). To see or export the list, open Firestore Database, Data in the Firebase console. To reset a station, set `done` to false there or click Undo on the map.

## Embedding in Tally

Type `/embed`, choose Embed anything, and paste the full address including `https://` (Tally does not add it): https://sharedmobilityalex.github.io/stationinspect/

## Notes

- Anyone with the page can mark stations; there is no login.
- Changes appear on every open map within a second. Taps made without signal are kept on the device and sent when the connection returns.
- GitHub Pages lets browsers keep files for ten minutes, so a change to the page can take that long to show.
