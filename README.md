# Device 1: API

## Testing dimensions

0. Platform
 - Environment (wifi)
 - Enclosing system (Particle hardware)
0. Interface
 - Button (clicking physically)
 - API (calling via REST)
 - Display (logging calls on browser)
0. Structure
 - Connections (Particle > Cloud > API > Display)
0. Time
 - Concurrency (multiple devices)
 - Frequency (throughput for clicks and API calls)
0. Data

## Reference material

- Javascript, https://github.com/voodootikigod/voodoospark, johnny-five.io, http://nodebots.codemash.org/, https://community.particle.io/t/https-client-is-here-for-the-photon-by-the-glowfi-sh-team/15934
- How to display realtime logging on screen?
  - 10 seconds polling, calling the same API logging endpoint

## TODO

- how to create an API using node.js