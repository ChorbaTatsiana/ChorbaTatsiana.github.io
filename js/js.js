

  $('.burger-trigger').click(function(){
    $('.navigation__site').toggleClass('navigation__site-opened');
  })
  $(document).click(function(event) {
      if ($(event.target).closest(".burger-trigger").length > 0) return;
      $('.navigation__site').removeClass('navigation__site-opened');
      event.stopPropagation();
  });

  
  // (function() {
  
  //   function trackScroll() {
  //     var scrolled = window.pageYOffset;
  //     var coords = document.documentElement.clientHeight;
  
  //     if (scrolled > coords) {
  //       goTopBtn.classList.add('back_to_top-show');
  //     }
  //     if (scrolled < coords) {
  //       goTopBtn.classList.remove('back_to_top-show');
  //     }
  //   }
  
  //   function backToTop() {
  //     if (window.pageYOffset > 0) {
  //       window.scrollBy(0, -80);
  //       setTimeout(backToTop, 0);
  //     }
  //   }
  
  //   var goTopBtn = document.querySelector('.back_to_top');
  
  //   window.addEventListener('scroll', trackScroll);
  //   goTopBtn.addEventListener('click', backToTop);
  // })();