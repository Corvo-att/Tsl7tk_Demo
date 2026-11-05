import type {
  ProviderRecord,
  SparePartRecord,
  VehicleRecord,
  MaintenanceItem,
  FuelEntry,
  CustomerRequest,
  NotificationItem,
} from './types';

// Reliable inline SVG workshop/part illustrations so the demo works 100% offline or online
const svgThumb = (bg: string, accent: string, label: string) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="${bg}"/>
      <path d="M-20 190 L260 90 L260 250 L-20 250 Z" fill="${accent}" opacity="0.28"/>
      <circle cx="120" cy="105" r="46" fill="#FFFFFF" opacity="0.12"/>
      <path d="M68 122 C76 98 92 88 120 88 C148 88 164 98 172 122" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" fill="none"/>
      <rect x="58" y="122" width="124" height="28" rx="14" fill="${accent}"/>
      <circle cx="84" cy="136" r="8" fill="#FFFFFF"/>
      <circle cx="156" cy="136" r="8" fill="#FFFFFF"/>
      <text x="120" y="196" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="20">${label}</text>
    </svg>`
  );

export const INITIAL_PROVIDERS: ProviderRecord[] = [
  {
    id: 'prov-1',
    name: { en: 'AutoFix Garage', ar: 'أوتو فيكس جراج' },
    district: { en: 'Nasr City, Cairo', ar: 'مدينة نصر، القاهرة' },
    address: {
      en: '14 Tayaran St, Rabaa Intersection, Nasr City',
      ar: '١٤ شارع الطيران، تقاطع رابعة، مدينة نصر',
    },
    type: 'both',
    rating: 4.8,
    reviewCount: 124,
    distanceKm: 2.3,
    lat: 30.0561,
    lng: 31.3301,
    isOpen: true,
    isVerified: true,
    isTopRated: true,
    hours: { en: '8:00 AM - 10:00 PM', ar: '٨:٠٠ ص - ١٠:٠٠ م' },
    phone: '+201002345678',
    thumbnailUrl: svgThumb('#17365D', '#790D16', 'AUTOFIX'),
    heroUrl: svgThumb('#17365D', '#790D16', 'AUTOFIX NASR CITY'),
    logoUrl: svgThumb('#002043', '#790D16', 'AF'),
    about: {
      en: 'Certified multi-brand workshop in Nasr City specializing in Korean and Japanese vehicles (Hyundai, Kia, Toyota). Equipped with OBD-II computer diagnostics, cooling system pressure testing, and genuine OEM parts.',
      ar: 'مركز صيانة معتمد في مدينة نصر متخصص في السيارات الكورية واليابانية (هيونداي، كيا، تويوتا). مجهز بأحدث أجهزة كشف الأعطال بالكمبيوتر واختبار دورة التبريد وقطع الغيار الأصلية.',
    },
    tags: [
      { en: 'General Service', ar: 'صيانة دورية' },
      { en: 'Repairs', ar: 'إصلاح ميكانيكا' },
      { en: 'Diagnostics', ar: 'كشف كمبيوتر' },
    ],
    categories: ['general', 'diagnostics', 'cooling', 'brakes', 'electrical'],
    services: [
      {
        id: 'srv-101',
        name: { en: 'OBD-II Computer Fault Scan & Reset', ar: 'فحص كمبيوتر شامل ومسح الأعطال' },
        category: 'diagnostics',
        priceFromEgp: 350,
        durationMins: 30,
      },
      {
        id: 'srv-102',
        name: { en: 'Cooling System & Thermostat Overhaul', ar: 'صيانة دورة التبريد والترموستات' },
        category: 'cooling',
        priceFromEgp: 650,
        durationMins: 90,
      },
      {
        id: 'srv-103',
        name: { en: 'Front & Rear Brake Pad Replacement', ar: 'تغيير تيل فرامل أمامي وخلفي' },
        category: 'brakes',
        priceFromEgp: 450,
        durationMins: 60,
      },
      {
        id: 'srv-104',
        name: { en: '10,000 km Periodic Maintenance', ar: 'صيانة الـ ١٠,٠٠٠ كم الدورية' },
        category: 'general',
        priceFromEgp: 1200,
        durationMins: 120,
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Karim Nabil',
        rating: 5,
        date: '2026-10-28',
        comment: {
          en: 'Diagnosed my Elantra overheating in 15 minutes. Fair pricing and matched the app estimate.',
          ar: 'شخصوا مشكلة السخونة في الإلنترا خلال ١٥ دقيقة. الأسعار ممتازة ومطابقة للتطبيق.',
        },
        verifiedRequestLabel: {
          en: 'Verified • Cooling System Service',
          ar: 'طلب مكتمل موثق • صيانة دورة التبريد',
        },
      },
      {
        id: 'rev-2',
        authorName: 'Mona Adel',
        rating: 4.8,
        date: '2026-10-19',
        comment: {
          en: 'Clean waiting area and transparent explanation before replacing brake pads.',
          ar: 'استراحة نظيفة وشرح واضح جداً قبل تغيير تيل الفرامل.',
        },
        verifiedRequestLabel: {
          en: 'Verified • Brake Replacement',
          ar: 'طلب مكتمل موثق • تغيير تيل فرامل',
        },
      },
    ],
  },
  {
    id: 'prov-2',
    name: { en: 'El-Tahrir Auto Electrics & Battery', ar: 'التحرير لكهرباء السيارات والبطاريات' },
    district: { en: 'Maadi, Cairo', ar: 'المعادي، القاهرة' },
    address: {
      en: '82 Road 9, near Maadi Metro Station, Cairo',
      ar: '٨٢ شارع ٩، بجوار محطة مترو المعادي، القاهرة',
    },
    type: 'both',
    rating: 4.7,
    reviewCount: 89,
    distanceKm: 3.1,
    lat: 29.9602,
    lng: 31.2569,
    isOpen: true,
    isVerified: true,
    isTopRated: false,
    hours: { en: '9:00 AM - 11:00 PM', ar: '٩:٠٠ ص - ١١:٠٠ م' },
    phone: '+201011223344',
    thumbnailUrl: svgThumb('#17365D', '#2E7D32', 'EL-TAHRIR'),
    heroUrl: svgThumb('#17365D', '#2E7D32', 'MAADI ELECTRICS'),
    logoUrl: svgThumb('#17365D', '#2E7D32', 'ET'),
    about: {
      en: 'Specialists in alternators, starter motors, battery load testing, and AC compressor repair in Maadi.',
      ar: 'متخصصون في الدينامو والمارش واختبار البطاريات وإصلاح تكييف السيارات بالمعادي.',
    },
    tags: [
      { en: 'Electrical', ar: 'كهرباء سيارات' },
      { en: 'Batteries', ar: 'بطاريات' },
      { en: 'AC Service', ar: 'تكييف' },
    ],
    categories: ['electrical', 'ac', 'diagnostics'],
    services: [
      {
        id: 'srv-201',
        name: { en: 'Battery & Alternator Load Test', ar: 'اختبار شحن البطارية والدينامو' },
        category: 'electrical',
        priceFromEgp: 200,
        durationMins: 25,
      },
      {
        id: 'srv-202',
        name: { en: 'AC Freon R134a Recharge & Leak Check', ar: 'شحن فريون التكييف وكشف التسريب' },
        category: 'ac',
        priceFromEgp: 850,
        durationMins: 50,
      },
    ],
    reviews: [
      {
        id: 'rev-3',
        authorName: 'Tarek Fouad',
        rating: 4.7,
        date: '2026-10-21',
        comment: {
          en: 'Saved me from buying a new battery when it was just a loose alternator belt.',
          ar: 'أمانة عالية، المشكلة طلعت سير دينامو مش بطارية جديدة.',
        },
        verifiedRequestLabel: {
          en: 'Verified • Electrical Inspection',
          ar: 'طلب مكتمل موثق • فحص كهرباء',
        },
      },
    ],
  },
  {
    id: 'prov-3',
    name: { en: 'Al-Amal Cooling & Radiators Center', ar: 'مركز الأمل للردياتير والتبريد' },
    district: { en: 'Heliopolis, Cairo', ar: 'مصر الجديدة، القاهرة' },
    address: {
      en: '45 Gesr El-Suez St, Heliopolis, Cairo',
      ar: '٤٥ شارع جسر السويس، مصر الجديدة، القاهرة',
    },
    type: 'mechanic',
    rating: 4.9,
    reviewCount: 156,
    distanceKm: 4.4,
    lat: 30.0912,
    lng: 31.3245,
    isOpen: true,
    isVerified: true,
    isTopRated: true,
    hours: { en: '8:30 AM - 9:30 PM', ar: '٨:٣٠ ص - ٩:٣٠ م' },
    phone: '+201099887766',
    thumbnailUrl: svgThumb('#002043', '#790D16', 'AL-AMAL'),
    heroUrl: svgThumb('#002043', '#790D16', 'HELIOPOLIS RADIATORS'),
    logoUrl: svgThumb('#002043', '#790D16', 'AA'),
    about: {
      en: 'Cairo leader in radiator flushing, cooling fans, water pumps, and head gasket diagnostics.',
      ar: 'المركز الأول في القاهرة لتسليك الردياتير ومراوح التبريد وطلمبات المياه.',
    },
    tags: [
      { en: 'Cooling System', ar: 'دورة التبريد' },
      { en: 'Radiators', ar: 'ردياتير' },
      { en: 'AC Service', ar: 'تكييف' },
    ],
    categories: ['cooling', 'ac'],
    services: [
      {
        id: 'srv-301',
        name: { en: 'Radiator Pressure Test & Chemical Flush', ar: 'كشف ضغط الردياتير وغسيل الدورة' },
        category: 'cooling',
        priceFromEgp: 500,
        durationMins: 60,
      },
      {
        id: 'srv-302',
        name: { en: 'Cooling Fan & Relay Replacement', ar: 'إصلاح أو تغيير مروحة التبريد والكتاوت' },
        category: 'cooling',
        priceFromEgp: 750,
        durationMins: 75,
      },
    ],
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Hossam El-Din',
        rating: 5.0,
        date: '2026-11-01',
        comment: {
          en: 'Found a hairline crack in the upper radiator hose immediately. Highly recommended!',
          ar: 'اكتشفوا تسريب بسيط في خرطوم الردياتير العلوي فوراً. شغل محترم جداً.',
        },
        verifiedRequestLabel: {
          en: 'Verified • Radiator Flush',
          ar: 'طلب مكتمل موثق • صيانة ردياتير',
        },
      },
    ],
  },
  {
    id: 'prov-4',
    name: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار الجديدة والاستيراد' },
    district: { en: 'Downtown (El-Tawfikia), Cairo', ar: 'وسط البلد (التوفيقية)، القاهرة' },
    address: {
      en: '12 Souk El-Tawfikia, Orabi Square, Downtown Cairo',
      ar: '١٢ سوق التوفيقية، ميدان عرابي، وسط البلد',
    },
    type: 'parts_seller',
    rating: 4.6,
    reviewCount: 210,
    distanceKm: 5.8,
    lat: 30.0531,
    lng: 31.2422,
    isOpen: true,
    isVerified: true,
    isTopRated: true,
    hours: { en: '9:00 AM - 10:00 PM', ar: '٩:٠٠ ص - ١٠:٠٠ م' },
    phone: '+201122334455',
    thumbnailUrl: svgThumb('#1F2937', '#790D16', 'TAWFIKIA'),
    heroUrl: svgThumb('#1F2937', '#790D16', 'EL-TAWFIKIA PARTS'),
    logoUrl: svgThumb('#1F2937', '#790D16', 'TP'),
    about: {
      en: 'Verified supplier of OEM new and inspected imported used spare parts for Hyundai, Kia, Toyota, and Nissan with same-day Cairo delivery.',
      ar: 'موزع معتمد لقطع الغيار الأصلية الجديدة والاستيراد المفحوص لسيارات هيونداي وكيا وتويوتا ونيسان مع توصيل سريع داخل القاهرة.',
    },
    tags: [
      { en: 'New OEM Parts', ar: 'قطع أصلية جديدة' },
      { en: 'Imported Used', ar: 'استيراد مفحوص' },
      { en: 'Fast Delivery', ar: 'توصيل سريع' },
    ],
    categories: ['general', 'brakes', 'cooling', 'electrical'],
    services: [],
    reviews: [],
  },
  {
    id: 'prov-5',
    name: { en: 'Nile Alignment, Tires & Suspension', ar: 'النيل للزوايا والاتزان والعفشة' },
    district: { en: 'Mohandessin, Giza/Cairo', ar: 'المهندسين، القاهرة الكبرى' },
    address: {
      en: '29 Gameat El-Dowal St, Mohandessin',
      ar: '٢٩ شارع جامعة الدول العربية، المهندسين',
    },
    type: 'mechanic',
    rating: 4.5,
    reviewCount: 64,
    distanceKm: 6.9,
    lat: 30.0511,
    lng: 31.2001,
    isOpen: false,
    isVerified: true,
    isTopRated: false,
    hours: { en: '10:00 AM - 8:00 PM', ar: '١٠:٠٠ ص - ٨:٠٠ م' },
    phone: '+201233445566',
    thumbnailUrl: svgThumb('#17365D', '#8A9AA6', 'NILE TIRES'),
    heroUrl: svgThumb('#17365D', '#8A9AA6', 'NILE ALIGNMENT'),
    logoUrl: svgThumb('#17365D', '#8A9AA6', 'NT'),
    about: {
      en: '3D laser wheel alignment, high-speed balancing, shock absorbers, and brake rotor resurfacing.',
      ar: 'ضبط زوايا بالليزر ثلاثي الأبعاد، ترصيص عالي السرعة، صيانة عفشة ومساعدين وخرط طنابير.',
    },
    tags: [
      { en: 'Tires & Balance', ar: 'إطارات وترصيص' },
      { en: 'Suspension', ar: 'عفشة ومساعدين' },
      { en: 'Brakes', ar: 'فرامل' },
    ],
    categories: ['tires', 'brakes'],
    services: [
      {
        id: 'srv-501',
        name: { en: '4-Wheel Laser Alignment & High-Speed Balance', ar: 'ضبط زوايا كمبيوتر وترصيص ٤ عجلات' },
        category: 'tires',
        priceFromEgp: 400,
        durationMins: 45,
      },
    ],
    reviews: [],
  },
];

export const INITIAL_PARTS: SparePartRecord[] = [
  {
    id: 'part-1',
    partNumber: '58101-F2A00',
    name: {
      en: 'Front Ceramic Brake Pads Set (Hyundai / Kia)',
      ar: 'طقم تيل فرامل أمامي سيراميك أصلي (هيونداي / كيا)',
    },
    category: 'brakes',
    compatibleModels: ['Hyundai Elantra 2016–2021', 'Kia Cerato 2018–2022'],
    description: {
      en: 'OEM low-dust ceramic front brake pad kit with wear sensor clips.',
      ar: 'طقم تيل فرامل أمامي أصلي مانع للصفير والتآكل مع مشابك الحساس.',
    },
    imageUrl: svgThumb('#17365D', '#790D16', 'OEM 58101'),
    offers: [
      {
        providerId: 'prov-4',
        providerName: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار' },
        district: { en: 'Downtown Cairo', ar: 'وسط البلد' },
        distanceKm: 5.8,
        priceEgp: 1450,
        condition: 'new',
        updatedMinutesAgo: 45,
        isVerified: true,
      },
      {
        providerId: 'prov-1',
        providerName: { en: 'AutoFix Garage', ar: 'أوتو فيكس جراج' },
        district: { en: 'Nasr City', ar: 'مدينة نصر' },
        distanceKm: 2.3,
        priceEgp: 1520,
        condition: 'new',
        updatedMinutesAgo: 120,
        isVerified: true,
      },
    ],
  },
  {
    id: 'part-2',
    partNumber: '25500-2B000',
    name: {
      en: 'Engine Cooling Thermostat & Housing Assembly',
      ar: 'ترموستات حرارة المحرك بالكوع الأصلي',
    },
    category: 'cooling',
    compatibleModels: ['Hyundai Elantra', 'Kia Cerato', 'Hyundai Accent RB'],
    description: {
      en: '82°C OEM thermostat assembly to prevent engine overheating and coolant bypass faults.',
      ar: 'ترموستات كوع أصلي ٨٢ درجة لمنع سخونة المحرك وضبط دورة المياه.',
    },
    imageUrl: svgThumb('#002043', '#790D16', 'OEM 25500'),
    offers: [
      {
        providerId: 'prov-4',
        providerName: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار' },
        district: { en: 'Downtown Cairo', ar: 'وسط البلد' },
        distanceKm: 5.8,
        priceEgp: 680,
        condition: 'new',
        updatedMinutesAgo: 30,
        isVerified: true,
      },
      {
        providerId: 'prov-4',
        providerName: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار' },
        district: { en: 'Downtown Cairo', ar: 'وسط البلد' },
        distanceKm: 5.8,
        priceEgp: 350,
        condition: 'used',
        updatedMinutesAgo: 95,
        isVerified: true,
      },
    ],
  },
  {
    id: 'part-3',
    partNumber: 'CMF-70L-DIN',
    name: {
      en: '70Ah Maintenance-Free Automotive Battery (12V)',
      ar: 'بطارية سيارة جافة ٧٠ أمبير (١٢ فولت)',
    },
    category: 'electrical',
    compatibleModels: ['Hyundai Elantra', 'Toyota Corolla', 'Kia Cerato', 'Nissan Sunny'],
    description: {
      en: 'High cold-cranking-amp calcium battery suited for hot Egyptian summers.',
      ar: 'بطارية جافة عالية الكفاءة مصممة لتحمل درجات الحرارة المرتفعة في مصر.',
    },
    imageUrl: svgThumb('#17365D', '#2E7D32', '70Ah 12V'),
    offers: [
      {
        providerId: 'prov-2',
        providerName: { en: 'El-Tahrir Auto Electrics & Battery', ar: 'التحرير لكهرباء السيارات' },
        district: { en: 'Maadi', ar: 'المعادي' },
        distanceKm: 3.1,
        priceEgp: 3200,
        condition: 'new',
        updatedMinutesAgo: 20,
        isVerified: true,
      },
    ],
  },
  {
    id: 'part-4',
    partNumber: '25380-3X100',
    name: {
      en: 'Radiator Cooling Fan Assembly (Complete Shroud + Motor)',
      ar: 'مروحة ردياتير كاملة بالموتور والقميص',
    },
    category: 'cooling',
    compatibleModels: ['Hyundai Elantra MD / AD', 'Kia Cerato'],
    description: {
      en: 'Available in both new OEM and tested imported used condition (supporting SDG 12 circular reuse).',
      ar: 'متوفرة جديدة أصلية أو استيراد فرز أول مفحوص بالضمان.',
    },
    imageUrl: svgThumb('#1F2937', '#790D16', 'FAN 25380'),
    offers: [
      {
        providerId: 'prov-4',
        providerName: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار' },
        district: { en: 'Downtown Cairo', ar: 'وسط البلد' },
        distanceKm: 5.8,
        priceEgp: 1650,
        condition: 'used',
        updatedMinutesAgo: 60,
        isVerified: true,
      },
      {
        providerId: 'prov-1',
        providerName: { en: 'AutoFix Garage', ar: 'أوتو فيكس جراج' },
        district: { en: 'Nasr City', ar: 'مدينة نصر' },
        distanceKm: 2.3,
        priceEgp: 3100,
        condition: 'new',
        updatedMinutesAgo: 180,
        isVerified: true,
      },
    ],
  },
  {
    id: 'part-5',
    partNumber: '39210-2E100',
    name: {
      en: 'Upstream Oxygen (O2) Lambda Sensor',
      ar: 'حساس شكمان (أكسجين) علوي أصلي',
    },
    category: 'diagnostics',
    compatibleModels: ['Hyundai Elantra', 'Kia Sportage', 'Kia Cerato'],
    description: {
      en: 'Resolves P0130–P0135 check-engine codes and restores optimal fuel consumption.',
      ar: 'يعالج لمبة الأعطال Check Engine ويحسن استهلاك البنزين.',
    },
    imageUrl: svgThumb('#17365D', '#8A9AA6', 'O2 SENSOR'),
    offers: [
      {
        providerId: 'prov-4',
        providerName: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار' },
        district: { en: 'Downtown Cairo', ar: 'وسط البلد' },
        distanceKm: 5.8,
        priceEgp: 1950,
        condition: 'new',
        updatedMinutesAgo: 75,
        isVerified: true,
      },
      {
        providerId: 'prov-4',
        providerName: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار' },
        district: { en: 'Downtown Cairo', ar: 'وسط البلد' },
        distanceKm: 5.8,
        priceEgp: 950,
        condition: 'used',
        updatedMinutesAgo: 110,
        isVerified: true,
      },
    ],
  },
];

export const INITIAL_VEHICLES: VehicleRecord[] = [
  {
    id: 'veh-1',
    make: 'Hyundai',
    model: 'Elantra AD',
    year: 2019,
    plate: 'أ ج ط ٧٤٢١',
    mileageKm: 79550,
  },
  {
    id: 'veh-2',
    make: 'Kia',
    model: 'Cerato K4',
    year: 2021,
    plate: 'س م د ٣١٩٨',
    mileageKm: 44200,
  },
];

export const INITIAL_MAINTENANCE: MaintenanceItem[] = [
  {
    id: 'mnt-1',
    vehicleId: 'veh-1',
    title: { en: 'Synthetic Engine Oil & Filter (10,000 km)', ar: 'تغيير زيت محرك تخليقي وفلتر (١٠,٠٠٠ كم)' },
    dueInKm: 450,
    lastDoneDate: '2026-06-14',
    lastDoneKm: 70000,
    status: 'upcoming',
  },
  {
    id: 'mnt-2',
    vehicleId: 'veh-1',
    title: { en: 'Front Brake Pads & Fluid Inspection', ar: 'فحص وتغيير تيل الفرامل الأمامي' },
    dueInKm: -320,
    lastDoneDate: '2025-11-10',
    lastDoneKm: 59000,
    status: 'overdue',
  },
  {
    id: 'mnt-3',
    vehicleId: 'veh-1',
    title: { en: 'Coolant Flush & Thermostat Check', ar: 'تغيير مياه التبريد وفحص الترموستات' },
    dueInKm: 10450,
    lastDoneDate: '2026-09-02',
    lastDoneKm: 75000,
    status: 'completed',
  },
];

export const INITIAL_FUEL_ENTRIES: FuelEntry[] = [
  {
    id: 'fuel-1',
    vehicleId: 'veh-1',
    date: '2026-09-20',
    odometerKm: 77800,
    liters: 40,
    costEgp: 600,
    consumptionLPer100Km: 8.4,
  },
  {
    id: 'fuel-2',
    vehicleId: 'veh-1',
    date: '2026-10-04',
    odometerKm: 78260,
    liters: 38,
    costEgp: 570,
    consumptionLPer100Km: 8.3,
  },
  {
    id: 'fuel-3',
    vehicleId: 'veh-1',
    date: '2026-10-18',
    odometerKm: 78720,
    liters: 41,
    costEgp: 615,
    consumptionLPer100Km: 8.9,
  },
  {
    id: 'fuel-4',
    vehicleId: 'veh-1',
    date: '2026-10-29',
    odometerKm: 79150,
    liters: 35,
    costEgp: 525,
    consumptionLPer100Km: 8.1,
  },
  {
    id: 'fuel-5',
    vehicleId: 'veh-1',
    date: '2026-11-04',
    odometerKm: 79550,
    liters: 31,
    costEgp: 465,
    consumptionLPer100Km: 7.8,
  },
];

export const INITIAL_REQUESTS: CustomerRequest[] = [
  {
    id: 'req-101',
    type: 'part_delivery',
    title: {
      en: 'Part Delivery: Engine Cooling Thermostat (25500-2B000)',
      ar: 'توصيل قطعة: ترموستات حرارة المحرك (25500-2B000)',
    },
    providerId: 'prov-4',
    providerName: { en: 'El-Tawfikia Genuine & Used Parts Hub', ar: 'مركز التوفيقية لقطع الغيار' },
    vehicleName: 'Hyundai Elantra AD (2019)',
    createdAtLabel: { en: 'Today, 2:15 PM', ar: 'اليوم، ٢:١٥ م' },
    priceEstimateEgp: 680,
    status: 'accepted',
    notes: 'Nasr City drop-off via third-party courier',
  },
  {
    id: 'req-102',
    type: 'service',
    title: {
      en: 'Service: OBD-II Computer Fault Scan & Reset',
      ar: 'صيانة: فحص كمبيوتر شامل ومسح الأعطال',
    },
    providerId: 'prov-1',
    providerName: { en: 'AutoFix Garage', ar: 'أوتو فيكس جراج' },
    vehicleName: 'Hyundai Elantra AD (2019)',
    createdAtLabel: { en: 'Oct 28, 2026', ar: '٢٨ أكتوبر ٢٠٢٦' },
    priceEstimateEgp: 350,
    status: 'completed',
    reviewed: false,
  },
  {
    id: 'req-103',
    type: 'part_delivery',
    title: {
      en: 'Part Delivery: Imported Used Alternator',
      ar: 'توصيل قطعة: دينامو استيراد',
    },
    providerId: 'prov-2',
    providerName: { en: 'El-Tahrir Auto Electrics & Battery', ar: 'التحرير لكهرباء السيارات' },
    vehicleName: 'Kia Cerato K4 (2021)',
    createdAtLabel: { en: 'Oct 15, 2026', ar: '١٥ أكتوبر ٢٠٢٦' },
    priceEstimateEgp: 2400,
    status: 'declined',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: {
      en: 'Part Delivery Request Accepted!',
      ar: 'تم قبول طلب توصيل قطعة الغيار!',
    },
    body: {
      en: 'El-Tawfikia Hub confirmed stock for Thermostat #25500-2B000. Courier assigned.',
      ar: 'أكد مركز التوفيقية توفر الترموستات #25500-2B000 وتم تسليمه للمندوب.',
    },
    minutesAgo: 18,
    read: false,
    linkTo: '/requests',
  },
  {
    id: 'notif-2',
    title: {
      en: 'Maintenance Reminder: Oil Change Due Soon',
      ar: 'تنبيه صيانة: موعد تغيير الزيت قريب',
    },
    body: {
      en: 'Your Hyundai Elantra AD is 450 km away from its 80,000 km service interval.',
      ar: 'يتبقى ٤٥٠ كم على موعد صيانة الـ ٨٠,٠٠٠ كم لسيارتك هيونداي إلنترا.',
    },
    minutesAgo: 190,
    read: false,
    linkTo: '/garage',
  },
];

