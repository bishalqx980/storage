// gist link instead of local "./assets/data.json";
const siteDataPath = "https://gist.githubusercontent.com/bishalqx980/8a9e7d114cb270f6b104deefd702b6b8/raw/data.json";

document.addEventListener("DOMContentLoaded", async () => {
    const siteData = await fetchSiteData();
    if (!siteData) {
        alert("Error: Site Data wasn't found!!");
        return;
    }

    renderButtons(siteData);
    document.getElementById("year").textContent = new Date().getFullYear();
});

async function fetchSiteData() {
    try {
        const response = await fetch(siteDataPath);
        const siteData = await response.json();
        return siteData;
    } catch (error) {
        alert(error);
        return;
    }
}

function renderButtons(siteData) {
    const container = document.getElementById("content");
    let output = "";

    Object.values(siteData).forEach(button => {
        output += `
            <a href="${button.url}" target="_blank" class="btn-card">
                <img src="${button.icon}" alt="${button.title}">
                <div class="btn-title">${button.title}</div>
            </a>
        `;
    });

    container.innerHTML = output || "<p style='color: var(--muted);'>No data found.</p>";
}