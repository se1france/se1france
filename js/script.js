document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Load external links from links.json
  fetch('links.json')
    .then(response => response.json())
    .then(data => {
      // Google Form
      const formContainer = document.getElementById('google-form');
      formContainer.innerHTML = `<iframe src="${data.googleFormUrl}" class="w-full h-96" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>`;

      // PayPal Button
      const paypalContainer = document.getElementById('paypal-button');
      paypalContainer.innerHTML = `<a href="${data.paypalDonateUrl}" class="bg-blue-600 text-white py-2 px-4 rounded">Donate Now</a>`;

      // Sermon Zoom Links
      const sermonContainer = document.getElementById('sermon-links');
      sermonContainer.innerHTML = data.sermons.map(sermon => `
        <div class="mb-4">
          <p class="font-bold">${sermon.title} (${sermon.date})</p>
          <a href="${sermon.zoomUrl}" target="_blank" class="text-blue-600">Join on Zoom</a>
        </div>
      `).join('');
    })
    .catch(error => console.error('Error loading links:', error));
});
