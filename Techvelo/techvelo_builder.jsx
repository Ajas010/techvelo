import React, { useState, useMemo, useEffect } from 'react';

// --- DATA ---
// We store part lists and base prices here.
// Vendor options will be generated dynamically from this data.

const partLists = {
  'Signature Model': [
    'Frame', 'Fork', 'Fork fitting', 'Handle stem', 'Handle bar', 'Hub', 'Spokes', 'Rim', 'Rim tape', 'Tube', 'Tyre', 'Bb cup', 'Bb axil', 'Bb bearing', 'Stand', 'Crank', 'Chain', 'Freewheel', 'Pedal', 'Brake liver', 'Grip', 'Cable', 'Power arch', 'Seat pillar', 'Seat clamp', 'Seat Reflector'
  ],
  'Ares 26" 21s d/d': [
    'Frame', 'Suspension Fork', 'Fork fitting', 'Handle stem', 'Handle bar', 'Hub-direct mount', 'Spokes', 'Rim', 'Rim tape', 'Tube', 'Tyre', 'Bb axil', 'Stand', 'Crankset', 'Chain', 'Freewheel', 'Front derailleur', 'Rear derailleur', 'Pedal', 'Shifter', 'Grip', 'Brake', 'Cable front', 'Cable rear', 'Disc plate', 'Disc machine', 'Seat pillar', 'Seat clamp', 'Seat Reflector'
  ],
  'Spear 26" 21s d/d': [
    'Frame', 'Suspension Fork', 'Fork fitting', 'Handle stem', 'Handle bar', 'Hub-direct mount', 'Spokes', 'Rim', 'Rim tape', 'Tube', 'Tyre', 'Bb axil', 'Stand', 'Crankset', 'Chain', 'Freewheel', 'Front derailleur', 'Rear derailleur', 'Pedal', 'Shifter', 'Grip', 'Brake', 'Cable front', 'Cable rear', 'Disc plate', 'Disc machine', 'Seat pillar', 'Seat clamp', 'Seat Reflector'
  ]
};

// --- REMOVED ---
// const partBasePrices = { ... };

// --- NEW DATA STRUCTURE ---
// Helper function to keep the data object clean
const getImg = (part) => `https://placehold.co/100x100/e0e0e0/333?text=${part.substring(0, 3)}`;

