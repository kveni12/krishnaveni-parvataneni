const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

document.body.classList.add("js-enabled");

const revealNodes = document.querySelectorAll(".reveal");
let revealObserver = null;
if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
}

function revealElement(node) {
  if (!node) {
    return;
  }
  if (revealObserver) {
    revealObserver.observe(node);
  } else {
    node.classList.add("visible");
  }
}

revealNodes.forEach((node) => revealElement(node));

const viewButtons = document.querySelectorAll("[data-view-button]");
const viewSections = document.querySelectorAll("[data-view]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

const idToView = {
  about: "overview",
  experience: "experience",
  projects: "projects",
  publications: "publications",
  contact: "contact"
};

function setActiveView(view, shouldReplaceHash = false) {
  viewSections.forEach((section) => {
    const isActive = section.dataset.view === view;
    section.classList.toggle("active", isActive);
    if (isActive) {
      revealElement(section);
    }
  });

  viewButtons.forEach((button) => {
    const isActive = button.dataset.viewButton === view;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  navLinks.forEach((link) => {
    const targetId = (link.getAttribute("href") || "").replace("#", "");
    link.classList.toggle("active", idToView[targetId] === view);
  });

  if (shouldReplaceHash) {
    const idForView = Object.entries(idToView).find((entry) => entry[1] === view)?.[0];
    if (idForView) {
      history.replaceState(null, "", `#${idForView}`);
    }
  }
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveView(button.dataset.viewButton, true);
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = (link.getAttribute("href") || "").replace("#", "");
    const view = idToView[targetId];
    if (!view) {
      return;
    }
    event.preventDefault();
    setActiveView(view, true);
  });
});

const initialId = window.location.hash.replace("#", "");
const initialView = idToView[initialId] || "overview";
setActiveView(initialView, false);

const surpriseButton = document.getElementById("surprise-view");
if (surpriseButton) {
  const availableViews = ["overview", "experience", "projects", "publications", "contact"];
  surpriseButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * availableViews.length);
    setActiveView(availableViews[randomIndex], true);
  });
}

const spotlightButtons = document.querySelectorAll("[data-spotlight-button]");
const spotlightPanes = document.querySelectorAll("[data-spotlight-pane]");

if (spotlightButtons.length > 0 && spotlightPanes.length > 0) {
  function setSpotlight(topic) {
    spotlightButtons.forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-spotlight-button") === topic);
    });
    spotlightPanes.forEach((pane) => {
      pane.classList.toggle("active", pane.getAttribute("data-spotlight-pane") === topic);
    });
  }

  spotlightButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.getAttribute("data-spotlight-button") || "systems";
      setSpotlight(topic);
    });
  });

  setSpotlight("systems");
}

const timelineItems = document.querySelectorAll(".timeline-item");
timelineItems.forEach((item, index) => {
  if (index > 0) {
    item.classList.add("collapsed");
  }
  item.addEventListener("click", () => {
    item.classList.toggle("collapsed");
  });
});

const projectToggles = document.querySelectorAll(".project-toggle");
projectToggles.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const detail = button.parentElement?.querySelector(".project-detail");
    if (!detail) {
      return;
    }
    const nowOpen = !detail.classList.contains("open");
    detail.classList.toggle("open", nowOpen);
    button.textContent = nowOpen ? "Hide impact" : "Show impact";
  });
});

const filterChips = document.querySelectorAll(".filter-chip");
const projectSearch = document.querySelector(".project-search");
const galleryCards = document.querySelectorAll(".gallery-card[data-category]");

if (filterChips.length > 0 && galleryCards.length > 0) {
  let activeFilter = "all";

  function applyProjectFilters() {
    const searchValue = (projectSearch?.value || "").trim().toLowerCase();

    galleryCards.forEach((card) => {
      const category = card.getAttribute("data-category") || "";
      const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();

      const categoryMatch = activeFilter === "all" || category === activeFilter;
      const searchMatch = searchValue.length === 0 || keywords.includes(searchValue);
      card.classList.toggle("hidden", !(categoryMatch && searchMatch));
    });
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.getAttribute("data-filter") || "all";
      filterChips.forEach((node) => {
        node.classList.toggle("active", node === chip);
      });
      applyProjectFilters();
    });
  });

  if (projectSearch) {
    projectSearch.addEventListener("input", () => {
      applyProjectFilters();
    });
  }

  applyProjectFilters();
}
