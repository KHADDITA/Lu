import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

type ServiceCategory = "Pestañas" | "Cejas" | "Promos";

const services: Record<
  ServiceCategory,
  { name: string; detail?: string; duration?: string; price: string; featured?: boolean }[]
> = {
  Pestañas: [
    {
      name: "LIFTING COREANO",
      detail:
        "Incluye limpieza, lifting con técnica coreana, tratamiento intensivo de hidratación y cuidado de la pestaña, tinte + nutrición final.",
      duration: "1:30h",
      price: "$1300",
      featured: true,
    },
    {
      name: "LIFTING TRADICIONAL",
      detail: "Incluye limpieza, lifting, tinte + nutrición reparadora.",
      duration: "1:30h",
      price: "$1000",
    },
  ],
  Cejas: [
    {
      name: "PERFILADO",
      detail: "Incluye limpieza + depilación con pinza.",
      duration: "30min",
      price: "$500",
    },
    {
      name: "PERFILADO + HENNA",
      detail: "Incluye limpieza, depilación con pinza + aplicación de henna.",
      duration: "45min",
      price: "$700",
    },
    {
      name: "LAMINADO",
      detail: "Incluye limpieza, depilación con pinza, laminado, tinte + nutrición final.",
      duration: "1:15h",
      price: "$1000",
    },
  ],
  Promos: [
    {
      name: "PERFILADO + LIFTING TRADICIONAL",
      price: "$1300",
    },
    {
      name: "PERFILADO + LIFTING COREANO",
      price: "$1600",
    },
    {
      name: "PERFILADO + HENNA + LIFTING TRADICIONAL",
      price: "$1500",
    },
    {
      name: "PERFILADO + HENNA + LIFTING COREANO",
      price: "$1800",
    },
    {
      name: "LAMINADO + LIFTING TRADICIONAL",
      price: "$1800",
    },
    {
      name: "LAMINADO + LIFTING COREANO",
      price: "$2100",
    },
  ],
};

const categories: ServiceCategory[] = ["Pestañas", "Cejas", "Promos"];
const phoneHref = "tel:+59895514799";

