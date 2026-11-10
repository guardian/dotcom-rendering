nohup k6 run \
  -e URL=https://interactive-rendering.code.dev-guardianapis.com/Interactive \
  -e PAYLOAD=confidentauthority.json \
  --out csv=output-sustained-interactive-code.csv \
  sustained.mjs > output-sustained-interactive-code.log &
