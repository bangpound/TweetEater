var   sys = require('sys')
    , tweetstream = require('tweetstream')
    , cradle = require('cradle')
    
var node = process.argv.shift()
  , bin = process.argv.shift()
  , username = process.argv.shift()
  , password = process.argv.shift()
  , database = process.argv.shift()
  , track    = process.argv.shift().split(',')
  , db = new(cradle.Connection)().database(database)
  
var stream = tweetstream.createTweetStream({
    username : username
  , password : password
  , track    : track
})

sys.puts("Starting "+bin+" with twitter user "+username+" tracking "+sys.inspect(track))

stream.addListener('tweet', function(tweet){
  sys.puts(tweet.user.screen_name + ': ' + tweet.text + "\n")
  db.save(tweet)
})