// Manually define all vendors and prices for each part here.
// You can change any "vendor", "quality", or "price" value.
const partDetails = {
  // --- Signature Model Parts ---
  'Frame': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 150, image: getImg('Frame') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 202, image: getImg('Frame') },
    { vendor: 'ProFrame', quality: 'Pro', price: 255, image: getImg('Frame') },
    { vendor: 'AeroTech', quality: 'Premium', price: 307, image: getImg('Frame') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 360, image: getImg('Frame') }
  ],
  'Fork': [
    { vendor: 'SteelFork', quality: 'Standard', price: 80, image: getImg('Fork') },
    { vendor: 'AlloyFork', quality: 'Enhanced', price: 110, image: getImg('Fork') },
    { vendor: 'CarbonFork', quality: 'Pro', price: 150, image: getImg('Fork') },
    { vendor: 'ProGrade', quality: 'Premium', price: 180, image: getImg('Fork') },
    { vendor: 'Featherweight', quality: 'Ultralight', price: 210, image: getImg('Fork') }
  ],
  'Fork fitting': [
    { vendor: 'BasicFit', quality: 'Standard', price: 15, image: getImg('Fit') },
    { vendor: 'SureFit', quality: 'Enhanced', price: 20, image: getImg('Fit') },
    { vendor: 'ProFit', quality: 'Pro', price: 25, image: getImg('Fit') },
    { vendor: 'LockFit', quality: 'Premium', price: 30, image: getImg('Fit') },
    { vendor: 'TitanFit', quality: 'Ultralight', price: 35, image: getImg('Fit') }
  ],
  'Handle stem': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 20, image: getImg('Stem') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 27, image: getImg('Stem') },
    { vendor: 'ProFrame', quality: 'Pro', price: 34, image: getImg('Stem') },
    { vendor: 'AeroTech', quality: 'Premium', price: 41, image: getImg('Stem') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 48, image: getImg('Stem') }
  ],
  // ... (Add all other parts here with their 5 vendor options)
  // I'll add the rest with placeholder data so the app runs.
  // PLEASE MANUALLY UPDATE THESE PRICES AS NEEDED.
  'Handle bar': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 25, image: getImg('Bar') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 33, image: getImg('Bar') },
    { vendor: 'ProFrame', quality: 'Pro', price: 42, image: getImg('Bar') },
    { vendor: 'AeroTech', quality: 'Premium', price: 51, image: getImg('Bar') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 60, image: getImg('Bar') }
  ],
  'Hub': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 40, image: getImg('Hub') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 54, image: getImg('Hub') },
    { vendor: 'ProFrame', quality: 'Pro', price: 68, image: getImg('Hub') },
    { vendor: 'AeroTech', quality: 'Premium', price: 82, image: getImg('Hub') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 96, image: getImg('Hub') }
  ],
  'Spokes': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 15, image: getImg('Spk') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 20, image: getImg('Spk') },
    { vendor: 'ProFrame', quality: 'Pro', price: 25, image: getImg('Spk') },
    { vendor: 'AeroTech', quality: 'Premium', price: 30, image: getImg('Spk') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 36, image: getImg('Spk') }
  ],
  'Rim': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 35, image: getImg('Rim') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 47, image: getImg('Rim') },
    { vendor: 'ProFrame', quality: 'Pro', price: 59, image: getImg('Rim') },
    { vendor: 'AeroTech', quality: 'Premium', price: 71, image: getImg('Rim') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 84, image: getImg('Rim') }
  ],
  'Rim tape': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 5, image: getImg('Tap') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 6, image: getImg('Tap') },
    { vendor: 'ProFrame', quality: 'Pro', price: 8, image: getImg('Tap') },
    { vendor: 'AeroTech', quality: 'Premium', price: 10, image: getImg('Tap') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 12, image: getImg('Tap') }
  ],
  'Tube': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 7, image: getImg('Tub') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 9, image: getImg('Tub') },
    { vendor: 'ProFrame', quality: 'Pro', price: 11, image: getImg('Tub') },
    { vendor: 'AeroTech', quality: 'Premium', price: 14, image: getImg('Tub') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 16, image: getImg('Tub') }
  ],
  'Tyre': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 20, image: getImg('Tyr') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 27, image: getImg('Tyr') },
    { vendor: 'ProFrame', quality: 'Pro', price: 34, image: getImg('Tyr') },
    { vendor: 'AeroTech', quality: 'Premium', price: 41, image: getImg('Tyr') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 48, image: getImg('Tyr') }
  ],
  'Bb cup': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 10, image: getImg('Bbc') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 13, image: getImg('Bbc') },
    { vendor: 'ProFrame', quality: 'Pro', price: 17, image: getImg('Bbc') },
    { vendor: 'AeroTech', quality: 'Premium', price: 20, image: getImg('Bbc') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 24, image: getImg('Bbc') }
  ],
  'Bb axil': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 15, image: getImg('Bbx') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 20, image: getImg('Bbx') },
    { vendor: 'ProFrame', quality: 'Pro', price: 25, image: getImg('Bbx') },
    { vendor: 'AeroTech', quality: 'Premium', price: 30, image: getImg('Bbx') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 36, image: getImg('Bbx') }
  ],
  'Bb bearing': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 10, image: getImg('Bbb') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 13, image: getImg('Bbb') },
    { vendor: 'ProFrame', quality: 'Pro', price: 17, image: getImg('Bbb') },
    { vendor: 'AeroTech', quality: 'Premium', price: 20, image: getImg('Bbb') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 24, image: getImg('Bbb') }
  ],
  'Stand': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 12, image: getImg('Std') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 16, image: getImg('Std') },
    { vendor: 'ProFrame', quality: 'Pro', price: 20, image: getImg('Std') },
    { vendor: 'AeroTech', quality: 'Premium', price: 24, image: getImg('Std') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 28, image: getImg('Std') }
  ],
  'Crank': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 45, image: getImg('Crk') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 60, image: getImg('Crk') },
    { vendor: 'ProFrame', quality: 'Pro', price: 76, image: getImg('Crk') },
    { vendor: 'AeroTech', quality: 'Premium', price: 92, image: getImg('Crk') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 108, image: getImg('Crk') }
  ],
  'Chain': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 15, image: getImg('Chn') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 20, image: getImg('Chn') },
    { vendor: 'ProFrame', quality: 'Pro', price: 25, image: getImg('Chn') },
    { vendor: 'AeroTech', quality: 'Premium', price: 30, image: getImg('Chn') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 36, image: getImg('Chn') }
  ],
  'Freewheel': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 25, image: getImg('Frw') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 33, image: getImg('Frw') },
    { vendor: 'ProFrame', quality: 'Pro', price: 42, image: getImg('Frw') },
    { vendor: 'AeroTech', quality: 'Premium', price: 51, image: getImg('Frw') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 60, image: getImg('Frw') }
  ],
  'Pedal': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 18, image: getImg('Ped') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 24, image: getImg('Ped') },
    { vendor: 'ProFrame', quality: 'Pro', price: 30, image: getImg('Ped') },
    { vendor: 'AeroTech', quality: 'Premium', price: 36, image: getImg('Ped') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 43, image: getImg('Ped') }
  ],
  'Brake liver': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 10, image: getImg('Brl') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 13, image: getImg('Brl') },
    { vendor: 'ProFrame', quality: 'Pro', price: 17, image: getImg('Brl') },
    { vendor: 'AeroTech', quality: 'Premium', price: 20, image: getImg('Brl') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 24, image: getImg('Brl') }
  ],
  'Grip': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 8, image: getImg('Grp') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 10, image: getImg('Grp') },
    { vendor: 'ProFrame', quality: 'Pro', price: 13, image: getImg('Grp') },
    { vendor: 'AeroTech', quality: 'Premium', price: 16, image: getImg('Grp') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 19, image: getImg('Grp') }
  ],
  'Cable': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 5, image: getImg('Cbl') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 6, image: getImg('Cbl') },
    { vendor: 'ProFrame', quality: 'Pro', price: 8, image: getImg('Cbl') },
    { vendor: 'AeroTech', quality: 'Premium', price: 10, image: getImg('Cbl') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 12, image: getImg('Cbl') }
  ],
  'Power arch': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 15, image: getImg('Pwa') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 20, image: getImg('Pwa') },
    { vendor: 'ProFrame', quality: 'Pro', price: 25, image: getImg('Pwa') },
    { vendor: 'AeroTech', quality: 'Premium', price: 30, image: getImg('Pwa') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 36, image: getImg('Pwa') }
  ],
  'Seat pillar': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 20, image: getImg('Spp') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 27, image: getImg('Spp') },
    { vendor: 'ProFrame', quality: 'Pro', price: 34, image: getImg('Spp') },
    { vendor: 'AeroTech', quality: 'Premium', price: 41, image: getImg('Spp') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 48, image: getImg('Spp') }
  ],
  'Seat clamp': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 5, image: getImg('Clp') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 6, image: getImg('Clp') },
    { vendor: 'ProFrame', quality: 'Pro', price: 8, image: getImg('Clp') },
    { vendor: 'AeroTech', quality: 'Premium', price: 10, image: getImg('Clp') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 12, image: getImg('Clp') }
  ],
  'Seat Reflector': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 3, image: getImg('Ref') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 4, image: getImg('Ref') },
    { vendor: 'ProFrame', quality: 'Pro', price: 5, image: getImg('Ref') },
    { vendor: 'AeroTech', quality: 'Premium', price: 6, image: getImg('Ref') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 7, image: getImg('Ref') }
  ],

  // --- Ares & Spear Parts ---
  'Suspension Fork': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 120, image: getImg('Sus') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 162, image: getImg('Sus') },
    { vendor: 'ProFrame', quality: 'Pro', price: 204, image: getImg('Sus') },
    { vendor: 'AeroTech', quality: 'Premium', price: 246, image: getImg('Sus') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 288, image: getImg('Sus') }
  ],
  'Hub-direct mount': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 45, image: getImg('Hub') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 60, image: getImg('Hub') },
    { vendor: 'ProFrame', quality: 'Pro', price: 76, image: getImg('Hub') },
    { vendor: 'AeroTech', quality: 'Premium', price: 92, image: getImg('Hub') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 108, image: getImg('Hub') }
  ],
  'Crankset': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 55, image: getImg('Crk') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 74, image: getImg('Crk') },
    { vendor: 'ProFrame', quality: 'Pro', price: 93, image: getImg('Crk') },
    { vendor: 'AeroTech', quality: 'Premium', price: 112, image: getImg('Crk') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 132, image: getImg('Crk') }
  ],
  'Front derailleur': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 22, image: getImg('Fdr') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 29, image: getImg('Fdr') },
    { vendor: 'ProFrame', quality: 'Pro', price: 37, image: getImg('Fdr') },
    { vendor: 'AeroTech', quality: 'Premium', price: 45, image: getImg('Fdr') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 52, image: getImg('Fdr') }
  ],
  'Rear derailleur': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 30, image: getImg('Rdr') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 40, image: getImg('Rdr') },
    { vendor: 'ProFrame', quality: 'Pro', price: 51, image: getImg('Rdr') },
    { vendor: 'AeroTech', quality: 'Premium', price: 61, image: getImg('Rdr') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 72, image: getImg('Rdr') }
  ],
  'Shifter': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 35, image: getImg('Shf') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 47, image: getImg('Shf') },
    { vendor: 'ProFrame', quality: 'Pro', price: 59, image: getImg('Shf') },
    { vendor: 'AeroTech', quality: 'Premium', price: 71, image: getImg('Shf') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 84, image: getImg('Shf') }
  ],
  'Brake': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 28, image: getImg('Brk') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 37, image: getImg('Brk') },
    { vendor: 'ProFrame', quality: 'Pro', price: 47, image: getImg('Brk') },
    { vendor: 'AeroTech', quality: 'Premium', price: 57, image: getImg('Brk') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 67, image: getImg('Brk') }
  ],
  'Cable front': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 6, image: getImg('Cbf') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 8, image: getImg('Cbf') },
    { vendor: 'ProFrame', quality: 'Pro', price: 10, image: getImg('Cbf') },
    { vendor: 'AeroTech', quality: 'Premium', price: 12, image: getImg('Cbf') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 14, image: getImg('Cbf') }
  ],
  'Cable rear': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 6, image: getImg('Cbr') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 8, image: getImg('Cbr') },
    { vendor: 'ProFrame', quality: 'Pro', price: 10, image: getImg('Cbr') },
    { vendor: 'AeroTech', quality: 'Premium', price: 12, image: getImg('Cbr') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 14, image: getImg('Cbr') }
  ],
  'Disc plate': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 15, image: getImg('Dsc') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 20, image: getImg('Dsc') },
    { vendor: 'ProFrame', quality: 'Pro', price: 25, image: getImg('Dsc') },
    { vendor: 'AeroTech', quality: 'Premium', price: 30, image: getImg('Dsc') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 36, image: getImg('Dsc') }
  ],
  'Disc machine': [
    { vendor: 'VeloBasic', quality: 'Standard', price: 25, image: getImg('Dsm') },
    { vendor: 'RideSolid', quality: 'Enhanced', price: 33, image: getImg('Dsm') },
    { vendor: 'ProFrame', quality: 'Pro', price: 42, image: getImg('Dsm') },
    { vendor: 'AeroTech', quality: 'Premium', price: 51, image: getImg('Dsm') },
    { vendor: 'CarbonLite', quality: 'Ultralight', price: 60, image: getImg('Dsm') }
  ],
};


