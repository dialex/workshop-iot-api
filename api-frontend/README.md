# API Frontend

Constantly pools API and displays the messages received.

## How to use (locally)

- Given the API is running...
- [Enable CORS on your Chrome](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) and make sure you use this filter `http://localhost:8080/*`
- Browser to [index.html](./index.html)

## TODO

- [X] html page calls API and displays JSON
- [X] auto refresh that page every 5 sec
- [X] test page with slow connection
- [ ] test page with no connection
- [X] test 22 tabs open calling the same API (load)
- [X] parse response JSON into records
- [ ] make it pretty with bootstrap

## Reference material

- [Enable localhost dev/debug on Chrome, fixes the CORS issue](http://stackoverflow.com/a/38000615/675577)
- [ajax API call](https://gist.github.com/zuch/3720842)
- How to display realtime logging on screen?
  - 10 seconds polling, calling the same API logging endpoint
