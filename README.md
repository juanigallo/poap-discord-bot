# POAP Discord Bot

### Description

Small bot to send unique codes via DM (in discord) to users that uses 👋 reaction in a specific message.

### Config

Create an `.env` file with the following keys

```
TOKEN=
CLIENT_ID=
GUILD_ID=
CHANNEL_ID=
AUTHOR_ID=
MONGO=
```

- `TOKEN` is the ID of your Discord application. If you don't have any, you can create it here: [https://discord.com/developers/applications](https://discord.com/developers/applications)

- `CLIENT_ID` is the OAuth2 ID of you application. You can get it in the settings of your discord app.

- `GUILD_ID` is the ID of your server. You can get it activating the developer mode (User settings -> App settings -> Advanced -> Developer mode) and then right clicking the icon of your server and selecting "Copy ID"

- `CHANNEL_ID` is the ID of the channel where you are going to send the messages. With developer mode activated, you can get it right clicking the channel you want and clicking "Copy ID"

- `AUTHOR_ID` is the ID of the admin user that can send the messages to claim POAPs. This is the only authentication method coded, if you want other thing you will need to develop it.

- `MONGO` is the connection to your mongo database. For example `mondodb://localhost:27017/test`

### Demo

![](https://fundit-cdn.sfo3.digitaloceanspaces.com/random-statics/poap-bot-demo.gif)