// --- REMOVED ---
// const qualities = ['Standard', 'Enhanced', 'Pro', 'Premium', 'Ultralight'];
// const vendors = ['VeloBasic', 'RideSolid', 'ProFrame', 'AeroTech', 'CarbonLite'];
// const generateVendorOptions = (partName) => { ... };

// --- SVG ICONS ---
// Using inline SVGs for a single-file setup (no imports needed).

const IconSun = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const IconMoon = ({ className }) => (
  <svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const IconRotateCcw = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v6h6"></path>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L3 12"></path>
  </svg>
);

const IconList = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const IconDownload = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const IconX = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconCheck = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// --- NEW ICON ---
const IconArrowLeft = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// --- NEW WHATSAPP ICON ---
const IconWhatsApp = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 21.94L7.3 20.58C8.77 21.39 10.37 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM17.95 16.39C17.66 17.21 16.64 17.8 15.77 17.95C15.06 18.07 14.15 17.91 13.39 17.65C12.19 17.28 10.45 16.59 8.78 15.02C6.82 13.18 5.48 10.98 5.2 10.6C4.92 10.22 3.99 8.91 3.99 7.71C3.99 6.51 4.7 5.8 4.98 5.52C5.26 5.24 5.67 5.18 6.09 5.18C6.23 5.18 6.36 5.18 6.49 5.19C6.83 5.21 7.11 5.22 7.35 5.74C7.62 6.31 8.28 7.9 8.38 8.09C8.47 8.28 8.57 8.5 8.42 8.74C8.28 8.98 8.18 9.08 7.99 9.27C7.8 9.46 7.64 9.6 7.48 9.77C7.31 9.93 7.15 10.1 7.34 10.4C7.53 10.7 8.18 11.75 9.18 12.69C10.41 13.85 11.37 14.23 11.72 14.38C12.07 14.53 12.31 14.5 12.5 14.33C12.74 14.12 13.13 13.62 13.43 13.25C13.61 13.01 13.9 12.92 14.19 13.01C14.48 13.11 15.93 13.82 16.27 13.98C16.61 14.14 16.83 14.23 16.92 14.32C17.02 14.41 17.02 14.8 16.92 15.19C16.83 15.58 16.68 15.97 16.54 16.16C17.25 15.61 17.66 16.03 17.95 16.39Z"></path>
  </svg>
);


