// import 'lazysizes/plugins/attrchange/ls.attrchange';
// import 'lazysizes/plugins/respimg/ls.respimg';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// import 'lazysizes';

$(document).ready(() => {
  const burger = $('#main-burger');
  const nav = $('#mainNav');
  let currentPage = 'home';
  let nextPage;
  let headerHeight;

  const navControl = () => {

    if(burger.hasClass('burger--active')) {
      nav.removeClass('nav_open');
      burger.removeClass('burger--active');
      $('.arrow').css({'display': 'block'});
    } 
    else {
      burger.addClass('burger--active');
      nav.addClass('nav_open');
      $('.arrow').css({'display': 'none'});
    }
  }

  burger.click(() => {
    navControl();
  });

  $(window).on('resize load', () => {

    if(window.innerWidth > 1000 && nav.hasClass('nav_open')) {
      navControl();
      nav.removeClass('nav_open');
    }

    if($(window).innerWidth() < 800) {
      headerHeight = 80;
    } else {
      headerHeight = 90;
    }
  });

  $(window).on('load', () => {
    $('#companyName').click();
  });

  $('body').on('wheel', function(event) {
    const scrollPosition = ($(window).scrollTop() + headerHeight) / $(window).innerHeight();
    let footerVisiblePos;

    if($(window).innerWidth() < 800) {
      footerVisiblePos = 5.99;
    } else {
      footerVisiblePos = 3.75;
    }

    switch(true) {
      case (scrollPosition > 0 && scrollPosition < 0.5):
        currentPage = 'home';
        showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        tease(true)
      break;
       case (scrollPosition > 0.5 && scrollPosition < 1.4):
        currentPage = 'about';
        showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        tease(false)
      break;
       case (scrollPosition > 1.4 && scrollPosition < 2.3):
        currentPage = 'identify';
        showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        tease(false)
      break;
       case (scrollPosition > 2.3 && scrollPosition < 3.2):
        currentPage = 'guide';
        showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        tease(false)
      break;
       case (scrollPosition > 3.2 && scrollPosition < 3.75):
        currentPage = 'grow';
        showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        tease(false)
      break;
       case (scrollPosition > footerVisiblePos):
        currentPage = 'contact';
        showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        tease(false)
      break;
    }
  });

  const showSelectedLink = (currentLink) => {
    $('.nav_link').each((idx, ele) => {
      $(ele).removeClass('selected');
    });
    currentLink.addClass('selected');
    if(currentLink.attr('data-index') === 'contact') {
      $('.arrow').css({'transform': 'rotate(180deg) translateX(-50%)'});
    } else {
      $('.arrow').css({'transform': 'rotate(0deg) translateX(-50%)'});
    }
  }

  const tease = (hideShow) => {
    if(hideShow && !$('.arrow__tease').hasClass('arrow__tease--show')) {
      $('.arrow__tease').removeClass('arrow__tease--hide');
      $('.arrow__tease').addClass('arrow__tease--show');
    } else if(!hideShow && !$('.arrow__tease').hasClass('arrow__tease--hide')) {
      $('.arrow__tease').removeClass('arrow__tease--show');
      $('.arrow__tease').addClass('arrow__tease--hide');
    }
  }

  $('.arrow').click(() => {

    switch(currentPage) {
      case 'home':
        nextPage = 'about';
        tease(false)
      break;
       case 'about':
        nextPage = 'identify';
        tease(false)
      break;
       case 'identify':
        nextPage = 'guide';
        tease(false)
      break;
       case 'guide':
        nextPage = 'grow';
        tease(false)
      break;
       case 'grow':
        nextPage = 'contact';
        tease(false)
      break;
       case 'contact':
        nextPage = 'home';
        tease(true)
      break;
    }

    if(nextPage === 'home') {
      $('#companyName').click();
    } else {
      $(`.nav_link[data-index=${nextPage}]`).click();
      showSelectedLink($(`.nav_link[data-index=${nextPage}]`));
    }
  });

  $('.nav_link').click((e) => {

    e.preventDefault();
    currentPage = $(e.target).attr('data-index');

    if(burger.hasClass('burger--active')) {
      nav.removeClass('nav_open');
      burger.removeClass('burger--active');
      $('.arrow').css({'display': 'block'});
    } 

    $('html, body').animate({
      scrollTop: $(`#${$(e.target).attr('data-index')}`).offset().top - headerHeight
    }, 
    {
      duration: 1000,
      easing: 'swing',
      complete: () => {}
    });

    showSelectedLink($(e.target));
  });

  // const clickHandler = (ele, event) => {
  //   $(ele).on(event, (e) => {
  //     if(event === 'mouseenter') {
  //       $(e.target).on('mouseleave', (e) => {
  //         $(e.target).removeClass('active');
  //       });
  //     }

  //     let reset = false;
  //     if($(e.target).hasClass('active')) {
  //       reset = true;
  //       $(e.target).removeClass('active');
  //     }
      
  //     $(ele).removeClass('active');

  //     if(reset === false) {
  //       $(e.target).addClass('active');
  //     }
  //   });
  // }

  // let eventType = ('ontouchstart' in window) ? 'click' : 'mouseenter';
  // clickHandler('#guide .panel', eventType);
  // clickHandler('#identify .wrapper', eventType);
});