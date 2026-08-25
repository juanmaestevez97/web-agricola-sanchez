// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Si una foto no carga (ej. viene de un hosting externo que la bloquea),
// la reemplazamos por un placeholder prolijo en vez del ícono roto del navegador.
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'img-fallback';
    placeholder.textContent = img.alt || 'Foto pendiente de subir';
    img.replaceWith(placeholder);
  }, { once: true });
});

// Menú móvil
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Selector de idioma (ES por defecto, EN y PT via translations.js)
function applyLanguage(lang) {
  document.documentElement.lang = lang;

  if (lang !== 'es') {
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
  } else {
    // Volvemos al español recargando el texto original guardado al cargar la página
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.dataset.esOriginal !== undefined) el.textContent = el.dataset.esOriginal;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      if (el.dataset.esOriginalHtml !== undefined) el.innerHTML = el.dataset.esOriginalHtml;
    });
  }

  document.querySelectorAll('.lang-switch__btn').forEach(b => {
    b.classList.toggle('is-active', b.dataset.lang === lang);
  });
  try { localStorage.setItem('site-lang', lang); } catch (e) {}
}

// Guardamos el español original antes de tocar nada
document.querySelectorAll('[data-i18n]').forEach(el => { el.dataset.esOriginal = el.textContent; });
document.querySelectorAll('[data-i18n-html]').forEach(el => { el.dataset.esOriginalHtml = el.innerHTML; });

document.querySelectorAll('.lang-switch__btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

let savedLang = 'es';
try { savedLang = localStorage.getItem('site-lang') || 'es'; } catch (e) {}
applyLanguage(savedLang);
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = form.nombre.value;
  const email = form.email.value;
  const mensaje = form.mensaje.value;
  const asunto = encodeURIComponent(`Consulta desde la web — ${nombre}`);
  const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);
  window.location.href = `mailto:ventas@agricolasanchez.com.ar,juanmestevez@agricolasanchez.com.ar?subject=${asunto}&body=${cuerpo}`;
});
