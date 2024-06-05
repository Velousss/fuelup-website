document.addEventListener('DOMContentLoaded', function() {
  fetchStations();

  document.getElementById('searchForm').addEventListener('submit', function(e) {
      e.preventDefault();
      fetchStations(e.target.search.value);
  });
});

function fetchStations(searchQuery = '') {
  fetch(`fetch_stations.php?search=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById('listingContainer');
          container.innerHTML = '';
          data.forEach(station => {
              container.innerHTML += `
                  <div class="featured_listing_card">
                      <img src="${station.image_url}" alt="${station.name}">
                      <div class="featured_listing_card_info">
                          <div class="property_title">
                              <a href="product.html">${station.name}</a>
                          </div>
                          <p>${station.services}</p>
                          <hr>
                          <p>Area: ${station.area}</p>
                          <hr>
                          <p>${station.amenities}</p>
                          <hr>
                          <p>${station.safety}</p>
                          <hr>
                          <p>Manager: ${station.manager}, Added: ${station.added_date}</p>
                      </div>
                  </div>`;
          });
      })
      .catch(error => console.error('Error fetching stations:', error));
}