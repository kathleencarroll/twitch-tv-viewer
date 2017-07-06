function addChannels(i,icon,title,status,url) {  
    $('#main-container').append('<div class="channel-wrapper unpinned" id="channel-wrapper'+i+'>' +
    '<a href="'+url+'">' +
    '<div class="channel-icon" id="channel-icon'+title+'"></div>' + '</a>' +
    '<div class="channel-info">' + 
        '<div class="channel-title" id="channel-title'+i+'"><a href="'+url+'">' + title +'</div>' +
        '<div class="channel-status" id="channel-status'+i+'">' + status +'</a></div>'+
    '</div>' +
    '<div class="channel-pin" id="'+i+'" onClick="pin()"><i class="fa fa-thumb-tack fa-lg" aria-hidden="true"></i></div>' +
    '</div>')
  
  $('#channel-icon'+title).css({
    "background-image": "url("+icon+")"
  });
}

function parseChannel (obj) {
  var logo = obj.logo;
  var title = obj.display_name;
  var status = obj.status;
  if (status === null) {
    status = "Offline";
  }
  var url = obj.url;  
  addChannels(1,logo,title,status,url);
}

function parseStreamers (numChannels, obj) {
  //$('#main-container').empty();
  $('.unpinned').remove();
  
  for (var i = 0; i < numChannels; i++) {
    var logo = obj.channels[i].logo;
    var title = obj.channels[i].display_name;
    var status = obj.channels[i].status;
    var url = obj.channels[i].url;
    addChannels(i+1,logo,title,status,url);
  }
  
  $('#channel-wrapper'+(maxChannels)).css({ 'border-bottom': 'none' });
}

function searchStreamers(query) {
  var url = 'https://api.twitch.tv/kraken/search/channels?query=' + query + '&limit=5&client_id=jc5xd9q4seulmo3zywwhr4iu9a1j1p';
    
$.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    cache: false,
    accept: 'application/vnd.twitchtv.v5+json',
    client_id: 'jc5xd9q4seulmo3zywwhr4iu9a1j1p',
    success: function(data) {
      parseStreamers(3,data);
    },
    error: function(err) {
      console.log(err.message);
    }
  })
}

function searchChannel(username) {
  var url = 'https://wind-bow.glitch.me/twitch-api/channels/biotech';
  
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    cache: false,
    accept: 'application/vnd.twitchtv.v5+json',
    client_id: 'jc5xd9q4seulmo3zywwhr4iu9a1j1p',
    success: function(data) {
      if (data.status !== 404) {
        parseChannel(data);
      } else {
        $('#main-container').append(
        '<div class="channel-wrapper unpinned">' +
          '<div class="channel-icon"></div>' +
          '<div class="channel-info">' + 
            '<div class="channel-title">Channel Unavailable</div>' +
            '<div class="channel-status">Offline</div>' + 
          '</div>' + 
        '</div>')
      }
    },
    error: function(err) {
      console.log(err.message);
    }
  })
}

$(document).ready(function() {
  var url = 'https://api.twitch.tv/kraken/search/channels?query=freecodecamp&limit=1&client_id=jc5xd9q4seulmo3zywwhr4iu9a1j1p'
  
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    cache: false,
    accept: 'application/vnd.twitchtv.v5+json',
    client_id: 'jc5xd9q4seulmo3zywwhr4iu9a1j1p',
    success: function(data) {
      $('#channel-icon0').css({
        "background-image": "url("+data.channels[0].logo+")"
      });
      document.getElementById('channel-title0').innerHTML = '<a href="'+data.channels[0].url+'">' + data.channels[0].display_name + '</a>';
      document.getElementById('channel-status0').innerHTML = '<a href="'+data.channels[0].url+'">' + data.channels[0].status + '</a>';
    },
    error: function(err) {
      console.log(err.message);
      $('#main-container').append(
        '<div class="channel-wrapper unpinned">' +
          '<div class="channel-icon"></div>' +
          '<div class="channel-info">' + 
            '<div class="channel-title">Channel Unavailable</div>' +
            '<div class="channel-status">Offline</div>' + 
          '</div>' + 
        '</div>');
    }
  })
})

document.getElementById('search').onkeydown = function(e){
   if(e.keyCode == 13){
     var query = document.getElementById('search').value;
     searchStreamers(query);
   }
};

function pin() {
  if($(event.target)[0].className === "channel-pin") 
  {
    if ($(event.target).parent().hasClass('unpinned')) 
    {
      $(event.target).parent().removeClass('unpinned');
      $(event.target).html('<i class="fa fa-times fa-1x" aria-hidden="true"></i>');
    } 
    else 
    {
      $(event.target).parent().addClass('unpinned');
      $(event.target).html('<i class="fa fa-thumb-tack fa-lg" aria-hidden="true"></i>');
    }
  } 
  
  else if ($(event.target)[0].className === "fa fa-thumb-tack fa-lg" || $(event.target)[0].className === "fa fa-times fa-1x") 
  {
    if ($(event.target).parent().parent().hasClass('unpinned')) 
    {
      $(event.target).parent().parent().removeClass('unpinned');
      $(event.target).parent().html('<i class="fa fa-times fa-1x" aria-hidden="true"></i>');
    } 
    else 
    {
      $(event.target).parent().parent().addClass('unpinned');
      $(event.target).parent().html('<i class="fa fa-thumb-tack fa-lg" aria-hidden="true"></i>');
    }
  } 
  
  else 
  {
    $(event.target)[0].className = "fa fa-times fa-1x";
  }
}