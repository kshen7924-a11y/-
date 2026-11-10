# Local vendor and font pack

Prepared: 2026-11-10. This folder only prepares assets; it does not modify or publish the site.

## Installation map

Copy the contents of assets/ into the site's public assets directory while retaining their paths:

- assets/vendor/gsap.min.js — GSAP 3.15.0, 72,927 bytes.
- assets/vendor/ScrollTrigger.min.js — ScrollTrigger 3.15.0, 44,575 bytes.
- assets/fonts/local-fonts.css — four local @font-face declarations, font-display: swap.
- assets/fonts/roboto-condensed-variable.ttf — Roboto Condensed normal, wght 100–900.
- assets/fonts/bodoni-moda-variable.ttf — Bodoni Moda normal, wght 400–900, opsz 6–96.
- assets/fonts/bodoni-moda-italic-variable.ttf — Bodoni Moda italic, wght 400–900, opsz 6–96.
- assets/fonts/yellowtail-regular.ttf — Yellowtail normal, fixed weight 400; intended for the exact logo text shenkai3246.

Load /assets/fonts/local-fonts.css locally. Load the two scripts in GSAP then ScrollTrigger order and register ScrollTrigger in the application. No CSS @import or external font URL is used. Add Chinese system-font fallbacks to the application's font stacks.

Bodoni Moda has no weight below 400. Use 400 as the lower endpoint of any serif weight interaction. Both Bodoni files have an optical-size axis; use font-optical-sizing: auto or an explicit supported opsz in application styles. Roboto Condensed has only a wght variable axis.

## Font format and verification

The Google Fonts CSS endpoint could not be reached from the local environment. Following the approved fallback, these are the original, unmodified TTF files from the official google/fonts repository rather than WOFF2 subsets. Combined font payload is 772,236 bytes. They include more glyphs than a Latin-only subset. Browser runtime needs no production CDN connection.

All four font binaries match the official Git blob SHA and size returned by the repository API. sources/verification.json records the exact source URLs, Git blob IDs, SHA-256 hashes, byte counts, and parsed fvar axes. sources/verify-pack.cjs reproduces the binary, font-axis, and local-CSS checks without network access. Both JavaScript files also passed Node syntax checking; application behavior must still be tested in-browser.

## Sources and licenses

Runtime source files, with original license headers preserved:

- https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js
- https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js
- Runtime terms: https://gsap.com/standard-license
- A readable-page HTML snapshot is retained at licenses/GSAP-standard-license.html. This is a source record, not an application asset.

Official Google Fonts source families:

- https://github.com/google/fonts/tree/main/ofl/robotocondensed
- https://github.com/google/fonts/tree/main/ofl/bodonimoda
- https://github.com/google/fonts/tree/main/apache/yellowtail

Roboto Condensed: SIL Open Font License 1.1, retained in licenses/RobotoCondensed-OFL.txt.
Copyright 2011 The Roboto Project Authors (https://github.com/googlefonts/roboto-classic).

Bodoni Moda: SIL Open Font License 1.1, retained in licenses/BodoniModa-OFL.txt.
Copyright 2020 The Bodoni Moda Project Authors (https://github.com/indestructible-type/Bodoni).

Yellowtail: Apache License 2.0, retained in licenses/Yellowtail-Apache-2.0.txt.
Official metadata: Copyright (c) 2011 by Brian J. Bonislawsky DBA Astigmatic (AOETI). All rights reserved. Available under the Apache 2.0 licence.
The family is under apache/yellowtail in the official repository, not ofl/yellowtail.

Retain these notices and license files alongside the project's redistributed vendor assets. The sources/ directory contains the original family metadata and verification records; it is not required at browser runtime.
