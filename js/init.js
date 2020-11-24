$(document).ready(function() {

  //owl-carousel
  $('.owl-carousel-3').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    pagination: false,
    dots: false,
    autoplay: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1400: {
        items: 3
      }
    }
  });

  $('.owl-carousel-5').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    dots: false,
    autoplay: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 3
      },
      1280: {
        items: 4
      },
      1400: {
        items: 5
      }
    }
  });

  //Lightbox gallery
  $('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    mainClass: 'mfp-with-zoom',
    preload: [1, 3],
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function(openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    },
    tLoading: 'Загружается изображение #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    callbacks: {
      lazyLoad: function(item) {
        console.log(item);
      }
    },
    image: {
      tError: '<a href="%url%">Это изображение #%curr%</a> не может быть отображено.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>Фотоархив УмНяши</small>';
      }

    }
  });


	$('.simple-ajax-popup-align-top').magnificPopup({
		type: 'ajax',
		alignTop: true,
		overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
	});

	$('.simple-ajax-popup').magnificPopup({
		type: 'ajax'
	});



  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

  $('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }

  });

  $('.image-popup-fit-width').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.image-popup-no-margins').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  //Inputmask
  $("#phone").mask("+7 (999) 999-99-99");
  $("#phone1").mask("+7 (999) 999-99-99");

  // Антиспам
  $('.inlineform').append('<input type="hidden" name="org" value="" class="_org">');
  $('.homeform').append('<input type="hidden" name="org" value="" class="_org">');



  //MODx pdoResources Ajax Filter
  var fadeSpeed = 200, // Fade Animation Speed
    ajaxCountSelector = '.ajax-count', // CSS Selector of Items Counter
    ajaxContainerSelector = '.ajax-container', // CSS Selector of Ajax Container
    ajaxItemSelector = '.ajax-item', // CSS Selector of Ajax Item
    ajaxFormSelector = '.ajax-form', // CSS Selector of Ajax Filter Form
    ajaxFormButtonStart = '.ajax-start', // CSS Selector of Button Start Filtering
    ajaxFormButtonReset = '.ajax-reset', // CSS Selector of Button Reset Ajax Form
    sortDownText = 'По убыванию',
    sortUpText = 'По возрастанию';

  function ajaxCount() {
    if ($('.ajax-filter-count').length) {
      var count = $('.ajax-filter-count').data('count');
      $(ajaxCountSelector).text(count);
    } else {
      $(ajaxCountSelector).text($(ajaxItemSelector).length);
    }
  }
  ajaxCount();

  function ajaxMainFunction() {
    $.ajax({
      data: $(ajaxFormSelector).serialize()
    }).done(function(response) {
      var $response = $(response);
      $(ajaxContainerSelector).fadeOut(fadeSpeed);
      setTimeout(function() {
        $(ajaxContainerSelector).html($response.find(ajaxContainerSelector).html()).fadeIn(fadeSpeed);
        ajaxCount();
      }, fadeSpeed);
    });
  }

  $(ajaxContainerSelector).on('click', '.ajax-more', function(e) {
    e.preventDefault();
    var offset = $(ajaxItemSelector).length;
    $.ajax({
      data: $(ajaxFormSelector).serialize() + '&offset=' + offset
    }).done(function(response) {
      $('.ajax-more').remove();
      var $response = $(response);
      $response.find(ajaxItemSelector).hide();
      $(ajaxContainerSelector).append($response.find(ajaxContainerSelector).html());
      $(ajaxItemSelector).fadeIn();
    });
  })

  $(ajaxFormButtonStart).click(function(e) {
    e.preventDefault();
    ajaxMainFunction();
  })

  $(ajaxFormButtonReset).click(function(e) {
    e.preventDefault();
    $(ajaxFormSelector).trigger('reset');
    $('input[name=sortby]').val('pagetitle');
    $('input[name=sortdir]').val('asc');
    setTimeout(function() {
      $('[data-sort-by]').data('sort-dir', 'asc').toggleClass('button-sort-asc').text(sortUpText);
    }, fadeSpeed);
    ajaxMainFunction();
    ajaxCount();
  })

  $('' + ajaxFormSelector + ' input').change(function() {
    ajaxMainFunction();
  })

  $('[data-sort-by]').data('sort-dir', 'asc').click(function() {
    var ths = $(this);
    $('input[name=sortby]').val($(this).data('sort-by'));
    $('input[name=sortdir]').val($(this).data('sort-dir'));
    setTimeout(function() {
      $('[data-sort-by]').not(this).toggleClass('button-sort-asc').text(sortUpText);
      ths.data('sort-dir') == 'asc' ? ths.data('sort-dir', 'desc').text(sortDownText) : ths.data('sort-dir', 'asc').text(sortUpText);
      $(this).toggleClass('button-sort-asc');
    }, fadeSpeed);
    ajaxMainFunction();
  });

});
//End reading Function

// Hide all elements with class="containerTab", except for the one that matches the clickable grid column
function openTab(tabName) {
  var i, x;
  x = document.getElementsByClassName("containerTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

(function($) {

  /*--Scroll Back to Top Button Show--*/
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  $('#back-to-top').click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

})(jQuery);

// Плавный скрол от якоря
function slowScroll(id) {
  var offset = 0;
  $('html, body').animate({
    scrollTop: $(id).offset().top - offset
  }, 1000);
  return false;
}

// Youtube iframe
'use strict';

function r(f) {
  /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
}
r(function() {
  if (!document.getElementsByClassName) {
    // Поддержка IE8
    var getElementsByClassName = function(node, classname) {
      var a = [];
      var re = new RegExp('(^| )' + classname + '( |$)');
      var els = node.getElementsByTagName("*");
      for (var i = 0, j = els.length; i < j; i++)
        if (re.test(els[i].className)) a.push(els[i]);
      return a;
    }
    var videos = getElementsByClassName(document.body, "youtube");
  } else {
    var videos = document.getElementsByClassName("youtube");
  }

  var nb_videos = videos.length;
  for (var i = 0; i < nb_videos; i++) {
    // Находим постер для видео, зная ID нашего видео
    videos[i].style.backgroundImage = 'url(https://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

    // Размещаем над постером кнопку Play, чтобы создать эффект плеера
    var play = document.createElement("div");
    play.setAttribute("class", "play");
    videos[i].appendChild(play);

    videos[i].onclick = function() {
      // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
      var iframe = document.createElement("iframe");
      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
      if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
      iframe.setAttribute("src", iframe_url);
      iframe.setAttribute("frameborder", '0');
      iframe.setAttribute("allowfullscreen", 'allowfullscreen');

      // Высота и ширина iFrame будет как у элемента-родителя
      iframe.style.width = this.style.width;
      iframe.style.height = this.style.height;

      // Заменяем начальное изображение (постер) на iFrame
      this.parentNode.replaceChild(iframe, this);
    }
  }
});
