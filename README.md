# Station inspection

A map of Alexandria's Capital Bikeshare stations, made to be embedded in a Tally form. Click a station to see its name, number and dock count, and mark it done. Done marks are shared live through Firebase (Firestore, project `stationinspect-3d591`).

- `index.html` is the page. `FIREBASE` near the top of its script holds the project's web settings, which are public by design.
- `stations.json` is the station list (id, number, name, docks, location).
- `routes.json` holds travel minutes between every pair of stations and DC (Cleveland Park Metro), for driving, biking and walking (OSRM, OpenStreetMap). Rebuild it when stations change.
- `firestore.rules` are the database rules. Paste them in the Firebase console under Firestore Database, Rules, and publish. They allow anyone to mark or unmark a station, but not to delete records, add other fields or set the time.

## Finding a station

- The search box matches station names and numbers as you type ("mt vernon", "king metro", "31908"). Arrow keys and Enter work, or tap a result.
- The target button finds the station nearest the device and shows the distance. Inside an embed, the browser may block location; the map then offers a link to open it on its own page, where location works.

- Inside an embed, the button at the top right opens the map on its own page, which fills a phone screen. In the embed, move the map with two fingers so one finger still scrolls the form.

## Planning a route

The route button (top right) plans a trip through stations not yet done.

- Start and End: BCD (Witter Field station), DC (Cleveland Park Metro), your location, or a station or spot tapped on the map. End can be the same as the start.
- Drive, Bike or Walk, and how much to do today: everything left, a number of stations, or a time budget, with minutes spent at each stop.
- It picks a compact group of stations that fits, orders them for the shortest trip, numbers them on the map, and lists arrival times. "Next stop" walks through them in order.
- Times between stations come from `routes.json`. Times to a tapped spot or your location are fetched live; if the routing service doesn't answer within 15 seconds, the plan uses an estimate and says so.
- The plan is kept on the device until cleared. Re-plan any time; finished stations are left out.

## Data

One document per station in the `stations` collection, keyed by station id: `done` (true/false), `num`, `name`, `updated` (server time). To see or export the list, open Firestore Database, Data in the Firebase console. To reset a station, set `done` to false there or click Undo on the map.

## Embedding in Tally

Type `/embed`, choose Embed anything, and paste the full address including `https://` (Tally does not add it): https://sharedmobilityalex.github.io/stationinspect/

## Notes

- Anyone with the page can mark stations; there is no login.
- Changes appear on every open map within a second. Taps made without signal are kept on the device and sent when the connection returns.
- GitHub Pages lets browsers keep files for ten minutes, so a change to the page can take that long to show.
