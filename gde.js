//requires jquery

var GDE = {
	playlistPrefix: "viperfx07-playlist",
	playlistClass: function(){ return '.' + this.playlistPrefix; }, 
	videolistPrefix: "video-list",
	videolistClass: function(){ return '.' + this.videolistPrefix; },
	streamingPlaceHolderId: "#streams",
	vMarginClass: ".vmargin",
	usualStreamingServers: "byzoo.org, videobug.net, video44.net, novamov.com",
	preferredStreamingServers: localStorage["preferredStreamingServers"],
	playlists: "",

	setServerPreferences: function (server){
		this.setLS("preferredStreamingServers",server);
	},
	
	getServerPreferences: function (){
		return this.getLS("preferredStreamingServers");
	},

	getServerPreferencesArray: function (){
		return this.getServerPreferences().split(",");
	},

	getLocalStorageValue: function(key){
		return localStorage[key]
	},

	setLocalStorageValue: function(key,value){
		localStorage[key] = value;
	},

	setLS: function(key,value)
	{
		this.setLocalStorageValue(key,value);
	},

	getLS: function(key){
		return this.getLocalStorageValue(key);
	},

	removeAllVmargins : function(){
		$(this.vMarginClass).remove();
	},

	init: function(){
		this.playlists = $(this.vMarginClass);
		this.setLS("preferredStreamingServers", "byzoo.org,video44.net");
		this.removeAllVmargins();
	},

	createPlaylistsPlaceholder: function(){
		//foreach playlists
		this.playlists.each(function(i){
			var index = i+1;

			var theplaylist = this;

			var foundThePreference = false;
			var serverArray = GDE.getServerPreferencesArray();
			$.each(serverArray,function(i){
				console.log(serverArray[i]);
				foundThePreference = $("iframe",theplaylist).prop('src').indexOf(this) >= 0;
			});
			
			if(!foundThePreference)
				return;

			console.log('should');

			//append to streams a new playlist for each previous playlist
			$(GDE.streamingPlaceHolderId).append("<div class='" + GDE.playlistPrefix  + "-" + index + "'>Playlist " + index + "</div>");

			//in each of the new playlist, need to append a ul for the tab
			$(GDE.playlistClass() + '-' + index).append('<ul class="' + GDE.videolistPrefix + '-' + index + '"></ul>');

			//get how many links in the playlist
			var aCount = $('li a',this).length;

			$('li a',this).each(function(j){
				var index1 = j+1;
				console.log(GDE.playlistClass() + "-" + index);
				//in each ul, needs to put all the part links
				$(GDE.videolistClass() + "-" + index).append("<li><a href='#tabs-" + index + "-" + index1 + "'>" + "Part " + index1 + "</a></li>");

				var videoUrl = $(this).prop('href');

				$.get(videoUrl,function(data){
					//get the iframe which is a sibling of li that contains <a href='this.href'>
					var divcontainiframe = $('li a[href="' + videoUrl + '"]',data).parent().parent().parent().next();
					
					$(GDE.playlistClass() + "-" + index).append("<div id='tabs-" + index + "-" + index1 + "'>" + $(divcontainiframe).html() + "</div>");
					//if all the links done		
					if(j == aCount-1)
					{
						//apply tabs script for the playlist
						$(GDE.playlistClass() + "-" + index).tabs();
					}
				});
			});
		});
	}
};