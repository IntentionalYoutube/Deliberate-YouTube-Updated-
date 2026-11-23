# Deliberate YouTube — dev notes

Chrome MV3 extension (v2.3). No build step; load unpacked via chrome://extensions.

## Files
- `background.js` — service worker: session storage, message routing, feedback-prompt accumulation.
- `content.js` — everything on YouTube: behavioral state engine, alignment, reflections, autoplay detection, interface tweaks, feedback prompt, debug panel (DEBUG_MODE=true at top).
- `popup.*`, `options.*`, `dashboard.*`, `styles.css` (content UI), `pages.css` (extension pages).

## Testing (no Node on PATH on this machine)
- Syntax check: `$env:ELECTRON_RUN_AS_NODE='1'; & "C:\Users\bbcse\AppData\Local\Programs\Devin\Devin.exe" --check <file.js>`
- Background suite: same env, then `Devin.exe tests/run-bg-node.js` (reuses tests/harness.js mock).
- Browser harnesses (real DOM, real Chrome):
  `chrome --headless --disable-gpu --no-first-run --user-data-dir=<tmp> --virtual-time-budget=12000 --dump-dom file:///<abs path>/tests/<bg-test|content-test|smoke-test>.html` — results are in the `#results` element.
- NOTE: stable Chrome blocks `--load-extension`; loading the unpacked extension must be done manually via chrome://extensions.

## Key invariants
- Simplified Mode: only the six display toggles apply; engine/reflections/session controls/debug are off (`isSimplifiedMode()` guards).
- Feedback prompt is one-time, granted when the session stopwatch (`currentSession.startTime`, or a fallback `feedbackPrompt.ytSessionStart` when no session exists) reaches 15 min; persisted under `feedbackPrompt` in chrome.storage.local.
- Autoplay detection keys on the watch URL `v=` param, never `video.src`.
