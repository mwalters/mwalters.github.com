(function(h){function o(g){var a=Math.floor(Math.log(g)/Math.log(1024));return(g/Math.pow(1024,Math.floor(a))).toFixed(2)+" "+"bytes kb MB GB TB PB".split(" ")[a]}function p(g){var a;"Microsoft Internet Explorer"==navigator.appName?(a=new ActiveXObject("Microsoft.XMLDOM"),a.async="false",a.loadXML(g)):a=(new DOMParser).parseFromString(g,"text/xml");return a}h.fn.rssfeed=function(g,a,e){a=h.extend({limit:10,header:!0,titletag:"h4",date:!0,content:!0,snippet:!0,media:!0,showerror:!0,errormsg:"",key:null,
ssl:!1,linktarget:"_self",sort:"",sortasc:!0},a);return this.each(function(j,c){var f=h(c),d="";a.ssl&&(d="s");f.hasClass("rssFeed")||f.addClass("rssFeed");if(null==g)return!1;d="http"+d+"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURIComponent(g);null!=a.limit&&(d+="&num="+a.limit);null!=a.key&&(d+="&key="+a.key);h.getJSON(d+"&output=json_xml",function(d){if(200==d.responseStatus)l(c,d.responseData,a),h.isFunction(e)&&e.call(this,f);else{if(a.showerror)var b=""!=a.errormsg?
a.errormsg:d.responseDetails;h(c).html('<div class="rssError"><p>'+b+"</p></div>")}})})};var l=function(g,a,e){var j=a.feed;if(!j)return!1;var c=[],f="",d="odd";if(e.media)var m=p(a.xmlString).getElementsByTagName("item");e.header&&(f+='<div class="rssHeader"><a href="'+j.link+'" title="'+j.description+'">'+j.title+"</a></div>");f+='<div class="rssBody"><ul>';for(a=0;a<j.entries.length;a++){c[a]=[];var b=j.entries[a],k,i="";switch(e.sort){case "title":i=b.title;break;case "date":i=b.publishedDate}c[a].sort=
i;b.publishedDate&&(k=new Date(b.publishedDate),k=k.toLocaleDateString()+" "+k.toLocaleTimeString());c[a].html="<"+e.titletag+'><a href="'+b.link+'" title="View this feed at '+j.title+'">'+b.title+"</a></"+e.titletag+">";e.date&&k&&(c[a].html+="<div>"+k+"</div>");e.content&&(c[a].html+="<p>"+(e.snippet&&""!=b.contentSnippet?b.contentSnippet:b.content)+"</p>");if(e.media&&0<m.length&&(b=m[a].getElementsByTagName("enclosure"),0<b.length)){c[a].html+='<div class="rssMedia"><div>Media files</div><ul>';
for(i=0;i<b.length;i++){var n=b[i].getAttribute("url"),l=b[i].getAttribute("type"),q=b[i].getAttribute("length");c[a].html+='<li><a href="'+n+'" title="Download this media">'+n.split("/").pop()+"</a> ("+l+", "+o(q)+")</li>"}c[a].html+="</ul></div>"}}e.sort&&c.sort(function(a,c){if(e.sortasc)var b=a.sort,d=c.sort;else b=c.sort,d=a.sort;if("date"==e.sort)return new Date(b)-new Date(d);b=b.toLowerCase();d=d.toLowerCase();return b<d?-1:b>d?1:0});h.each(c,function(a){f+='<li class="rssRow '+d+'">'+c[a].html+
"</li>";d="odd"==d?"even":"odd"});f+="</ul></div>";h(g).html(f);h("a",g).attr("target",e.linktarget)}})(jQuery);

$(document).ready(function () {
	jQuery(function($){
    $('.tweets').rssfeed('http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=mwalters', {
      limit: 7,
      content: false,
      titletag: false,
      date: false
    }, function() {
        $(".tweets li a").each(function() {
          var val = $(this).html();
          $(this).html(val.substring(10, val.length));
        });
    });
  });
  $('#blogposts').rssfeed('http://feeds.feedburner.com/msw/io', {
    limit: 7,
    content: false,
    titletag: false,
    date: false
  });
	$(function() {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: "https://api.instagram.com/v1/users/355730/media/recent/?access_token=18360510.f59def8.d8d77acfa353492e8842597295028fd3",
			success: function(data) {
				for (var i = 0; i < 1; i++) {
          $("#instagram").append("<div class='instagram-placeholder'><a target='_blank' href='" + data.data[i].link +"'><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' /></a></div>");
        }
			}
		});
	});
});