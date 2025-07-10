window.addEventListener("DOMContentLoaded", function () {
  const repoRoot = "/fortes-kb"; // <- Zet hier je repo folder (zonder slash aan einde!)
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

  // Split het pad, filter lege delen: ['', 'fortes-kb', '20', 'nl', ...] → ['fortes-kb','20','nl',...]
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // Kijk waar repoRoot staat in het pad, om alles robuust te maken
  const repoIdx = pathParts.indexOf(repoRoot.replace("/", ""));
  // Na repoIdx komt [versie, taal, rest...]
  const curVersion = versions.find(v => pathParts[repoIdx + 1] === v) || versions[0];
  const curLang = langs.find(l => pathParts[repoIdx + 2] === l.code)?.code || langs[0].code;
  const rest = pathParts.slice(repoIdx + 3).join("/");

  // Bouw de switchbar HTML
  const bar = document.createElement("div");
  bar.id = "fortes-switchbar";
  bar.innerHTML = `
    <div class="switchbar-inner">
      <select id="fortes-lang-switch" class="switchbar-select" aria-label="Language">
        ${langs.map(l => `<option value="${l.code}" ${l.code===curLang?"selected":""}>${l.name}</option>`).join("")}
      </select>
      <select id="fortes-version-switch" class="switchbar-select" aria-label="Version">
        ${versions.map(v => `<option value="${v}" ${v===curVersion?"selected":""}>${versionLabels[v]}</option>`).join("")}
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
    // Gebruik altijd het juiste root path
    const newPath = `${repoRoot}/${newVersion}/${newLang}` + (rest ? `/${rest}` : '/');
    window.location.pathname = newPath;
  }
  document.getElementById("fortes-version-switch").addEventListener("change", goToDoc);
  document.getElementById("fortes-lang-switch").addEventListener("change", goToDoc);
});
