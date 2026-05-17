const searchInput = document.querySelector("#resourceSearch");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const resources = [...document.querySelectorAll(".resource-item")];

let activeFilter = "all";

function updateResources() {
  if (!searchInput || resources.length === 0) return;

  const query = searchInput.value.trim().toLowerCase();

  resources.forEach((item) => {
    const type = item.dataset.type || "";
    const area = item.dataset.area || "";
    const text = `${item.innerText} ${type} ${area}`.toLowerCase();
    const matchesFilter = activeFilter === "all" || type === activeFilter;
    const matchesSearch = !query || text.includes(query);

    item.classList.toggle("is-hidden", !(matchesFilter && matchesSearch));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((current) => {
      current.classList.toggle("active", current === button);
    });

    updateResources();
  });
});

searchInput?.addEventListener("input", updateResources);
