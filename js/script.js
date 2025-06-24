document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for index.html
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // Load external links and SEO keywords
  fetch('links.json')
    .then(response => response.json())
    .then(data => {
      // Index page elements
      if (document.getElementById('google-form')) {
        document.getElementById('google-form').innerHTML = `<iframe src="${data.googleFormUrl}" class="w-full h-96" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>`;
      }
      if (document.getElementById('paypal-button')) {
        document.getElementById('paypal-button').innerHTML = `<a href="${data.paypalDonateUrl}" class="bg-blue-600 text-white py-2 px-4 rounded">Donate Now</a>`;
      }
      if (document.getElementById('sermon-links')) {
        document.getElementById('sermon-links').innerHTML = data.sermons.map(sermon => `
          <div class="mb-4">
            <p class="font-bold">${sermon.title} (${sermon.date})</p>
            <a href="${sermon.zoomUrl}" target="_blank" class="text-blue-600">Join on Zoom</a>
          </div>
        `).join('');
      }

      // SEO page: Display keywords
      if (document.getElementById('keyword-list')) {
        document.getElementById('keyword-list').innerHTML = data.seoKeywords.map(keyword => `<li>${keyword}</li>`).join('');
      }

      // SEO page: Add keyword form
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
            alert('Keyword added to display. To make permanent, add to links.json.');
          }
        });
      }
    })
    .catch(error => console.error('Error loading links:', error));
});
