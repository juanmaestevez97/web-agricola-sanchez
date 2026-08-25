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

// Formulario de contacto -> abre el cliente de mail con todo prellenado
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = form.nombre.value;
  const email = form.email.value;
  const mensaje = form.mensaje.value;
  const asunto = encodeURIComponent(`Consulta desde la web — ${nombre}`);
  const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`);
  window.location.href = `mailto:ventas@agricolasanchez.com.ar?subject=${asunto}&body=${cuerpo}`;
});
