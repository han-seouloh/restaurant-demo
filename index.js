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
    [...entry.target.children].forEach(element => element.classList.toggle('show-about'));
  });
},{
  threshold: [0.33],
  rootMargin: '-25%'
});

aboutObserver.observe(aboutSection);