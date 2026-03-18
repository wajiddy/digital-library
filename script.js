let data = [];

const container = document.getElementById("container");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalInfo = document.getElementById("modal-info");
const modalScan = document.getElementById("modal-scan");
const viewerContainer = document.getElementById("viewer");

fetch("data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Could not load data.json");
    }
    return res.json();
  })
  .then((json) => {
    data = json;
    renderCards(data);
  })
  .catch((err) => {
    console.error(err);
    container.innerHTML = `
      <div style="background:white;padding:20px;border-radius:12px;max-width:700px;margin:20px auto;">
        <h2>Dataset failed to load</h2>
        <p>${err.message}</p>
      </div>
    `;
  });

function renderCards(items) {
  container.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://picsum.photos/seed/fallback/600/400'">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.location} • ${item.year}</p>
        <span class="tag">${item.datasetType}</span>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    container.appendChild(card);
  });
}

function openModal(item) {
  modal.style.display = "block";

  modalImg.src = item.image;
  modalImg.onerror = () => {
    modalImg.src = "https://picsum.photos/seed/fallbackmodal/700/450";
  };

  modalTitle.textContent = item.name;
  modalMeta.textContent = `${item.location} • ${item.year}`;
  modalInfo.textContent = item.description;
  modalScan.textContent = `3D dataset: ${item.datasetType} | Scan notes: ${item.scanNotes}`;

  loadSketchfabViewer(item.embedUrl);
}

function loadSketchfabViewer(embedUrl) {
  viewerContainer.innerHTML = "";

  if (!embedUrl) {
    viewerContainer.innerHTML = `
      <div style="display:flex;height:500px;align-items:center;justify-content:center;color:white;">
        No 3D model available.
      </div>
    `;
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.title = "3D model viewer";
  iframe.frameBorder = "0";
  iframe.allowFullscreen = true;
  iframe.allow =
    "autoplay; fullscreen; xr-spatial-tracking";
  iframe.src = embedUrl;
  iframe.style.width = "100%";
  iframe.style.height = "500px";
  iframe.style.border = "0";
  iframe.style.borderRadius = "16px";

  viewerContainer.appendChild(iframe);
}

function closeModal() {
  modal.style.display = "none";
  viewerContainer.innerHTML = "";
}

searchInput.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(value) ||
    item.location.toLowerCase().includes(value) ||
    item.description.toLowerCase().includes(value)
  );

  renderCards(filtered);
});

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});