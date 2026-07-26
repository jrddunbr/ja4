const fleet = {
  dbrx1450: {
    type: "01 / LOCOMOTIVE",
    name: "DBRX 1450",
    description: "A 1:8-scale electric mini shunter and the blue road locomotive of Dunbar Rail.",
    specs: [
      ["Type", "Mini Shunter"],
      ["Power type", "Electric"],
      ["Class", "ES-2-500"],
      ["Railroad", "Dunbar Rail"],
      ["Reporting mark", "DBRX"],
      ["Wheel arrangement", "2-2"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Weight", "144 lb"],
      ["Length", "52 in"],
      ["Built", "June 2023"],
      ["Drawbar force", "112 lb"],
      ["Status", "In Service"]
    ]
  },
  flatcar1401: {
    type: "02 / FLATCAR",
    name: "DBRX 1401",
    description: "A 1:8-scale flatcar for Dunbar Rail — also known as Grandma's Porch.",
    specs: [
      ["Type", "Flatcar"],
      ["Class", "JF-01"],
      ["Railroad", "Dunbar Rail"],
      ["Reporting mark", "DBRX"],
      ["Wheel arrangement", "4-4"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Weight", "97 lb"],
      ["Length", "66 in"],
      ["Load length", "61 in"],
      ["Load width", "18 in"],
      ["Built", "March 2023"],
      ["Nickname", "Grandma's Porch"],
      ["Status", "In Service"]
    ]
  },
  gondola1402: {
    type: "03 / MOW GONDOLA",
    name: "DBRX 1402",
    description: "A 1:8-scale maintenance-of-way gondola for the practical work of Dunbar Rail.",
    specs: [
      ["Type", "Gondola"],
      ["Class", "JD-G1"],
      ["Railroad", "Dunbar Rail"],
      ["Reporting mark", "DBRX"],
      ["Wheel arrangement", "4-4"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Status", "DBRX Home Shop Only"]
    ]
  },
  flatcar1403: {
    type: "04 / FLATCAR",
    name: "DBRX 1403",
    description: "A 1:8-scale wooden flatcar in DBRX red, white, and blue.",
    specs: [
      ["Type", "Wooden flatcar"],
      ["Class", "JF-02"],
      ["Railroad", "Dunbar Rail"],
      ["Reporting mark", "DBRX"],
      ["Wheel arrangement", "4-4"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Weight", "73 lb"],
      ["Length", "73 in"],
      ["Load length", "69 in"],
      ["Load width", "14 in"],
      ["Status", "In Service"]
    ]
  },
  ridingcar1404: {
    type: "05 / WOODEN FLATCAR",
    name: "DBRX 1404",
    description: "A 1:8-scale wooden flatcar in DBRX red, white, and blue.",
    specs: [
      ["Type", "Wooden flatcar"],
      ["Class", "JF-02"],
      ["Railroad", "Dunbar Rail"],
      ["Reporting mark", "DBRX"],
      ["Wheel arrangement", "4-4"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Weight", "73 lb"],
      ["Length", "73 in"],
      ["Load length", "69 in"],
      ["Load width", "14 in"],
      ["Status", "In Service"]
    ]
  },
  ridingcar1405: {
    type: "06 / RIDING CAR",
    name: "DBRX 1405",
    description: "A 1:8-scale metal riding car fitted with a seat.",
    specs: [
      ["Type", "Riding car"],
      ["Class", "JR-01"],
      ["Railroad", "Dunbar Rail"],
      ["Reporting mark", "DBRX"],
      ["Wheel arrangement", "4-2"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Weight", "85 lb"],
      ["Length", "50 in"],
      ["Status", "In Service"]
    ]
  },
  gondola1406: { type: "07 / GONDOLA", name: "DBRX 1406", description: "A black gondola joining the DBRX roster.", specs: [["Type", "Gondola"], ["Gauge", '7 1/4 inches'], ["Road", "DBRX"], ["Status", "In service"]] },
  bo1984: { type: "08 / LOCOMOTIVE", name: "B&O 1984", description: "Chessie System power on the DBRX roster.", specs: [["Type", "Locomotive"], ["Gauge", '7 1/4 inches'], ["Road", "B&O Chessie System"], ["Status", "Under Construction"]] },
  nhboxcar: {
    type: "09 / BOXCAR",
    name: "New Haven",
    description: "A 1:8-scale wooden New Haven boxcar for the freight roster.",
    specs: [
      ["Type", "Wooden boxcar"],
      ["Railroad", "New York, New Haven, and Hartford"],
      ["Reporting mark", "NH"],
      ["Wheel arrangement", "4-4"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Weight", "90 lb"],
      ["Length", "67 in"],
      ["Status", "In Service"]
    ]
  },
  chessiecaboose: {
    type: "10 / CABOOSE",
    name: "Chessie Caboose",
    description: "A 1:8-scale wooden B&O caboose that brings up the rear.",
    specs: [
      ["Type", "Wooden caboose"],
      ["Railroad", "Baltimore and Ohio"],
      ["Reporting mark", "B&O"],
      ["Wheel arrangement", "4-4"],
      ["Scale", "1:8"],
      ["Gauge", "7.25 in (1.5 in scale)"],
      ["Length", "65 in"],
      ["Built", "May 2025"],
      ["Status", "In Service"]
    ]
  }
};
const dialog = document.querySelector(".car-dialog");
const detail = document.querySelectorAll(".detail-button");
const modelPanel = document.querySelector(".model-panel");
const splatViewerElement = document.querySelector(".splat-viewer");
const modelPlaceholder = document.querySelector(".model-placeholder");
let splatLoaded = false;

function openCarDetails(carKey) {
  const car = fleet[carKey];
  document.querySelector("#dialog-type").textContent = car.type.replace(/^\d+\s*\/\s*/, "");
  document.querySelector("#dialog-title").textContent = car.name;
  document.querySelector("#dialog-description").textContent = car.description;
  document.querySelector("#dialog-specs").innerHTML = car.specs.map(([term, value]) => `<dt>${term}</dt><dd>${value}</dd>`).join("");
  dialog.showModal();
  if (carKey === "dbrx1450") {
    modelPanel.hidden = false;
    show1450Splat().catch(() => {
      modelPlaceholder.hidden = false;
      splatViewerElement.hidden = true;
    });
  } else {
    modelPanel.hidden = true;
    modelPlaceholder.hidden = false;
    splatViewerElement.hidden = true;
  }
}

async function show1450Splat() {
  if (window.location.protocol === "file:") {
    modelPlaceholder.hidden = false;
    modelPlaceholder.querySelector("p").innerHTML = "3D MODEL<br>OPEN OVER HTTP";
    splatViewerElement.hidden = true;
    return;
  }
  modelPlaceholder.hidden = true;
  splatViewerElement.hidden = false;
  if (splatLoaded) return;

  const { Viewer } = await import("./assets/vendor/gaussian-splats-3d.module.js");
  const splatViewer = new Viewer({
    rootElement: splatViewerElement,
    sharedMemoryForWorkers: false,
    gpuAcceleratedSort: false,
    initialCameraPosition: [0, -0.8, 1.6],
    initialCameraLookAt: [0, 0, 0],
    cameraUp: [0, -1, 0]
  });
  await splatViewer.addSplatScene("./assets/dbrx-1450.ksplat", {
    splatAlphaRemovalThreshold: 5,
    showLoadingUI: false,
    progressiveLoad: true
  });
  splatViewer.start();
  splatLoaded = true;
}

detail.forEach((button) => button.addEventListener("click", (event) => {
  event.stopPropagation();
  openCarDetails(button.dataset.car);
}));
document.querySelectorAll(".railcar-card").forEach((card) => {
  const button = card.querySelector(".detail-button");
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `View details for ${card.querySelector("h3").textContent}`);
  card.addEventListener("click", () => openCarDetails(button.dataset.car));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCarDetails(button.dataset.car);
    }
  });
});
document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
}));
