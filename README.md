# Station inspection

A map of Alexandria's Capital Bikeshare stations, made to be embedded in a Tally form. Click a station to see its name, number and dock count, and mark it done. The done list is shared through a Google Sheet.

- `index.html` is the page. `SHEET_URL` near the top of its script points at the Sheet's web app.
- `stations.json` is the station list (id, number, name, docks, location).
- `sheet.gs` is the Apps Script behind the Sheet.

## Sheet setup

1. In the Sheet, open Extensions, Apps Script, paste `sheet.gs` over the default code and save.
2. Deploy, New deployment, type Web app, execute as yourself, access for anyone. Put the URL in `index.html`.
3. After editing the script, deploy it again under Deploy, Manage deployments, Edit, Version: New version. The URL stays the same.

The script keeps one row per station on a `done` tab, which it creates the first time it runs. To reset a station, set its `done` cell to FALSE.

## Embedding in Tally

Type `/embed`, choose Embed anything, and paste https://sharedmobilityalex.github.io/stationinspect/

## Notes

- Anyone with the page can mark stations; there is no login.
- The map rereads the Sheet every minute to show other people's changes.
- GitHub Pages lets browsers keep files for ten minutes, so a change can take that long to show.
