const burger = document.getElementById('burger');
const menu = document.getElementById('sideMenu');
const page = document.querySelector('.page');

function toggleMenu() {
  menu.classList.toggle('open');
  page.classList.toggle('shift');
  burger.classList.toggle('active');
}

if (burger && menu && page) {
  burger.addEventListener('click', toggleMenu);

  burger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  });

  
  document.addEventListener('click', (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedBurger = burger.contains(event.target);

    if (!clickedInsideMenu && !clickedBurger && menu.classList.contains('open')) {
      menu.classList.remove('open');
      page.classList.remove('shift');
      burger.classList.remove('active');
    }
  });
}