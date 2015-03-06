$(document).ready(function(e) {
	$('#select-distance').selectmenu();
	
	
	//Price range 
		$( "#slider-range" ).slider({
		range: true,
		min: 10,
		max: 200,
		step: 10,
		values: [10,200],
		slide: function( event, ui ){
			$('.sl-from').html(ui.values[0]);
			$('.sl-to').html(ui.values[1]);	
		},//slde:function 
		
	}).slider("pips", { labels: {first:'10 €', last:'200 € + '}}).slider("float", {suffix:' €' });//slider-range
	
	//stars selector
	$(".stars-holder ").hover(function(){},
	function(){
		rating = $('.number-holder').html();
		putHover(rating);
	});
    
	$(".stars-holder > a").hover(function(e) {
		var rating = $(this).data('rating');
		//$('.number-holder').html(rating);
		putHover(rating);
       
    });
	
	$(".stars-holder > a").click(function(e) {
		var rating = $(this).data('rating');
		$('.number-holder').html(rating);
        return false;
    });
	
	
});//document ready


function putHover(rating){
	$('.stars-holder').css('background-position','center '+ (-26 * rating) + 'px');
	
}//putHover