import type { LocalizedString, ServiceCategory } from '../../data/types';

export type DssCategoryKey =
  | 'starting'
  | 'overheating'
  | 'brakes'
  | 'warning_lights'
  | 'ac'
  | 'vibration';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DssQuickOption {
  id: string;
  label: LocalizedString;
  nextNodeId: string;
}

export interface DssQuestionNode {
  kind: 'question';
  id: string;
  categoryKey: DssCategoryKey;
  prompt: LocalizedString;
  options: DssQuickOption[];
}

export interface DssCauseWeight {
  label: LocalizedString;
  likelihoodPct: number;
}

export interface DssDiagnosisLeaf {
  kind: 'diagnosis';
  id: string;
  categoryKey: DssCategoryKey;
  serviceCategory: ServiceCategory;
  title: LocalizedString;
  summary: LocalizedString;
  urgency: UrgencyLevel;
  causes: DssCauseWeight[];
  recommendedService: LocalizedString;
  costRangeEgp: { min: number; max: number };
  relatedPartQuery: string;
}

export type DssNode = DssQuestionNode | DssDiagnosisLeaf;

export interface EntryChip {
  categoryKey: DssCategoryKey;
  entryNodeId: string;
  label: LocalizedString;
}

export const DSS_ENTRY_CHIPS: EntryChip[] = [
  {
    categoryKey: 'starting',
    entryNodeId: 'q_starting_1',
    label: {
      en: "Car won't start / clicking",
      ar: 'العربية مش بتدور / صوت تكتكة',
    },
  },
  {
    categoryKey: 'overheating',
    entryNodeId: 'q_overheating_1',
    label: {
      en: 'Temp gauge high / steam',
      ar: 'مؤشر الحرارة عالي / بخار',
    },
  },
  {
    categoryKey: 'brakes',
    entryNodeId: 'q_brakes_1',
    label: {
      en: 'Squeaking / soft brake pedal',
      ar: 'صفير فرامل / دواسة خفيفة',
    },
  },
  {
    categoryKey: 'warning_lights',
    entryNodeId: 'q_lights_1',
    label: {
      en: 'Check-Engine warning light',
      ar: 'لمبة الأعطال Check Engine',
    },
  },
  {
    categoryKey: 'ac',
    entryNodeId: 'q_ac_1',
    label: {
      en: 'AC blowing warm air',
      ar: 'التكييف بيطلع هواء سخن',
    },
  },
  {
    categoryKey: 'vibration',
    entryNodeId: 'q_vibration_1',
    label: {
      en: 'Shaking / vibration at speed',
      ar: 'رعشة أو غربلة على السرعة',
    },
  },
];

