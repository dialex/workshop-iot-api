# API caller

This is an Internet Button, an IoT device built by Spark.

It will be responsible for calling our API.

## How to use



## TODO

- [X] backup YumYumButton
- [X] cleanup YumYumButton specifics
- [X] connect device to API
- [X] make the first API call and check the log
- [X] diff buttons with diff calls
- [ ] ~~redo everything is Javascript~~
- [X] create a webhook to AWS and call it
- [ ] have a button failing based on pattern (explain it on spoilers section)
- [ ] snapshot/tag (save configs)

## Reference material

- [Calling a REST API from Particle](https://community.particle.io/t/launch-rest-from-spark-core/8779)
  - It seems there's no direct way to do it. The official way to go is to use WebHooks and Particle Cloud.
  - There's also this [lib](https://github.com/nmattisson/HttpClient) developed by a member of the community.
- Javascript
  - johnny-five.io
  - https://github.com/voodootikigod/voodoospark (Cloud2Device, does not apply)
  - http://nodebots.codemash.org/
  - https://community.particle.io/t/https-client-is-here-for-the-photon-by-the-glowfi-sh-team/15934

### How to register a webhook

  1. Go to the **webhooks** folder
  2. Duplicate one of the existing `webhook-*.json` files and give it a unique name.
  3. Open the file and configure it properly, namely, change the `url` field to the URL sent by the subscriber and give it a unique `event` name.
  4. Open a terminal and run `particle webhook create <webhook.json>`.
  5. You can check online, on Particle's cloud, that the webhook was created.

Now you need to update the device.

  1. Open the `slack_helper.cpp` file.
  2. Find the `publishMessage` method.
  3. Add a new line `Particle.publish("event-name", message, 60, PRIVATE);`.
  4. Edit `event-name` to match the `event` value from the `webhook.json`.
  5. Click **Compile** button, followed by **Upload**.
