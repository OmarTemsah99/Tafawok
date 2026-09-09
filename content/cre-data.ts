import {
  Property,
  OwnerContact,
  NavItem,
  CorporateMetric,
  ClientPartner,
  CommercialDiscipline,
} from "@/types/cre"
import en from "@/locales/en.json"
import ar from "@/locales/ar.json"

export const COMPANY_IDENTITY = {
  name: {
    en: "TAFAWOK Real Estate Investment & Contracting",
    ar: "شركة تفوق للاستثمار العقاري والمقاولات",
  },
  shortName: {
    en: "TAFAWOK CRE",
    ar: "تفوق العقارية",
  },
  tagline: {
    en: "Engineering Commercial Excellence. Investing in Enduring Real Estate Assets.",
    ar: "ريادة الاستثمار العقاري التجاري والمقاولات المتكاملة في الشرق الأوسط.",
  },
  establishedYears: 25,
  heritageDecades: 5,
  headquarters: {
    address: {
      en: "Building 360, Industrial Area, Fifth Settlement, New Cairo, Egypt",
      ar: "مبنى 360 – المنطقة الصناعية – التجمع الخامس – القاهرة الجديدة – مصر",
    },
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110543.91894223062!2d31.428781446702587!3d30.013583279144865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822f306637e6f%3A0x6b1070e3eb7d8c47!2sFifth%20Settlement%2C%20New%20Cairo%201%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
    googleMapsLink:
      "https://maps.google.com/?q=Fifth+Settlement+New+Cairo+Egypt",
  },
  contact: {
    primaryPhone: "+20 110 042 4829",
    secondaryPhone: "+20 111 383 6660",
    fax: "+20 2 2327 6015",
    email: "info@tafawok.co",
    primaryDomain: "https://tafawok.co/",
  },
}

export const OWNER_DETAILS: OwnerContact = {
  name: {
    en: "Eng. Tarek Ahmed",
    ar: "م. طارق أحمد",
  },
  role: {
    en: "Chief Executive Officer & Company Owner",
    ar: "الرئيس التنفيذي ومالك الشركة",
  },
  company: {
    en: "TAFAWOK Real Estate Investment & Contracting Co.",
    ar: "شركة تفوق للاستثمار العقاري والمقاولات",
  },
  experience: {
    en: "25+ Years in Commercial Real Estate, Infrastructure & Regional Megaprojects",
    ar: "أكثر من 25 عاماً في قيادة التطوير العقاري التجاري والبنية التحتية والمشروعات الكبرى",
  },
  phone: "+20 110 042 4829",
  altPhone: "+20 111 383 6660",
  email: "info@tafawok.co",
  whatsapp: "+201100424829",
  headquarters: {
    en: "Executive Office, Building 360, Fifth Settlement, New Cairo",
    ar: "المكتب التنفيذي، مبنى 360، التجمع الخامس، القاهرة الجديدة",
  },
  visionSnippet: {
    en: "At TAFAWOK, we do not merely erect buildings; we create long-term institutional value. Every commercial asset we develop is engineered for superior tenant performance, architectural distinction, and generational investment return across Egypt and the Gulf.",
    ar: "في تفوق، لا نكتفي ببناء الجدران، بل نصنع قيمة مؤسسية مستدامة. كل أصل عقاري تجاري نطوره مصمم لتحقيق أعلى كفاءة للمستأجرين، وتميز معماري رفيع، وعائد استثماري ممتد للأجيال في مصر ودول الخليج العربي.",
  },
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    href: "/",
    label: { en: "Home", ar: "الرئيسية" },
  },
  {
    key: "about",
    href: "/about",
    label: { en: "About Us", ar: "من نحن" },
  },
  {
    key: "properties",
    href: "/properties",
    label: { en: "Commercial Assets", ar: "الأصول التجارية" },
    subItems: [
      {
        href: "/properties/building-360-business-park",
        label: { en: "Building 360 Business Park", ar: "مجمع 360 الإداري" },
        description: {
          en: "Flagship Corporate Headquarters & Prime Office Hub in New Cairo",
          ar: "المقر الإداري الرئيسي ومكاتب الشركات بالتجمع الخامس",
        },
      },
      {
        href: "/properties/tafawok-retail-center",
        label: { en: "Tafawok Retail Center", ar: "مركز تفوق التجاري والمول" },
        description: {
          en: "Regional Destination Mall with Anchor Hypermarket & Dining",
          ar: "وجهة التسوق الإقليمية وهايبر ماركت ومطاعم عائلية",
        },
      },
      {
        href: "/properties/tafawok-logistics-park",
        label: {
          en: "Tafawok Logistics Park",
          ar: "مجمع تفوق اللوجستي والتجاري",
        },
        description: {
          en: "Integrated Commercial Showrooms & Advanced Warehousing Hub",
          ar: "معارض تجارية متطورة ومستودعات ومكاتب هندسية",
        },
      },
    ],
  },
  {
    key: "ceo",
    href: "/ceo-message",
    label: { en: "CEO Message", ar: "رسالة الرئيس التنفيذي" },
  },
  {
    key: "contact",
    href: "/contact",
    label: { en: "Contact & Inquiries", ar: "اتصل بنا والاستفسارات" },
  },
]

export const CORPORATE_METRICS: CorporateMetric[] = [
  {
    value: 25,
    suffix: "+",
    label: { en: "Years Track Record", ar: "عاماً من الإنجاز والخبرة" },
    description: {
      en: "Continuous multidisciplinary execution in Egypt & GCC",
      ar: "مسيرة مستمرة من الإنجاز في مصر ودول الخليج",
    },
  },
  {
    value: 5,
    suffix: " Decades",
    label: { en: "Gulf Heritage", ar: "عقود من الخبرة الإقليمية" },
    description: {
      en: "Executive leadership rooted in 50 years of Gulf megaprojects",
      ar: "إدارة عليا مستندة إلى 50 عاماً من العمل في مشروعات الخليج الكبرى",
    },
  },
  {
    value: 77500,
    suffix: " m²",
    label: {
      en: "Commercial Portfolio GLA",
      ar: "متر مربع مساحات تأجيرية تجارية",
    },
    description: {
      en: "Prime leasable footprint across commercial offices, retail & logistics",
      ar: "مساحات متميزة تشمل المكاتب والمراكز التجارية واللوجستية",
    },
  },
  {
    value: 50,
    suffix: "+",
    label: {
      en: "Core Engineers & Specialists",
      ar: "مهندساً واستشارياً متخصصاً",
    },
    description: {
      en: "Directly sponsored multidisciplinary technical cadre",
      ar: "كادر هندسي وتنفيذي دائم عالي الكفاءة",
    },
  },
]

