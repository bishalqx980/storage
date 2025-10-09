// gist link instead of local "./assets/data.json";
const siteDataPath = "https://gist.githubusercontent.com/bishalqx980/8a9e7d114cb270f6b104deefd702b6b8/raw/data.json";

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("year").textContent = new Date().getFullYear();

    // Temporary sending a loading button until gist data loads
    renderButtons({
        "loading": {
            "icon": "./assets/loading.png",
            "url": "./index.html",
            "title": "Loading Data, Please Wait..."
        }
    });

    const siteData = await fetchSiteData();
    if (siteData) {
        renderButtons(siteData);
    } else {
        return renderButtons({
            "failed": {
                "icon": "./assets/fail.png",
                "url": "./index.html",
                "title": "Failed to load data!!"
            }
        });
    }
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