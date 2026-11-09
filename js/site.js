/* Youth Development Forum: shared settings, header, contact block, footer
   and page behaviour.

   To change the phone numbers, email, social links or the form setup,
   edit the SITE settings below. Every page uses them. */

const SITE = {
  name: "Youth Development Forum",
  email: "info@youthdevelopmentforum.org",
  phones: [
    { show: "+254 705 624 284", link: "+254705624284" },
    { show: "+254 721 556 239", link: "+254721556239" }
  ],
  whatsapp: "254721556239",
  address: ["Laini Saba, Kibera", "1001-00300 Nairobi, Kenya"],

  // Formspree sends the contact form to your email.
  // 1. Sign up at https://formspree.io with the email that should receive messages
  // 2. Create a form and copy its ID (the letters after /f/ in the endpoint,
  //    for example "xpzkqwer")
  // 3. Paste it between the quotes below.
  formspreeId: "",

  // Paste the full link to each page between the quotes. Empty ones are hidden.
  social: {
    facebook: "",
    youtube: "",
    linkedin: ""
  }
};

const NAV = [
  { href: "about.html", label: "About", page: "about" },
  { href: "projects.html", label: "Projects", page: "projects" },
  { href: "events.html", label: "Events", page: "events" },
  { href: "news.html", label: "News", page: "news" },
  { href: "team.html", label: "Our Team", page: "team" },
  { href: "contact.html", label: "Contact", page: "contact" }
];

const ICONS = {
  menu: '<svg class="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.5V21h3Z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.9 8.6H3.6V20h3.3V8.6ZM5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.5c0-3.1-1.7-5.1-4.4-5.1-1.5 0-2.6.8-3 1.6V8.6H9.8V20h3.3v-5.8c0-1.5.6-2.6 2-2.6s1.9 1 1.9 2.6V20h3.4v-6.5Z"/></svg>',
  chevronLeft: '<svg viewBox="0 0 22 40" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 2 2 20l18 18"/></svg>',
  chevronRight: '<svg viewBox="0 0 22 40" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m2 2 18 18L2 38"/></svg>'
};

/* Turn on animations, unless the visitor's device is set to reduce motion.
   This runs before the page is drawn, so nothing flashes before it animates. */
const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const MOTION = "IntersectionObserver" in window && !REDUCE;
if (MOTION) document.documentElement.classList.add("motion");

