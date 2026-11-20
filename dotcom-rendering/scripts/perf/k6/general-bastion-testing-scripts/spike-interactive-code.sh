nohup k6 run \
  -e URL=https://interactive-rendering.code.dev-guardianapis.com/Interactive \
  -e PAYLOAD=confidentauthority.json \
  --out csv=output-spike-interactive-code.csv \
  spike.mjs > output-spike-interactive-code.log &