// --- COMPONENTS ---

/**
 * ThemeToggle Component
 * A simple button to toggle between light and dark mode.
 */
const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-800 dark:text-gray-200 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-300/70 dark:hover:bg-gray-700/70 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <IconMoon className="w-5 h-5" /> : <IconSun className="w-5 h-5" />}
    </button>
  );
};

/**
 * HomePage Component
 * The landing page for the application.
 */
const HomePage = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-500 pb-2">
          TechVelo
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Craft your dream bike. Select every part, from frame to reflector, and see your custom build come to life.
        </p>
        <button
          onClick={onStart}
          className="mt-12 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Start Customizing
        </button>
      </div>
    </div>
  );
};

/**
 * VendorCard Component
 * Displays a single vendor option for a part.
 */
const VendorCard = ({ option, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(option)}
      className={`relative w-full p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out border
                  ${isSelected
                    ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/50 dark:ring-blue-400/50 scale-105 shadow-xl'
                    : 'border-white/20 dark:border-gray-700/50 hover:shadow-lg hover:border-blue-400/50 dark:hover:border-blue-500/50'
                  }
                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-md`}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-gray-900">
          <IconCheck className="w-4 h-4" />
        </div>
      )}
      <div className="flex items-center space-x-4">
        <img src={option.image} alt={option.vendor} className="w-16 h-16 rounded-md bg-gray-200 dark:bg-gray-700 object-cover" />
        <div className="text-left">
          <h4 className="font-semibold text-gray-900 dark:text-white">{option.vendor}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{option.quality}</p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">₹{option.price}</p>
        </div>
      </div>
    </button>
  );
};