export const PROPERTIES: Property[] = [
  {
    id: "building-360",
    slug: "building-360-business-park",
    name: {
      en: "Building 360 Business Park",
      ar: "مجمع 360 الإداري والتجاري",
    },
    tagline: {
      en: "Prime Grade-A Corporate Office Hub & Executive Suites in New Cairo",
      ar: "أرقى المكاتب الإدارية والمقرات المؤسسية من الفئة (A) بالتجمع الخامس",
    },
    type: "office",
    status: "active",
    category: {
      en: "Office & Corporate Hub",
      ar: "مكاتب إدارية ومقرات شركات",
    },
    description: {
      en: "Building 360 is TAFAWOK's flagship corporate address, situated in the premier commercial heart of New Cairo's Fifth Settlement. Engineered for multinational corporations, financial institutions, and regional headquarters, it combines monumental architectural presence with energy-efficient MEP infrastructure, high-speed fiber backbone, and executive hospitality amenities.",
      ar: "يعد مبنى 360 المجمع الإداري الرئيسي لشركة تفوق في قلب التجمع الخامس بالقاهرة الجديدة. صُمم المجمع ليلبي متطلبات الشركات العالمية والمؤسسات المالية والمقرات الإقليمية، جامِعاً بين الفخامة المعمارية وأحدث بنية تحتية كهروميكانيكية، وشبكات ألياف ضوئية فائقة السرعة، ومرافق ضيافة تنفيذية.",
    },
    fullOverview: {
      en: "Spanning 18,500 square meters of prime Gross Leasable Area across six meticulously planned floorplates, Building 360 offers flexible open-span floor configurations ranging from 250 m² executive suites to 2,800 m² contiguous corporate headquarters. Featuring an imposing double-height marble atrium, integrated access control systems, 3 levels of underground secure parking, and round-the-clock facility management, the development serves as an unmatched business address.",
      ar: "يمتد مجمع 360 على مساحة تأجيرية إجمالية قدرها 18,500 متر مربع عبر ستة طوابق روعي في تصميمها المرونة التامة، حيث تتراوح المساحات من 250 متراً مربعاً للأجنحة التنفيذية حتى 2,800 متر مربع لمقرات الشركات الكاملة. يتميز بردهة استقبال رخامية بارتفاع مزدوج، وبوابات أمنية إلكترونية، و3 طوابق سفلية لمواقف السيارات المجهزة، وإدارة متكاملة للمرافق على مدار الساعة.",
    },
    mainImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      address: {
        en: "Building 360, Industrial Area, Fifth Settlement, New Cairo",
        ar: "مبنى 360، المنطقة الصناعية، التجمع الخامس، القاهرة الجديدة",
      },
      city: { en: "New Cairo", ar: "القاهرة الجديدة" },
      country: { en: "Egypt", ar: "مصر" },
      coordinates: { lat: 30.0135, lng: 31.4287 },
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110543.91894223062!2d31.428781446702587!3d30.013583279144865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822f306637e6f%3A0x6b1070e3eb7d8c47!2sFifth%20Settlement%2C%20New%20Cairo%201%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Building+360+Fifth+Settlement+New+Cairo",
    },
    contact: {
      phone: "+20 110 042 4829",
      altPhone: "+20 111 383 6660",
      email: "info@tafawok.co",
      leasingOffice: {
        en: "Building 360 Leasing Directorate — Ground Floor Suite A",
        ar: "إدارة التأجير التجاري بمبنى 360 – الطابق الأرضي جناح (أ)",
      },
    },
    keyStats: {
      gla: "18,500 m²",
      builtUpArea: "27,200 m²",
      floors: "G + 5 Floors + 3 Basements",
      parkingCapacity: "380 Vehicles",
      occupancyRate: "94%",
      zoning: {
        en: "Grade-A Commercial & Corporate Administrative",
        ar: "تجاري وإداري معتمد فئة (أ)",
      },
    },
    specs: [
      {
        label: { en: "Gross Leasable Area", ar: "المساحة التأجيرية الإجمالية" },
        value: "18,500",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: { en: "Floorplate Span", ar: "مساحة مسطح الطابق" },
        value: "2,800",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: { en: "Clear Ceiling Height", ar: "ارتفاع الأسقف الصافي" },
        value: "3.85",
        unit: { en: "m", ar: "متر" },
      },
      {
        label: { en: "Passenger Elevators", ar: "مصاعد الركاب السريعة" },
        value: "6",
        unit: { en: "High-speed units", ar: "مصاعد فائقة السرعة" },
      },
      {
        label: {
          en: "Backup Power Generators",
          ar: "مولدات الطاقة الاحتياطية",
        },
        value: "100%",
        unit: { en: "Full N+1 Redundancy", ar: "تغطية كاملة N+1" },
      },
      {
        label: { en: "Underground Parking", ar: "مواقف سيارات سفلية" },
        value: "380",
        unit: { en: "Slots", ar: "مكان مخصص" },
      },
    ],
    highlights: [
      {
        en: "Dual independent electrical feeds backed by 100% capacity Caterpillar diesel generators",
        ar: "تغذية كهربائية مزدوجة مستقلة مدعومة بمولدات كاتربيلر احتياطية بنسبة 100%",
      },
      {
        en: "Intelligent Building Management System (BMS) with high-efficiency VRF central cooling",
        ar: "نظام إدارة مبنى ذكي (BMS) مع تكييف مركزي متطور وموفر للطاقة (VRF)",
      },
      {
        en: "High-security optical speed gates with biometric integration and 24/7 CCTV surveillance",
        ar: "بوابات إلكترونية ذكية وفحص بالبصمة مع مراقبة أمنية بالكاميرات على مدار الساعة",
      },
      {
        en: "LEED Gold design specifications with energy-reflective Low-E insulated acoustic double glazing",
        ar: "معايير تصميمية مطابقة لشهادة LEED الذهبية بواجهات زجاجية عازلة للحرارة والصوت",
      },
    ],
    stores: [
      {
        id: "s1",
        name: {
          en: "National Commercial Bank Branch & Wealth Center",
          ar: "فرع البنك التجاري ومركز كبار العملاء",
        },
        category: {
          en: "Banking & Financial Services",
          ar: "خدمات مصرفية ومالية",
        },
        floor: {
          en: "Ground Floor — South Wing",
          ar: "الطابق الأرضي – الجناح الجنوبي",
        },
        unitNumber: "G-01",
        status: "open",
        description: {
          en: "Full-service retail and corporate banking with 24/7 automated ATM vestibule.",
          ar: "خدمات مصرفية متكاملة للأفراد والشركات مع صالة صراف آلي على مدار 24 ساعة.",
        },
        phone: "+20 2 2327 6001",
      },
      {
        id: "s2",
        name: {
          en: "TAFAWOK Regional Corporate Headquarters",
          ar: "المقر الإقليمي لشركة تفوق",
        },
        category: { en: "Corporate Office", ar: "مقر إداري للشركة" },
        floor: {
          en: "Penthouse Suite — 5th Floor",
          ar: "الطابق الخامس – جناح البنتهاوس",
        },
        unitNumber: "5-01",
        status: "open",
        description: {
          en: "Executive leadership offices, boardrooms, and regional contracting management.",
          ar: "مكاتب الإدارة العليا وقاعات الاجتماعات التنفيذية وإدارة المشروعات الإقليمية.",
        },
        phone: "+20 110 042 4829",
      },
      {
        id: "s3",
        name: {
          en: "Apex Specialty Artisan Cafe & Business Lounge",
          ar: "مقهى إيبكس المتخصص وصالة رجال الأعمال",
        },
        category: {
          en: "Dining & Executive Hospitality",
          ar: "أطعمة وضيافة رجال الأعمال",
        },
        floor: {
          en: "Ground Floor Main Atrium",
          ar: "الطابق الأرضي – بهو الاستقبال الرئيسي",
        },
        unitNumber: "G-04",
        status: "open",
        description: {
          en: "Artisanal coffee, business meeting luncheons, and casual collaboration seating.",
          ar: "قهوة مختصة، وجبات غداء لرجال الأعمال ومساحات مهيأة للاجتماعات السريعة.",
        },
      },
      {
        id: "s4",
        name: {
          en: "Multinational Energy Consultancy Group",
          ar: "مجموعة استشارات الطاقة الدولية",
        },
        category: {
          en: "Professional Engineering Services",
          ar: "استشارات هندسية وطاقة",
        },
        floor: {
          en: "3rd Floor Entire East Wing",
          ar: "الطابق الثالث – الجناح الشرقي بالكامل",
        },
        unitNumber: "3-01 to 3-04",
        status: "open",
        description: {
          en: "Petrochemical and green energy consulting operations across Egypt and the Gulf.",
          ar: "عمليات استشارات الطاقة والبتروكيماويات والمشروعات المستدامة.",
        },
      },
      {
        id: "s5",
        name: {
          en: "Executive Conference & Hybrid Boardroom Center",
          ar: "مركز المؤتمرات وقاعات الاجتماعات الهجينة",
        },
        category: { en: "Corporate Amenities", ar: "مرافق وخدمات المؤتمرات" },
        floor: {
          en: "2nd Floor Central Concourse",
          ar: "الطابق الثاني – البهو الأوسط",
        },
        unitNumber: "2-08",
        status: "open",
        description: {
          en: "State-of-the-art telepresence facilities, 120-seat auditorium, and private boardrooms.",
          ar: "قاعة مؤتمرات تتسع لـ 120 مقعداً مجهزة بأحدث تقنيات البث الرقمي والترجمة.",
        },
      },
      {
        id: "s6",
        name: {
          en: "Prime Corner Retail Showroom (Available for Lease)",
          ar: "معرض تجاري ركني متميز (متاح للتأجير)",
        },
        category: {
          en: "Commercial Retail / Flagship",
          ar: "مساحة تجارية حصرية",
        },
        floor: {
          en: "Ground Floor North Promenade",
          ar: "الطابق الأرضي – الممشى الشمالي",
        },
        unitNumber: "G-06",
        status: "leased",
        description: {
          en: "340 m² double-height glass corner showroom ideal for luxury automotive or tech flagship.",
          ar: "معرض ركني بواجهات زجاجية مزدوجة الارتفاع بمساحة 340 م² مثالي للعلامات الفاخرة.",
        },
      },
    ],
    amenities: [
      {
        en: "High-speed optical elevators with destination dispatching",
        ar: "مصاعد ذكية سريعة بنظام توجيه الوجهات المسبق",
      },
      {
        en: "Dedicated courier reception & cargo delivery dock",
        ar: "مدخل شحن واستلام بضائع مستقل للشركات",
      },
      {
        en: "Executive rooftop terrace with panoramic New Cairo views",
        ar: "شرفة تنفيذية على السطح بإطلالة بانورامية على القاهرة الجديدة",
      },
      {
        en: "Electric Vehicle (EV) fast-charging stations in basement",
        ar: "محطات شحن سريع للسيارات الكهربائية بالمواقف",
      },
      {
        en: "Comprehensive 24/7 on-site facilities and maintenance crew",
        ar: "فريق صيانة وتشغيل متواجد بالموقع على مدار 24 ساعة",
      },
    ],
  },
  {
    id: "tafawok-retail",
    slug: "tafawok-retail-center",
    name: {
      en: "Tafawok Commercial Mall & Retail Center",
      ar: "مركز تفوق التجاري والمول",
    },
    tagline: {
      en: "High-Footfall Regional Lifestyle, Retail & Family Entertainment Destination",
      ar: "وجهة التسوق والترفيه العائلي الأولى بأعلى معدلات الكثافة والزيارة",
    },
    type: "retail",
    status: "active",
    category: {
      en: "Retail & Destination Mall",
      ar: "مراكز تجارية ومولات تسوق",
    },
    description: {
      en: "Tafawok Commercial Mall is an expansive modern retail destination purposefully master-planned to serve the rapidly expanding residential and corporate districts. Anchored by major multinational hypermarkets, branded fashion retailers, lifestyle services, and diverse international dining avenues, the property commands exceptional footfall and retail vitality.",
      ar: "مركز تفوق التجاري هو وجهة تسوق عصرية كبرى تم تخطيطها هندسياً لخدمة الكتل السكنية والتجارية المتنامية. يضم المركز كبرى سلاسل الهايبر ماركت العالمية، ومتاجر الموضة، والخدمات الحيوية، ومنطقة مطاعم عائلية متنوعة، مما يجعله وجهة تسوق رئيسية ذات كثافة إقبال استثنائية.",
    },
    fullOverview: {
      en: "Boasting over 24,000 square meters of GLA distributed across four interconnected shopping concourses, Tafawok Retail Center features a soaring central glass dome, pedestrian-first boulevard connectivity, and an outdoor dining terrace. The center accommodates over 65 national and international retail brands, financial service centers, and comprehensive healthcare services.",
      ar: "بمساحة تأجيرية تزيد عن 24,000 متر مربع موزعة على أربعة مستويات تسوق مترابطة، يتميز المول بقبة زجاجية سماوية عملاقة، وممرات مشاة فسيحة، وتراسات خارجية للمطاعم. يستوعب المركز أكثر من 65 علامة تجارية محلية وعالمية، ومراكز خدمات مصرفية وحكومية، ومجمعات طبية متخصصة.",
    },
    mainImage:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581404476143-fb31d742929f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      address: {
        en: "Al-Bustan Commercial Sector, Regional Hub Arterial",
        ar: "قطاع البستان التجاري – المحور الإقليمي الرئيسي",
      },
      city: { en: "Cairo Metropolitan", ar: "القاهرة الكبرى" },
      country: { en: "Egypt", ar: "مصر" },
      coordinates: { lat: 30.0444, lng: 31.2357 },
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110515.27581141753!2d31.2357116!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Al-Bustan+Commercial+Sector+Cairo",
    },
    contact: {
      phone: "+20 111 383 6660",
      altPhone: "+20 110 042 4829",
      email: "info@tafawok.co",
      leasingOffice: {
        en: "Tafawok Mall Retail Leasing & Tenant Relations Office — Level 1",
        ar: "مكتب تأجير المحلات وعلاقات المستأجرين – الطابق الأول",
      },
    },
    keyStats: {
      gla: "24,000 m²",
      builtUpArea: "36,500 m²",
      floors: "Lower Ground + Ground + 2 Retail Floors",
      parkingCapacity: "750 Vehicles",
      occupancyRate: "97%",
      zoning: {
        en: "Regional Commercial Retail, Entertainment & F&B",
        ar: "تجاري تجزئة، ترفيه عائلي ومطاعم",
      },
    },
    specs: [
      {
        label: { en: "Gross Leasable Area", ar: "المساحة التأجيرية الإجمالية" },
        value: "24,000",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: { en: "Total Retail Units", ar: "إجمالي المحلات والمعارض" },
        value: "68",
        unit: { en: "Units", ar: "وحدة تجارية" },
      },
      {
        label: {
          en: "Anchor Tenant Footprint",
          ar: "مساحة المتجر الرئيسي (الهايبر)",
        },
        value: "6,200",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: {
          en: "Surface & Covered Parking",
          ar: "مواقف سيارات سطحية ومغطاة",
        },
        value: "750",
        unit: { en: "Vehicles", ar: "مركبة" },
      },
      {
        label: { en: "Average Monthly Footfall", ar: "متوسط الزوار الشهري" },
        value: "350,000+",
        unit: { en: "Visitors", ar: "زائر شهرياً" },
      },
      {
        label: {
          en: "Public Escalators & Lifts",
          ar: "السلالم المتحركة والمصاعد",
        },
        value: "14",
        unit: { en: "Units", ar: "وحدة نقل متطورة" },
      },
    ],
    highlights: [
      {
        en: "Anchor tenancy agreement with Grand Hypermarket providing guaranteed baseline daily visitor volume",
        ar: "عقد إيجار رئيسي مع جراند هايبر ماركت يضمن تدفقاً يومياً هائلاً من المتسوقين",
      },
      {
        en: "Dedicated family entertainment zone and safe indoor play arena driving weekend family retention",
        ar: "منطقة ترفيه عائلي وصالة ألعاب آمنة للأطفال ترفع من معدل بقاء الزوار في عطلات نهاية الأسبوع",
      },
      {
        en: "Outdoor European-style landscaped promenade for dining and open-air branded kiosks",
        ar: "ممشى خارجي منسق ومصمم على الطراز الأوروبي للمطاعم والمقاهي والأكشاك التجارية",
      },
      {
        en: "Heavy-duty loading bays with independent freight elevators directly servicing retail storerooms",
        ar: "أرصفة تفريغ بضائع للشاحنات الثقيلة مع مصاعد شحن مخصصة تخدم مستودعات المحلات مباشرة",
      },
    ],
    stores: [
      {
        id: "r1",
        name: {
          en: "Grand Hypermarket Regional Flagship",
          ar: "جراند هايبر ماركت – الفرع الإقليمي الأكبر",
        },
        category: {
          en: "Anchor Grocery & Household Goods",
          ar: "هايبر ماركت وسلع استهلاكية كبرى",
        },
        floor: {
          en: "Lower Ground Floor Concourse",
          ar: "طابق التسوق الأرضي المنخفض",
        },
        unitNumber: "LG-01",
        status: "open",
        description: {
          en: "6,200 m² full-format hypermarket featuring imported foods, electronics, bakery, and fresh markets.",
          ar: "هايبر ماركت متكامل على مساحة 6,200 م² يشمل الأغذية والأجهزة والمخبوزات الطازجة.",
        },
        phone: "+20 2 2327 6080",
      },
      {
        id: "r2",
        name: {
          en: "CarePlus 24/7 Community Pharmacy & Wellness",
          ar: "صيدلية كير بلس على مدار 24 ساعة",
        },
        category: {
          en: "Healthcare & Pharmaceuticals",
          ar: "أدوية ومستحضرات صحية",
        },
        floor: {
          en: "Ground Floor Main Entrance",
          ar: "الطابق الأرضي بجوار البوابة الرئيسية",
        },
        unitNumber: "G-12",
        status: "open",
        description: {
          en: "Comprehensive prescription fulfillment, cosmetics, and organic wellness supplements.",
          ar: "صيدلية شاملة ومستحضرات تجميل ومكملات غذائية مع خدمة التوصيل السريع.",
        },
      },
      {
        id: "r3",
        name: {
          en: "Moda Italia & International Fashion Brands",
          ar: "مودا إيطاليا ومتاجر الموضة العالمية",
        },
        category: {
          en: "Fashion, Apparel & Footwear",
          ar: "أزياء وملابس وأحذية راقية",
        },
        floor: {
          en: "First Floor Boulevard",
          ar: "الطابق الأول – ممر الموضة الرئيسي",
        },
        unitNumber: "1-18",
        status: "open",
        description: {
          en: "Multi-brand designer apparel, Italian leather footwear, and formal tailoring.",
          ar: "أحدث صيحات الأزياء والأحذية الجلدية الإيطالية والملابس الرسمية والكاجوال.",
        },
      },
      {
        id: "r4",
        name: {
          en: "SmartTech Electronics & Mobile Gadget Store",
          ar: "سمارت تك للأجهزة والإلكترونيات والهواتف",
        },
        category: {
          en: "Consumer Electronics & IT",
          ar: "أجهزة إلكترونية وهواتف ذكية",
        },
        floor: {
          en: "First Floor Central Galleria",
          ar: "الطابق الأول – البهو الأوسط",
        },
        unitNumber: "1-25",
        status: "open",
        description: {
          en: "Authorized retailer for smartphones, laptops, audio systems, and smart home devices.",
          ar: "موزع معتمد للهواتف الذكية وأجهزة الكمبيوتر والأجهزة المنزلية الذكية.",
        },
      },
      {
        id: "r5",
        name: {
          en: "Fiesta Family Entertainment & VR Arcade",
          ar: "مدينة ألعاب فييستا والترفيه التفاعلي",
        },
        category: {
          en: "Family Entertainment & Kids",
          ar: "ترفيه عائلي وألعاب إلكترونية",
        },
        floor: {
          en: "Second Floor Top Promenade",
          ar: "الطابق الثاني – منطقة الألعاب",
        },
        unitNumber: "2-01",
        status: "open",
        description: {
          en: "Virtual reality simulators, bowling lanes, toddler soft play, and prize arcades.",
          ar: "ألعاب الواقع الافتراضي، صالة بولينغ، ومنطقة ألعاب حركية آمنة للأطفال الصغار.",
        },
      },
      {
        id: "r6",
        name: {
          en: "Telecom Triple-Play Customer Service Center",
          ar: "مركز خدمة عملاء شركات الاتصالات",
        },
        category: {
          en: "Public & Telecom Services",
          ar: "خدمات الاتصالات والمدفوعات",
        },
        floor: {
          en: "Ground Floor West Arcade",
          ar: "الطابق الأرضي – الممشى الغربي",
        },
        unitNumber: "G-19",
        status: "open",
        description: {
          en: "Authorized operator desk for mobile contracts, fiber subscriptions, and bill settlements.",
          ar: "خدمات الاشتراكات، شحن الرصيد، ودفع الفواتير لجميع مشغلي الاتصالات.",
        },
      },
    ],
    amenities: [
      {
        en: "Central air conditioning with hospital-grade HEPA air filtration",
        ar: "تكييف مركزي متطور مع فلاتر تنقية هواء طبية HEPA",
      },
      {
        en: "Prayer halls for men and women with ablution facilities",
        ar: "مصليات واسعة للرجال والنساء مجهزة بالكامل",
      },
      {
        en: "Baby changing rooms and accessible facilities on all floors",
        ar: "غرف رعاية أطفال وتسهيلات متكاملة لذوي الاحتياجات الخاصة",
      },
      {
        en: "24/7 security patrol, central monitoring, and emergency response",
        ar: "دوريات أمنية وغرفة مراقبة مركزية وطاقم طوارئ مدرب",
      },
      {
        en: "Integrated bank ATMs and digital currency exchange counters",
        ar: "ماكينات صراف آلي لكبرى البنوك ومكاتب صرافة معتمدة",
      },
    ],
  },
  {
    id: "tafawok-logistics",
    slug: "tafawok-logistics-park",
    name: {
      en: "Tafawok Commercial Logistics & Business Complex",
      ar: "مجمع تفوق التجاري واللوجستي",
    },
    tagline: {
      en: "Integrated Industrial Showrooms, Engineering Hubs & Strategic Warehousing Depot",
      ar: "معارض تجارية متطورة ومستودعات ومكاتب هندسية متكاملة",
    },
    type: "logistics",
    status: "active",
    category: {
      en: "Logistics & Commercial Complex",
      ar: "مجمع لوجستي وتجاري",
    },
    description: {
      en: "Tafawok Commercial Logistics & Business Complex bridges heavy industrial procurement with front-facing commercial trade. Designed with expansive column-free distribution bays, high-clearance industrial showrooms, and administrative engineering suites, it serves as the operational epicenter for EPC contractors, energy equipment distributors, and industrial supply companies.",
      ar: "يمثل مجمع تفوق اللوجستي والتجاري حلقة الوصل بين التوريدات الصناعية الكبرى والتجارة المباشرة. صُمم المجمع بمستودعات خالية من الأعمدة الداخلية، ومعارض تجارية ذات ارتفاعات استثنائية، ومكاتب إدارية وهندسية، ليكون مركزاً لشركات المقاولات الكبرى وموردي قطاعات الطاقة والصناعة.",
    },
    fullOverview: {
      en: "Occupying 35,000 square meters of prime industrial-commercial land, the development features grade-level and dock-high hydraulic loading pits, heavy-floor loading capacity (up to 7.5 tons/m²), certified fire suppression systems (NFPA compliant), and dedicated bonded storage. It hosts leading global manufacturers and regional distributors of steel pipes, valves, MEP fixtures, and technical infrastructure systems.",
      ar: "يشغل المجمع مساحة 35,000 متر مربع من الأراضي التجارية والصناعية المتميزة، ويتميز بأرصفة شحن هيدروليكية متطورة، وأرضيات خرسانية فائقة التحمل (تتحمل حتى 7.5 طن/م²)، وشبكات إطفاء حريق أوتوماتيكية مطابقة لمعايير NFPA الدولية. يضم مقرات لكبرى الشركات المصنعة والموزعة للأنابيب والصمامات والمعدات الكهروميكانيكية.",
    },
    mainImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80",
    ],
    location: {
      address: {
        en: "Strategic Logistics & Heavy Supply Corridor, Greater Cairo Industrial Ring",
        ar: "محور التوريدات واللوجستيات الاستراتيجي – الطريق الدائري الصناعي للقاهرة",
      },
      city: {
        en: "Greater Cairo Industrial Corridor",
        ar: "القطاع الصناعي للقاهرة الكبرى",
      },
      country: { en: "Egypt", ar: "مصر" },
      coordinates: { lat: 30.1255, lng: 31.3912 },
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110488.75627254924!2d31.3912!3d30.1255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815cf485b0001%3A0x8e82ef3740263f31!2sCairo%20Industrial%20Area!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Greater+Cairo+Industrial+Corridor",
    },
    contact: {
      phone: "+20 110 042 4829",
      altPhone: "+20 111 383 6660",
      email: "info@tafawok.co",
      leasingOffice: {
        en: "Industrial Assets & Trade Facility Management Office — Bay 1",
        ar: "إدارة الأصول الصناعية والخدمات اللوجستية – المبنى الإداري (1)",
      },
    },
    keyStats: {
      gla: "35,000 m²",
      builtUpArea: "42,000 m²",
      floors: "Warehouse Depots + G+2 Engineering Suites",
      parkingCapacity: "120 Heavy Trucks + 220 Staff Cars",
      occupancyRate: "91%",
      zoning: {
        en: "Commercial Logistics, Engineering Trade & Showrooms",
        ar: "لوجستي تجاري، معارض صناعية ومكاتب هندسية",
      },
    },
    specs: [
      {
        label: { en: "Gross Leasable Area", ar: "المساحة التأجيرية الإجمالية" },
        value: "35,000",
        unit: { en: "m²", ar: "م²" },
      },
      {
        label: {
          en: "Clear Internal Height",
          ar: "الارتفاع الداخلي الصافي للتخزين",
        },
        value: "11.5",
        unit: { en: "m", ar: "متر" },
      },
      {
        label: { en: "Floor Load Capacity", ar: "قوة تحمل الأرضيات الخرسانية" },
        value: "7.5",
        unit: { en: "Tons/m²", ar: "طن / م²" },
      },
      {
        label: {
          en: "Hydraulic Dock Levelers",
          ar: "أرصفة التحميل الهيدروليكية",
        },
        value: "16",
        unit: { en: "Bays", ar: "رصيف تحميل آلي" },
      },
      {
        label: {
          en: "Heavy Truck Staging Area",
          ar: "ساحة انتظار الشاحنات الكبرى",
        },
        value: "120",
        unit: { en: "Trucks", ar: "شاحنة تريلا" },
      },
      {
        label: { en: "Fire Protection Rating", ar: "شبكة مكافحة الحريق" },
        value: "NFPA-13",
        unit: { en: "ESFR Sprinkler System", ar: "مرشات مياه سريعة الاستجابة" },
      },
    ],
    highlights: [
      {
        en: "Direct immediate access to major international trade arterial highways, minimizing transit congestion",
        ar: "اتصال فوري مباشر بالطرق الحرة والسريعة، مما يوفر زمن نقل البضائع والشاحنات",
      },
      {
        en: "Heavy concrete flooring with quartz dry-shake topping resistant to chemical abrasion and forklift wear",
        ar: "أرضيات خرسانية معالجة بمادة الكوارتز لمقاومة المواد الكيميائية والاحتكاك الشديد",
      },
      {
        en: "Advanced perimeter security with automated vehicle scale weighbridges and container inspection bays",
        ar: "أمن محيطي متكامل مع موازين بسكول إلكترونية للشاحنات ومناطق فحص الحاويات",
      },
      {
        en: "Equipped for climate-sensitive materials with zoned temperature control and thermal roof insulation",
        ar: "جاهزية لتخزين المواد الحساسة للحرارة مع عزل حراري للأسقف وأنظمة تحكم مناخي",
      },
    ],
    stores: [
      {
        id: "l1",
        name: {
          en: "TAFAWOK Industrial Piping & Valve Regional Depot",
          ar: "مستودع تفوق الإقليمي للأنابيب والصمامات",
        },
        category: {
          en: "Industrial Procurement & Distribution",
          ar: "توريدات وتوزيع المواد الصناعية",
        },
        floor: { en: "Depot Bay Alpha 1", ar: "المستودع الرئيسي (أ-1)" },
        unitNumber: "DEPOT-01",
        status: "open",
        description: {
          en: "Certified inventory of carbon steel, duplex pipes, fittings, and Achech Europe valves.",
          ar: "مخزون معتمد من أنابيب الصلب الكربوني والدوبلكس ومحابس أشك الأوروبية.",
        },
        phone: "+20 110 042 4829",
      },
      {
        id: "l2",
        name: {
          en: "Precision MEP & HVAC Equipment Trade Showroom",
          ar: "معرض معدات التكييف وأنظمة MEP المتطورة",
        },
        category: {
          en: "Commercial Engineering Showroom",
          ar: "معرض تجاري هندسي",
        },
        floor: {
          en: "Highway Frontage Showroom 03",
          ar: "معرض الواجهة الرئيسية رقم 3",
        },
        unitNumber: "SH-03",
        status: "open",
        description: {
          en: "Interactive display of chillers, pumps, air handling units, and electrical switchgear.",
          ar: "عرض حي لمبردات الشيلر والمضخات ومحطات معالجة الهواء ولوحات التوزيع الكهربائي.",
        },
      },
      {
        id: "l3",
        name: {
          en: "Regional EPC Heavy Equipment Logistics Dispatch",
          ar: "مركز إدارة أسطول معدات المشروعات الكبرى",
        },
        category: {
          en: "Logistics & Fleet Operations",
          ar: "عمليات النقل واللوجستيات",
        },
        floor: {
          en: "Administration Wing Level 1",
          ar: "المبنى الإداري – الطابق الأول",
        },
        unitNumber: "ADM-102",
        status: "open",
        description: {
          en: "Control room managing crane fleets, flatbed transport, and project mobilization.",
          ar: "غرفة تحكم مركزية لإدارة الأوناش العملاقة وأساطيل النقل الثقيل للمواقع.",
        },
      },
      {
        id: "l4",
        name: {
          en: "Metrology & Material Testing Certification Lab",
          ar: "معمل الفحص واختبار المواد المعتمد",
        },
        category: { en: "Quality Control & Testing", ar: "مختبرات فحص الجودة" },
        floor: { en: "Technical Facility Unit 08", ar: "الوحدة الفنية رقم 8" },
        unitNumber: "LAB-08",
        status: "open",
        description: {
          en: "Non-destructive testing (NDT), hydrostatic pressure testing, and metallurgical inspection.",
          ar: "اختبارات الضغط الهيدروستاتيكي، الفحص الإشعاعي غير الإتلافي NDT وشهادات المطابقة.",
        },
      },
    ],
    amenities: [
      {
        en: "Integrated weighbridge scale up to 100 metric tons",
        ar: "ميزان بسكول إلكتروني للشاحنات حتى 100 طن",
      },
      {
        en: "Separate dedicated truck logistics gate and passenger car entrance",
        ar: "بوابة منفصلة لدخول الشاحنات الثقيلة وأخرى لسيارات الموظفين والزوار",
      },
      {
        en: "Driver rest facilities, cafeteria, and logistics management office",
        ar: "استراحة مجهزة للسائقين وكافيتريا ومكاتب تخليص جمركي",
      },
      {
        en: "Solar panel micro-grid providing clean daytime auxiliary electricity",
        ar: "محطة طاقة شمسية على الأسطح لتوليد الكهرباء النظيفة",
      },
    ],
  },
]

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: "Saudi Aramco", category: "energy", country: "KSA" },
  { name: "ADNOC", category: "energy", country: "UAE" },
  { name: "Bechtel Corporation", category: "epc", country: "USA / Global" },
  { name: "Petrofac", category: "epc", country: "UK / Global" },
  { name: "Samsung Engineering", category: "epc", country: "South Korea" },
  {
    name: "Grand Hypermarket",
    category: "commercial",
    country: "GCC / Regional",
  },
  { name: "KNPC", category: "energy", country: "Kuwait" },
  { name: "KOC", category: "energy", country: "Kuwait" },
  { name: "Technip", category: "epc", country: "France / Global" },
  { name: "CCC", category: "epc", country: "Middle East" },
  { name: "Petrojet", category: "epc", country: "Egypt" },
  { name: "KITZ Valves", category: "manufacturer", country: "Japan" },
]

