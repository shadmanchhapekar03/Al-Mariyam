const fs = require('fs');
const path = require('path');

// Function to create SVG medicine bottle
function createMedicineBottle(name, color, accent) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="400" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="300" height="400" fill="#f5f5f5"/>

  <!-- Bottle shape -->
  <defs>
    <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0.8" />
    </linearGradient>
    <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Shadow -->
  <ellipse cx="150" cy="380" rx="80" ry="15" fill="rgba(0,0,0,0.1)"/>

  <!-- Bottle cap -->
  <rect x="120" y="20" width="60" height="15" rx="3" fill="url(#capGradient)" stroke="#999" stroke-width="1"/>
  <circle cx="150" cy="22" r="35" fill="#ffffff" opacity="0.3"/>

  <!-- Bottle neck -->
  <path d="M 125 35 L 115 60 L 185 60 L 175 35 Z" fill="url(#bottleGradient)" stroke="#666" stroke-width="1.5"/>

  <!-- Main bottle body -->
  <path d="M 115 60 Q 100 100 100 160 Q 100 220 120 280 L 180 280 Q 200 220 200 160 Q 200 100 185 60 Z"
        fill="url(#bottleGradient)" stroke="#666" stroke-width="2" opacity="0.85"/>

  <!-- Bottle shine/reflection -->
  <ellipse cx="130" cy="120" rx="15" ry="40" fill="#ffffff" opacity="0.15"/>

  <!-- Label area -->
  <rect x="115" y="140" width="70" height="90" rx="3" fill="#ffffff" stroke="#999" stroke-width="1.5" opacity="0.9"/>

  <!-- Medicine name on label -->
  <text x="150" y="170" font-family="Arial, sans-serif" font-size="14" font-weight="bold"
        text-anchor="middle" fill="${color}">${name}</text>

  <!-- Dosage info -->
  <text x="150" y="190" font-family="Arial, sans-serif" font-size="11"
        text-anchor="middle" fill="#666">500mg</text>

  <!-- Additional text -->
  <text x="150" y="210" font-family="Arial, sans-serif" font-size="9"
        text-anchor="middle" fill="#999">Pharma Grade</text>

  <!-- Bottom highlight -->
  <ellipse cx="150" cy="280" rx="60" ry="10" fill="#ffffff" opacity="0.2"/>
</svg>`;
}

// Function to create juice bottle
function createJuiceBottle(brand, color1, color2) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="400" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="300" height="400" fill="#f0f0f0"/>

  <!-- Gradients -->
  <defs>
    <linearGradient id="juiceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:0.7" />
    </linearGradient>
    <linearGradient id="glassShine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:#ffffff;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
    </linearGradient>
  </defs>

  <!-- Shadow -->
  <ellipse cx="150" cy="380" rx="85" ry="12" fill="rgba(0,0,0,0.15)"/>

  <!-- Bottle cap -->
  <rect x="125" y="15" width="50" height="12" rx="2" fill="#2d5016" stroke="#1a3009" stroke-width="1"/>
  <circle cx="150" cy="17" r="30" fill="#ffffff" opacity="0.2"/>

  <!-- Bottle neck -->
  <path d="M 130 27 L 120 55 L 180 55 L 170 27 Z" fill="url(#juiceGradient)" stroke="#333" stroke-width="1.5" opacity="0.85"/>

  <!-- Main bottle with liquid -->
  <path d="M 120 55 Q 105 95 105 150 Q 105 230 125 300 L 175 300 Q 195 230 195 150 Q 195 95 180 55 Z"
        fill="url(#juiceGradient)" stroke="#444" stroke-width="2" opacity="0.8"/>

  <!-- Glass shine effect -->
  <ellipse cx="135" cy="100" rx="12" ry="50" fill="url(#glassShine)"/>

  <!-- Label background -->
  <rect x="110" y="120" width="80" height="110" rx="4" fill="#ffffff" stroke="#ddd" stroke-width="1.5" opacity="0.92"/>

  <!-- Brand name -->
  <text x="150" y="150" font-family="Arial, sans-serif" font-size="16" font-weight="bold"
        text-anchor="middle" fill="${color1}">${brand}</text>

  <!-- Product type -->
  <text x="150" y="170" font-family="Arial, sans-serif" font-size="11"
        text-anchor="middle" fill="#666">100% Natural Juice</text>

  <!-- Volume -->
  <text x="150" y="190" font-family="Arial, sans-serif" font-size="10"
        text-anchor="middle" fill="#999">1L | Fresh</text>

  <!-- Decorative element -->
  <circle cx="150" cy="220" r="8" fill="${color1}" opacity="0.3"/>

  <!-- Bottom shine -->
  <ellipse cx="150" cy="305" rx="65" ry="12" fill="#ffffff" opacity="0.15"/>
</svg>`;
}

// Medicine products with colors
const medicines = [
  { name: 'Aspirin', color: '#e74c3c', accent: '#c0392b' },
  { name: 'Amoxicillin', color: '#3498db', accent: '#2980b9' },
  { name: 'Paracetamol', color: '#f39c12', accent: '#d68910' },
  { name: 'Omeprazole', color: '#9b59b6', accent: '#8e44ad' },
  { name: 'Metformin', color: '#1abc9c', accent: '#16a085' },
  { name: 'Cetirizine', color: '#34495e', accent: '#2c3e50' },
  { name: 'Ibuprofen', color: '#e67e22', accent: '#d35400' },
  { name: 'Loratadine', color: '#27ae60', accent: '#229954' },
];

// Juice products with brand names and colors
const juices = [
  { brand: 'Real', color1: '#ff6b00', color2: '#ff9933' },
  { brand: 'Maza', color1: '#ff6b00', color2: '#ffaa33' },
  { brand: 'Frooty', color1: '#ff5c00', color2: '#ff8800' },
  { brand: 'Minute Maid', color1: '#ff9900', color2: '#ffcc00' },
  { brand: 'Aloe Vera', color1: '#4caf50', color2: '#66bb6a' },
  { brand: 'Neem', color1: '#558b2f', color2: '#7cb342' },
];

// Generate medicine images
medicines.forEach((med) => {
  const svg = createMedicineBottle(med.name, med.color, med.accent);
  const filename = med.name.toLowerCase().replace(/\s+/g, '-') + '.svg';
  fs.writeFileSync(path.join(__dirname, 'medicines', filename), svg);
  console.log(`✓ Generated: medicines/${filename}`);
});

// Generate juice images
juices.forEach((juice) => {
  const svg = createJuiceBottle(juice.brand, juice.color1, juice.color2);
  const filename = juice.brand.toLowerCase().replace(/\s+/g, '-') + '.svg';
  fs.writeFileSync(path.join(__dirname, 'juices', filename), svg);
  console.log(`✓ Generated: juices/${filename}`);
});

console.log('\n✅ All product images generated successfully!');