export const DSS_NODES: Record<string, DssNode> = {
  // 1. STARTING / BATTERY
  q_starting_1: {
    kind: 'question',
    id: 'q_starting_1',
    categoryKey: 'starting',
    prompt: {
      en: 'When you turn the key or press Start, what happens to the dashboard lights and starter sound?',
      ar: 'لما بتفتح الكونتاكت أو تدور، إيه حالة أنوار التابلوه وصوت المارش؟',
    },
    options: [
      {
        id: 'opt_click_dim',
        label: {
          en: 'Rapid clicking & dim dashboard lights',
          ar: 'تكتكة سريعة وأنوار التابلوه ضعيفة',
        },
        nextNodeId: 'q_starting_2',
      },
      {
        id: 'opt_single_clunk',
        label: {
          en: 'Bright lights, single loud click, no crank',
          ar: 'الأنوار قوية مع تكة واحدة ومفيش دوران',
        },
        nextNodeId: 'diag_starter_motor',
      },
    ],
  },
  q_starting_2: {
    kind: 'question',
    id: 'q_starting_2',
    categoryKey: 'starting',
    prompt: {
      en: 'How old is your car battery, or did the red battery icon appear while driving recently?',
      ar: 'عمر البطارية قد إيه تقريباً، وهل ظهرت علامة البطارية الحمراء أثناء المشي؟',
    },
    options: [
      {
        id: 'opt_old_battery',
        label: {
          en: 'Battery is over 18 months old / sat unused',
          ar: 'البطارية أقدم من سنة ونص / ركنة طويلة',
        },
        nextNodeId: 'diag_weak_battery',
      },
      {
        id: 'opt_red_icon',
        label: {
          en: 'Battery light flickered while driving',
          ar: 'لمبة البطارية نورت وأنا ماشي',
        },
        nextNodeId: 'diag_alternator',
      },
    ],
  },
  diag_weak_battery: {
    kind: 'diagnosis',
    id: 'diag_weak_battery',
    categoryKey: 'starting',
    serviceCategory: 'electrical',
    title: {
      en: 'Discharged or Sulfated 12V Battery',
      ar: 'ضعف أو تلف بطارية السيارة (١٢ فولت)',
    },
    summary: {
      en: 'Rapid clicking with dim electronics indicates low cold-cranking voltage across the battery terminals.',
      ar: 'صوت التكتكة مع ضعف أنوار التابلوه يشير لانخفاض جهد البطارية وعدم قدرتها على تدوير المارش.',
    },
    urgency: 'medium',
    causes: [
      { label: { en: 'Weak / End-of-life 12V Battery', ar: 'ضعف البطارية أو انتهاء عمرها' }, likelihoodPct: 60 },
      { label: { en: 'Corroded or loose battery terminals', ar: 'تمليح أو ارتخاء قواطيش البطارية' }, likelihoodPct: 25 },
      { label: { en: 'Weak alternator charging output', ar: 'ضعف شحن الدينامو' }, likelihoodPct: 15 },
    ],
    recommendedService: {
      en: 'Battery & Alternator Load Test (Electrical)',
      ar: 'اختبار البطارية وشحن الدينامو (كهرباء)',
    },
    costRangeEgp: { min: 200, max: 3200 },
    relatedPartQuery: '70Ah',
  },
  diag_starter_motor: {
    kind: 'diagnosis',
    id: 'diag_starter_motor',
    categoryKey: 'starting',
    serviceCategory: 'electrical',
    title: {
      en: 'Starter Motor Solenoid / Brushes Fault',
      ar: 'عطل في أوتوماتيك أو شربون المارش',
    },
    summary: {
      en: 'Full dashboard voltage with a single heavy click points to the starter solenoid engaging without spinning the motor.',
      ar: 'قوة الأنوار مع سماع تكة واحدة تشير غالباً لتعليق أوتوماتيك المارش أو تآكل الشربون.',
    },
    urgency: 'high',
    causes: [
      { label: { en: 'Worn starter motor solenoid / brushes', ar: 'تآكل شربون أو أوتوماتيك المارش' }, likelihoodPct: 60 },
      { label: { en: 'Starter relay or ignition switch drop', ar: 'ضعف كتاوت المارش' }, likelihoodPct: 25 },
      { label: { en: 'Battery voltage drop under load', ar: 'هبوط جهد البطارية تحت الحمل' }, likelihoodPct: 15 },
    ],
    recommendedService: {
      en: 'Starter Motor & Electrical Overhaul',
      ar: 'صيانة وإصلاح المارش والدائرة الكهربائية',
    },
    costRangeEgp: { min: 450, max: 1800 },
    relatedPartQuery: 'CMF-70L',
  },
  diag_alternator: {
    kind: 'diagnosis',
    id: 'diag_alternator',
    categoryKey: 'starting',
    serviceCategory: 'electrical',
    title: {
      en: 'Alternator Charging System Fault',
      ar: 'ضعف شحن الدينامو أو سير المجموعة',
    },
    summary: {
      en: 'A battery warning light while driving means the alternator was not recharging the battery.',
      ar: 'ظهور لمبة البطارية أثناء القيادة يعني أن الدينامو لا يقوم بشحن البطارية بالشكل الكافي.',
    },
    urgency: 'high',
    causes: [
      { label: { en: 'Alternator voltage regulator / diodes', ar: 'كتاوت أو سيليكونات الدينامو' }, likelihoodPct: 55 },
      { label: { en: 'Slipping serpentine belt', ar: 'ارتخاء أو تآكل سير المجموعة' }, likelihoodPct: 30 },
      { label: { en: 'Drained 12V battery', ar: 'تفريغ شحن البطارية' }, likelihoodPct: 15 },
    ],
    recommendedService: {
      en: 'Alternator Output & Belt Inspection',
      ar: 'فحص شحن الدينامو وسير المجموعة',
    },
    costRangeEgp: { min: 500, max: 2600 },
    relatedPartQuery: '70Ah',
  },

  // 2. OVERHEATING (CRITICAL)
  q_overheating_1: {
    kind: 'question',
    id: 'q_overheating_1',
    categoryKey: 'overheating',
    prompt: {
      en: 'When does the temperature gauge rise, and do you see steam or coolant puddles under the car?',
      ar: 'إمتى مؤشر الحرارة بيعلى، وهل في بخار أو تسريب مياه تحت العربية؟',
    },
    options: [
      {
        id: 'opt_traffic_idle',
        label: {
          en: 'Rises in Cairo traffic / idle, drops on highway',
          ar: 'بتعلى في الزحمة والوقوف وتنزل على الطريق السريع',
        },
        nextNodeId: 'diag_cooling_fan',
      },
      {
        id: 'opt_steam_rapid',
        label: {
          en: 'Rapid spike into Red zone / steam from hood',
          ar: 'ارتفاع سريع للمنطقة الحمراء أو بخار من الكبوت',
        },
        nextNodeId: 'diag_coolant_thermostat',
      },
    ],
  },
  diag_cooling_fan: {
    kind: 'diagnosis',
    id: 'diag_cooling_fan',
    categoryKey: 'overheating',
    serviceCategory: 'cooling',
    title: {
      en: 'Radiator Cooling Fan or Relay Failure',
      ar: 'توقف مروحة التبريد أو كتاوت المروحة',
    },
    summary: {
      en: 'Overheating at idle or in slow traffic that cools down at speed strongly indicates insufficient airflow from the electric radiator fan.',
      ar: 'ارتفاع الحرارة في الزحمة وانخفاضها مع المشي السريع يدل غالباً على عدم عمل مروحة الردياتير أو الكتاوت.',
    },
    urgency: 'critical',
    causes: [
      { label: { en: 'Radiator cooling fan motor / relay fault', ar: 'عطل موتور مروحة التبريد أو الكتاوت' }, likelihoodPct: 50 },
      { label: { en: 'Low coolant level / air pocket', ar: 'نقص مياه التبريد أو وجود هواء بالدورة' }, likelihoodPct: 30 },
      { label: { en: 'Partially sticking thermostat', ar: 'ثقل في فتح ترموستات الحرارة' }, likelihoodPct: 20 },
    ],
    recommendedService: {
      en: 'Cooling Fan & Radiator Circuit Inspection',
      ar: 'فحص مروحة التبريد ودورة الردياتير',
    },
    costRangeEgp: { min: 650, max: 3100 },
    relatedPartQuery: '25380',
  },
  diag_coolant_thermostat: {
    kind: 'diagnosis',
    id: 'diag_coolant_thermostat',
    categoryKey: 'overheating',
    serviceCategory: 'cooling',
    title: {
      en: 'Critical Coolant Loss or Stuck Closed Thermostat',
      ar: 'نقص حاد بمياه التبريد أو قفش الترموستات',
    },
    summary: {
      en: 'STOP DRIVING IMMEDIATELY to prevent cylinder head gasket damage. Do not open the hot radiator cap.',
      ar: 'أوقف السيارة فوراً لحماية جوان وش السلندر، ولا تفتح غطاء الردياتير والسيارة ساخنة.',
    },
    urgency: 'critical',
    causes: [
      { label: { en: 'Coolant leak (hose / radiator / water pump)', ar: 'تسريب مياه (خرطوم / ردياتير / طلمبة)' }, likelihoodPct: 45 },
      { label: { en: 'Thermostat stuck closed', ar: 'تلف أو قفش ترموستات الحرارة' }, likelihoodPct: 30 },
      { label: { en: 'Radiator fan failure', ar: 'توقف مروحة الردياتير' }, likelihoodPct: 25 },
    ],
    recommendedService: {
      en: 'Cooling System Pressure Test & Thermostat Service',
      ar: 'اختبار ضغط دورة التبريد وتغيير الترموستات',
    },
    costRangeEgp: { min: 650, max: 1850 },
    relatedPartQuery: '25500',
  },

  // 3. BRAKES
  q_brakes_1: {
    kind: 'question',
    id: 'q_brakes_1',
    categoryKey: 'brakes',
    prompt: {
      en: 'What do you feel or hear when pressing the brake pedal?',
      ar: 'إيه اللي بتسمعه أو تحس بيه لما بتدوس فرامل؟',
    },
    options: [
      {
        id: 'opt_squeak',
        label: {
          en: 'High-pitched squealing or metallic grinding',
          ar: 'صوت صفير عالي أو احتكاك معدن',
        },
        nextNodeId: 'diag_brake_pads',
      },
      {
        id: 'opt_spongy',
        label: {
          en: 'Spongy / sinking pedal or steering shake when braking',
          ar: 'دواسة إسفنجية بتسقط أو رعشة مع الفرامل',
        },
        nextNodeId: 'diag_brake_fluid_rotors',
      },
    ],
  },
  diag_brake_pads: {
    kind: 'diagnosis',
    id: 'diag_brake_pads',
    categoryKey: 'brakes',
    serviceCategory: 'brakes',
    title: {
      en: 'Worn Front Brake Pads (Wear Indicator Contact)',
      ar: 'تآكل تيل الفرامل الأمامي (وصول لمؤشر التآكل)',
    },
    summary: {
      en: 'Squealing under braking indicates the pad friction material has reached the wear tab. Replace promptly to protect brake rotors.',
      ar: 'صوت الصفير مع الفرامل يعني وصول تيل الفرامل للحد الأدنى. يُنصح بالتغيير السريع لحماية الطنابير.',
    },
    urgency: 'high',
    causes: [
      { label: { en: 'Worn front ceramic/semi-metallic brake pads', ar: 'تآكل تيل الفرامل الأمامي' }, likelihoodPct: 55 },
      { label: { en: 'Glazed or grooved brake rotors', ar: 'تآكل سطح طنابير الفرامل' }, likelihoodPct: 30 },
      { label: { en: 'Low brake fluid level in reservoir', ar: 'نقص زيت الفرامل بالخزان' }, likelihoodPct: 15 },
    ],
    recommendedService: {
      en: 'Brake Pad Replacement & Rotor Inspection',
      ar: 'تغيير تيل الفرامل وفحص الطنابير',
    },
    costRangeEgp: { min: 450, max: 1650 },
    relatedPartQuery: '58101',
  },
  diag_brake_fluid_rotors: {
    kind: 'diagnosis',
    id: 'diag_brake_fluid_rotors',
    categoryKey: 'brakes',
    serviceCategory: 'brakes',
    title: {
      en: 'Air in Brake Lines / Warped Brake Rotors',
      ar: 'هواء بدورة الفرامل أو اعوجاج بالطنابير',
    },
    summary: {
      en: 'A soft pedal indicates hydraulic pressure loss or old DOT-4 fluid; pulsing indicates uneven rotor thickness.',
      ar: 'الدواسة الخفيفة تدل على وجود هواء أو ضعف زيت الفرامل، والرعشة تدل على حاجة الطنابير للخرط أو التغيير.',
    },
    urgency: 'high',
    causes: [
      { label: { en: 'Degraded brake fluid / air in hydraulic lines', ar: 'ضعف زيت الفرامل أو وجود هواء بالدورة' }, likelihoodPct: 45 },
      { label: { en: 'Warped front brake discs (rotors)', ar: 'اعوجاج طنابير الفرامل الأمامية' }, likelihoodPct: 35 },
      { label: { en: 'Worn brake pads', ar: 'تآكل تيل الفرامل' }, likelihoodPct: 20 },
    ],
    recommendedService: {
      en: 'Hydraulic Brake Bleed & Rotor Service',
      ar: 'تغيير زيت الفرامل وفحص الطنابير',
    },
    costRangeEgp: { min: 500, max: 1900 },
    relatedPartQuery: '58101',
  },

  // 4. WARNING LIGHTS
  q_lights_1: {
    kind: 'question',
    id: 'q_lights_1',
    categoryKey: 'warning_lights',
    prompt: {
      en: 'Is the Check-Engine light steady yellow or flashing, and is the engine running rough?',
      ar: 'هل لمبة Check Engine ثابتة ولا بتعمل فلاش (بتنور وتطفي)، وهل في تنتيش في الموتور؟',
    },
    options: [
      {
        id: 'opt_steady_normal',
        label: {
          en: 'Steady light, car drives mostly normal (higher fuel use)',
          ar: 'ثابتة، والسحب طبيعي مع زيادة استهلاك البنزين',
        },
        nextNodeId: 'diag_o2_sensor',
      },
      {
        id: 'opt_flashing_misfire',
        label: {
          en: 'Flashing light with engine hesitation / rough idle',
          ar: 'بتعمل فلاش مع تقطيع أو رعشة في السلانسيه',
        },
        nextNodeId: 'diag_ignition_misfire',
      },
    ],
  },
  diag_o2_sensor: {
    kind: 'diagnosis',
    id: 'diag_o2_sensor',
    categoryKey: 'warning_lights',
    serviceCategory: 'diagnostics',
    title: {
      en: 'Oxygen (O2) Sensor or Emissions Circuit Code',
      ar: 'عطل حساس الشكمان (الأكسجين) أو دورة البخر',
    },
    summary: {
      en: 'A steady Check-Engine light accompanied by increased fuel consumption is commonly triggered by a sluggish upstream O2 sensor.',
      ar: 'ثبات لمبة الأعطال مع زيادة استهلاك البنزين يرتبط غالباً بحساس الشكمان العلوي ويحتاج فحص OBD-II.',
    },
    urgency: 'low',
    causes: [
      { label: { en: 'Upstream Oxygen (O2) sensor aging', ar: 'ضعف حساس الأكسجين (الشكمان)' }, likelihoodPct: 40 },
      { label: { en: 'Loose fuel cap / EVAP purge valve', ar: 'بلف البخر أو غطاء التانك' }, likelihoodPct: 30 },
      { label: { en: 'Dirty throttle body / MAF sensor', ar: 'اتساخ البوابة أو حساس الهواء' }, likelihoodPct: 30 },
    ],
    recommendedService: {
      en: 'OBD-II Computer Fault Scan & Sensor Check',
      ar: 'فحص كمبيوتر OBD-II وفحص الحساسات',
    },
    costRangeEgp: { min: 350, max: 1950 },
    relatedPartQuery: '39210',
  },
  diag_ignition_misfire: {
    kind: 'diagnosis',
    id: 'diag_ignition_misfire',
    categoryKey: 'warning_lights',
    serviceCategory: 'diagnostics',
    title: {
      en: 'Cylinder Ignition Misfire (Spark Plugs / Coils)',
      ar: 'تقطيع في الإشعال (بوجيهات أو موبينة)',
    },
    summary: {
      en: 'A flashing Check-Engine light indicates active cylinder misfire that can overheat the catalytic converter.',
      ar: 'وميض لمبة الأعطال مع التقطيع يدل على عدم احتراق في أحد السلندرات بسبب البوجيهات أو الموبينة.',
    },
    urgency: 'high',
    causes: [
      { label: { en: 'Worn spark plugs or faulty ignition coil', ar: 'تلف البوجيهات أو موبينة الإشعال' }, likelihoodPct: 50 },
      { label: { en: 'Clogged fuel injector', ar: 'انسداد رشاشات البنزين' }, likelihoodPct: 30 },
      { label: { en: 'Upstream O2 sensor fault', ar: 'حساس الأكسجين' }, likelihoodPct: 20 },
    ],
    recommendedService: {
      en: 'OBD-II Scan & Ignition Tune-Up',
      ar: 'كشف كمبيوتر وصيانة البوجيهات والمباين',
    },
    costRangeEgp: { min: 350, max: 1600 },
    relatedPartQuery: '39210',
  },

  // 5. AC
  q_ac_1: {
    kind: 'question',
    id: 'q_ac_1',
    categoryKey: 'ac',
    prompt: {
      en: 'Is the airflow weak from the vents, or is the airflow strong but not cold?',
      ar: 'هل دفع الهواء نفسه ضعيف، ولا دفع الهواء قوي لكنه غير بارد؟',
    },
    options: [
      {
        id: 'opt_strong_warm',
        label: {
          en: 'Airflow is strong, but air stays warm',
          ar: 'دفع الهواء قوي لكن التبريد ضعيف أو ساخن',
        },
        nextNodeId: 'diag_ac_refrigerant',
      },
      {
        id: 'opt_weak_airflow',
        label: {
          en: 'Very weak airflow even on max fan speed',
          ar: 'دفع الهواء ضعيف جداً حتى على أعلى سرعة',
        },
        nextNodeId: 'diag_ac_cabin_filter',
      },
    ],
  },
  diag_ac_refrigerant: {
    kind: 'diagnosis',
    id: 'diag_ac_refrigerant',
    categoryKey: 'ac',
    serviceCategory: 'ac',
    title: {
      en: 'Low AC Refrigerant (Freon) or Compressor Valve',
      ar: 'نقص شحنة فريون التكييف أو بلف الكباس',
    },
    summary: {
      en: 'Warm air with good blower speed usually points to low R134a refrigerant pressure or a worn compressor control solenoid.',
      ar: 'قوة الهواء مع ضعف التبريد تشير غالباً لنقص شحنة الفريون أو ضعف بلف كباس التكييف.',
    },
    urgency: 'low',
    causes: [
      { label: { en: 'Low R134a refrigerant charge / micro-leak', ar: 'نقص شحنة الفريون أو تسريب بسيط' }, likelihoodPct: 50 },
      { label: { en: 'AC compressor control valve / clutch', ar: 'بلف كباس التكييف أو الكلاتش' }, likelihoodPct: 30 },
      { label: { en: 'Dust-clogged condenser fins', ar: 'اتساخ سربنتينة التكييف الأمامية' }, likelihoodPct: 20 },
    ],
    recommendedService: {
      en: 'AC Freon Recharge & UV Leak Test',
      ar: 'شحن فريون التكييف وكشف التسريب',
    },
    costRangeEgp: { min: 600, max: 1400 },
    relatedPartQuery: '25380',
  },
  diag_ac_cabin_filter: {
    kind: 'diagnosis',
    id: 'diag_ac_cabin_filter',
    categoryKey: 'ac',
    serviceCategory: 'ac',
    title: {
      en: 'Clogged Cabin Air Filter / Blower Resistor',
      ar: 'انسداد فلتر التكييف الداخلي (الكابينة)',
    },
    summary: {
      en: 'Cairo dust quickly saturates cabin filters, restricting evaporator airflow.',
      ar: 'تراكم الأتربة في فلتر التكييف يمنع مرور الهواء البارد داخل المقصورة.',
    },
    urgency: 'low',
    causes: [
      { label: { en: 'Dust-clogged cabin air filter', ar: 'انسداد فلتر هواء التكييف' }, likelihoodPct: 65 },
      { label: { en: 'Blower fan motor resistor', ar: 'مقاومة مروحة التكييف الداخلية' }, likelihoodPct: 20 },
      { label: { en: 'Low refrigerant level', ar: 'نقص الفريون' }, likelihoodPct: 15 },
    ],
    recommendedService: {
      en: 'Cabin Filter Replacement & AC Sanitization',
      ar: 'تغيير فلتر التكييف وتنظيف الثلاجة',
    },
    costRangeEgp: { min: 250, max: 700 },
    relatedPartQuery: '25380',
  },

  // 6. VIBRATION / TIRES
  q_vibration_1: {
    kind: 'question',
    id: 'q_vibration_1',
    categoryKey: 'vibration',
    prompt: {
      en: 'Does the vibration happen above 80–100 km/h on the highway, or over Cairo bumps and potholes?',
      ar: 'هل الرعشة بتحصل بعد سرعة ٨٠–١٠٠ كم/س، ولا مع المطبات والنقر؟',
    },
    options: [
      {
        id: 'opt_highway_shake',
        label: {
          en: 'Steering wheel shakes between 90–110 km/h',
          ar: 'رعشة في الطارة بين سرعة ٩٠ و ١١٠ كم/س',
        },
        nextNodeId: 'diag_wheel_balance',
      },
      {
        id: 'opt_bumps_clunk',
        label: {
          en: 'Clunking noise & pulling over bumps',
          ar: 'خبط في العفشة أو حدفة مع المطبات',
        },
        nextNodeId: 'diag_suspension_alignment',
      },
    ],
  },
  diag_wheel_balance: {
    kind: 'diagnosis',
    id: 'diag_wheel_balance',
    categoryKey: 'vibration',
    serviceCategory: 'tires',
    title: {
      en: 'Wheel Imbalance or Tire Flat-Spotting',
      ar: 'الحاجة لترصيص العجلات وضبط الزوايا',
    },
    summary: {
      en: 'Speed-specific steering vibration around 90–110 km/h is the classic signature of front wheel weight imbalance.',
      ar: 'رعشة عجلة القيادة على سرعة ٩٠-١١٠ كم/س تنتج غالباً عن فقدان رصاص الترصيص أو عدم اتزان الإطارات.',
    },
    urgency: 'medium',
    causes: [
      { label: { en: 'Front wheel dynamic imbalance', ar: 'عدم اتزان العجلات الأمامية (ترصيص)' }, likelihoodPct: 50 },
      { label: { en: 'Uneven tire wear or rim bend', ar: 'تآكل غير منتظم بالإطارات أو اعوجاج الجنط' }, likelihoodPct: 30 },
      { label: { en: 'Tie-rod or control arm bushing play', ar: 'بوش في بارات الدركسيون أو المقصات' }, likelihoodPct: 20 },
    ],
    recommendedService: {
      en: 'High-Speed Wheel Balancing & 3D Alignment',
      ar: 'ترصيص كمبيوتر وضبط زوايا بالليزر',
    },
    costRangeEgp: { min: 300, max: 650 },
    relatedPartQuery: '58101',
  },
  diag_suspension_alignment: {
    kind: 'diagnosis',
    id: 'diag_suspension_alignment',
    categoryKey: 'vibration',
    serviceCategory: 'tires',
    title: {
      en: 'Front Suspension Bushings / Strut Mount Wear',
      ar: 'تآكل جلب المقصات أو بطاحات المساعدين',
    },
    summary: {
      en: 'Clunking over uneven roads and pulling to one side points to worn control arm bushings or stabilizer links.',
      ar: 'أصوات الخبط مع المطبات وانحراف السيارة تشير لتآكل جلب المقصات أو تيش الميزان وتحتاج ضبط زوايا.',
    },
    urgency: 'medium',
    causes: [
      { label: { en: 'Control arm bushings / stabilizer links', ar: 'جلب المقصات أو تيش الميزان' }, likelihoodPct: 50 },
      { label: { en: 'Wheel alignment out of spec', ar: 'اختلال زوايا العجل الأمامي' }, likelihoodPct: 30 },
      { label: { en: 'Front shock absorber / strut mount', ar: 'المساعدين أو البطاحات' }, likelihoodPct: 20 },
    ],
    recommendedService: {
      en: 'Suspension Inspection & 4-Wheel Laser Alignment',
      ar: 'فحص عفشة كامل وضبط زوايا',
    },
    costRangeEgp: { min: 400, max: 1500 },
    relatedPartQuery: '58101',
  },
};