export const COMMERCIAL_DISCIPLINES: CommercialDiscipline[] = [
  {
    id: "office-developments",
    title: {
      en: "Prime Office Developments & Corporate Hubs",
      ar: "مجمعات المكاتب الإدارية ومقرات الشركات",
    },
    tagline: {
      en: "Grade-A Workspaces Engineered for Enterprise Longevity",
      ar: "بيئات عمل مؤسسية من الفئة (A) مصممة لاستدامة الأعمال",
    },
    description: {
      en: "Design, development, and asset management of state-of-the-art office towers and corporate campuses with advanced MEP, BMS automation, and high-density floorplates.",
      ar: "تطوير وإدارة أبراج ومجمعات إدارية متكاملة بأحدث الأنظمة الكهروميكانيكية، وأنظمة التحكم الذكية، ومساحات مفتوحة مرنة تلبي متطلبات كبرى الشركات العالمية.",
    },
    keyMetric: {
      value: "18,500 m²",
      label: { en: "Flagship GLA", ar: "مساحة تأجيرية إدارية" },
    },
    features: [
      {
        en: "LEED Gold compliance standards",
        ar: "معايير تصميم معتمدة مطابقة لـ LEED",
      },
      {
        en: "High-speed optical fiber backbone",
        ar: "بنية تحتية للألياف الضوئية فائقة السرعة",
      },
      {
        en: "100% generator power redundancy",
        ar: "تغطية كهربائية احتياطية كاملة 100%",
      },
    ],
    iconName: "building-2",
  },
  {
    id: "retail-destinations",
    title: {
      en: "Destination Retail Hubs & Lifestyle Centers",
      ar: "المراكز التجارية والوجهات التسويقية الإقليمية",
    },
    tagline: {
      en: "High-Footfall Commercial Malls with Anchor Magnetism",
      ar: "مولات تجارية عالية الكثافة تستقطب كبرى العلامات الاستهلاكية",
    },
    description: {
      en: "Purpose-built shopping destinations anchored by international hypermarkets, high-fashion avenues, entertainment arcades, and landscaped alfresco dining concourses.",
      ar: "وجهات تسوق استراتيجية تضم سلاسل الهايبر ماركت الكبرى، ومتاجر الأزياء، ومراكز الترفيه العائلي، وتراسات المطاعم المفتوحة لضمان أعلى حركة للمشاة.",
    },
    keyMetric: {
      value: "350,000+",
      label: { en: "Monthly Visitors", ar: "متوسط الزوار شهرياً" },
    },
    features: [
      {
        en: "Multinational hypermarket anchors",
        ar: "عقود إيجار مع كبرى سلاسل الهايبر ماركت",
      },
      {
        en: "Family entertainment & safe play zones",
        ar: "مناطق ترفيه عائلية ومساحات ألعاب للأطفال",
      },
      {
        en: "Dedicated multi-bay loading docks",
        ar: "أرصفة تفريغ بضائع شاحنات هيدروليكية",
      },
    ],
    iconName: "shopping-bag",
  },
  {
    id: "logistics-parks",
    title: {
      en: "Strategic Logistics Parks & Commercial Showrooms",
      ar: "المجمعات اللوجستية والمعارض التجارية المتطورة",
    },
    tagline: {
      en: "Heavy Industrial Capacity Integrated with Direct Trade",
      ar: "بنية تحتية صناعية ثقيلة مدمجة مع واجهات تجارية مباشرة",
    },
    description: {
      en: "Column-free industrial warehousing, highway-frontage equipment showrooms, and technical dispatch centers built with high floor loading capacities and automated logistics infrastructure.",
      ar: "مستودعات خالية من الأعمدة الداخلية، ومعارض تجارية بواجهات مباشرة على المحاور السريعة، ومراكز فحص واعتماد تلبي احتياجات قطاعات المقاولات والطاقة.",
    },
    keyMetric: {
      value: "7.5 Tons/m²",
      label: { en: "Floor Loading Capacity", ar: "قوة تحمل الأرضيات" },
    },
    features: [
      {
        en: "11.5m clear vertical storage height",
        ar: "ارتفاع تخزين داخلي صافي 11.5 متر",
      },
      {
        en: "NFPA-13 compliant fire suppression",
        ar: "أنظمة إطفاء حريق أوتوماتيكية معتمدة",
      },
      {
        en: "100-ton electronic weighbridge access",
        ar: "ميزان بسكول إلكتروني للشاحنات حتى 100 طن",
      },
    ],
    iconName: "warehouse",
  },
  {
    id: "turnkey-epc",
    title: {
      en: "Turnkey EPC Execution & High-Spec Fit-Out",
      ar: "المقاولات العامة وتسليم المفتاح والتشطيبات المتخصصة",
    },
    tagline: {
      en: "Precision Engineering from Foundation to Commissioning",
      ar: "هندسة دقيقة من وضع الأساسات حتى التشغيل الفعلي والتسليم",
    },
    description: {
      en: "End-to-end turnkey general contracting, precision MEP execution, and high-end tenant fit-outs executed by TAFAWOK's directly sponsored 50+ engineers and specialized regional workforce.",
      ar: "تنفيذ متكامل لأعمال المقاولات الكبرى، والأعمال الكهروميكانيكية الدقيقة، والتشطيبات الفاخرة للشركات عبر كادرنا الهندسي الدائم المكون من 50+ مهندساً واستشارياً.",
    },
    keyMetric: {
      value: "25+ Years",
      label: { en: "Execution Experience", ar: "سنوات من التنفيذ المتواصل" },
    },
    features: [
      {
        en: "Rigorous Zero-Harm HSE policy",
        ar: "سياسة سلامة وصحة مهنية صارمة (صفر حوادث)",
      },
      {
        en: "In-house MEP & infrastructure specialists",
        ar: "فريق هندسي كهروميكانيكي وبنية تحتية دائم",
      },
      {
        en: "Tier-1 industrial procurement access",
        ar: "توريدات مباشرة من كبرى المصانع العالمية",
      },
    ],
    iconName: "hard-hat",
  },
]

