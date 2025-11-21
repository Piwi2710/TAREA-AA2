// Datos de ejemplo (puedes editar o agregar más)
const BOOKS = [
  {
    id: "1",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    category: "Realismo mágico",
    cover: "w1.jpg",
    synopsis: "La historia multigeneracional de la familia Buendía en Macondo."
  },
  {
    id: "2",
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    category: "Fábula",
    cover: "wa2.jpg",
    synopsis: "Un piloto conoce a un joven príncipe de otro planeta y aprende sobre la vida."
  },
  {
    id: "3",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    category: "Clásico",
    cover: "w2.png",
    synopsis: "Las aventuras de un hidalgo que se cree caballero andante."
  },
  {
    id: "4",
    title: "Ficciones",
    author: "Jorge Luis Borges",
    category: "Cuento",
    cover: "w3.jpg",
    synopsis: "Relatos que exploran laberintos, bibliotecas infinitas y mundos posibles."
  },
    {
    id: "6",
    title: "Pedro Páramo",
    author: "Juan Rulfo",
    category: "Novela",
    cover: "w5.png",
    synopsis: "Un viaje onírico por el pueblo de Comala y sus fantasmas."
  },
  {
    id: "7",
    title: "La casa de los espíritus",
    author: "Isabel Allende",
    category: "Realismo mágico",
    cover: "w6.jpeg",
    synopsis: "Historia de la familia Trueba a través de generaciones."
  },
  {
    id: "8",
    title: "El Aleph",
    author: "Jorge Luis Borges",
    category: "Cuento",
    cover: "w6.jpg",
    synopsis: "Relatos que muestran puntos de vista infinitos y universos."
  },
  {
    id: "9",
    title: "Cumbres borrascosas",
    author: "Emily Brontë",
    category: "Clásico",
    cover: "w7.jpg",
    synopsis: "Una historia intensa de amor y venganza en los páramos."
  },
  {
    id: "10",
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    category: "Misterio",
    cover: "w8.jpg",
    synopsis: "Un joven descubre un libro que cambiará su vida para siempre."
  },
   {
    id: "11",
    title: "Ensayo sobre la ceguera",
    author: "José Saramago",
    category: "Novela",
    cover: "w9.jpg",
    synopsis: "Una epidemia de ceguera súbita afecta a una ciudad entera."
  },
  {
    id: "12",
    title: "1984",
    author: "George Orwell",
    category: "Distopía",
    cover: "w11.jpg",
    synopsis: "Una sociedad totalitaria donde el gobierno controla todo."
  }
];

// Claves para localStorage
const LS_KEYS = {
  favorites: "mibiblio:favorites",
  pending: "mibiblio:pending"
};

// Leer/guardar en localStorage (JSON)
function loadSet(key) {
  const raw = localStorage.getItem(key);
  try { return raw ? new Set(JSON.parse(raw)) : new Set(); }
  catch { return new Set(); }
}
function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

// Estado
let favoriteSet = loadSet(LS_KEYS.favorites);
let pendingSet = loadSet(LS_KEYS.pending);

const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const tabs = document.querySelectorAll(".tab");
const tpl = document.getElementById("bookCardTpl");

// Render tarjetas
function renderBooks(list) {
  booksGrid.innerHTML = "";
  const noResults = document.getElementById("noResults");
  if (noResults) noResults.style.display = list.length === 0 ? "block" : "none";
  list.forEach(b => {
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector(".card");
    const img = node.querySelector(".cover");
    const title = node.querySelector(".title");
    const author = node.querySelector(".author");
    const category = node.querySelector(".category");
    const synopsis = node.querySelector(".synopsis");
    const btnFav = node.querySelector(".btn-fav");
    const btnPend = node.querySelector(".btn-pending");

    img.src = b.cover;
    img.alt = `Portada de ${b.title}`;
    title.textContent = b.title;
    author.textContent = `Autor: ${b.author}`;
    category.textContent = `Categoría: ${b.category}`;
    synopsis.textContent = b.synopsis;

    card.setAttribute("role", "article");
    card.setAttribute("aria-label", "Libro " + b.title);

    // Estado inicial de botones
    if (favoriteSet.has(b.id)) btnFav.classList.add("active");
    if (pendingSet.has(b.id)) btnPend.classList.add("active");

    // Click en favorito
    btnFav.addEventListener("click", () => {
      if (favoriteSet.has(b.id)) {
        favoriteSet.delete(b.id);
        btnFav.classList.remove("active", "pop");
      } else {
        favoriteSet.add(b.id);
        btnFav.classList.add("active", "pop");
        setTimeout(() => btnFav.classList.remove("pop"), 300);
      }
      saveSet(LS_KEYS.favorites, favoriteSet);
    });

    // Click en pendiente
    btnPend.addEventListener("click", () => {
      if (pendingSet.has(b.id)) {
        pendingSet.delete(b.id);
        btnPend.classList.remove("active", "pop");
      } else {
        pendingSet.add(b.id);
        btnPend.classList.add("active", "pop");
        setTimeout(() => btnPend.classList.remove("pop"), 300);
      }
      saveSet(LS_KEYS.pending, pendingSet);
    });

    booksGrid.appendChild(node);
  });
}

// Filtro por búsqueda + pestaña
function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const activeTab = document.querySelector(".tab.active").dataset.filter;

  const filtered = BOOKS.filter(b => {
    const matchesText =
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q);

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "favorites" && favoriteSet.has(b.id)) ||
      (activeTab === "pending" && pendingSet.has(b.id));

    return matchesText && matchesTab;
  });

  renderBooks(filtered);
}

// Eventos
searchInput.addEventListener("input", applyFilters);
tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    applyFilters();
  });
});

// Inicial
renderBooks(BOOKS);

// Enfoca el input al cargar página
window.onload = () => { searchInput.focus(); };
