nohup k6 run \
  -e URL=https://facia-rendering.code.dev-guardianapis.com/Front \
  -e PAYLOAD=ukfront.json \
  --out csv=output-sustained-front-code.csv \
  sustained.mjs > output-sustained-front-code.log &
