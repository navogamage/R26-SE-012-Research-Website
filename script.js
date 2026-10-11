
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (nav) {
  const items = Array.from(nav.querySelectorAll('a[href^="#"]'))
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(item => item.section);
  const header = document.querySelector('.site-header');
  let scheduled = false;

  function updateActiveLink() {
    scheduled = false;
    const offset = (header ? header.offsetHeight : 0) + 16;
    let current = items[0];
    items.forEach(item => {
      if (item.section.getBoundingClientRect().top <= offset) current = item;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = items[items.length - 1];
    }
    items.forEach(item => {
      const active = item === current;
      item.link.classList.toggle('active', active);
      if (active) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
  }

  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateActiveLink);
    }
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  updateActiveLink();
}
if (toggle && nav){
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const open = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      toggle.textContent = '☰';
    });
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .info-panel, .component-card, .timeline-item, .doc-card, .person-card, .contact-grid > div').forEach(element => {
    const siblings = Array.from(element.parentElement.children);
    element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element) % 4, 3) * 70}ms`);
    element.classList.add('reveal');
    observer.observe(element);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
      observer.disconnect();
    }
  });
}

const progress = document.querySelector('.reading-progress');
let progressScheduled = false;
function updateProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${height > 0 ? Math.min(window.scrollY / height, 1) : 0})`;
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 20);
  progressScheduled = false;
}
function scheduleProgress() {
  if (!progressScheduled) {
    progressScheduled = true;
    requestAnimationFrame(updateProgress);
  }
}
window.addEventListener('scroll', scheduleProgress, { passive: true });
window.addEventListener('resize', scheduleProgress);
window.addEventListener('load', scheduleProgress);
updateProgress();

if (toggle && nav) {
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.textContent = '\u2630';
  }
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-label', nav.classList.contains('open') ? 'Close menu' : 'Open menu');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

const contactForm = document.querySelector('#contact-form');
const copyEmailTemplateButton = document.querySelector('#copy-email-template');
const contactFormStatus = document.querySelector('#contact-form-status');

if (contactForm && copyEmailTemplateButton && contactFormStatus) {
  const recipients = [
    'IT22070012@my.sliit.lk',
    'IT22087324@my.sliit.lk',
    'IT22079268@my.sliit.lk',
    'IT22217318@my.sliit.lk'
  ];

  function setContactStatus(message, type = '') {
    contactFormStatus.textContent = message;
    contactFormStatus.classList.toggle('is-success', type === 'success');
    contactFormStatus.classList.toggle('is-error', type === 'error');
  }

  function generateContactEmail() {
    const data = new FormData(contactForm);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const subject = String(data.get('subject')).trim();
    const message = String(data.get('message')).trim();
    const body = [
      'Hello Pepper Care research team,',
      '',
      message,
      '',
      'Kind regards,',
      name,
      email
    ].join('\r\n');
    const mailto = `mailto:${recipients[0]}?cc=${encodeURIComponent(recipients.slice(1).join(','))}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const template = [
      `To: ${recipients.join(', ')}`,
      `Subject: ${subject}`,
      '',
      body
    ].join('\n');
    return { mailto, template };
  }

  function validateContactForm() {
    if (contactForm.reportValidity()) return true;
    setContactStatus('Please complete all fields with a valid email address.', 'error');
    return false;
  }

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateContactForm()) return;
    const { mailto } = generateContactEmail();
    setContactStatus('Email template generated. Your email application should open now; use “Copy template” if it does not.', 'success');
    window.location.href = mailto;
  });

  copyEmailTemplateButton.addEventListener('click', async () => {
    if (!validateContactForm()) return;
    const { template } = generateContactEmail();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(template);
      } else {
        const temporaryField = document.createElement('textarea');
        temporaryField.value = template;
        temporaryField.style.position = 'fixed';
        temporaryField.style.opacity = '0';
        document.body.appendChild(temporaryField);
        temporaryField.select();
        const copied = document.execCommand('copy');
        temporaryField.remove();
        if (!copied) throw new Error('Copy command was unavailable.');
      }
      setContactStatus('Email template copied. Paste it into any email application to contact the team.', 'success');
    } catch {
      setContactStatus('The browser could not access the clipboard. Select “Open email app” instead.', 'error');
    }
  });
}
