export type Service = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    summary: "Rhythm disorders, echocardiography, and preventive heart care.",
    detail:
      "Our cardiology unit runs full non-invasive diagnostics — stress echo, Holter monitoring, and carotid Doppler — alongside long-term care plans for hypertension and arrhythmia.",
    icon: "HeartPulse",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    summary: "Growth tracking, immunization, and newborn care.",
    detail:
      "From the first newborn check-up through adolescence, our pediatricians track growth milestones and manage the national immunization schedule in a calm, child-friendly ward.",
    icon: "Baby",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics & Sports Medicine",
    summary: "Joint, spine, and sports injury treatment.",
    detail:
      "We treat everything from ligament tears to chronic back pain using image-guided injections, physiotherapy partnerships, and, where needed, referral for surgical care.",
    icon: "Bone",
  },
  {
    slug: "obstetrics-gynecology",
    name: "Obstetrics & Gynecology",
    summary: "Prenatal care, fertility support, and women's wellness.",
    detail:
      "A dedicated women's health floor offering 4D obstetric ultrasound, high-risk pregnancy monitoring, and confidential consultations for reproductive and menopausal health.",
    icon: "Flower2",
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    summary: "Skin, hair, and cosmetic dermatology.",
    detail:
      "Medical and cosmetic dermatology under one roof — from eczema and acne management to laser resurfacing and mole mapping with dermoscopy.",
    icon: "Sparkles",
  },
  {
    slug: "internal-medicine",
    name: "Internal Medicine",
    summary: "Chronic disease management and annual checkups.",
    detail:
      "Our internists coordinate diabetes, thyroid, and cholesterol management, plus executive health screenings tailored to your age and risk profile.",
    icon: "Stethoscope",
  },
  {
    slug: "dental-care",
    name: "Dental Care",
    summary: "Preventive, cosmetic, and restorative dentistry.",
    detail:
      "Digital X-rays, same-day crowns, and a gentle approach for anxious patients — our dental suite covers routine cleanings through full-mouth rehabilitation.",
    icon: "Smile",
  },
  {
    slug: "diagnostic-imaging",
    name: "Diagnostic Imaging",
    summary: "MRI, CT, ultrasound, and digital X-ray.",
    detail:
      "In-house imaging means same-day results for most studies, read by radiologists on-site rather than sent out — critical when a diagnosis can't wait.",
    icon: "ScanLine",
  },
];

export type Doctor = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  languages: string[];
  years: number;
};

export const doctors: Doctor[] = [
  {
    slug: "amina-al-suwaidi",
    name: "Dr. Amina Al Suwaidi",
    role: "Consultant Cardiologist",
    specialty: "Cardiology",
    bio: "Dr. Al Suwaidi trained at Imperial College London and has spent over a decade managing complex arrhythmia cases across the Gulf.",
    languages: ["Arabic", "English"],
    years: 14,
  },
  {
    slug: "rajiv-menon",
    name: "Dr. Rajiv Menon",
    role: "Senior Pediatrician",
    specialty: "Pediatrics",
    bio: "A neonatal specialist by background, Dr. Menon now leads our general pediatrics practice with a focus on developmental screening.",
    languages: ["English", "Hindi", "Malayalam"],
    years: 19,
  },
  {
    slug: "leila-haddad",
    name: "Dr. Leila Haddad",
    role: "Consultant OB-GYN",
    specialty: "Obstetrics & Gynecology",
    bio: "Dr. Haddad has delivered over 3,000 babies and specializes in high-risk pregnancy monitoring and minimally invasive gynecological surgery.",
    languages: ["Arabic", "French", "English"],
    years: 21,
  },
  {
    slug: "marcus-webb",
    name: "Dr. Marcus Webb",
    role: "Orthopedic Surgeon",
    specialty: "Orthopedics & Sports Medicine",
    bio: "Formerly the team physician for a national rugby squad, Dr. Webb focuses on non-surgical recovery pathways before considering intervention.",
    languages: ["English"],
    years: 16,
  },
  {
    slug: "farah-idris",
    name: "Dr. Farah Idris",
    role: "Consultant Dermatologist",
    specialty: "Dermatology",
    bio: "Dr. Idris combines medical dermatology with aesthetic treatments, and lectures regularly on skin health across skin tones.",
    languages: ["Arabic", "English"],
    years: 11,
  },
  {
    slug: "daniel-oyelaran",
    name: "Dr. Daniel Oyelaran",
    role: "Internal Medicine Physician",
    specialty: "Internal Medicine",
    bio: "Dr. Oyelaran built our executive health screening program and manages long-term chronic disease patients with a data-driven approach.",
    languages: ["English", "Yoruba"],
    years: 13,
  },
];
