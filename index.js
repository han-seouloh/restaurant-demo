/*Navigation Bar*/
let scrollDir = 'down';
const threshold = 0;
let lastScrollY = window.pageYOffset;
let ticking = false;

const updateScrollDir = () => {
  const scrollY = window.pageYOffset;

  if (Math.abs(scrollY - lastScrollY) < threshold) {
    ticking = false;
    return;
  }
  scrollDir = (scrollY > lastScrollY ? "down" : "up")
  lastScrollY = scrollY > 0 ? scrollY : 0;
  ticking = false;
};

const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollDir);
    ticking = true;
  }
  if (scrollDir === 'up') {
    document.getElementsByTagName('nav')[0].classList.remove('hide-bar');
  } else if (scrollDir === 'down') {
    document.getElementsByTagName('nav')[0].classList.add('hide-bar');
  };
};

window.addEventListener("scroll", onScroll);

/*Switch Between Pages*/
const jobsButton = document.querySelectorAll("a[href='#bolsa']");
const eventButton = document.querySelector("a[href='#eventos']");
const mainButton = document.querySelector("a[href='#inicio']");
const aboutButton = document.querySelector("a[href='#nosotros']");
const galleryButton = document.querySelector("a[href='#galeria']");
const blogButton = document.querySelector("a[href='#blog']");

const main = [...document.getElementsByTagName('main')];

const handleMainButton = () => {
  main[0].dataset.visibility = 1;
  main[1].dataset.visibility = 0;
};

const handleEventButton = () => {
  main[0].dataset.visibility = 0;
  main[1].dataset.visibility = 1;
};

jobsButton[0].addEventListener('click', handleEventButton);
jobsButton[1].addEventListener('click', handleEventButton);
eventButton.addEventListener('click', handleEventButton);
mainButton.addEventListener('click', handleMainButton);
aboutButton.addEventListener('click', handleMainButton);
galleryButton.addEventListener('click', handleMainButton);
blogButton.addEventListener('click', handleMainButton);

/*Cities Menu Buttons*/
const menuButton = document.getElementsByClassName('menu-button')[0];
const citiesMenu = document.getElementById('menu');
const closeButton = document.getElementById('close-button');
let menuVisibility = false;

const onMenuButtonClick = () => {
  menuButton.classList.toggle('show-menu');
  citiesMenu.classList.toggle('show-menu');
  if (menuVisibility) {
    menuVisibility = false;
    cities.forEach(city => {
      city.removeEventListener('click', handleCityClick)
    });
  } else {
    menuVisibility = true;
    cities.forEach(city => {
      city.setAttribute('data', '0');
    });
    cities.forEach(city => {
      city.addEventListener('click', handleCityClick)
    });
  };
};

menuButton.addEventListener('click', onMenuButtonClick);
closeButton.addEventListener('click', onMenuButtonClick);

/*Cities Menu*/
const cities = [...document.getElementsByClassName('city-selectors')[0].children];
const cityMenus = [...document.getElementsByClassName('city')[0].children]

const handleCityClick = ({target}) => {
  target.setAttribute('data', '1');

  const targetMenu = cityMenus.filter(menu =>
    menu.getAttribute('key') === target.getAttribute('key')
  )[0];
  const filteredCities = cities.filter(city => 
    city.getAttribute('key') !== target.getAttribute('key')
  );
  const filteredMenus = cityMenus.filter(menu =>
    menu.getAttribute('key') !== target.getAttribute('key')
  );

  targetMenu.setAttribute('data', '1');

  filteredCities.forEach(city => city.setAttribute('data', '0'));
  filteredMenus.forEach(menu => menu.setAttribute('data', '0'));
};

/*Dropdown Menus*/
const dropMenus = [...document.getElementsByClassName('select')];

dropMenus.forEach(menu => menu.addEventListener('click', ({ target }) => {
  const filteredMenus = dropMenus.filter(menu => 
    menu.parentElement.getAttribute('key') !== target.parentElement.getAttribute('key')
  );
  const options = [...target.parentElement.children[1].children[0].children];


  if (target.parentElement.getAttribute('data') === '0'){
    target.parentElement.setAttribute('data', '1');
    filteredMenus.forEach(menu => menu.parentElement.setAttribute('data', '0'));
    options.forEach(option => option.addEventListener('click', handleOptionClick = () => {
      target.children[0].innerHTML = option.innerHTML;
      target.parentElement.setAttribute('data', '0');
    }))
  } else {
    target.parentElement.setAttribute('data', '0');
    options.forEach(option => option.removeEventListener('click', handleOptionClick))
  }
}));

