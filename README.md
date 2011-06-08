# TweetEater

TweetEater is a CouchDB application which displays tweets which are harvested from Twitter's streaming API by an accompanying node.js program.

## Requirements

CouchDB, node.js, node.couchapp.js

## Install

<pre><code>curl -X POST -H 'Content-type: application/json' http://user:pass@localhost:5984/tweeteater
cd TweetEater
couchapp push app.js http://user:pass@localhost:5984/yourdb
</code></pre>

## Run

<pre><code>node _attachments/bin/tweeteater.js twitterusername twitterpassword databasename terms,to,track</code></pre>

Now view your app at

<pre><code>http://localhost:5984/tweeteater/_design/tweeteater/index.html</code></pre>