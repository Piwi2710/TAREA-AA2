// Datos de ejemplo con propiedad 'url' para la página digital del libro
const BOOKS = [
  {
    id: "1",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    category: "Realismo mágico",
    cover: "w1.jpg",
    synopsis: "La historia multigeneracional de la familia Buendía en Macondo.",
    url: "https://www.secst.cl/upfiles/documentos/19072016_1207am_578dc39115fe9.pdf"
  },
  {
    id: "2",
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    category: "Fábula",
    cover: "wa2.jpg",
    synopsis: "Un piloto conoce a un joven príncipe de otro planeta y aprende sobre la vida.",
    url: "https://digitales.bcn.gob.ar/files/textos/El-Principitocompleto.pdf"
  },
  {
    id: "3",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    category: "Clásico",
    cover: "w2.png",
    synopsis: "Las aventuras de un hidalgo que se cree caballero andante.",
    url: "https://www.imprentanacional.go.cr/editorialdigital/libros/literatura%20universal/quijote_edincr.pdf"
  },
  {
    id: "4",
    title: "Ficciones",
    author: "Jorge Luis Borges",
    category: "Cuento",
    cover: "w3.jpg",
    synopsis: "Relatos que exploran laberintos, bibliotecas infinitas y mundos posibles.",
    url: "https://ddooss.org/libros/Jorge_Luis_Borges_ficciones.pdf"
  },
  {
    id: "6",
    title: "Pedro Páramo",
    author: "Juan Rulfo",
    category: "Novela",
    cover: "w5.png",
    synopsis: "Un viaje onírico por el pueblo de Comala y sus fantasmas.",
    url: "https://web.seducoahuila.gob.mx/biblioweb/upload/Juan%20Rulfo%20-%20Pedro%20P%C3%A1ramo.pdf"
  },
  {
    id: "7",
    title: "La casa de los espíritus",
    author: "Isabel Allende",
    category: "Realismo mágico",
    cover: "w6.jpeg",
    synopsis: "Historia de la familia Trueba a través de generaciones.",
    url: "https://www.suneo.mx/literatura/subidas/Isabel%20Allende%20La%20Casa%20de%20los%20Esp%C3%ADritus.pdf"
  },
  {
    id: "8",
    title: "El Aleph",
    author: "Jorge Luis Borges",
    category: "Cuento",
    cover: "w6.jpg",
    synopsis: "Relatos que muestran puntos de vista infinitos y universos.",
    url: "https://www.ucm.es/data/cont/docs/119-2014-02-11-Borges.El%20Aleph76.pdf"
  },
  {
    id: "9",
    title: "Cumbres borrascosas",
    author: "Emily Brontë",
    category: "Clásico",
    cover: "w7.jpg",
    synopsis: "Una historia intensa de amor y venganza en los páramos.",
    url: "https://www.suneo.mx/literatura/subidas/Charlotte%20Bront%C3%A9%20Cumbres%20Borrascosas.pdf"
  },
  {
    id: "10",
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    category: "Misterio",
    cover: "w8.jpg",
    synopsis: "Un joven descubre un libro que cambiará su vida para siempre.",
    url: "https://moodle2.units.it/pluginfile.php/729086/mod_resource/content/1/Ruiz-Zafon-Carlos-La-Sombra-Del-Viento_54Y.pdf"
  },
  {
    id: "11",
    title: "Ensayo sobre la ceguera",
    author: "José Saramago",
    category: "Novela",
    cover: "w9.jpg",
    synopsis: "Una epidemia de ceguera súbita afecta a una ciudad entera.",
    url: "https://web.seducoahuila.gob.mx/biblioweb/upload/Saramago,%20Jose%20-%20Ensayo%20sobre%20la%20ceguera.pdf"
  },
  {
    id: "12",
    title: "1984",
    author: "George Orwell",
    category: "Distopía",
    cover: "w11.jpg",
    synopsis: "Una sociedad totalitaria donde el gobierno controla todo.",
    url: "https://www.philosophia.cl/biblioteca/orwell/1984.pdf"
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

    // Cursor pointer para indicar clickeable
    card.style.cursor = "pointer";

    // Click en tarjeta para abrir URL digital en pestaña nueva
    card.addEventListener("click", () => {
      if (b.url) {
        window.open(b.url, "_blank");
      }
    });

    // Estado inicial de botones
    if (favoriteSet.has(b.id)) btnFav.classList.add("active");
    if (pendingSet.has(b.id)) btnPend.classList.add("active");

    // Evitar que click en botones active el click en la card
    btnFav.addEventListener("click", (evt) => {
      evt.stopPropagation();
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

    btnPend.addEventListener("click", (evt) => {
      evt.stopPropagation();
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