export function Home() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("Pestañas");
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("LIFTING COREANO");
  const [today, setToday] = useState("");
  const bookingFormAnchor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateHeader = () => setCompact(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const nodes = document.querySelectorAll<HTMLElement>(".jlr-reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -36px 0px" },
      );
      nodes.forEach((node) => observer.observe(node));
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", updateHeader);
      };
    }

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    setToday(localDate);
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("#service-list .jlr-reveal").forEach((node) => {
      node.classList.add("is-visible");
    });
  }, [activeCategory]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseService = (name: string) => {
    setSelectedService(name);
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSubmitted(true);
  };

  const activeServices = services[activeCategory];

  return (
    <main className="jlr-page">
      <style>{`
        .jlr-page {
          --ink: #1c1c1c;
          --paper: #fffef7;
          --sand: #f3efe5;
          --gold: #a98751;
          --gold-light: #d1b987;
          --muted: #716d65;
          --line: rgba(28, 28, 28, .16);
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', 'Plus Jakarta Sans', sans-serif;
          min-height: 100dvh;
          overflow: clip;
          scroll-behavior: smooth;
        }
        .jlr-page *, .jlr-page *::before, .jlr-page *::after { box-sizing: border-box; }
        .jlr-page a { color: inherit; text-decoration: none; }
        .jlr-page button, .jlr-page input, .jlr-page select, .jlr-page textarea { font: inherit; }
        .jlr-page button { color: inherit; }
        .jlr-page :focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; }
        .jlr-page .serif { font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; }
        .jlr-page .eyebrow {
          color: var(--gold); font-size: 10px; font-weight: 600; letter-spacing: .2em;
          line-height: 1.4; text-transform: uppercase;
        }
        .jlr-page .site-nav {
          align-items: center; background: rgba(255,254,247,.94); border-bottom: 1px solid transparent;
          display: flex; height: 88px; justify-content: space-between; left: 0; padding: 0 6.5%;
          position: fixed; right: 0; top: 0; transition: height .35s ease, border-color .35s ease, box-shadow .35s ease;
          z-index: 20; backdrop-filter: blur(16px);
        }
        .jlr-page .site-nav.compact { border-color: rgba(28,28,28,.1); box-shadow: 0 8px 28px rgba(34,29,19,.05); height: 70px; }
        .jlr-page .brand { align-items: center; display: flex; width: 212px; }
        .jlr-page .brand img { display: block; height: 52px; max-height: 58px; object-fit: cover; object-position: center 52%; width: 100%; mix-blend-mode: multiply; }
        .jlr-page .nav-links { align-items: center; display: flex; gap: clamp(22px, 3.4vw, 54px); }
        .jlr-page .nav-links a:not(.nav-book) { font-size: 11px; letter-spacing: .09em; transition: color .2s ease; }
        .jlr-page .nav-links a:not(.nav-book):hover { color: var(--gold); }
        .jlr-page .nav-book {
          align-items: center; background: var(--ink); color: var(--paper); display: inline-flex; font-size: 10px;
          gap: 18px; letter-spacing: .12em; padding: 15px 18px; text-transform: uppercase; transition: background .2s ease;
        }
        .jlr-page .nav-book:hover { background: #484238; }
        .jlr-page .menu-toggle { background: transparent; border: 0; cursor: pointer; display: none; padding: 10px; }
        .jlr-page .mobile-menu { display: none; }
        .jlr-page .hero {
          display: grid; grid-template-columns: minmax(370px, .89fr) minmax(0, 1.11fr); min-height: 760px;
          padding: 138px 6.5% 74px; position: relative;
        }
        .jlr-page .hero-copy { align-self: center; padding: 18px 0 30px 3.2%; position: relative; z-index: 2; }
        .jlr-page .hero-kicker { align-items: center; display: flex; gap: 12px; margin-bottom: 31px; }
        .jlr-page .hero-kicker::before { background: var(--gold); content: ''; height: 1px; width: 28px; }
        .jlr-page h1 {
          font-size: clamp(62px, 7.4vw, 106px); font-weight: 400; letter-spacing: -.055em; line-height: .82;
          margin: 0; max-width: 610px;
        }
        .jlr-page h1 span { display: block; font-style: italic; font-weight: 300; margin-left: .22em; }
        .jlr-page .hero-subtitle { color: #605c55; font-size: 14px; line-height: 1.9; margin: 32px 0 29px; max-width: 420px; }
        .jlr-page .hero-subtitle strong { color: var(--ink); font-weight: 500; }
        .jlr-page .hero-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 24px; }
        .jlr-page .button-dark, .jlr-page .button-outline {
          align-items: center; cursor: pointer; display: inline-flex; font-size: 10px; gap: 20px;
          justify-content: center; letter-spacing: .12em; min-height: 52px; padding: 0 20px;
          text-transform: uppercase; transition: background .24s ease, color .24s ease, transform .24s ease;
        }
        .jlr-page .button-dark { background: var(--ink); border: 1px solid var(--ink); color: var(--paper); }
        .jlr-page .button-dark:hover { background: #514a3f; border-color: #514a3f; transform: translateY(-2px); }
        .jlr-page .hero-actions .button-dark { background: var(--gold); border-color: var(--gold); color: var(--paper); }
        .jlr-page .hero-actions .button-dark:hover { background: #927243; border-color: #927243; }
        .jlr-page .button-outline { background: transparent; border: 1px solid var(--line); }
        .jlr-page .button-outline:hover { border-color: var(--gold); color: var(--gold); }
        .jlr-page .hero-note { align-items: center; color: var(--muted); display: flex; font-size: 10px; gap: 10px; letter-spacing: .08em; margin-top: 44px; }
        .jlr-page .hero-note svg { color: var(--gold); }
        .jlr-page .hero-visual { align-self: stretch; min-height: 540px; position: relative; }
        .jlr-page .hero-image-wrap { height: 100%; margin-left: 5%; overflow: hidden; position: relative; }
        .jlr-page .hero-image-wrap::after { border: 1px solid rgba(255,254,247,.5); content: ''; inset: 15px; pointer-events: none; position: absolute; }
        .jlr-page .hero-image { height: 100%; inset: 0; object-fit: cover; object-position: 59% center; position: absolute; width: 100%; }
        .jlr-page .hero-vertical { color: var(--muted); font-size: 9px; letter-spacing: .22em; position: absolute; right: -29px; top: 50%; transform: translateY(-50%) rotate(90deg); transform-origin: center; }
        .jlr-page .image-stamp {
          align-items: center; background: var(--paper); bottom: 32px; display: flex; gap: 12px; left: -12px;
          padding: 17px 22px; position: absolute;
        }
        .jlr-page .stamp-mark { align-items: center; border: 1px solid var(--gold-light); border-radius: 50%; color: var(--gold); display: flex; height: 33px; justify-content: center; width: 33px; }
        .jlr-page .image-stamp span { display: block; font-size: 9px; letter-spacing: .13em; text-transform: uppercase; }
        .jlr-page .image-stamp small { color: var(--muted); display: block; font-size: 9px; margin-top: 4px; }
        .jlr-page .hero-bottom {
          align-items: center; bottom: 29px; display: flex; gap: 12px; left: 9.7%; position: absolute;
        }
        .jlr-page .hero-bottom span { color: var(--muted); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; }
        .jlr-page .hero-bottom svg { color: var(--gold); }
        .jlr-page .ticker { background: var(--ink); color: var(--paper); overflow: hidden; padding: 17px 0; }
        .jlr-page .ticker-track { align-items: center; animation: jlr-marquee 32s linear infinite; display: flex; gap: 42px; min-width: max-content; }
        .jlr-page .ticker span { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; }
        .jlr-page .ticker i { color: var(--gold-light); font-size: 14px; font-style: normal; }
        .jlr-page .section-shell { margin: 0 auto; max-width: 1350px; padding-left: 7%; padding-right: 7%; }
        .jlr-page .intro { display: grid; gap: 7%; grid-template-columns: .8fr 1.2fr; padding-bottom: 132px; padding-top: 145px; }
        .jlr-page .intro-aside { align-self: start; padding-top: 10px; }
        .jlr-page .intro-aside .eyebrow { display: block; margin-bottom: 27px; }
        .jlr-page .intro-aside p { color: var(--muted); font-size: 12px; line-height: 1.9; margin: 0; max-width: 235px; }
        .jlr-page .intro-main h2 { font-size: clamp(42px, 5.2vw, 70px); font-weight: 400; letter-spacing: -.045em; line-height: .98; margin: 0; max-width: 730px; }
        .jlr-page .intro-main h2 em { color: var(--gold); font-weight: 300; }
        .jlr-page .intro-bottom { align-items: end; display: flex; gap: 10%; justify-content: space-between; margin-top: 36px; }
        .jlr-page .intro-bottom p { color: var(--muted); font-size: 13px; line-height: 1.9; margin: 0; max-width: 480px; }
        .jlr-page .text-link { align-items: center; border-bottom: 1px solid var(--gold-light); display: inline-flex; flex-shrink: 0; font-size: 10px; gap: 12px; letter-spacing: .11em; padding: 0 0 9px; text-transform: uppercase; transition: gap .2s ease; }
        .jlr-page .text-link:hover { gap: 18px; }
        .jlr-page .services-section { background: var(--sand); padding: 110px 0 124px; }
        .jlr-page .services-head { align-items: end; display: flex; justify-content: space-between; margin-bottom: 42px; }
        .jlr-page .services-head .eyebrow { display: block; margin-bottom: 15px; }
        .jlr-page .services-head h2 { font-size: clamp(48px, 6vw, 76px); font-weight: 400; letter-spacing: -.05em; line-height: .9; margin: 0; }
        .jlr-page .services-head p { color: var(--muted); font-size: 12px; line-height: 1.8; margin: 0 0 4px; max-width: 260px; }
        .jlr-page .service-tabs { border-bottom: 1px solid rgba(28,28,28,.22); display: flex; gap: clamp(22px, 5vw, 70px); margin-bottom: 12px; }
        .jlr-page .service-tab { background: none; border: 0; color: #807b70; cursor: pointer; font-size: 10px; letter-spacing: .16em; padding: 0 0 16px; position: relative; text-transform: uppercase; }
        .jlr-page .service-tab::after { background: var(--gold); bottom: -1px; content: ''; height: 2px; left: 0; position: absolute; transform: scaleX(0); transform-origin: left; transition: transform .25s ease; width: 100%; }
        .jlr-page .service-tab.active { color: var(--ink); }
        .jlr-page .service-tab.active::after { transform: scaleX(1); }
        .jlr-page .service-list { min-height: 345px; }
        .jlr-page .service-row { align-items: center; border-bottom: 1px solid rgba(28,28,28,.13); display: grid; gap: 22px; grid-template-columns: 1fr minmax(180px, .82fr) 75px 100px; padding: 24px 0; }
        .jlr-page .service-row.featured { background: rgba(255,254,247,.52); margin: 0 -20px; padding-left: 20px; padding-right: 20px; }
        .jlr-page .service-row.compact { grid-template-columns: minmax(0, 1fr) auto; }
        .jlr-page .service-row.compact .service-title { grid-column: 1; }
        .jlr-page .service-row.compact .service-price { grid-column: 2; }
        .jlr-page .service-title { align-items: center; display: flex; gap: 13px; }
        .jlr-page .service-index { color: var(--gold); font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; }
        .jlr-page .service-title h3 { font-size: 12px; font-weight: 500; letter-spacing: .12em; margin: 0; }
        .jlr-page .service-title .featured-mark { border: 1px solid var(--gold-light); color: var(--gold); font-size: 8px; letter-spacing: .1em; margin-left: 2px; padding: 4px 6px; }
        .jlr-page .service-description { color: var(--muted); font-size: 11px; line-height: 1.7; margin: 0; max-width: 390px; }
        .jlr-page .service-duration { align-items: center; color: var(--muted); display: flex; font-size: 10px; gap: 7px; white-space: nowrap; }
        .jlr-page .service-duration svg { color: var(--gold); }
        .jlr-page .service-price { align-items: center; display: flex; font-size: 12px; justify-content: space-between; white-space: nowrap; }
        .jlr-page .service-book { background: transparent; border: 0; color: var(--gold); cursor: pointer; display: inline-flex; padding: 7px; transition: transform .2s ease; }
        .jlr-page .service-book:hover { transform: translateX(4px); }
        .jlr-page .services-foot { color: var(--muted); font-size: 10px; margin: 23px 0 0; }
        .jlr-page .booking-section { background: #e9e4d9; padding: 112px 0 120px; }
        .jlr-page .booking-layout { display: grid; gap: 10%; grid-template-columns: .76fr 1.24fr; }
        .jlr-page .booking-intro { padding-top: 19px; }
        .jlr-page .booking-intro .eyebrow { display: block; margin-bottom: 23px; }
        .jlr-page .booking-intro h2 { font-size: clamp(48px, 6vw, 78px); font-weight: 400; letter-spacing: -.06em; line-height: .88; margin: 0; }
        .jlr-page .booking-intro h2 em { color: var(--gold); font-weight: 300; }
        .jlr-page .booking-intro p { color: var(--muted); font-size: 12px; line-height: 1.9; margin: 25px 0 29px; max-width: 300px; }
        .jlr-page .call-card { align-items: center; border-top: 1px solid rgba(28,28,28,.22); display: flex; gap: 14px; max-width: 315px; padding-top: 17px; }
        .jlr-page .call-icon { align-items: center; border: 1px solid var(--gold-light); border-radius: 50%; color: var(--gold); display: flex; height: 37px; justify-content: center; width: 37px; }
        .jlr-page .call-card small { color: var(--muted); display: block; font-size: 9px; letter-spacing: .08em; margin-bottom: 4px; }
        .jlr-page .call-card a { font-size: 12px; letter-spacing: .04em; }
        .jlr-page .booking-form-wrap { background: var(--paper); padding: clamp(23px, 4vw, 48px); }
        .jlr-page .booking-form { display: grid; gap: 19px 18px; grid-template-columns: 1fr 1fr; }
        .jlr-page .field { display: flex; flex-direction: column; gap: 8px; }
        .jlr-page .field.full { grid-column: 1 / -1; }
        .jlr-page .field label { font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        .jlr-page .field input, .jlr-page .field select, .jlr-page .field textarea {
          appearance: none; background: transparent; border: 0; border-bottom: 1px solid rgba(28,28,28,.25);
          border-radius: 0; color: var(--ink); font-size: 12px; min-height: 43px; padding: 9px 2px;
          transition: border-color .2s ease; width: 100%;
        }
        .jlr-page .field input:focus, .jlr-page .field select:focus, .jlr-page .field textarea:focus { border-color: var(--gold); outline: none; }
        .jlr-page .field input::placeholder, .jlr-page .field textarea::placeholder { color: #a39d90; }
        .jlr-page .field textarea { min-height: 64px; resize: vertical; }
        .jlr-page .select-shell { position: relative; }
        .jlr-page .select-shell::after { border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); content: ''; height: 6px; pointer-events: none; position: absolute; right: 4px; top: 16px; transform: rotate(45deg); width: 6px; }
        .jlr-page .form-bottom { align-items: center; display: flex; gap: 16px; grid-column: 1 / -1; justify-content: space-between; margin-top: 5px; }
        .jlr-page .form-disclaimer { color: var(--muted); font-size: 9px; line-height: 1.6; margin: 0; max-width: 260px; }
        .jlr-page .booking-form .button-dark { min-width: 180px; }
        .jlr-page .confirmation {
          align-items: start; animation: jlr-rise .45s ease both; background: #f5f1e7; border-left: 2px solid var(--gold);
          display: flex; gap: 15px; margin-top: 21px; padding: 16px 18px;
        }
        .jlr-page .confirmation-icon { align-items: center; background: var(--gold); border-radius: 50%; color: white; display: flex; flex-shrink: 0; height: 25px; justify-content: center; width: 25px; }
        .jlr-page .confirmation strong { display: block; font-size: 11px; font-weight: 500; margin-bottom: 5px; }
        .jlr-page .confirmation p { color: var(--muted); font-size: 10px; line-height: 1.6; margin: 0; }
        .jlr-page .location { background: var(--paper); padding: 110px 0 0; }
        .jlr-page .location-head { align-items: end; display: flex; justify-content: space-between; margin-bottom: 34px; }
        .jlr-page .location-head .eyebrow { display: block; margin-bottom: 15px; }
        .jlr-page .location-head h2 { font-size: clamp(46px, 5.5vw, 72px); font-weight: 400; letter-spacing: -.05em; line-height: .9; margin: 0; }
        .jlr-page .location-head h2 em { color: var(--gold); font-weight: 300; }
        .jlr-page .location-detail { color: var(--muted); font-size: 11px; line-height: 1.8; }
        .jlr-page .location-detail strong { color: var(--ink); display: block; font-size: 12px; font-weight: 500; }
        .jlr-page .map-frame { border: 0; display: block; filter: grayscale(.72) sepia(.17) contrast(.94); height: 330px; width: 100%; }
        .jlr-page .footer { background: var(--ink); color: var(--paper); padding: 43px 6.5% 31px; }
        .jlr-page .footer-main { align-items: center; display: flex; justify-content: space-between; }
        .jlr-page .footer-brand { background: var(--paper); display: inline-flex; padding: 8px 13px; width: 190px; }
        .jlr-page .footer-brand img { height: 38px; mix-blend-mode: multiply; object-fit: cover; object-position: center 52%; width: 100%; }
        .jlr-page .footer-note { color: rgba(255,254,247,.62); font-family: 'Cormorant Garamond', Georgia, serif; font-size: 21px; font-style: italic; }
        .jlr-page .footer-links { align-items: center; display: flex; gap: 20px; }
        .jlr-page .social-link { align-items: center; border: 1px solid rgba(255,254,247,.3); border-radius: 50%; display: flex; height: 38px; justify-content: center; transition: background .2s ease, border-color .2s ease; width: 38px; }
        .jlr-page .social-link:hover { background: var(--gold); border-color: var(--gold); }
        .jlr-page .footer-bottom { border-top: 1px solid rgba(255,254,247,.18); color: rgba(255,254,247,.5); display: flex; font-size: 9px; justify-content: space-between; letter-spacing: .06em; margin-top: 34px; padding-top: 20px; }
        .jlr-reveal { opacity: 0; transform: translateY(20px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        .jlr-reveal.is-visible { opacity: 1; transform: translateY(0); }
        @keyframes jlr-marquee { to { transform: translateX(-50%); } }
        @keyframes jlr-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) {
          .jlr-page .site-nav { height: 76px; padding: 0 5%; }
          .jlr-page .site-nav.compact { height: 66px; }
          .jlr-page .brand { width: 178px; }
          .jlr-page .nav-links { gap: 20px; }
          .jlr-page .nav-links a:not(.nav-book) { font-size: 10px; }
          .jlr-page .nav-book { gap: 10px; padding: 13px 14px; }
          .jlr-page .hero { grid-template-columns: .9fr 1.1fr; min-height: 680px; padding: 123px 5% 70px; }
          .jlr-page .hero-copy { padding-left: 0; }
          .jlr-page h1 { font-size: clamp(58px, 8vw, 82px); }
          .jlr-page .hero-visual { min-height: 480px; }
          .jlr-page .section-shell { padding-left: 6%; padding-right: 6%; }
          .jlr-page .service-row { gap: 14px; grid-template-columns: 1fr minmax(150px,.9fr) 68px 80px; }
          .jlr-page .service-description { font-size: 10px; }
          .jlr-page .booking-layout { gap: 6%; }
        }
        @media (max-width: 680px) {
          .jlr-page .site-nav { height: 70px; padding: 0 20px; }
          .jlr-page .site-nav.compact { height: 62px; }
          .jlr-page .brand { width: 165px; }
          .jlr-page .brand img { max-height: 48px; }
          .jlr-page .nav-links { display: none; }
          .jlr-page .menu-toggle { align-items: center; display: inline-flex; justify-content: center; }
          .jlr-page .mobile-menu {
            background: var(--paper); display: flex; flex-direction: column; gap: 0; left: 0; max-height: 0;
            overflow: hidden; padding: 0 25px; position: absolute; right: 0; top: 100%; transition: max-height .4s ease, padding .4s ease;
          }
          .jlr-page .mobile-menu.open { border-bottom: 1px solid var(--line); max-height: 300px; padding: 8px 25px 22px; }
          .jlr-page .mobile-menu a { border-bottom: 1px solid rgba(28,28,28,.1); font-size: 12px; letter-spacing: .1em; padding: 15px 0; }
          .jlr-page .mobile-menu a:last-child { border: 0; }
          .jlr-page .hero { display: flex; flex-direction: column; min-height: auto; padding: 116px 20px 70px; }
          .jlr-page .hero-copy { order: 1; padding: 0 0 28px; }
          .jlr-page .hero-kicker { margin-bottom: 25px; }
          .jlr-page h1 { font-size: clamp(62px, 17vw, 88px); max-width: 500px; }
          .jlr-page .hero-subtitle { font-size: 12px; line-height: 1.8; margin: 26px 0 23px; max-width: 360px; }
          .jlr-page .hero-actions { gap: 14px; }
          .jlr-page .button-dark, .jlr-page .button-outline { font-size: 9px; min-height: 48px; padding: 0 14px; }
          .jlr-page .hero-note { margin-top: 25px; }
          .jlr-page .hero-visual { height: min(113vw, 500px); min-height: 0; order: 2; width: calc(100% - 12px); }
          .jlr-page .hero-image-wrap { margin-left: 0; }
          .jlr-page .hero-vertical { display: none; }
          .jlr-page .image-stamp { bottom: 16px; left: -8px; padding: 12px 14px; }
          .jlr-page .hero-bottom { bottom: 23px; left: 22px; }
          .jlr-page .ticker { padding: 14px 0; }
          .jlr-page .ticker-track { gap: 26px; }
          .jlr-page .ticker span { font-size: 8px; }
          .jlr-page .section-shell { padding-left: 23px; padding-right: 23px; }
          .jlr-page .intro { gap: 35px; grid-template-columns: 1fr; padding-bottom: 85px; padding-top: 91px; }
          .jlr-page .intro-aside { display: grid; gap: 18px; grid-template-columns: 1fr 1fr; }
          .jlr-page .intro-aside .eyebrow { margin: 0; }
          .jlr-page .intro-aside p { font-size: 10px; }
          .jlr-page .intro-main h2 { font-size: clamp(43px, 12vw, 60px); }
          .jlr-page .intro-bottom { align-items: start; flex-direction: column; gap: 24px; margin-top: 25px; }
          .jlr-page .intro-bottom p { font-size: 12px; }
          .jlr-page .services-section { padding: 78px 0 82px; }
          .jlr-page .services-head { align-items: start; flex-direction: column; gap: 17px; margin-bottom: 31px; }
          .jlr-page .services-head h2 { font-size: 57px; }
          .jlr-page .services-head p { font-size: 11px; }
          .jlr-page .service-tabs { gap: 27px; margin-bottom: 4px; }
          .jlr-page .service-tab { font-size: 9px; padding-bottom: 13px; }
          .jlr-page .service-list { min-height: 0; }
          .jlr-page .service-row, .jlr-page .service-row.featured {
            align-items: start; gap: 10px 12px; grid-template-columns: 1fr auto; margin: 0; padding: 20px 0;
          }
          .jlr-page .service-title { align-items: start; flex-wrap: wrap; gap: 7px 10px; grid-column: 1; }
          .jlr-page .service-title h3 { font-size: 10px; line-height: 1.55; }
          .jlr-page .service-title .featured-mark { font-size: 7px; }
          .jlr-page .service-description { font-size: 10px; grid-column: 1 / -1; line-height: 1.7; max-width: 100%; order: 3; }
          .jlr-page .service-duration { font-size: 9px; grid-column: 1; grid-row: 2; }
          .jlr-page .service-price { font-size: 11px; grid-column: 2; grid-row: 1 / span 2; gap: 10px; }
          .jlr-page .service-book { padding: 4px 0 4px 6px; }
          .jlr-page .services-foot { font-size: 9px; line-height: 1.6; }
          .jlr-page .booking-section { padding: 79px 0 82px; }
          .jlr-page .booking-layout { gap: 39px; grid-template-columns: 1fr; }
          .jlr-page .booking-intro { padding-top: 0; }
          .jlr-page .booking-intro h2 { font-size: 61px; }
          .jlr-page .booking-intro p { font-size: 11px; margin: 20px 0; }
          .jlr-page .booking-form-wrap { padding: 24px 18px; }
          .jlr-page .booking-form { gap: 17px 14px; }
          .jlr-page .field label { font-size: 8px; }
          .jlr-page .field input, .jlr-page .field select, .jlr-page .field textarea { font-size: 11px; }
          .jlr-page .form-bottom { align-items: stretch; flex-direction: column; }
          .jlr-page .form-disclaimer { max-width: none; order: 2; }
          .jlr-page .booking-form .button-dark { justify-content: space-between; width: 100%; }
          .jlr-page .location { padding-top: 78px; }
          .jlr-page .location-head { align-items: start; flex-direction: column; gap: 20px; margin-bottom: 25px; }
          .jlr-page .location-head h2 { font-size: 58px; }
          .jlr-page .map-frame { height: 280px; }
          .jlr-page .footer { padding: 32px 22px 22px; }
          .jlr-page .footer-main { align-items: start; flex-direction: column; gap: 22px; }
          .jlr-page .footer-brand { width: 170px; }
          .jlr-page .footer-note { font-size: 19px; }
          .jlr-page .footer-links { align-self: end; margin-top: -54px; }
          .jlr-page .footer-bottom { font-size: 8px; gap: 12px; line-height: 1.5; margin-top: 27px; }
        }
        @media (max-width: 390px) {
          .jlr-page .hero-actions { align-items: stretch; flex-direction: column; width: fit-content; }
          .jlr-page .button-outline { justify-content: flex-start; }
          .jlr-page .booking-form { grid-template-columns: 1fr; }
          .jlr-page .field.full { grid-column: auto; }
          .jlr-page .form-bottom { grid-column: auto; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jlr-page *, .jlr-page *::before, .jlr-page *::after {
            animation-duration: .01ms !important; animation-iteration-count: 1 !important;
            scroll-behavior: auto !important; transition-duration: .01ms !important;
          }
          .jlr-reveal { opacity: 1; transform: none; }
        }
      `}</style>

      <header className={`site-nav${compact ? " compact" : ""}`}>
        <a className="brand" href="#inicio" onClick={(e) => { e.preventDefault(); scrollTo("inicio"); }} aria-label="JU's LASH ROOM, inicio">
          <img src="/__mockup/images/jus-lash-room-logo.jpg" alt="JU's LASH ROOM" />
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          <a href="#servicios" onClick={(e) => { e.preventDefault(); scrollTo("servicios"); }}>Servicios</a>
          <a href="#ubicacion" onClick={(e) => { e.preventDefault(); scrollTo("ubicacion"); }}>Ubicación</a>
          <a className="nav-book" href="#reserva" onClick={(e) => { e.preventDefault(); scrollTo("reserva"); }}>Reservar <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
          {menuOpen ? <X size={22} strokeWidth={1.4} /> : <Menu size={23} strokeWidth={1.4} />}
        </button>
        <nav className={`mobile-menu${menuOpen ? " open" : ""}`} aria-label="Navegación móvil" aria-hidden={!menuOpen}>
          <a tabIndex={menuOpen ? 0 : -1} href="#servicios" onClick={(e) => { e.preventDefault(); scrollTo("servicios"); }}>Servicios</a>
          <a tabIndex={menuOpen ? 0 : -1} href="#ubicacion" onClick={(e) => { e.preventDefault(); scrollTo("ubicacion"); }}>Ubicación</a>
          <a tabIndex={menuOpen ? 0 : -1} href="#reserva" onClick={(e) => { e.preventDefault(); scrollTo("reserva"); }}>Reservá tu turno <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="hero-kicker eyebrow">Un momento para vos · Montevideo</div>
          <h1 className="serif">Lifting <span>coreano</span> y cejas</h1>
          <p className="hero-subtitle">
            Cejas y pestañas. <strong>Laminado | Perfilado | Henna | Lifting.</strong><br />
            Atención personalizada, cuidado y bienestar.
          </p>
          <div className="hero-actions">
            <a className="button-dark" href="#reserva" onClick={(e) => { e.preventDefault(); scrollTo("reserva"); }}>Reserva tu turno <ArrowUpRight size={15} /></a>
            <a className="button-outline" href="#servicios" onClick={(e) => { e.preventDefault(); scrollTo("servicios"); }}>Ver servicios <ArrowDown size={14} /></a>
          </div>
          <div className="hero-note"><Sparkles size={14} strokeWidth={1.5} /> Un espacio pensado para bajar el ritmo</div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img className="hero-image" src="/__mockup/images/jus-lash-room-model.jpeg" alt="Modelo de JU’s LASH ROOM mostrando una mirada natural" fetchPriority="high" />
          </div>
          <div className="image-stamp">
            <div className="stamp-mark"><Sparkles size={15} strokeWidth={1.3} /></div>
            <div><span>Tu pausa de cuidado</span><small>Parque Rodó · Montevideo</small></div>
          </div>
          <div className="hero-vertical">BELLEZA EN CALMA — 2025</div>
        </div>
        <div className="hero-bottom"><ArrowDown size={13} /><span>Conocé los servicios</span></div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((repeat) => (
            <span className="ticker-set" key={repeat} style={{ display: "contents" }}>
              <span>Atención personalizada</span><i>✳</i><span>Diseño natural</span><i>✳</i>
              <span>Cuidado y bienestar</span><i>✳</i><span>Parque Rodó, Montevideo</span><i>✳</i>
            </span>
          ))}
        </div>
      </div>

      <section className="intro section-shell">
        <aside className="intro-aside jlr-reveal">
          <span className="eyebrow">La belleza de lo propio</span>
          <p>Un encuentro tranquilo, con tiempo para escucharte y cuidar cada detalle.</p>
        </aside>
        <div className="intro-main jlr-reveal">
          <h2 className="serif">Una mirada más tuya.<br /><em>Un ratito solo tuyo.</em></h2>
          <div className="intro-bottom">
            <p>En JU's LASH ROOM, cada servicio empieza con una conversación. Buscamos realzar lo que ya está ahí, con técnicas cuidadosas y un resultado que se sienta como vos.</p>
            <a className="text-link" href="#servicios" onClick={(e) => { e.preventDefault(); scrollTo("servicios"); }}>Explorá los servicios <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicios">
        <div className="section-shell">
          <div className="services-head jlr-reveal">
            <div><span className="eyebrow">Menú de servicios</span><h2 className="serif">A tu manera.</h2></div>
            <p>Elegí tu momento. Cada propuesta se adapta a tu mirada y a lo que te hace sentir bien.</p>
          </div>
          <div className="service-tabs" role="tablist" aria-label="Categorías de servicios">
            {categories.map((category) => (
              <button
                className={`service-tab${activeCategory === category ? " active" : ""}`}
                key={category}
                type="button"
                role="tab"
                id={`tab-${category.toLowerCase()}`}
                aria-selected={activeCategory === category}
                aria-controls="service-list"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="service-list" id="service-list" role="tabpanel" aria-labelledby={`tab-${activeCategory.toLowerCase()}`}>
            {activeServices.map((service, index) => (
              <article className={`service-row jlr-reveal${service.featured ? " featured" : ""}${!service.detail && !service.duration ? " compact" : ""}`} key={`${activeCategory}-${service.name}`}>
                <div className="service-title">
                  <span className="service-index">0{index + 1}</span>
                  <h3>{service.name}</h3>
                  {service.featured && <span className="featured-mark">FAVORITO</span>}
                </div>
                {service.detail && <p className="service-description">{service.detail}</p>}
                {service.duration && <span className="service-duration"><Clock3 size={13} /> {service.duration}</span>}
                <span className="service-price">{service.price}<button className="service-book" type="button" aria-label={`Consultar por ${service.name}`} onClick={() => { chooseService(service.name); scrollTo("reserva"); }}><ArrowUpRight size={16} /></button></span>
              </article>
            ))}
          </div>
          <p className="services-foot">Los servicios se realizan con atención personalizada. Consultá por disponibilidad y combinaciones.</p>
        </div>
      </section>

      <section className="booking-section" id="reserva">
        <div className="section-shell booking-layout" ref={bookingFormAnchor}>
          <div className="booking-intro jlr-reveal">
            <span className="eyebrow">Tu próximo momento</span>
            <h2 className="serif">Hacemos<br /><em>un espacio.</em></h2>
            <p>Dejanos tus datos y una preferencia. Esta es una solicitud de demostración; coordinamos el turno directamente por teléfono.</p>
            <div className="call-card">
              <span className="call-icon"><Phone size={15} /></span>
              <div><small>Si preferís, llamanos</small><a href={phoneHref}>+598 95 514 799</a></div>
            </div>
          </div>
          <div className="booking-form-wrap jlr-reveal">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="field full">
                <label htmlFor="service-choice">Servicio de interés</label>
                <div className="select-shell">
                  <select id="service-choice" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                    {Object.values(services).flat().map((service) => (
                      <option key={service.name} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="booking-date">Fecha preferida</label>
                <input id="booking-date" name="date" type="date" min={today} required />
              </div>
              <div className="field">
                <label htmlFor="booking-time">Horario preferido</label>
                <div className="select-shell">
                  <select id="booking-time" name="time" defaultValue="" required>
                    <option value="" disabled>Elegí un horario</option>
                    <option>09:00</option><option>10:30</option><option>12:00</option>
                    <option>14:00</option><option>15:30</option><option>17:00</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="booking-name">Nombre completo</label>
                <input id="booking-name" name="name" type="text" placeholder="Tu nombre" autoComplete="name" minLength={3} required />
              </div>
              <div className="field">
                <label htmlFor="booking-phone">Teléfono</label>
                <input id="booking-phone" name="phone" type="tel" placeholder="+598 ..." autoComplete="tel" pattern="[+0-9() -]{8,}" title="Ingresá un teléfono válido" required />
              </div>
              <div className="field full">
                <label htmlFor="booking-comments">Comentarios <span style={{ color: "var(--muted)", letterSpacing: 0, textTransform: "none" }}>(opcional)</span></label>
                <textarea id="booking-comments" name="comments" placeholder="¿Hay algo que te gustaría contarnos?" />
              </div>
              <div className="form-bottom">
                <p className="form-disclaimer">Este formulario es una maqueta: no envía ni guarda tus datos ni confirma un turno.</p>
                <button className="button-dark" type="submit">Solicitar coordinación <ArrowUpRight size={15} /></button>
              </div>
            </form>
            {submitted && (
              <div className="confirmation" role="status" aria-live="polite">
                <span className="confirmation-icon"><Check size={15} /></span>
                <div><strong>Solicitud de demostración preparada</strong><p>Gracias por compartir tu preferencia. En esta maqueta no se envió ni guardó la solicitud. Para coordinar de verdad, llamanos al <a href={phoneHref}>+598 95 514 799</a>.</p></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="location" id="ubicacion">
        <div className="section-shell">
          <div className="location-head jlr-reveal">
            <div><span className="eyebrow">Nos encontramos en</span><h2 className="serif">Parque <em>Rodó.</em></h2></div>
            <div className="location-detail"><strong><MapPin size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px", color: "var(--gold)" }} />Parque Rodó, Montevideo</strong>Un rincón tranquilo en la ciudad.<br /><a href={phoneHref}>+598 95 514 799</a></div>
          </div>
        </div>
        <iframe
          className="map-frame"
          title="Mapa de Parque Rodó, Montevideo"
          src="https://maps.google.com/maps?q=Parque%20Rod%C3%B3%2C%20Montevideo&t=&z=14&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

      <footer className="footer">
        <div className="footer-main">
          <a className="footer-brand" href="#inicio" aria-label="Volver al inicio" onClick={(e) => { e.preventDefault(); scrollTo("inicio"); }}>
            <img src="/__mockup/images/jus-lash-room-logo.jpg" alt="JU's LASH ROOM" loading="lazy" />
          </a>
          <span className="footer-note">Que tu pausa sea parte del día.</span>
          <div className="footer-links">
            <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} strokeWidth={1.5} /></a>
            <a className="social-link" href={phoneHref} aria-label="Llamar a JU's LASH ROOM"><Phone size={15} strokeWidth={1.5} /></a>
          </div>
        </div>
        <div className="footer-bottom"><span>Parque Rodó · Montevideo, Uruguay</span><span>JU's LASH ROOM © {new Date().getFullYear()}</span></div>
      </footer>
    </main>
  );
}
