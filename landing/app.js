const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  siteNav.classList.toggle('open', open);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
    siteNav.classList.remove('open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && siteNav?.classList.contains('open')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    siteNav.classList.remove('open');
    menuToggle.focus();
  }
});

const channelRows = [...document.querySelectorAll('.channel-row')];
channelRows.forEach((row) => {
  const button = row.querySelector('button');
  const content = row.querySelector('.channel-content');
  button.addEventListener('click', () => {
    const nextOpen = button.getAttribute('aria-expanded') !== 'true';
    channelRows.forEach((other) => {
      other.classList.remove('is-open');
      other.querySelector('button').setAttribute('aria-expanded', 'false');
      other.querySelector('.channel-content').hidden = true;
    });
    if (nextOpen) {
      row.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      content.hidden = false;
    }
  });
});

const filmFrame = document.getElementById('film-frame');
const film = document.getElementById('vision-video');
document.getElementById('film-play')?.addEventListener('click', async () => {
  filmFrame.classList.add('playing');
  film.controls = true;
  try {
    await film.play();
  } catch {
    filmFrame.classList.remove('playing');
    film.controls = false;
  }
});
film?.addEventListener('ended', () => {
  filmFrame.classList.remove('playing');
  film.controls = false;
});

document.getElementById('year').textContent = new Date().getFullYear();
