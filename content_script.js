var x = $('.vmargin');

//remove all the vmargin, because we will create a new playlist
$('.vmargin').remove();

//foreach playlist (vmargin)
x.each(function(i){
	var index = i+1;

	//append to streams a new playlist for each previous playlist
	$("#streams").append("<div class='viperfx07-playlist-" + index + "'>Playlist " + index + "</div>");

	//in each of the new playlist, need to append a ul for the tab
	$(".viperfx07-playlist-" + index).append('<ul class="video-list-' + index + '"></ul>');

	//get how many links in the playlist
	var aCount = $('li a',this).length;

	$('li a',this).each(function(j){
		var index1 = j+1;

		//in each ul, needs to put all the part links
		$(".video-list-" + index).append("<li><a href='#tabs-" + index + "-" + index1 + "'>" + "Part " + index1 + "</a></li>");

		var videoUrl = $(this).prop('href');

		$.get(videoUrl,function(data){
			//get the iframe which is a sibling of li that contains <a href='this.href'>
			var divcontainiframe = $('li a[href="' + videoUrl + '"]',data).parent().parent().parent().next();
			
			$(".viperfx07-playlist-" + index).append("<div id='tabs-" + index + "-" + index1 + "'>" + $(divcontainiframe).html() + "</div>");
			//if all the links done		
			if(j == aCount-1)
			{
				//apply tabs script for the playlist
				$(".viperfx07-playlist-" + index).tabs();
			}
		});
	});
});

