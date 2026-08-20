```
duckdb -c "select *, readyTime - startTime from ec2_data.csv"
duckdb -c "select *, readyTime - startTime from ecs_data.csv"
```
