const siteDataPath = "./assets/data.json";

document.addEventListener("DOMContentLoaded", async () => {
    // Getting Site JSON data
    const siteData = await fetchSiteData();
    if (!siteData) {
        alert("Error: Site Data wasn't found!!");
        return;
    }

    renderButtons(siteData);
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
    const container = document.getElementById("buttons-container");

    Object.values(siteData).forEach(button => {
        const link = document.createElement("a");
        link.href = button.url;
        link.target = "_blank";
        link.className = "button-link";

        const img = document.createElement("img");
        img.src = button.icon;
        img.alt = button.title;

        const span = document.createElement("span");
        span.textContent = button.title;

        link.appendChild(img);
        link.appendChild(span);

        container.appendChild(link);
    });
}

