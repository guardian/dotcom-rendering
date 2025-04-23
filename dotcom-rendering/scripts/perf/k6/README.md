# Load Testing with k6

[Grafana k6](https://k6.io/) is a tool that will run a load test scenario against an endpoint and once complete provide detailed stats on latency and throughput metrics.

## Installing

From the k6 directory run

```
./k6-install.sh
```

Once finished you will see an example of how to run the script.

## Script

From the k6 directory run (for example with v0.58.0)

```
./k6-v0.58.0-macos-arm64/k6 run k6.mjs
```

The current script `k6.mjs` loads a locally saved JSON payload which will then POST to the DCR `/Article` endpoint. Using a local payload file and the PROD POST endpoint mimics production and also removes the step of a network fetch of the JSON payload from Frontend from the test scenario.

You can of course configure this to be any payload and endpoint you wish.

## Testing Advice

Test against a PROD build and endpoints.

Run the script 2-3 times to warm the app and instance if working from a cold start.

k6 can consume lots of memory, so ideally you shouldn't run it on the same compute as the app you are load testing.

k6 has a large API so its worth reading the docs and in particular the [overview](https://grafana.com/docs/k6/latest/).

## Output

Once complete k6 will output statistics like the following.

`http_req_duration` are the main stats to consider.

`iteration_duration` includes the time for k6 to run the script.

```
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: k6.mjs
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 1m30s max duration (incl. graceful stop):
              * default: 10 looping VUs for 1m0s (gracefulStop: 30s)



  █ TOTAL RESULTS

    checks_total.......................: 3786    62.955288/s
    checks_succeeded...................: 100.00% 3786 out of 3786
    checks_failed......................: 0.00%   0 out of 3786

    ✓ is status 200

    HTTP
    http_req_duration.......................................................: avg=155.45ms min=54.91ms med=128.6ms  max=2.23s p(90)=250.46ms p(95)=262.3ms
      { expected_response:true }............................................: avg=155.45ms min=54.91ms med=128.6ms  max=2.23s p(90)=250.46ms p(95)=262.3ms
    http_req_failed.........................................................: 0.00%  0 out of 3786
    http_reqs...............................................................: 3786   62.955288/s

    EXECUTION
    iteration_duration......................................................: avg=158.65ms min=57.77ms med=131.66ms max=2.24s p(90)=253.37ms p(95)=265.44ms
    iterations..............................................................: 3786   62.955288/s
    vus.....................................................................: 10     min=10        max=10
    vus_max.................................................................: 10     min=10        max=10

    NETWORK
    data_received...........................................................: 1.1 GB 19 MB/s
    data_sent...............................................................: 251 MB 4.2 MB/s




running (1m00.1s), 00/10 VUs, 3786 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  1m0s
```

## Testing in CODE

If testing in CODE:

-   run the script from a detached instance
-   k6 may get killed by the OOM killer if an instance runs out of memory. First stop the DCR process using `systemctl stop {app-name}` where app-name is `article-rendering`, `facia-rendering` etc to free up memory. If the process is repeatedly killed, run from a larger instance type with more memory or run with a smaller number of VUs.
-   change the script endpoint to the loadbalancer of the stack you are interested in
