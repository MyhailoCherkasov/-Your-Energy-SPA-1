let mobileMenu = null;
let burgerButton = null;
let closeButton = null;
let overlay = null;

function getPageFromPathname() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('favorites.html') || path.endsWith('/favorites')) return 'favorites';
  return 'home';
}

function setActiveLinks(page) {
  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === page) {
      link.classList.add('header__nav-link--active');
    } else {
      link.classList.remove('header__nav-link--active');
    }
  });

  const mobileNavLinks = document.querySelectorAll('.mobile-menu__nav-link');
  mobileNavLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === page) {
      link.classList.add('mobile-menu__nav-link--active');
    } else {
      link.classList.remove('mobile-menu__nav-link--active');
    }
  });
}

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('is-open');
  if (burgerButton) burgerButton.classList.add('is-hidden');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('is-open');
  if (burgerButton) burgerButton.classList.remove('is-hidden');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

export function initHeader() {
  // set correct active state for current page
  setActiveLinks(getPageFromPathname());

  mobileMenu = document.querySelector('.mobile-menu');
  burgerButton = document.querySelector('.header__burger');
  closeButton = document.querySelector('.mobile-menu__close');
  overlay = document.getElementById('overlay');

  if (burgerButton) burgerButton.addEventListener('click', openMobileMenu);
  if (closeButton) closeButton.addEventListener('click', closeMobileMenu);

  // close mobile menu after navigation click
  const mobileNavLinks = document.querySelectorAll('.mobile-menu__nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  // close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }
}


export function getCurrentPage() {
  return getPageFromPathname();
}
