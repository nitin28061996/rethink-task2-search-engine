#!/bin/bash
curl -X PUT localhost:9200/people
for i in 1 2 3 4 5
do
   curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/people/_bulk?pretty' --data-binary @public/esdumpfiles/dump$i.json
done