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
    } 
    else {
      burger.addClass('burger--active');
      nav.addClass('nav_open');
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
    $('.nav_link').get(0).click();
  });

  $('body').on('wheel', function(event) {
    const scrollPosition = ($(window).scrollTop() + headerHeight) / $(window).innerHeight();
 // console.log(scrollPosition, currentPage);
      switch(true) {
        // case (scrollPosition < 3.75):
        //   $('.footer').removeClass('show');
        // break;
        case (scrollPosition > 0 && scrollPosition < 0.5):
          currentPage = 'home';
          showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        break;
         case (scrollPosition > 0.5 && scrollPosition < 1.4):
          currentPage = 'about';
          showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        break;
         case (scrollPosition > 1.4 && scrollPosition < 2.3):
          currentPage = 'identify';
          showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        break;
         case (scrollPosition > 2.3 && scrollPosition < 3.2):
          currentPage = 'guide';
          showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        break;
         case (scrollPosition > 3.2 && scrollPosition < 3.75):
          currentPage = 'grow';
          showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        break;
         case (scrollPosition > 3.75):
          currentPage = 'contact';
          $('.footer').addClass('show');
          showSelectedLink($(`.nav_link[data-index=${currentPage}]`));
        break;
      }
  });

  const showSelectedLink = (currentLink) => {
    $('.nav_link').each((idx, ele) => {
      $(ele).removeClass('selected');
    });
    currentLink.addClass('selected');
  }

  $('.arrow').click(() => {

    switch(currentPage) {
      case 'home':
        nextPage = 'about';
      break;
       case 'about':
        nextPage = 'identify';
      break;
       case 'identify':
        nextPage = 'guide';
      break;
       case 'guide':
        nextPage = 'grow';
      break;
       case 'grow':
        nextPage = 'contact';
      break;
       case 'contact':
        nextPage = 'home';
      break;
    }

    $(`.nav_link[data-index=${nextPage}]`).click();
    showSelectedLink($(`.nav_link[data-index=${nextPage}]`));
  });

  $('.nav_link').click((e) => {

    e.preventDefault();
    currentPage = $(e.target).attr('data-index');

    if(burger.hasClass('burger--active')) {
      nav.removeClass('nav_open');
      burger.removeClass('burger--active');
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
});