const KEYWORD_MAP: Array<{ keywords: string[]; nodeId: string }> = [
  {
    keywords: [
      'start',
      'battery',
      'click',
      'crank',
      'alternator',
      'batarya',
      'bataraya',
      'marsh',
      'ydoor',
      'tedoor',
      'بطارية',
      'بطاريه',
      'مارش',
      'دينامو',
      'بتدور',
      'تكتكة',
    ],
    nodeId: 'q_starting_1',
  },
  {
    keywords: [
      'heat',
      'hot',
      'temp',
      'steam',
      'coolant',
      'radiator',
      'fan',
      'sukhuna',
      'sokhna',
      'harara',
      'حرارة',
      'حراره',
      'سخونة',
      'بتسخن',
      'بخار',
      'ردياتير',
      'مروحة',
      'مياه',
    ],
    nodeId: 'q_overheating_1',
  },
  {
    keywords: [
      'brake',
      'squeak',
      'squeal',
      'pedal',
      'stop',
      'pads',
      'faramel',
      'tiel',
      'فرامل',
      'تيل',
      'صفير',
      'صوت فرامل',
      'طنابير',
    ],
    nodeId: 'q_brakes_1',
  },
  {
    keywords: [
      'light',
      'check',
      'engine',
      'code',
      'obd',
      'sensor',
      'lamba',
      'لمبة',
      'لمبه',
      'حساس',
      'كمبيوتر',
      'شكمان',
    ],
    nodeId: 'q_lights_1',
  },
  {
    keywords: [
      'ac',
      'air',
      'cold',
      'warm',
      'freon',
      'takyeef',
      'takyif',
      'تكييف',
      'فريون',
      'تبريد',
      'هواء سخن',
    ],
    nodeId: 'q_ac_1',
  },
  {
    keywords: [
      'shake',
      'vibrat',
      'tire',
      'wheel',
      'bump',
      'balance',
      'ra3sha',
      '3afsha',
      'رعشة',
      'رعشه',
      'غربلة',
      'عفشة',
      'زوايا',
      'ترصيص',
      'كاوتش',
    ],
    nodeId: 'q_vibration_1',
  },
];

export function matchFreeTextToEntryNode(input: string): DssQuestionNode {
  const normalized = input.trim().toLowerCase();
  for (const group of KEYWORD_MAP) {
    if (group.keywords.some((kw) => normalized.includes(kw))) {
      const node = DSS_NODES[group.nodeId];
      if (node && node.kind === 'question') {
        return node;
      }
    }
  }
  // Default fallback to Check-Engine / General Diagnostics intake
  return DSS_NODES['q_lights_1'] as DssQuestionNode;
}

export function stepDssNode(currentNodeId: string, selectedOptionId: string): DssNode {
  const current = DSS_NODES[currentNodeId];
  if (!current || current.kind !== 'question') {
    throw new Error(`Invalid question node: ${currentNodeId}`);
  }
  const option = current.options.find((o) => o.id === selectedOptionId);
  if (!option) {
    throw new Error(`Option ${selectedOptionId} not found in node ${currentNodeId}`);
  }
  const next = DSS_NODES[option.nextNodeId];
  if (!next) {
    throw new Error(`Target node ${option.nextNodeId} not found`);
  }
  return next;
}
