var couchapp = require('couchapp')
  , path = require('path')
  
var ddoc = {
    _id : '_design/tweeteater'
  , views : {}                       
}

ddoc.couchapp = {name: "TweetEater"}

ddoc.views.tweet_id = {
  map: function(doc) {
  	emit(doc.id, {"_id": doc._id, "text": doc.text, "created_at": doc.created_at, "user": {"screen_name": doc.user.screen_name, "name": doc.user.name, "profile_image_url": doc.user.profile_image_url}});
  }
}

ddoc.evently = {
  tweets : {
    _init : {
        mustache : "<ul></ul>"
      , selectors : {
        ul : {
          _changes : {
            mustache : "<li class='tweet' id='{{{id}}}'><img class='profile' src='{{{avatar}}}' align='left' width='36' /><h3 class='screen_name'><a target='_blank' class='user' href='http://twitter.com/{{{screen_name}}}'>{{{screen_name}}} ({{{name}}})</a></h3><p class='text'>{{{text}}}</p><span class='created_at'>{{{created_at}}}</span><br class='clear'></li>"
          , data : "function(r) {var v = r.value;if($('.tweet').length > 50){$('.tweet').last().remove();} return {screen_name : v.user.screen_name,name : v.user.name,avatar : v.user.profile_image_url,text : $.linkify(v.text),id : v._id,created_at : v.created_at}}"
          , query : {
              view : "tweet_id",
              descending : true,
              limit : 50,
              type : "newRows"
            }
          , render : 'prepend'
          }
        }
      }
    }
  }
}

module.exports = ddoc

couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'))
