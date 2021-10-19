(function($) {
	var tag = document.createElement('script');
	tag.src = 'https://www.youtube.com/iframe_api';
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;

	function onYouTubeIframeAPIReady(new_video_id) {
		player = new YT.Player('gallery-video-player', {
			videoId: new_video_id,
			playerVars: {
				controls: 0, // Show pause/play buttons in player
				disablekb: 0, // Disable keyboard controls
				rel: 0, // Hide related videos
				showinfo: 0, // Hide the video title
				modestbranding: 1 // Hide the Youtube Logo
			},
			events: {
				onReady: function(event) {
					$('#gallery-video-player').toggleClass('gallery-video-player-active');
					event.target.playVideo();
				}
			}
		});
	}

	$(document).ready(function() {
			$(document).on('click', '.gallery-item.video', function(e) {
				var new_video_id = $(this).attr('data-video-id');
				$('#gallery-video-player-close').slideToggle();
				onYouTubeIframeAPIReady(new_video_id);
				$('#gallery-video-player').fitVids();
			});

			$(document).on('click', '#gallery-video-player-close', function(e) {
				$('#gallery-video-player').removeClass('gallery-video-player-active');
				$('#gallery-video-player-close').slideToggle();
				setTimeout(function() {
					player.pauseVideo();
					$('#gallery-video-player').remove();
					$('.gallery-video-player-container').html(
						'<div id="gallery-video-player"></div>'
					);
				}, 550);
			});
	});
})(jQuery);