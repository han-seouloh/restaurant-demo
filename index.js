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
  if (menuVisibility) {
    menuVisibility = false;
    menuButton.classList.remove('show-menu');
    citiesMenu.classList.remove('show-menu');
    cities.map(city => {
      city.removeEventListener('click', handleCityClick)
    });
  } else {
    menuVisibility = true;
    menuButton.classList.add('show-menu');
    citiesMenu.classList.add('show-menu');
    cities.map(city => {
      city.setAttribute('data', '0');
    });
    cities.map(city => {
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

  filteredCities.map(city => city.setAttribute('data', '0'));
  filteredMenus.map(menu => menu.setAttribute('data', '0'));
};