const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

// Function to display prophets
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {

    // Create elements
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthdate = document.createElement('p');
    let birthplace = document.createElement('p');

    // Build the heading
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the image
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

  // Build Date of Birth and Place
    birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Add elements to the card
    card.appendChild(fullName);
    card.appendChild(birthdate);
    card.appendChild(birthplace);
    card.appendChild(portrait);
    

    // Add the card to the cards div
    cards.appendChild(card);
  });
};

// Fetch prophet data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();

  // Display prophets
  displayProphets(data.prophets);
}

getProphetData();