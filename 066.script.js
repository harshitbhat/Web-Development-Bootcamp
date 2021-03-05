'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* -------------------------------------------------------------------------- */
/*                              Selecting Element                             */
/* -------------------------------------------------------------------------- */
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(header);
console.log(allSections);

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementById('section--1'));
console.log(document.getElementsByClassName('btn'));

/* -------------------------------------------------------------------------- */
/*                       Creating and inserting elements                      */
/* -------------------------------------------------------------------------- */

//.insertAdjacent -> done in bankist Application

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies to improve your experience with us.  <button class="btn btn--close-cookie">Got it</button>';

// header.prepend(message);
header.append(message);

//header.before(message);
//header.after(message);

// Deleting element

document.querySelector('.btn--close-cookie').addEventListener('click', (e) => {
  message.remove();
});

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).fontFamily);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

//document.documentElement.style.setProperty('--color-primary', '#e76f51');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful Minimalist Logo';

// Also - getAttribute and setAttribute

const twitterLink = document.querySelector('.twitter-link');
console.log(twitterLink.getAttribute('href'));

// Data Attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Dont use .className to set as it will remove all earlier classes.

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  const s1 = section1.getBoundingClientRect();
  console.log(s1);
  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll Position (X/Y)', pageXOffset, pageYOffset);
  console.log(
    'height and width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scroll To
});
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                             TO BE CONTINUED...                             */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
