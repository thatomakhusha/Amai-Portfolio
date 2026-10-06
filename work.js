/* =========================================================
   SELECTED WORK
   Edit WORK_PROJECTS to add, remove or reorder projects.
   - pages:  one image per page (first image is the card cover)
   - layout: "hero" (2x2), "wide" (2 columns) or omit for a normal card
   Images live in the /work folder next to index.html.
   ========================================================= */

const WORK_PROJECTS = [
    {
        title: "Student Spotlight",
        label: "Editorial Features",
        pages: ["work/student-spotlight.jpeg","work/refilwe-malatji-1.jpeg", "work/refilwe-malatji-2.jpeg"],
        caption: "A PDBY student profile celebrating UP's Refilwe Malatji and the young women redefining pageantry.",
        layout: "hero"
    },
    {
        title: "Event Postors",
        label: "Digital Event Promotion",
        pages: ["work/join-our-team.jpeg", "work/live-broadcast.jpeg", "work/campus-photo-comp.jpeg"],
        caption: "Campaign identity for PDBY's Student Spotlight series, recognising the achievements of UP students."
    },
    {
        title: "Journalism Statement",
        label: "Editorial Communication",
        pages: ["work/journalism-statement.jpeg", "work/if-you-see-something.jpeg"],
        caption: "A social media editorial explaining how every PDBY article is researched, written and illustrated by students."
    },
    {
        title: "87th PDBY Anniversary",
        label: "Digital Campaign",
        pages: ["work/87th-anniversary-1.jpeg", "work/87th-anniversary-1.jpeg"],
        caption: "Promotion for PDBY Media's live coverage of the Q1 Student Forum on 26 March 2026."
    },
    {
        title: "88th Term Editorial",
        label: "Team Communications",
        pages: ["work/editorial-2026-2027.jpeg"],
        caption: "Announcement of the 2026/2027 PDBY Media editorial team."
    },
    {
        title: "Content Promotion Posters",
        label: "Content Marketing",
        pages: ["work/news-roundup.jpeg", "work/online-exclusive-articles.jpeg"],
        caption: "Content promotion for PDBY's News Roundup.",
        layout: "wide"
    },
    {
        title: "PDBY Collaborations",
        label: "Partnership Communications",
        pages: ["work/efc-tickets1.jpeg", "work/efc-tickets2.jpeg"],
        caption: "Promotional artwork for the Shoot Your Shot online offer."
    }
];

(function () {
    const grid = document.getElementById("workGrid");
    const modal = document.getElementById("workModal");

    if (!grid || !modal) return;

    const elLabel = document.getElementById("workModalLabel");
    const elTitle = document.getElementById("workModalTitle");
    const elImage = document.getElementById("workModalImage");
    const elCount = document.getElementById("workModalCount");
    const elCaption = document.getElementById("workModalCaption");
    const elNextLink = document.getElementById("workModalNext");
    const btnPrev = document.getElementById("workModalPrev");
    const btnNext = document.getElementById("workModalArrowNext");
    const btnClose = document.getElementById("workModalClose");

    let current = null;
    let page = 0;
    let lastFocused = null;

    /* ---------- helpers ---------- */

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function fullLabel(project) {
        const n = project.pages.length;
        return n > 1 ? `${project.label} · ${n} pages` : project.label;
    }

    /* ---------- build the grid ---------- */

    WORK_PROJECTS.forEach((project, index) => {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "work-card" + (project.layout ? ` work-card--${project.layout}` : "");
        card.setAttribute("aria-label", `Open ${project.title}`);

        card.innerHTML = `
            <img src="${project.pages[0]}" alt="" loading="lazy">
            <span class="work-card-bar">
                <span class="work-card-num">${pad(index + 1)}</span>
                <span class="work-card-text">
                    <span class="work-card-title">${project.title}</span>
                    <span class="work-card-label">${fullLabel(project)}</span>
                </span>
                <span class="work-card-arrow" aria-hidden="true">
                    <i class="fa-solid fa-arrow-right"></i>
                </span>
            </span>
        `;

        card.addEventListener("click", () => openWork(index));
        grid.appendChild(card);
    });

    /* ---------- modal ---------- */

    function renderModal() {
        const total = current.pages.length;

        elLabel.textContent = fullLabel(current);
        elTitle.textContent = current.title;
        elCaption.textContent = current.caption;

        elImage.src = current.pages[page];
        elImage.alt = total > 1
            ? `${current.title}, page ${page + 1} of ${total}`
            : current.title;

        elCount.textContent = `${page + 1} / ${total}`;

        elNextLink.firstChild.textContent = page < total - 1 ? "Next page" : "Back to start";

        modal.classList.toggle("is-single", total === 1);
    }

    function openWork(index) {
        current = WORK_PROJECTS[index];
        page = 0;
        lastFocused = document.activeElement;

        renderModal();

        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        btnClose.focus();
    }

    function closeWork() {
        modal.classList.remove("active");
        document.body.style.overflow = "";

        elImage.src = "";
        current = null;

        if (lastFocused) lastFocused.focus();
    }

    function step(direction) {
        if (!current) return;

        const total = current.pages.length;

        if (total < 2) return;

        page = (page + direction + total) % total;
        renderModal();
    }

    btnPrev.addEventListener("click", () => step(-1));
    btnNext.addEventListener("click", () => step(1));
    elNextLink.addEventListener("click", () => step(1));
    btnClose.addEventListener("click", closeWork);

    /* click on the dark backdrop closes */
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeWork();
    });

    /* keyboard: Esc closes, arrows page */
    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("active")) return;

        if (event.key === "Escape") closeWork();
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
    });
})();