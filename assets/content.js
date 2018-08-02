var $ = require('component-jquery')
  , sections = $('section')
  , timer
  , touch = 'ontouchstart' in window || navigator.msMaxTouchPoints
  , ol = $('<ol id="nav"></ol>');

sections.each(function(){
  var id = $(this).attr('id');
  ol.append('<li><a href="#'+id+'"></a></li>')
})

$(".navbar-nav").find('a').click(function(){
  $('body').css('paddingTop', $('header').height());
  sections.removeClass('sticky');
  var t = $($(this).attr('href')).offset().top;
  $(window).scrollTop(t);
})

ol.find('a').click(function(){
  $('body').css('paddingTop', $('header').height());
  sections.removeClass('sticky');
  var t = $($(this).attr('href')).offset().top;
  $(window).scrollTop(t);
})

$('body').append(ol);

if( touch ){
  $('html').addClass('touch')
} else {
  var wheight = 0;
  $(window).resize(function(){
    wheight = $(window).height()
    sections.removeAttr('style');
    sections.each( function(){
      if($(this).outerHeight() < wheight)
        $(this).css('height',wheight)
    })
    $(window).scroll();
  }).resize();

  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop()
      , padding = np = $('header').height()
      , changed = $();
    $('body').css('paddingTop', padding);
    sections.removeClass('sticky').each( function(){
      var el = $(this)
        , oh = el.outerHeight();
      if(el.offset().top + oh <= wheight + scrollTop) {
        np += oh;
        changed = changed.add(this);
      }
      if(el.offset().top - (oh/2) < scrollTop) {
        var id = el.attr('id');
        $('[href="#'+id+'"]').parent().addClass('active')
        .siblings().removeClass('active');
      }
    })
    if(np != padding) {
      $('body').css('paddingTop', np);
      changed.addClass('sticky');
    }
  }).scroll();
}
