window.addEventListener("DOMContentLoaded", function () {
  const versions = ["20", "19", "18"];
  const versionLabels = {
    "20": "FCC 20",
    "19": "FCC 19",
    "18": "FCC 18"
  };
  const langs = [
    { code: "nl", name: "Nederlands" },
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" }
  ];

  // Pak het base path (bijv. /fortes-kb/)
  const basePath = window.location.pathname.split('/').slice(0,2).join('/');
  // Alle delen na de base (['19','en',...])
  const pathParts = window.location.pathname.split('/').filter(Boolean).slice(1);

  // Zoek huidige versie en taal in URL
  const curVersion = versions.find(v => pathParts[0] === v) || versions[0];
  const curLang = langs.find(l => pathParts[1] === l.code)?.code || langs[0].code;

  // Het subpad na versie en taal
  const subPath = pathParts.slice(2).join("/");

  // Bouw de switchbar HTML
  const bar = document.createElement("div");
  bar.id = "fortes-switchbar";
  bar.innerHTML = `
    <div class="switchbar-inner">
      <select id="fortes-lang-switch" class="switchbar-select" aria-label="Language">
        ${langs.map(l => `<option value="${l.code}" ${l.code === curLang ? "selected" : ""}>${l.name}</option>`).join("")}
      </select>
      <select id="fortes-version-switch" class="switchbar-select" aria-label="Version">
        ${versions.map(v => `<option value="${v}" ${v === curVersion ? "selected" : ""}>${versionLabels[v]}</option>`).join("")}
      </select>
    </div>
  `;

  // Plaats direct onder Material-header
  const header = document.querySelector('.md-header');
  if (header && header.parentNode) {
    header.parentNode.insertBefore(bar, header.nextSibling);
  } else {
    document.body.insertBefore(bar, document.body.firstChild);
  }

  // Switch-functie (maakt nieuw pad, behoudt subpagina)
  function goToDoc() {
    const newVersion = document.getElementById("fortes-version-switch").value;
    const newLang = document.getElementById("fortes-lang-switch").value;
    let newPath = `${basePath}/${newVersion}/${newLang}`;
    if (subPath) {
      newPath += `/${subPath}`;
    }
    // Forceer trailing slash (optioneel)
    if (!newPath.endsWith('/')) newPath += '/';
    window.location.pathname = newPath;
  }
  document.getElementById("fortes-version-switch").addEventListener("change", goToDoc);
  document.getElementById("fortes-lang-switch").addEventListener("change", goToDoc);
});

