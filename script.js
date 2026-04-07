const burger = document.getElementById('burger');
const menu = document.getElementById('sideMenu');
const page = document.querySelector('.page');

let overlay = document.querySelector('.menu-overlay');

if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);
}

function openMenu() {
  menu.classList.add('open');
  burger.classList.add('active');
  burger.setAttribute('aria-expanded', 'true');
  overlay.classList.add('open');
  document.body.classList.add('menu-open');

  if (window.innerWidth > 980 && page) {
    page.classList.add('shift');
  } else if (page) {
    page.classList.remove('shift');
  }
}

function closeMenu() {
  menu.classList.remove('open');
  burger.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('open');
  document.body.classList.remove('menu-open');

  if (page) {
    page.classList.remove('shift');
  }
}

function toggleMenu() {
  if (menu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (burger && menu && page) {
  burger.setAttribute('aria-expanded', 'false');

  burger.addEventListener('click', toggleMenu);

  burger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedBurger = burger.contains(event.target);
    const clickedOverlay = overlay.contains(event.target);

    if (!clickedInsideMenu && !clickedBurger && !clickedOverlay && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 980 && page.classList.contains('shift')) {
      page.classList.remove('shift');
    }

    if (window.innerWidth > 980 && menu.classList.contains('open')) {
      page.classList.add('shift');
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}