let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  navbar.classList.toggle('active');
}

const locations = [
  "Pertamina Location 1",
  "Pertamina Location 2",
  "Pertamina Location 3",
  "Pertamina Location 4",
  "Pertamina Location 5",
  "Pertamina Location 6",
  "Pertamina Location 7",
  "Pertamina Location 8",
  "Pertamina Location 9",
  "Pertamina Location 10"
];

function showSuggestions(value) {
  const suggestions = document.querySelector('.suggestions');
  suggestions.innerHTML = '';

  if (value) {
    fetch('/assets/json/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(results => {
        const filteredResults = results.filter(result => result.title.toLowerCase().includes(value.toLowerCase()));

        filteredResults.forEach(result => {
          const div = document.createElement('div');
          div.textContent = result.title;
          div.onclick = () => {
            document.querySelector('.search').value = result.title;
            suggestions.innerHTML = '';
            suggestions.style.display = 'none'; 
          };
          suggestions.appendChild(div);
        });

        suggestions.style.display = filteredResults.length ? 'block' : 'none'; 
      })
      .catch(error => {
        console.error('Error fetching the results:', error);
        suggestions.style.display = 'none'; 
      });
  } else {
    suggestions.style.display = 'none'; 
  }
}

// result
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.endsWith('result.html')) {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('query') || '';

      fetch('/assets/json/data.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(results => {
              const resultContainer = document.querySelector('.featured_listing');

              resultContainer.innerHTML = '';

              const matchingResults = results.filter(result => result.title.toLowerCase().includes(query.toLowerCase()));

              if (!query.trim()) {
                  resultContainer.innerHTML = `
                      <h1>Search Result</h1>
                      <p>Please enter a search query.</p>
                  `;
              } else if (matchingResults.length === 0) {
                  resultContainer.innerHTML = `
                      <h1>Search Result</h1>
                      <p>Sorry, your search for "${query}" did not match any results.</p>
                  `;
              } else {
                  resultContainer.innerHTML = `
                      <h1>Search Result</h1>
                      <div class="row custom-row"></div>
                  `;

                  matchingResults.forEach(matchingResult => {
                      const markup = `
                        <div class="featured_listing_card">
                          <div class="featured_listing_card_info">
                            <img src="${matchingResult.image}" alt="${matchingResult.name}">
                            <div class="property_title">
                              <a href="product.html">${matchingResult.name}</a>
                            </div>
                            <p>${matchingResult.types}</p>
                            <hr>
                            <p>${matchingResult.area}</p>
                            <hr>
                            <p>${matchingResult.facilities}</p>
                            <hr>
                            <p>${matchingResult.others}</p>
                            <hr>
                            <p>${matchingResult.date}</p>
                          </div>
                        </div>`;
                        document.querySelector('.card').insertAdjacentHTML('beforeend', markup);
                  });
              }
          })
          .catch(error => {
              console.error('Error fetching the results:', error);
              const resultContainer = document.querySelector('.featured_listing');
              resultContainer.innerHTML = `
                  <h1>Search Result</h1>
                  <p>Sorry, there was an error fetching the results. Please try again later.</p>
              `;
          });
    }
});