/*About Scroll Animation*/
const aboutSection = document.getElementById('nosotros');

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      [...entry.target.children].forEach(element => element.classList.add('show-about'));
    } else {
      [...entry.target.children].forEach(element => element.classList.remove('show-about'));
    };
  });
},{
  threshold: [0.3],
  rootMargin: '-20%'
});

aboutObserver.observe(aboutSection);

/*Image Gallery 1*/
const galleryContainer = document.getElementsByClassName('gallery-container')[0];

const galleryObserver = new IntersectionObserver(entry => {
  if (entry[0].isIntersecting) {
    entry[0].target.setAttribute('data', '1');
  } else {
    entry[0].target.setAttribute('data', '0');
  }
},{
  threshold: 0.75
});

galleryObserver.observe(galleryContainer)


const leftGalleryIcon = document.getElementById('prev-icon');
const rightGalleryIcon = document.getElementById('next-icon');

const handleGalleryClick = () => {
  const images = [...document.getElementsByClassName('img-container')[0].children];
  images.forEach( image => {
    if (parseInt(image.dataset.order) <= 0) {
      image.dataset.order = 4;
    } else {
      image.dataset.order -= 1;
    };
  });
};

const handleReverseGalleryClick = () => {
  const images = [...document.getElementsByClassName('img-container')[0].children];
  images.forEach( image => {
    if (parseInt(image.dataset.order) >= 4) {
      image.dataset.order = 0;
    } else {
      image.dataset.order = parseInt(image.dataset.order) + 1;
    };
  });
};

rightGalleryIcon.addEventListener('click', handleGalleryClick);
leftGalleryIcon.addEventListener('click', handleReverseGalleryClick);

/*Blog Slider */
const blogSlideShow = document.getElementsByClassName('blog-slide-container')[0];
const blogContainers = [...document.getElementsByClassName('blog-container')];
const firstBlog = blogContainers[0];
const lastBlog = blogContainers[blogContainers.length - 1];
const prevBlog = document.getElementById('prev-blog');
const nextBlog = document.getElementById('next-blog');

const blogObserver = new IntersectionObserver( entry => {
  if (entry[0].isIntersecting) {
    [...entry[0].target.children][0].dataset.visibility = 1;
  } else {
    if (scrollDir === 'down') {
      [...entry[0].target.children][0].dataset.visibility = 2;
    } else {
      [...entry[0].target.children][0].dataset.visibility = 0;
    };
  }
},{
  threshold: 0.4
});

blogObserver.observe(blogSlideShow);

const handlePrevBlog = () => {
  blogContainers.forEach( blog => {
    if (parseInt(blog.dataset.order) >= 2) {
      blog.dataset.order = 0;
    } else {
      blog.dataset.order = parseInt(blog.dataset.order) + 1;
    }
  });
  if (parseInt(firstBlog.dataset.order) === 0) {
    prevBlog.dataset.visibility = 0;
    nextBlog.dataset.visibility = 1;
  } else {
    prevBlog.dataset.visibility = 1;
    nextBlog.dataset.visibility = 1;
  };
};

const handleNextBlog = () => {
  blogContainers.forEach( blog => {
    if (parseInt(blog.dataset.order) <= 0) {
      blog.dataset.order = 2;
    } else {
      blog.dataset.order = parseInt(blog.dataset.order) - 1;
    }
  });
  if (parseInt(lastBlog.dataset.order) === 0) {
    prevBlog.dataset.visibility = 1;
    nextBlog.dataset.visibility = 0;
  } else {
    prevBlog.dataset.visibility = 1;
    nextBlog.dataset.visibility = 1;
  };
};

prevBlog.addEventListener('click', handlePrevBlog);
nextBlog.addEventListener('click', handleNextBlog);

/*Image SlideShow */

const slideContainers = [...document.getElementsByClassName('img-slide')];

const slideAnimation = () => {
  slideContainers.forEach( container => {
    if (parseInt(container.dataset.order) >= 2) {
      container.dataset.order = 0;
    } else {
      container.dataset.order = parseInt(container.dataset.order) + 1;
    };
  });
};

slideContainers.forEach( container => {
  container.addEventListener('transitionend', ({target}) => {  
    if (parseInt(target.dataset.order) >= 2) {
      target.dataset.order = 0;
    } else {
      target.dataset.order = parseInt(target.dataset.order) + 1;
    };
  });
});

slideAnimation();