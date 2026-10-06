# Artwork for the landing page

Drop files in here and they appear on the site. Nothing to deploy beyond the
commit, and no code to change — every empty frame on the page prints the path
it is waiting for.

| File                 | Where it shows            | Shape | Notes |
| -------------------- | ------------------------- | ----- | ----- |
| `hero.mp4`           | Full-bleed hero           | wide  | 10–20s silent loop, no audio track needed. Real training. |
| `hero.jpg`           | Hero poster frame         | wide  | First frame of the video; shows while it buffers. |
| `app.mp4`            | The phone, "In the app"   | 9:16  | Screen recording of a session being logged, 10–15s. |
| `coach.jpg`          | "Why it works"            | 4:3   | Eddy, coaching. |
| `training.jpg`       | Closing band              | wide  | Shot dark — it sits on the near-black band. |

Keep videos under about 4 MB each. They autoplay muted and loop, and the hero
one is the first thing on the page.

Once `hero.mp4` is in place, add `priority` to the hero `<Media>` in
`app/page.tsx` so it loads immediately instead of checking the file exists
first.
