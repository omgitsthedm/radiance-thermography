console.log('Build: v6-pastel');
(() => {
  "use strict";

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.textContent = open ? "Close" : "Menu";
    });

    // close menu on link click
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "Menu";
      });
    });
  }

  // ---------- Smooth scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---------- Reveal on scroll (staggered) ----------
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const siblings = Array.from(el.parentElement?.children || []);
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = `${Math.min(idx * 70, 280)}ms`;
      el.classList.add("is-in");
      io.unobserve(el);
    });
  }, { threshold: 0.18 });
  reveals.forEach(el => io.observe(el));

  // ---------- Guided picker ----------
  const recForm = document.getElementById("recForm");
  const recCard = document.getElementById("recCard");
  const recText = document.getElementById("recText");
  const recWhy = document.getElementById("recWhy");
  const recCta = document.getElementById("recCta");
  const whyToggle = document.getElementById("whyToggle");

  const buildRecommendation = (goal, timeline) => {
    // Keep it simple + client-safe. No medical claims.
    if (goal === "baseline") {
      return {
        title: "Baseline / monitoring",
        rec: "Start with a baseline scan so you can track change over time.",
        why: "Baseline scans create a clear starting point for future comparisons. It’s a calm, proactive way to collect information."
      };
    }
    if (goal === "specific") {
      return {
        title: "Focused concern",
        rec: "Choose a focused service for the area you want to review first.",
        why: "A focused scan keeps the visit efficient while still giving you a clear first look at the area you care about most."
      };
    }
    return {
      title: "Full overview",
      rec: "A full body overview is the best choice when you want broader context.",
      why: "This option is designed for clients who want a wider snapshot in one visit, with clear reporting and next steps."
    };
  };

  if (recForm && recCard && recText && recWhy && recCta && whyToggle) {
    recForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const goal = document.getElementById("goal")?.value || "";
      const timeline = document.getElementById("timeline")?.value || "";

      const r = buildRecommendation(goal, timeline);
      recText.textContent = r.rec;
      recWhy.textContent = r.why;

      // Make CTA feel specific without hard-linking to unknown URLs yet
      recCta.textContent = `Book: ${r.title}`;
      recCta.setAttribute("href", "#book");

      recCard.hidden = false;

      // Thermal bloom: one calm pulse when recommendation appears
      recCard.classList.remove("is-hot");
      void recCard.offsetWidth;
      recCard.classList.add("is-hot");
      setTimeout(() => recCard.classList.remove("is-hot"), 2400);

      whyToggle.setAttribute("aria-expanded", "false");
      recWhy.hidden = true;

      // Scroll into view gently
      recCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    whyToggle.addEventListener("click", () => {
      const expanded = whyToggle.getAttribute("aria-expanded") === "true";
      whyToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      recWhy.hidden = expanded;
    });
  }

  // ---------- Locations: city selector + pins ----------
  const cityData = {
    phoenix: {
      name: "Phoenix",
      tag: "Primary",
      address: "PLACEHOLDER: Address or “By appointment only”",
      hours: "PLACEHOLDER: Hours",
      parking: "PLACEHOLDER: Parking / arrival notes"
    },
    scottsdale: {
      name: "Scottsdale",
      tag: "Nearby",
      address: "PLACEHOLDER: Address or “By appointment only”",
      hours: "PLACEHOLDER: Hours",
      parking: "PLACEHOLDER: Parking / arrival notes"
    },
    glendale: {
      name: "Glendale",
      tag: "Nearby",
      address: "PLACEHOLDER: Address or “By appointment only”",
      hours: "PLACEHOLDER: Hours",
      parking: "PLACEHOLDER: Parking / arrival notes"
    },
    peoria: {
      name: "Peoria",
      tag: "Nearby",
      address: "PLACEHOLDER: Address or “By appointment only”",
      hours: "PLACEHOLDER: Hours",
      parking: "PLACEHOLDER: Parking / arrival notes"
    }
  };

  const cityName = document.getElementById("cityName");
  const cityTag = document.getElementById("cityTag");
  const cityAddress = document.getElementById("cityAddress");
  const cityHours = document.getElementById("cityHours");
  const cityParking = document.getElementById("cityParking");
  const cityCard = document.getElementById("cityCard");

  const setActiveCity = (key) => {
    const d = cityData[key] || cityData.phoenix;
    if (cityName) cityName.textContent = d.name;
    if (cityTag) cityTag.textContent = d.tag;
    if (cityAddress) cityAddress.textContent = d.address;
    if (cityHours) cityHours.textContent = d.hours;
    if (cityParking) cityParking.textContent = d.parking;

    // button pressed state
    document.querySelectorAll(".cityChips button").forEach(btn => {
      btn.setAttribute("aria-pressed", btn.dataset.city === key ? "true" : "false");
    });

    // pin state
    document.querySelectorAll(".pin").forEach(pin => pin.classList.remove("is-active"));
    const pin = document.getElementById(`pin-${key}`);
    if (pin) pin.classList.add("is-active");

    // subtle bloom
    if (cityCard) {
      cityCard.classList.remove("is-hot");
      void cityCard.offsetWidth;
      cityCard.classList.add("is-hot");
      setTimeout(() => cityCard.classList.remove("is-hot"), 2400);
    }
  };

  document.querySelectorAll(".cityChips button").forEach(btn => {
    btn.addEventListener("click", () => setActiveCity(btn.dataset.city));
  });

  ["phoenix","scottsdale","glendale","peoria"].forEach(k => {
    const p = document.getElementById(`pin-${k}`);
    if (p) p.addEventListener("click", () => setActiveCity(k));
  });

  setActiveCity("phoenix");

  // ---------- Map toggle on mobile ----------
  const mapCard = document.getElementById("mapCard");
  const mapToggle = document.getElementById("mapToggle");
  if (mapCard && mapToggle) {
    mapToggle.addEventListener("click", () => {
      const collapsed = mapCard.classList.toggle("is-collapsed");
      mapToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
      mapToggle.textContent = collapsed ? "View map" : "Hide map";
    });
  }

  // ---------- Gentle availability micro-rotation ----------
  const nextOpenings = document.getElementById("nextOpenings");
  if (nextOpenings) {
    const phrases = ["this week", "limited spots", "morning openings", "afternoon openings"];
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % phrases.length;
      nextOpenings.innerHTML = `Next openings: <strong>${phrases[i]}</strong>`;
    }, 8200);
  }

  // ---------- Calm tilt (very subtle, premium) ----------
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;
  if (!prefersReducedMotion && canHover) {
    const tiltEls = document.querySelectorAll("[data-tilt]");
    tiltEls.forEach(el => {
      el.style.transformStyle = "preserve-3d";

      const onMove = (ev) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;

        const rx = (-y * 3).toFixed(2);
        const ry = (x * 4).toFixed(2);

        el.style.transform = `translateY(-3px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      };

      const onLeave = () => { el.style.transform = ""; };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    });
  }

  // ---------- Scroll-driven micro-parallax ----------
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const y = window.scrollY || 0;
        const h = Math.max(1, doc.scrollHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, y / h));

        const ambY = (p * 18).toFixed(2);
        const ambX = (Math.sin(p * Math.PI * 2) * 6).toFixed(2);
        const ambO = (0.92 - p * 0.10).toFixed(3);

        const panelY = (p * -10).toFixed(2);

        doc.style.setProperty("--amb-y", `${ambY}px`);
        doc.style.setProperty("--amb-x", `${ambX}px`);
        doc.style.setProperty("--amb-o", `${ambO}`);

        doc.style.setProperty("--panel-y", `${panelY}px`);

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // One-time “awake” cue on first scroll
    const underline = document.querySelector(".heroUnderline");
    let woke = false;
    window.addEventListener("scroll", () => {
      if (woke || !underline) return;
      woke = true;
      underline.classList.add("is-awake");
      setTimeout(() => underline.classList.remove("is-awake"), 1200);
    }, { passive: true });
  }

  // ---------- Section spotlight ----------
  if (!prefersReducedMotion) {
    const sections = Array.from(document.querySelectorAll("section.section"));
    const activate = (target) => {
      sections.forEach(s => s.classList.toggle("is-active", s === target));
    };

    const sectionIO = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target) activate(visible.target);
    }, {
      threshold: [0.18, 0.28, 0.38, 0.48, 0.58, 0.68]
    });

    sections.forEach(s => sectionIO.observe(s));
    if (sections[0]) activate(sections[0]);
  }

  // ---------- Sticky CTA: hide near footer to avoid stacking ----------
  const sticky = document.getElementById("stickyCta");
  const footer = document.querySelector("footer");
  if (sticky && footer && "IntersectionObserver" in window) {
    const stickyIO = new IntersectionObserver((entries) => {
      const inFooter = entries.some(e => e.isIntersecting);
      sticky.style.opacity = inFooter ? "0" : "1";
      sticky.style.pointerEvents = inFooter ? "none" : "auto";
    }, { threshold: 0.12 });
    stickyIO.observe(footer);
  }


  // ---------- Header compact on scroll (desktop only) ----------
  const headerEl = document.querySelector(".header");
  const mqDesktop = window.matchMedia("(min-width: 860px)");
  const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lastCompact = false;

  const setCompact = () => {
    if (!headerEl) return;
    if (!mqDesktop.matches) {
      headerEl.classList.remove("is-compact");
      lastCompact = false;
      return;
    }
    const y = window.scrollY || 0;
    const compact = y > 40;
    if (compact !== lastCompact){
      headerEl.classList.toggle("is-compact", compact);
      lastCompact = compact;
    }
  };

  if (!mqReduce.matches){
    window.addEventListener("scroll", setCompact, { passive:true });
    mqDesktop.addEventListener?.("change", setCompact);
    setCompact();
  }

})();