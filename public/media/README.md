# Artwork for the landing page

Drop a file in here and it appears on the site. Nothing to deploy beyond the
commit, and no code to change.

Until a file exists its slot renders **nothing at all** — no frame, no label, no
reserved space — and the sections that change shape without their artwork lay
themselves out the other way. So an empty folder is not a broken page.

| File                 | Where it shows          | Shape | Notes |
| -------------------- | ----------------------- | ----- | ----- |
| `hero.mp4`           | Under the hero          | wide  | 10–20s silent loop. Real training. |
| `hero.jpg`           | Hero poster frame       | wide  | First frame of the video; shows while it buffers. |
| `app.mp4`            | "In the app"            | 9:16  | Screen recording of a session being logged, 10–15s. |
| `coach.jpg`          | "Why it works"          | 4:3   | Eddy, coaching. |
| `training.jpg`       | Closing band            | wide  | Shot dark — it sits on a black band. |

Keep videos under about 4 MB each. They autoplay muted and loop.

Once `hero.mp4` is in place, add `priority` to the hero `<Media>` in
`app/page.tsx` so it loads immediately instead of checking the file exists first.
