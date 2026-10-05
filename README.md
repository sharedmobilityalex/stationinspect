# Station inspection

A map of Alexandria's Capital Bikeshare stations, made to be embedded in a Tally form. Click a station to see its name, number and dock count, and mark it done. Done marks are shared live through Firebase (Firestore, project `stationinspect-3d591`).

- `index.html` is the page. `FIREBASE` near the top of its script holds the project's web settings, which are public by design.
- `stations.json` is the station list (id, number, name, docks, location).
- `routes.json` holds travel minutes between every pair of stations, DC (Cleveland Park Metro) and six Alexandria-area Metro stations, for driving and biking (OSRM, OpenStreetMap). Rebuild it when stations change.
- `firestore.rules` are the database rules. Paste them in the Firebase console under Firestore Database, Rules, and publish. They allow anyone to mark or unmark a station and to replace the saved plan, but not to delete records, add other fields or set the time.

## Finding a station

- The search box matches station names and numbers as you type ("mt vernon", "king metro", "31908"). Arrow keys and Enter work, or tap a result.
- The target button finds the station nearest the device and shows the distance. Inside an embed, the browser may block location; the map then offers a link to open it on its own page, where location works.

- Inside an embed, the button at the top right opens the map on its own page, which fills a phone screen. In the embed, move the map with two fingers so one finger still scrolls the form.

## Planning

The route button (top right) opens two tabs.

**Project** plans every station left as a set of trips and keeps that plan (in Firebase, `plans/project`) until it is changed, so it is the same in the Tally embed, the full page and on any device.

- Trip kinds, each driven or biked, whichever is quicker for its stations:
  - Morning: DC → stations → BCD before work, up to 2 h by default. Counts only the time beyond the usual commute.
  - Afternoon: BCD → stations → home to DC, up to 4 h.
  - Extended: the same, leaving work early, up to 6 h.
  - All day: DC → stations → DC, no office, up to 7 h.
  - Heading home to DC, the drive isn't counted; by bike, the ride to the nearest Metro station is and the train isn't.
- Settings turn kinds on or off and set their limits, minutes at each stop and getting-started minutes per trip.
- The planner groups stations into whichever mix of trips takes the least of your time (savings-based grouping, then stations moved between trips and small trips folded in while that lowers the total).
- "Suggested now" offers a morning trip before 11 and an afternoon kind after. Tap any trip to use it as the route.
- **Update plan** appears once stations have been finished since the plan was made: it drops them and re-tidies the trips. **Settings / re-plan** starts again from scratch.

**Quick trip** is a one-off route from BCD, DC, your location or any spot or station tapped on the map, for a number of stations or a time. It doesn't change the project plan.

The eye button shows or hides the planned route on the map. Tapping a station always opens its pop-up (name, number, docks, where it sits in the plan, Mark as done) without leaving the route list.

Travel times come from `routes.json`. Times to a tapped spot or your location are fetched live; if routing doesn't answer within 15 seconds, the trip uses an estimate and says so.

## Data

One document per station in the `stations` collection, keyed by station id: `done` (true/false), `num`, `name`, `updated` (server time). To see or export the list, open Firestore Database, Data in the Firebase console. To reset a station, set `done` to false there or click Undo on the map.

## Embedding in Tally

Type `/embed`, choose Embed anything, and paste the full address including `https://` (Tally does not add it): https://sharedmobilityalex.github.io/stationinspect/

## Notes

- Anyone with the page can mark stations; there is no login.
- Changes appear on every open map within a second. Taps made without signal are kept on the device and sent when the connection returns.
- GitHub Pages lets browsers keep files for ten minutes, so a change to the page can take that long to show.
