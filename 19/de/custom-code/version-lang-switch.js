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

  // Huidige pad uitlezen
  function getCurrentParts() {
    return window.location.pathname.split("/").filter(Boolean);
  }

  // Vind huidige versie en taal
  function getCurVersion(parts) {
    return versions.find(v => parts[0] === v) || versions[0];
  }
  function getCurLang(parts) {
    return langs.find(l => parts[1] === l.code)?.code || langs[0].code;
  }

  // Switchbar maken
  const pathParts = getCurrentParts();
  const curVersion = getCurVersion(pathParts);
  const curLang = getCurLang(pathParts);

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

  // Plaats switchbar onder Material-header
  const header = document.querySelector('.md-header');
  if (header && header.parentNode) {
    header.parentNode.insertBefore(bar, header.nextSibling);
  } else {
    document.body.insertBefore(bar, document.body.firstChild);
  }

  // Switch-functie (altijd uit ACTUEEL pad de subpage halen!)
  function goToDoc() {
    const newVersion = document.getElementById("fortes-version-switch").value;
    const newLang = document.getElementById("fortes-lang-switch").value;
    const parts = getCurrentParts();
    // Sla oude versie+taal over, neem de rest
    const subParts = parts.slice(2);
    let newPath = `/${newVersion}/${newLang}`;
    if (subParts.length) {
      newPath += '/' + subParts.join('/');
    }
    window.location.pathname = newPath;
  }

  document.getElementById("fortes-version-switch").addEventListener("change", goToDoc);
  document.getElementById("fortes-lang-switch").addEventListener("change", goToDoc);
});