/* ---------- Header (drawn straight away so the page doesn't jump) ---------- */
(function renderHeader() {
  const slot = document.getElementById("site-header");
  if (!slot) return;
  const current = document.body.dataset.page;
  const links = NAV.map(n =>
    `<a href="${n.href}"${n.page === current ? ' aria-current="page"' : ""}>${n.label}</a>`
  ).join("");
  slot.outerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="wrap site-header__inner">
        <a class="brand" href="index.html" aria-label="Youth Development Forum, home">
          <img src="assets/img/logo-square.png" alt="" width="256" height="256">
          <span><span class="brand__name">YOUTH DEVELOPMENT FORUM</span><span class="brand__tag">Opportunity for All</span></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">${ICONS.menu}${ICONS.close}<span>Menu</span></button>
        <nav id="site-nav" class="nav" aria-label="Main">
          ${links}
          <a class="btn" href="donate.html"${current === "donate" ? ' aria-current="page"' : ""}>Donate</a>
        </nav>
      </div>
    </header>`;
})();

/* ---------- Contact block and footer ---------- */
function renderFooter() {
  const slot = document.getElementById("site-footer");
  if (!slot) return;
  const social = Object.entries(SITE.social).filter(([, url]) => url);
  const socialHtml = social.length
    ? `<div class="social">${social.map(([name, url]) =>
        `<a href="${url}" aria-label="YDF on ${name[0].toUpperCase() + name.slice(1)}">${ICONS[name]}</a>`).join("")}</div>`
    : "";
  const phones = SITE.phones.map((p, i) =>
    `${i ? "<br>" : "Phone: "}<a href="tel:${p.link}">${p.show}</a>`).join("");
  // the Contact page already shows all of this, so it only gets the footer
  const block = document.body.dataset.page === "contact" ? "" : `
    <section class="contact-block" aria-labelledby="contact-block-title">
      <div class="wrap contact-block__grid">
        <div class="contact-block__main">
          <h2 id="contact-block-title">Contact us</h2>
          <div class="contact-block__cols">
            <div><p>You can contact us through the following channels.</p></div>
            <div><p>${SITE.address.join("<br>")}</p></div>
            <div><p><a href="https://wa.me/${SITE.whatsapp}">WhatsApp us</a> or <a href="contact.html">send a message</a> from our contact page.</p></div>
            <div><p>${phones}</p></div>
          </div>
          <a class="contact-block__email" href="mailto:${SITE.email}">${SITE.email}</a>
          <div class="contact-block__actions">
            <a class="btn btn--white" href="contact.html">Send us a message</a>
            ${socialHtml}
          </div>
        </div>
        <div class="contact-block__logo"><img src="assets/img/logo.png" alt="" width="480" height="480" loading="lazy"></div>
      </div>
    </section>`;
  slot.outerHTML = block + `
    <footer class="site-footer">
      <div class="wrap site-footer__inner">
        <a href="index.html" aria-label="Home"><img src="assets/img/logo-square.png" alt="" width="256" height="256" loading="lazy"></a>
        <nav aria-label="Footer">
          <a href="index.html">Home</a>
          ${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("")}
          <a href="donate.html">Donate</a>
        </nav>
        <span>&copy; ${new Date().getFullYear()} Youth Development Forum, Nairobi, Kenya</span>
      </div>
    </footer>`;
}

/* ---------- Mobile menu ---------- */
function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = header && header.querySelector(".nav-toggle");
  if (!toggle) return;
  const setOpen = open => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("span").textContent = open ? "Close" : "Menu";
  };
  toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  header.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => setOpen(false)));
}

/* ---------- Header shadow once the page is scrolled ---------- */
function initHeaderShadow() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  let ticking = false;
  const update = () => { header.classList.toggle("is-scrolled", window.scrollY > 8); ticking = false; };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---------- Impact numbers count up when they come into view ---------- */
function initCounters() {
  const els = [...document.querySelectorAll("[data-count]")];
  if (!els.length) return;
  const show = (el, n) => {
    const target = +el.dataset.count;
    const value = el.dataset.short && target >= 1000 ? Math.round(n / 1000) + "K" : n.toLocaleString("en-KE");
    el.textContent = value + (el.dataset.suffix || "");
  };
  els.forEach(el => show(el, +el.dataset.count));
  if (!MOTION) return;
  const run = el => {
    const target = +el.dataset.count, start = performance.now(), duration = 1600;
    const tick = now => {
      const p = Math.min(1, (now - start) / duration);
      show(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}

/* ---------- Success stories slider ---------- */
function initSlider() {
  const root = document.querySelector("[data-slider]");
  if (!root) return;
  const slides = [...root.querySelectorAll(".slide")];
  const dotsBox = root.querySelector(".stories__dots");
  const pauseBtn = root.querySelector(".stories__pause");
  let index = 0, timer = null, paused = REDUCE, hovering = false;

  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Show story ${i + 1} of ${slides.length}`);
    b.addEventListener("click", () => { go(i); restart(); });
    dotsBox.appendChild(b);
    return b;
  });
  const go = i => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.classList.toggle("is-active", n === index);
      s.setAttribute("aria-hidden", String(n !== index));
    });
    dots.forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
  };
  const restart = () => {
    clearInterval(timer);
    if (!paused && !hovering) timer = setInterval(() => go(index + 1), 7000);
  };
  root.querySelector(".stories__arrow--prev").addEventListener("click", () => { go(index - 1); restart(); });
  root.querySelector(".stories__arrow--next").addEventListener("click", () => { go(index + 1); restart(); });
  root.addEventListener("mouseenter", () => { hovering = true; restart(); });
  root.addEventListener("mouseleave", () => { hovering = false; restart(); });
  root.addEventListener("focusin", () => { hovering = true; restart(); });
  root.addEventListener("focusout", () => { hovering = false; restart(); });
  const label = () => { pauseBtn.textContent = paused ? "Play" : "Pause"; pauseBtn.setAttribute("aria-label", paused ? "Play the stories" : "Pause the stories"); };
  pauseBtn.addEventListener("click", () => { paused = !paused; label(); restart(); });
  label();
  go(0);
  restart();
}

/* ---------- Copy buttons (Paybill, account numbers) ---------- */
function initCopy() {
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const t = document.createElement("textarea");
        t.value = text; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); } catch (err) { /* ignore */ }
        t.remove();
      }
      const label = btn.textContent;
      btn.textContent = "Copied"; btn.classList.add("is-done");
      setTimeout(() => { btn.textContent = label; btn.classList.remove("is-done"); }, 1800);
    });
  });
}