/**
 * PartSelector Component
 * Displays a list of vendor options for a single part.
 */
const PartSelector = ({ partName, options, selectedOption, onSelectPart }) => {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/30">
      <h3 className="text-2xl font-semibold mb-5 text-gray-900 dark:text-white">{partName}</h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <VendorCard
            key={index}
            option={option}
            isSelected={selectedOption?.vendor === option.vendor && selectedOption?.price === option.price}
            onSelect={() => onSelectPart(partName, option)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * SummaryCard Component
 * A sticky card showing the running total and action buttons.
 */
const SummaryCard = ({ selections, total, onReset, onOpenModal, partsList }) => {
  const partsSelected = Object.keys(selections).length;
  const totalParts = partsList.length;
  const progress = totalParts > 0 ? (partsSelected / totalParts) * 100 : 0;

  return (
    <div className="sticky top-6 p-6 rounded-xl shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20 dark:border-gray-700/50">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Custom Build</h3>
      
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <span>Progress</span>
          <span>{partsSelected} / {totalParts} parts</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="my-6 border-t border-gray-300 dark:border-gray-700/50"></div>

      {/* Total Price */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xl text-gray-700 dark:text-gray-300">Total Price:</span>
        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-400 dark:to-purple-500">
          ₹{total}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          onClick={onOpenModal}
          disabled={total === 0}
          className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconList className="w-5 h-5 mr-2" />
          View Summary
        </button>
        <button
          onClick={onReset}
          disabled={total === 0}
          className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-200/70 dark:bg-gray-700/70 rounded-lg shadow-sm hover:bg-gray-300/90 dark:hover:bg-gray-600/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconRotateCcw className="w-5 h-5 mr-2" />
          Reset Build
        </button>
      </div>
    </div>
  );
};

/**
 * SummaryModal Component
 * A popup modal showing the full build summary.
 * Includes "Download as PDF" (via print) functionality.
 */
const SummaryModal = ({ isOpen, onClose, selections, total, modelName }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    // We use the browser's print functionality, which allows "Save as PDF"
    window.print();
  };

  // --- NEW WHATSAPP HANDLER ---
  const handleWhatsAppShare = () => {
    const phone = '918078308961'; // Your WhatsApp number with country code
    
    // Create the message header
    let message = `Hi TechVelo! I've built a custom bike:\n\n`;
    message += `*Model:* ${modelName}\n\n`;
    message += `*My Selections:*\n`;

    // Loop through selections and add them to the message
    Object.entries(selections).forEach(([part, option]) => {
      message += `- ${part}: ${option.vendor} (${option.quality}) - ₹${option.price}\n`;
    });

    // Add the total price
    message += `\n*Total Price: ₹${total}*\n\n`;
    message += `Please let me know the next steps!`;

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create the WhatsApp URL
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Open the URL in a new tab
    window.open(whatsappURL, '_blank');
  };

  // --- FIX ---
  // This is the correct return statement for the SummaryModal.
  // The previous version was missing this and had the BuilderPage JSX instead.
  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4 print:hidden"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700 print:hidden">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Custom Build Summary
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto" id="summary-to-print">
          <div className="text-center print:text-left">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Model: {modelName}</h4>
            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-400 dark:to-purple-500 mt-1">
              Total: ₹{total}
            </p>
          </div>
          
          <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

          <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Selected Parts:</h5>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(selections).map(([part, option]) => (
              <li key={part} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{part}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{option.vendor} ({option.quality})</p>
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">₹{option.price}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 print:hidden space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          {/* --- NEW WHATSAPP BUTTON --- */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center w-full sm:w-auto px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <IconWhatsApp className="w-5 h-5 mr-2" />
            Send to WhatsApp
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center w-full sm:w-auto px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <IconDownload className="w-5 h-5 mr-2" />
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};
// --- END OF SUMMARY MODAL FIX ---


// --- FIX ---
// The BuilderPage component definition and logic were missing.
const BuilderPage = ({ onBackHome, theme, setTheme }) => {
  const [selectedModel, setSelectedModel] = useState(Object.keys(partLists)[0]);
  const [selections, setSelections] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the list of parts for the currently selected model
  const currentParts = useMemo(() => {
    return partLists[selectedModel] || [];
  }, [selectedModel]);
  
  // Get the vendor options for the current parts
  const currentOptions = useMemo(() => {
    return currentParts.reduce((acc, partName) => {
      acc[partName] = partDetails[partName] || [];
      return acc;
    }, {});
  }, [currentParts]);

  // Calculate the total price
  const totalPrice = useMemo(() => {
    return Object.values(selections).reduce((total, option) => total + (option.price || 0), 0);
  }, [selections]);

  // Handle changing the model
  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSelections({}); // Reset selections when model changes
  };

  // Handle selecting a part's vendor
  const handleSelectPart = (partName, option) => {
    setSelections(prev => ({
      ...prev,
      [partName]: option
    }));
  };

  // Handle resetting the build
  const handleReset = () => {
    setSelections({});
  };
  
  // This is the correct return statement for BuilderPage.
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <button onClick={onBackHome} className="flex items-center gap-2 group">
          <IconArrowLeft className="w-6 h-6 text-blue-500 group-hover:text-purple-600 transition-colors" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 dark:from-cyan-300 dark:to-purple-500">
            TechVelo
          </h1>
        </button>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Selections */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* --- FIX --- */}
          {/* This is the corrected Model Selector div. */}
          {/* The broken buttons and tags from the previous version are removed. */}
          <div className="p-6 rounded-xl shadow-lg bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/30">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Select Your Model
            </h2>
            <select
              value={selectedModel}
              onChange={handleModelChange}
              className="w-full p-3 text-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {Object.keys(partLists).map(modelName => (
                <option key={modelName} value={modelName}>{modelName}</option>
              ))}
            </select>
          </div>
          {/* --- END OF MODEL SELECTOR FIX --- */}


          {/* Part Selectors */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              2. Customize Your Parts
            </h2>
            {currentParts.map(partName => (
              <PartSelector
                key={partName}
                partName={partName}
                options={currentOptions[partName]}
                selectedOption={selections[partName]}
                onSelectPart={handleSelectPart}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Summary (Sticky) */}
        <div className="lg:col-span-1">
          <SummaryCard
            selections={selections}
            total={totalPrice}
            onReset={handleReset}
            onOpenModal={() => setIsModalOpen(true)}
            partsList={currentParts}
          />
        </div>
      </div>

      {/* --- FIX --- */}
      {/* This was the source of the 3rd error. The component was not closed. */}
      {/* Summary Modal */}
      <SummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selections={selections}
        total={totalPrice}
        modelName={selectedModel}
      />
    </div>
  );
};
// --- END OF BUILDER PAGE FIX ---


/**
 * App Component
 * The root component, handles page navigation and theme.
 */
export default function App() {
  const [page, setPage] = useState('home'); // 'home' or 'builder'
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Effect to apply the theme to the <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleStart = () => {
    setPage('builder');
  };
  
  const handleBackHome = () => {
    setPage('home');
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-purple-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      {page === 'home' && <HomePage onStart={handleStart} />}
      {page === 'builder' && <BuilderPage onBackHome={handleBackHome} theme={theme} setTheme={setTheme} />}
    </div>
  );
}

