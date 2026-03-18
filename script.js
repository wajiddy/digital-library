let data = [];

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    displayData(data);
  });

function displayData(items) {
  const container = document.getElementById('container');
  container.innerHTML = '';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.location} - ${item.year}</p>
    `;

    div.onclick = () => {
      alert(
        `${item.name}\n${item.location}\n${item.year}\n\n${item.description}`
      );
    };

    container.appendChild(div);
  });
}

// Search
document.getElementById('search').addEventListener('input', e => {
  const value = e.target.value.toLowerCase();

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(value) ||
    item.location.toLowerCase().includes(value)
  );

  displayData(filtered);
});