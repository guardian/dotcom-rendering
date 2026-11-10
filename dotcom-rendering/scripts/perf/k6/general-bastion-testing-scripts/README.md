# Notes.

First, check your content is suitable. For example:

```
curl -X POST -H 'Content-Type: application/json' https://interactive-rendering.code.dev-guardianapis.com/Interactive --data @confidentauthority.json
```

Don't forget the content type!

# Testing

I've made sustained.mjs and spike.mjs

These can be run as follows:

```
k6 run \
  -e URL=https://interactive-rendering.code.dev-guardianapis.com/Interactive \
  -e PAYLOAD=confidentauthority.json \
  --out csv=output-spike-interactive-code.csv \
  spike.mjs
```

For reasons I'm not quite clear about yet, sometimes running interactively in the terminal kills the ssm agent on the instance!

Suggest running with screen or nohup and redirecting output to file at all times.

```
screen -dmS loadtest bash
```

or

```
nohup k6 run ... > output-spike-interactive-code.log
```
