nohup k6 run \
  -e URL=https://interactive-rendering.code.dev-guardianapis.com/Interactive \
  -e PAYLOAD=confidentauthority.json \
  --out csv=output-huge-spike-interactive-code.csv \
  huge-spike.mjs > output-huge-spike-interactive-code.log &