export const UI_DICTIONARY = {
  nav: {
    home: { en: en.nav.home, ar: ar.nav.home },
    about: { en: en.nav.about, ar: ar.nav.about },
    properties: { en: en.nav.properties, ar: ar.nav.properties },
    ceo: { en: en.nav.ceo, ar: ar.nav.ceo },
    contact: { en: en.nav.contact, ar: ar.nav.contact },
    inquireNow: { en: en.nav.inquireNow, ar: ar.nav.inquireNow },
    switchLang: { en: en.nav.switchLang, ar: ar.nav.switchLang },
  },
  home: {
    heroBadge: { en: en.home.heroBadge, ar: ar.home.heroBadge },
    heroTitle: { en: en.home.heroTitle, ar: ar.home.heroTitle },
    heroSubtitle: { en: en.home.heroSubtitle, ar: ar.home.heroSubtitle },
    exploreAssets: { en: en.home.exploreAssets, ar: ar.home.exploreAssets },
    reachOwner: { en: en.home.reachOwner, ar: ar.home.reachOwner },
    metricsTitle: { en: en.home.metricsTitle, ar: ar.home.metricsTitle },
    metricsSubtitle: {
      en: en.home.metricsSubtitle,
      ar: ar.home.metricsSubtitle,
    },
    portfolioTitle: { en: en.home.portfolioTitle, ar: ar.home.portfolioTitle },
    portfolioSubtitle: {
      en: en.home.portfolioSubtitle,
      ar: ar.home.portfolioSubtitle,
    },
    viewPropertyDetails: {
      en: en.home.viewPropertyDetails,
      ar: ar.home.viewPropertyDetails,
    },
    disciplinesBadge: {
      en: en.home.disciplinesBadge,
      ar: ar.home.disciplinesBadge,
    },
    disciplinesTitle: {
      en: en.home.disciplinesTitle,
      ar: ar.home.disciplinesTitle,
    },
    disciplinesSubtitle: {
      en: en.home.disciplinesSubtitle,
      ar: ar.home.disciplinesSubtitle,
    },
    ceoSectionBadge: {
      en: en.home.ceoSectionBadge,
      ar: ar.home.ceoSectionBadge,
    },
    ceoSectionTitle: {
      en: en.home.ceoSectionTitle,
      ar: ar.home.ceoSectionTitle,
    },
    ceoReadFull: { en: en.home.ceoReadFull, ar: ar.home.ceoReadFull },
    clientsBadge: { en: en.home.clientsBadge, ar: ar.home.clientsBadge },
    clientsTitle: { en: en.home.clientsTitle, ar: ar.home.clientsTitle },
    clientsSubtitle: {
      en: en.home.clientsSubtitle,
      ar: ar.home.clientsSubtitle,
    },
    homeCtaBadge: { en: en.home.homeCtaBadge, ar: ar.home.homeCtaBadge },
    homeCtaTitle: { en: en.home.homeCtaTitle, ar: ar.home.homeCtaTitle },
    homeCtaSubtitle: {
      en: en.home.homeCtaSubtitle,
      ar: ar.home.homeCtaSubtitle,
    },
    inquireAssetBtn: {
      en: en.home.inquireAssetBtn,
      ar: ar.home.inquireAssetBtn,
    },
    viewAllAssetsBtn: {
      en: en.home.viewAllAssetsBtn,
      ar: ar.home.viewAllAssetsBtn,
    },
  },
  propertyCard: {
    glaLabel: { en: en.propertyCard.glaLabel, ar: ar.propertyCard.glaLabel },
    locationLabel: {
      en: en.propertyCard.locationLabel,
      ar: ar.propertyCard.locationLabel,
    },
    floorsLabel: {
      en: en.propertyCard.floorsLabel,
      ar: ar.propertyCard.floorsLabel,
    },
    occupancyLabel: {
      en: en.propertyCard.occupancyLabel,
      ar: ar.propertyCard.occupancyLabel,
    },
    viewFullAsset: {
      en: en.propertyCard.viewFullAsset,
      ar: ar.propertyCard.viewFullAsset,
    },
  },
  propertyDetail: {
    backToAll: {
      en: en.propertyDetail.backToAll,
      ar: ar.propertyDetail.backToAll,
    },
    specsTitle: {
      en: en.propertyDetail.specsTitle,
      ar: ar.propertyDetail.specsTitle,
    },
    galleryTitle: {
      en: en.propertyDetail.galleryTitle,
      ar: ar.propertyDetail.galleryTitle,
    },
    storesTitle: {
      en: en.propertyDetail.storesTitle,
      ar: ar.propertyDetail.storesTitle,
    },
    mapTitle: {
      en: en.propertyDetail.mapTitle,
      ar: ar.propertyDetail.mapTitle,
    },
    getDirections: {
      en: en.propertyDetail.getDirections,
      ar: ar.propertyDetail.getDirections,
    },
    leasingContactTitle: {
      en: en.propertyDetail.leasingContactTitle,
      ar: ar.propertyDetail.leasingContactTitle,
    },
    leasingContactSubtitle: {
      en: en.propertyDetail.leasingContactSubtitle,
      ar: ar.propertyDetail.leasingContactSubtitle,
    },
    callNow: { en: en.propertyDetail.callNow, ar: ar.propertyDetail.callNow },
    emailNow: {
      en: en.propertyDetail.emailNow,
      ar: ar.propertyDetail.emailNow,
    },
    viewDirectoryItem: {
      en: en.propertyDetail.viewDirectoryItem,
      ar: ar.propertyDetail.viewDirectoryItem,
    },
    unit: { en: en.propertyDetail.unit, ar: ar.propertyDetail.unit },
    floor: { en: en.propertyDetail.floor, ar: ar.propertyDetail.floor },
  },
  owner: {
    title: { en: en.owner.title, ar: ar.owner.title },
    reachOwnerTitle: {
      en: en.owner.reachOwnerTitle,
      ar: ar.owner.reachOwnerTitle,
    },
    reachOwnerDesc: {
      en: en.owner.reachOwnerDesc,
      ar: ar.owner.reachOwnerDesc,
    },
    directPhone: { en: en.owner.directPhone, ar: ar.owner.directPhone },
    secondaryPhone: {
      en: en.owner.secondaryPhone,
      ar: ar.owner.secondaryPhone,
    },
    directEmail: { en: en.owner.directEmail, ar: ar.owner.directEmail },
    whatsappChat: { en: en.owner.whatsappChat, ar: ar.owner.whatsappChat },
    headquartersAddress: {
      en: en.owner.headquartersAddress,
      ar: ar.owner.headquartersAddress,
    },
  },
  contactForm: {
    title: { en: en.contactForm.title, ar: ar.contactForm.title },
    subtitle: { en: en.contactForm.subtitle, ar: ar.contactForm.subtitle },
    nameLabel: { en: en.contactForm.nameLabel, ar: ar.contactForm.nameLabel },
    namePlaceholder: {
      en: en.contactForm.namePlaceholder,
      ar: ar.contactForm.namePlaceholder,
    },
    emailLabel: {
      en: en.contactForm.emailLabel,
      ar: ar.contactForm.emailLabel,
    },
    emailPlaceholder: {
      en: en.contactForm.emailPlaceholder,
      ar: ar.contactForm.emailPlaceholder,
    },
    phoneLabel: {
      en: en.contactForm.phoneLabel,
      ar: ar.contactForm.phoneLabel,
    },
    phonePlaceholder: {
      en: en.contactForm.phonePlaceholder,
      ar: ar.contactForm.phonePlaceholder,
    },
    propertyLabel: {
      en: en.contactForm.propertyLabel,
      ar: ar.contactForm.propertyLabel,
    },
    anyProperty: {
      en: en.contactForm.anyProperty,
      ar: ar.contactForm.anyProperty,
    },
    inquiryTypeLabel: {
      en: en.contactForm.inquiryTypeLabel,
      ar: ar.contactForm.inquiryTypeLabel,
    },
    inquiryTypes: {
      leasing: {
        en: en.contactForm.inquiryTypes.leasing,
        ar: ar.contactForm.inquiryTypes.leasing,
      },
      investment: {
        en: en.contactForm.inquiryTypes.investment,
        ar: ar.contactForm.inquiryTypes.investment,
      },
      turnkey: {
        en: en.contactForm.inquiryTypes.turnkey,
        ar: ar.contactForm.inquiryTypes.turnkey,
      },
      general: {
        en: en.contactForm.inquiryTypes.general,
        ar: ar.contactForm.inquiryTypes.general,
      },
    },
    messageLabel: {
      en: en.contactForm.messageLabel,
      ar: ar.contactForm.messageLabel,
    },
    messagePlaceholder: {
      en: en.contactForm.messagePlaceholder,
      ar: ar.contactForm.messagePlaceholder,
    },
    submitBtn: {
      en: en.contactForm.submitBtn,
      ar: ar.contactForm.submitBtn,
    },
    submittingBtn: {
      en: en.contactForm.submittingBtn,
      ar: ar.contactForm.submittingBtn,
    },
    successMessage: {
      en: en.contactForm.successMessage,
      ar: ar.contactForm.successMessage,
    },
    errorMessage: {
      en: en.contactForm.errorMessage,
      ar: ar.contactForm.errorMessage,
    },
  },
  footer: {
    corporateDesc: {
      en: en.footer.corporateDesc,
      ar: ar.footer.corporateDesc,
    },
    propertiesNav: {
      en: en.footer.propertiesNav,
      ar: ar.footer.propertiesNav,
    },
    quickLinks: { en: en.footer.quickLinks, ar: ar.footer.quickLinks },
    ownerDirect: { en: en.footer.ownerDirect, ar: ar.footer.ownerDirect },
    copyright: { en: en.footer.copyright, ar: ar.footer.copyright },
    licenseNote: { en: en.footer.licenseNote, ar: ar.footer.licenseNote },
  },
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug)
}

export function getAllPropertySlugs(): string[] {
  return PROPERTIES.map((p) => p.slug)
}

