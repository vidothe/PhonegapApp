jQuery(document).ready(function ($) {

  bindDataString(j_data);

  // promo
  // var curIdx = 0;
  // var liTags = $('.block-1 li');
  
  //   liTags.each(function(idx){
  //   if(idx){
  //     $(this).css('opacity', 0).removeClass('hidden');
  //   }
  //   else{
  //     $(this).css('opacity', 1);
  //   }    
  // });


  // setInterval(function(){
  //   if(liTags.length == 1) return;
  //   liTags.eq(curIdx).animate({
  //     'opacity': 0
  //   }, 350);  
  //   if(liTags.eq(curIdx).find('video').length){
  //     liTags.eq(curIdx).find('video')[0].pause();
  //   }    
  //   if(curIdx >= liTags.length - 1){
  //     curIdx = 0;
  //   }
  //   else {
  //     ++curIdx;
  //   }
  //   liTags.eq(curIdx).animate({
  //     'opacity': 1
  //   }, 350);
    // if(liTags.eq(curIdx).find('video').length){
    //   liTags.eq(curIdx).find('video')[0].play();
    // }
  // }, 2000);

  // another method.
  var liTags = $('#slide li');
  liTags.remove();

  var curIdx = 0;
  liTags.eq(curIdx).appendTo('#slide');

  $('.block-1').click(function(e){

    liTags.eq(curIdx).remove();
    curIdx++;
    if (curIdx > liTags.length - 1){
      curIdx=0;
    }

    liTags.eq(curIdx).appendTo('#slide');
    if(curIdx == liTags.length - 1){
      if ($("#video").get(0).paused) {
        alert('paused play is hited');
       $('#video').get(0).play();
     }
   }
 });
  
  // $('.block-1').click(function(e){
  //   e.preventDefault();
  //   liTags.eq(curIdx).remove();
  //   curIdx++;
  //   if (curIdx > liTags.length - 1){
  //     curIdx=0;
  //   }

  //   liTags.eq(curIdx).appendTo('#slide');
  //   if(curIdx == liTags.length - 1){
  //     $('#video').get(0).play();
  //   }
  // });  

  //   liTags.each(function(idx){
  //   if(idx){
  //     $(this).css('opacity', 0).removeClass('hidden');
  //   }
  //   else{
  //     $(this).css('opacity', 1);
  //   }    
  // });
});