/* ---------- Share buttons on news articles ---------- */
function initShare() {
  const box = document.querySelector("[data-share]");
  if (!box) return;
  const url = location.href.split("#")[0];
  const title = document.querySelector("h1") ? document.querySelector("h1").textContent.trim() : document.title;
  box.querySelector("[data-share-whatsapp]").href = "https://wa.me/?text=" + encodeURIComponent(title + " " + url);
  box.querySelector("[data-share-facebook]").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
  const copyBtn = box.querySelector("[data-share-copy]");
  copyBtn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(url); } catch (e) { /* ignore */ }
    const label = copyBtn.querySelector("b");
    label.textContent = "Link copied";
    setTimeout(() => { label.textContent = "Copy link"; }, 1800);
  });
}

/* ---------- Forms (sent through Formspree) ---------- */
function initForms() {
  document.querySelectorAll(".js-form").forEach(form => {
    form.setAttribute("novalidate", "");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const button = form.querySelector('[type="submit"]');
      const say = (msg, kind) => { status.textContent = msg; status.className = "form-status is-" + kind; };

      if (!form.checkValidity()) {
        const bad = form.querySelector(":invalid");
        say("Fill in the highlighted field to continue.", "error");
        if (bad) { bad.focus(); bad.reportValidity && bad.reportValidity(); }
        return;
      }
      if (!SITE.formspreeId) {
        say(`This form isn't connected yet, so nothing was sent. Email ${SITE.email} or call ${SITE.phones[0].show} instead.`, "error");
        return;
      }
      const label = button.textContent;
      button.disabled = true; button.textContent = "Sending…";
      try {
        const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
          method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
        });
        if (!res.ok) throw new Error("Formspree " + res.status);
        form.reset();
        say(form.dataset.success || "Message sent. We'll reply soon.", "success");
      } catch (err) {
        say(`Your message didn't send. Check your connection and try again, or call us on ${SITE.phones[0].show}.`, "error");
      } finally {
        button.disabled = false; button.textContent = label;
      }
    });
  });
}

/* ---------- Photo viewer for project photos ---------- */
function initLightbox() {
  const links = [...document.querySelectorAll(".photos a")];
  if (!links.length || typeof HTMLDialogElement !== "function") return;
  const dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.setAttribute("aria-label", "Photo viewer");
  dlg.innerHTML = `<img alt=""><p></p><div class="lightbox__bar">
    <button type="button" data-step="-1">Previous</button>
    <button type="button" data-close>Close</button>
    <button type="button" data-step="1">Next</button></div>`;
  document.body.appendChild(dlg);
  const img = dlg.querySelector("img"), cap = dlg.querySelector("p");
  let index = 0;
  const show = i => {
    index = (i + links.length) % links.length;
    const a = links[index], thumb = a.querySelector("img");
    img.src = a.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    cap.textContent = thumb ? thumb.alt : "";
  };
  links.forEach((a, i) => a.addEventListener("click", e => { e.preventDefault(); show(i); dlg.showModal(); }));
  dlg.addEventListener("click", e => {
    if (e.target === dlg || e.target.hasAttribute("data-close")) dlg.close();
    if (e.target.dataset.step) show(index + Number(e.target.dataset.step));
  });
  dlg.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });
}

/* ---------- Scroll animations: things fade up as they come into view ---------- */
const REVEAL = ".section-title, .head-row, .notice, .stat, .partners li, .card, .event, .post-card, .person, .volunteer, .give__panel, .form-card, .contact-list li, .photos figure, .prose > *, .glance, .related, .share, .cta-band .wrap > *, .who__text > *, .collage, .mv__card, .principle, .wwd__list li, .team-teaser, .way, .events-box, .about-intro > *, .stories";
function initReveal() {
  if (!MOTION) return;
  const items = [...document.querySelectorAll(REVEAL)];
  const counts = new Map();
  items.forEach(el => {
    el.classList.add("rv");
    const i = counts.get(el.parentElement) || 0;
    counts.set(el.parentElement, i + 1);
    el.style.setProperty("--rv-delay", Math.min(i, 5) * 80 + "ms");
  });
  // once it has finished, hand the element back to its normal styles (so hover effects work)
  const done = el => setTimeout(() => el.classList.remove("rv", "is-in"), 800 + parseInt(el.style.getPropertyValue("--rv-delay"), 10));
  let fired = false;
  const io = new IntersectionObserver(entries => {
    fired = true;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.classList.add("is-in");
      done(entry.target);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });
  items.forEach(el => io.observe(el));
  // safety net: if the browser never reports anything (some preview tools), show everything
  setTimeout(() => {
    if (fired || document.visibilityState !== "visible") return;
    io.disconnect();
    items.forEach(el => el.classList.remove("rv", "is-in"));
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderFooter();
  initNav();
  initHeaderShadow();
  initCounters();
  initSlider();
  initCopy();
  initShare();
  initForms();
  initLightbox();
  initReveal();
});
