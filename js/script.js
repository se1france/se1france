document.addEventListener('DOMContentLoaded', () => {
  // Page navigation
  let currentPage = 'home';

  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
      selectedPage.classList.add('active');
      currentPage = pageId;
    }
    history.pushState(null, null, `#${pageId}`);
  }

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1) || 'home';
    showPage(hash);
  });

  // Initialize page
  window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'home';
    showPage(hash);
  });

  // Mobile menu toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  mobileMenu.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // Responsive menu
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.style.display = 'flex';
      mobileMenu.classList.add('hidden');
    } else {
      navMenu.style.display = 'none';
      mobileMenu.classList.remove('hidden');
    }
  });

  // Load external links
  fetch('/links.json')
    .then(response => response.json())
    .then(data => {
      if (document.getElementById('paypal-donate-button')) {
        document.getElementById('paypal-donate-button').innerHTML = `<a href="${data.paypalDonateUrl}" class="bg-deep-blue text-white py-2 px-4 rounded hover:bg-vibrant-pink">Faire un Don</a>`;
      }
      if (document.getElementById('paypal-projects-button')) {
        document.getElementById('paypal-projects-button').innerHTML = `<a href="${data.paypalProjectsUrl}" class="bg-deep-blue text-white py-2 px-4 rounded hover:bg-vibrant-pink">Soutenir un Projet</a>`;
      }
      if (document.getElementById('sermon-links')) {
        document.getElementById('sermon-links').innerHTML = data.sermons.map(sermon => `
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-bold">${sermon.title}</h3>
            <p class="text-gray-800">Date : ${sermon.date}</p>
            <a href="${sermon.zoomUrl}" target="_blank" class="text-bright-cyan">Regarder sur Zoom</a>
          </div>
        `).join('');
      }
      if (document.getElementById('keyword-list')) {
        document.getElementById('keyword-list').innerHTML = data.seoKeywords.map(keyword => `<li>${keyword}</li>`).join('');
      }
      const form = document.getElementById('add-keyword-form');
      if (form) {
        form.addEventListener('submit', e => {
          e.preventDefault();
          const newKeyword = document.getElementById('new-keyword').value.trim();
          if (newKeyword) {
            const li = document.createElement('li');
            li.textContent = newKeyword;
            document.getElementById('keyword-list').appendChild(li);
            document.getElementById('new-keyword').value = '';
            alert('Mot-clé ajouté à l\'affichage. Ajoutez à links.json pour permanence.');
          }
        });
      }
    })
    .catch(error => console.error('Erreur chargement liens:', error));
});
