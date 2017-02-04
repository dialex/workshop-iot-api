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

## How to use

- `npm install` installs dependencies
- `mongod` starts the database
- `npm start` starts the API

## TODO

- [ ] Unit testing
- [X] endpoint that returns "usage" routes
- [ ] require auth token (user: testbash, pass: brighton)
- [X] cleanup & organise into modules

--------

- [ ] html page that lists messages
- [ ] auto refresh that page every 3 sec
- [ ] load/perf testing on that page (API)

--------

- [ ] backup YumYumButton
- [ ] connect device to API
- [ ] test call
- [ ] snapshot/tag (save configs)
- [ ] diff buttons with diff calls

## Reference material

- Javascript
  - johnny-five.io
  - https://github.com/voodootikigod/voodoospark
  - http://nodebots.codemash.org/
  - https://community.particle.io/t/https-client-is-here-for-the-photon-by-the-glowfi-sh-team/15934
- How to display realtime logging on screen?
  - 10 seconds polling, calling the same API logging endpoint
- Create an API using node.js
  - [barebones](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
  - [TDD](https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai)
  - [auth token intro](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)
