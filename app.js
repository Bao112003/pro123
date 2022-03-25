$(document).ready(function(){
    
    // $(function(){
    //     $('ul.navbar-nav li').hover(function(){
    //         //$('#drop' , this).css('display','block');
    //          $(this).children('ul').delay(20).slideDown(200);
    //     }, function(){
    //          $(this).children('ul').delay(20).slideUp(200);
    //     });
    // });
  
        $('ul.navbar-nav li').hover(function(){
          $(this).find('ul').first().stop().toggle(200);
        }, function(){
          $(this).find('ul').stop().hide(200);
        });
    
});

