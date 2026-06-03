import { MenuCategory, EventPackage, Review, ContentEditableDict } from "./types";

import banquetEntrance from "./assets/images/banquet_entrance_1780463071496.png";
import banquetStage from "./assets/images/banquet_stage_1780463083385.png";
import banquetBuffet from "./assets/images/banquet_buffet_1780463099512.png";
import banquetPanipuri from "./assets/images/banquet_panipuri_1780463115114.png";

export const DEFAULT_CONTENT_DICTIONARY: ContentEditableDict = {
  // Navigation Links
  "nav_home": "Home",
  "nav_about": "About",
  "nav_services": "Services",
  "nav_menu": "Menu",
  "nav_gallery": "Gallery",
  "nav_reviews": "Reviews",
  "nav_booking": "Booking",
  "nav_contact": "Contact",

  // Hero Section
  "hero_tagline": "EXCLUSIVE LUXURY & SPLENDOR",
  "hero_title": "Where Every Celebration Becomes a Legacy",
  "hero_subtext": "Premium Banquet Hall in the Heart of Kalimati, Kathmandu",
  "hero_cta_book": "Book Now",
  "hero_cta_menu": "Explore Menu",

  // About Section
  "about_story_subtitle": "OUR CHERISHED JOURNEY",
  "about_story_title": "The Gold Standard of Celebrations",
  "about_story_p1": "Established as a premier luxury venue in the heart of Kathmandu, Kalimati Banquet is designed to turn your dream celebrations into lifelong legacies. From magnificent weddings and grand receptions to executive corporate summits, family gatherings, and birthday celebrations, we deliver world-class hospitality.",
  "about_story_p2": "Spanning modern, fully air-conditioned halls operating with advanced soundproofing and majestic chandeliers, we offer seamless flexibility for gatherings of any size. Led by our dedicated event coordinators, we ensure every detail—from decorative lighting to culinary execution—is handled with precision, making us Kathmandu's favorite choice.",
  "about_interior_image": banquetEntrance,
  
  // Custom Capacity Specs
  "spec_capacity_num": "50–500",
  "spec_capacity_lbl": "Guest Capacity",
  "spec_ac_num": "100%",
  "spec_ac_lbl": "Air-conditioned",
  "spec_valet_num": "FREE",
  "spec_valet_lbl": "Valet Parking",
  "spec_support_num": "24/7",
  "spec_support_lbl": "Coordination",

  // About Cards
  "card_excellence_title": "🏆 Excellence & Precision",
  "card_excellence_desc": "We deliver immaculate event coordination and royal hospitality, ensuring stress-free milestones and seamless execution.",
  "card_culinary_title": "🍽️ Culinary Mastery",
  "card_culinary_desc": "Indulge in delicious multi-cuisine menus curated by highly trained chefs, blending Nepalese traditions with global delicacies.",
  "card_ambience_title": "💎 Elegant Ambience",
  "card_ambience_desc": "Breathtaking layouts featuring high ceilings, warm golden illuminations, and custom drapery tailored to your color scheme.",

  // Services Title
  "services_subtitle": "OUR EVENT SOLUTIONS",
  "services_title": "Crafting Impeccable Experiences",
  "services_desc": "From classic traditional rituals to modern corporate spectacles, our premium facility provides specialized setups for every elegant gather.",

  // Services Grid
  "service_wedding_title": "Wedding Receptions",
  "service_wedding_desc": "Host the wedding of your dreams. Our majestic grand ballrooms, royal stages, and bespoke wedding design convert your special day into a timeless royal romance.",
  "service_corporate_title": "Corporate Events",
  "service_corporate_desc": "Present with impact. High-impact corporate conferences, annual general meetings, business dinners, and seminars with advanced projectors and pristine acoustics.",
  "service_birthday_title": "Birthday Celebrations",
  "service_birthday_desc": "Celebrate youth and wisdom. Rich, colorful themed balloons, interactive layouts, customizable catering options, and joyous, vibrant birthday themes for all ages.",
  "service_cultural_title": "Bratabandha & Cultural Ceremonies",
  "service_cultural_desc": "Pay homage to our roots. Conduct sacred bratabandhas, traditional rituals, or naming ceremonies in our spiritually enriched divine decoration and complete setups.",
  "service_cocktail_title": "Cocktail Evenings",
  "service_cocktail_desc": "Unwind in luxury. Experience premium social mixers, custom cocktails, lively tracks, and bite-sized warm appetizers served flawlessly under dim twilight colors.",
  "service_anniversary_title": "Anniversary Galas",
  "service_anniversary_desc": "Honor enduring love and milestones. Host grand silver or golden jubilee anniversaries surrounded by cherished relatives, live music, and majestic banquets.",

  // Menu Header
  "menu_subtitle": "EPICUREAN DELIGHTS",
  "menu_title": "Curated Banquet Menu & Packages",
  "menu_desc": "Our authentic ingredients and gourmet kitchens design delicious culinary wonders to make your guests talk for months.",

  // Menu category translations
  "cat_veg_starters": "Veg Starters",
  "cat_nonveg_starters": "Non-Veg Starters",
  "cat_main_veg": "Main Course (Veg)",
  "cat_main_nonveg": "Main Course (Non-Veg)",
  "cat_rice_breads": "Rice & Breads",
  "cat_desserts": "Desserts",
  "cat_beverages": "Beverages",
  "cat_packages": "Event Packages",

  // Veg Starters
  "menu_vstart_1_name": "Paneer Tikka",
  "menu_vstart_1_price": "450",
  "menu_vstart_2_name": "Veg Spring Roll",
  "menu_vstart_2_price": "320",
  "menu_vstart_3_name": "Mushroom 65",
  "menu_vstart_3_price": "380",
  "menu_vstart_4_name": "Hara Bhara Kebab",
  "menu_vstart_4_price": "350",

  // Non-Veg Starters
  "menu_nvstart_1_name": "Chicken Tikka",
  "menu_nvstart_1_price": "520",
  "menu_nvstart_2_name": "Seekh Kebab",
  "menu_nvstart_2_price": "580",
  "menu_nvstart_3_name": "Fish Fry",
  "menu_nvstart_3_price": "600",
  "menu_nvstart_4_name": "Mutton Shammi",
  "menu_nvstart_4_price": "650",

  // Main Course Veg
  "menu_mveg_1_name": "Dal Makhani",
  "menu_mveg_1_price": "380",
  "menu_mveg_2_name": "Paneer Butter Masala",
  "menu_mveg_2_price": "450",
  "menu_mveg_3_name": "Mix Veg Curry",
  "menu_mveg_3_price": "360",
  "menu_mveg_4_name": "Palak Paneer",
  "menu_mveg_4_price": "420",

  // Main Course Non Veg
  "menu_mnveg_1_name": "Butter Chicken",
  "menu_mnveg_1_price": "550",
  "menu_mnveg_2_name": "Mutton Rogan Josh",
  "menu_mnveg_2_price": "700",
  "menu_mnveg_3_name": "Fish Curry",
  "menu_mnveg_3_price": "620",
  "menu_mnveg_4_name": "Chicken Biryani",
  "menu_mnveg_4_price": "580",

  // Rice and Breads
  "menu_ricebread_1_name": "Steamed Rice",
  "menu_ricebread_1_price": "180",
  "menu_ricebread_2_name": "Jeera Rice",
  "menu_ricebread_2_price": "220",
  "menu_ricebread_3_name": "Naan (2 pcs)",
  "menu_ricebread_3_price": "160",
  "menu_ricebread_4_name": "Paratha",
  "menu_ricebread_4_price": "140",

  // Desserts
  "menu_dessert_1_name": "Gulab Jamun",
  "menu_dessert_1_price": "180",
  "menu_dessert_2_name": "Kheer",
  "menu_dessert_2_price": "200",
  "menu_dessert_3_name": "Rasgulla",
  "menu_dessert_3_price": "180",
  "menu_dessert_4_name": "Ice Cream (2 scoops)",
  "menu_dessert_4_price": "220",

  // Beverages
  "menu_bev_1_name": "Masala Chai",
  "menu_bev_1_price": "80",
  "menu_bev_2_name": "Fresh Juice",
  "menu_bev_2_price": "150",
  "menu_bev_3_name": "Soft Drinks",
  "menu_bev_3_price": "100",
  "menu_bev_4_name": "Lassi",
  "menu_bev_4_price": "160",

  // Packages Names and Prices
  "pkg_silver_name": "Silver Package (up to 100 guests)",
  "pkg_silver_price": "85000",
  "pkg_silver_desc": "Delightful buffet selection, air-conditioned venue banquet space, decorated stages, and premium sound systems.",
  
  "pkg_gold_name": "Gold Package (up to 200 guests)",
  "pkg_gold_price": "160000",
  "pkg_gold_desc": "Extended Multi-cuisine menu, luxurious floral stages, LED spotlights, red-carpet entryway welcome, and free parking service.",

  "pkg_diamond_name": "Diamond Package (up to 500 guests)",
  "pkg_diamond_price": "350000",
  "pkg_diamond_desc": "Royal fully-unlimited caterings, luxury floral themes, gold-accented setups, live standard music space solutions, and premium videography support.",

  // Gallery
  "gallery_subtitle": "MOMENTS TO REMEMBER",
  "gallery_title": "Our Visual Gallery",
  "gallery_desc": "Step into our world of breathtaking events, grand lighting setups, and luxurious layouts designed for your happiness.",

  "cat_all": "All Photos",
  "cat_weddings": "Weddings",
  "cat_corporate": "Corporate",
  "cat_celebrations": "Celebrations",

  // Reviews Header
  "reviews_subtitle": "TESTIMONIALS",
  "reviews_title": "Kind Words From Our Guests",
  "reviews_desc": "We measure our success by the absolute satisfaction and long-lasting smiles of our premium clients.",

  // Reviews text
  "rev_ramesh_text": "\"Kalimati Banquet made our wedding reception absolutely unforgettable. The decor, the food, and the staff — all world-class. Highly recommended!\"",
  "rev_priya_text": "\"We hosted our company's annual dinner here and everyone was blown away. The gold and red ambiance is breathtaking. Will definitely return!\"",
  "rev_sunil_text": "\"From the moment we walked in to the last bite of dessert — pure luxury. Kalimati Banquet is truly the best in Kathmandu.\"",
  "rev_anita_text": "\"Our daughter's birthday party was a dream come true. The team handled everything so professionally. The food was exceptional!\"",
  "rev_bikram_text": "\"Attended a bratabandha ceremony here. The arrangements, catering, and venue setup were perfect. No other venue in Kalimati comes close!\"",

  // Booking Page Headers
  "book_subtitle": "RESERVE YOUR DATES",
  "book_title": "Let's Write Your Story Together",
  "book_desc": "Submit your booking inquiry to check dates availability. Our event hosts will reach out within 24 hours to guide you.",
  "form_name_lbl": "Full Name",
  "form_phone_lbl": "Phone Number",
  "form_email_lbl": "Email Address",
  "form_type_lbl": "Event Type",
  "form_date_lbl": "Event Date",
  "form_guests_lbl": "Number of Guests",
  "form_pkg_lbl": "Select Package",
  "form_requests_lbl": "Special Requests / Message",
  "form_submit_btn": "Confirm Booking",

  // Contact Header
  "contact_subtitle": "FIND US",
  "contact_title": "We Are Here For You",
  "contact_desc": "Visit our opulent banquet hall or coordinate with our administrative team on call.",
  "contact_address_label": "Address & Map Location",
  "contact_address_val": "Kalimati Main Crossroad, Kathmandu, Nepal",
  "contact_phone_label": "Phone Booking Helpline",
  "contact_phone_val": "+977-01-4271890, +977-9851001234",
  "contact_email_label": "Official Email Service",
  "contact_email_val": "krishnagirikb@yahoo.com",

  // Footer
  "footer_tagline": "Crafting Memories, One Event at a Time.",
  "footer_copyright": "© 2025 Kalimati Banquet. All Rights Reserved."
};

export const MENU_STRUCTURE = [
  {
    category: "Veg Starters",
    id: "veg_starter",
    items: [
      { id: "vstart_1", keyName: "menu_vstart_1_name", keyPrice: "menu_vstart_1_price" },
      { id: "vstart_2", keyName: "menu_vstart_2_name", keyPrice: "menu_vstart_2_price" },
      { id: "vstart_3", keyName: "menu_vstart_3_name", keyPrice: "menu_vstart_3_price" },
      { id: "vstart_4", keyName: "menu_vstart_4_name", keyPrice: "menu_vstart_4_price" },
    ]
  },
  {
    category: "Non-Veg Starters",
    id: "nonveg_starter",
    items: [
      { id: "nvstart_1", keyName: "menu_nvstart_1_name", keyPrice: "menu_nvstart_1_price" },
      { id: "nvstart_2", keyName: "menu_nvstart_2_name", keyPrice: "menu_nvstart_2_price" },
      { id: "nvstart_3", keyName: "menu_nvstart_3_name", keyPrice: "menu_nvstart_3_price" },
      { id: "nvstart_4", keyName: "menu_nvstart_4_name", keyPrice: "menu_nvstart_4_price" },
    ]
  },
  {
    category: "Main Course (Veg)",
    id: "main_veg",
    items: [
      { id: "mveg_1", keyName: "menu_mveg_1_name", keyPrice: "menu_mveg_1_price" },
      { id: "mveg_2", keyName: "menu_mveg_2_name", keyPrice: "menu_mveg_2_price" },
      { id: "mveg_3", keyName: "menu_mveg_3_name", keyPrice: "menu_mveg_3_price" },
      { id: "mveg_4", keyName: "menu_mveg_4_name", keyPrice: "menu_mveg_4_price" },
    ]
  },
  {
    category: "Main Course (Non-Veg)",
    id: "main_nonveg",
    items: [
      { id: "mnveg_1", keyName: "menu_mnveg_1_name", keyPrice: "menu_mnveg_1_price" },
      { id: "mnveg_2", keyName: "menu_mnveg_2_name", keyPrice: "menu_mnveg_2_price" },
      { id: "mnveg_3", keyName: "menu_mnveg_3_name", keyPrice: "menu_mnveg_3_price" },
      { id: "mnveg_4", keyName: "menu_mnveg_4_name", keyPrice: "menu_mnveg_4_price" },
    ]
  },
  {
    category: "Rice & Breads",
    id: "rice_breads",
    items: [
      { id: "ricebread_1", keyName: "menu_ricebread_1_name", keyPrice: "menu_ricebread_1_price" },
      { id: "ricebread_2", keyName: "menu_ricebread_2_name", keyPrice: "menu_ricebread_2_price" },
      { id: "ricebread_3", keyName: "menu_ricebread_3_name", keyPrice: "menu_ricebread_3_price" },
      { id: "ricebread_4", keyName: "menu_ricebread_4_name", keyPrice: "menu_ricebread_4_price" },
    ]
  },
  {
    category: "Desserts",
    id: "desserts",
    items: [
      { id: "dessert_1", keyName: "menu_dessert_1_name", keyPrice: "menu_dessert_1_price" },
      { id: "dessert_2", keyName: "menu_dessert_2_name", keyPrice: "menu_dessert_2_price" },
      { id: "dessert_3", keyName: "menu_dessert_3_name", keyPrice: "menu_dessert_3_price" },
      { id: "dessert_4", keyName: "menu_dessert_4_name", keyPrice: "menu_dessert_4_price" },
    ]
  },
  {
    category: "Beverages",
    id: "beverages",
    items: [
      { id: "bev_1", keyName: "menu_bev_1_name", keyPrice: "menu_bev_1_price" },
      { id: "bev_2", keyName: "menu_bev_2_name", keyPrice: "menu_bev_2_price" },
      { id: "bev_3", keyName: "menu_bev_3_name", keyPrice: "menu_bev_3_price" },
      { id: "bev_4", keyName: "menu_bev_4_name", keyPrice: "menu_bev_4_price" },
    ]
  }
];

export const PACKAGES_DATA = [
  {
    id: "pkg_silver",
    keyName: "pkg_silver_name",
    keyPrice: "pkg_silver_price",
    keyDesc: "pkg_silver_desc",
    gradient: "from-slate-700/60 to-slate-900/80",
    badgeColor: "bg-slate-300 text-slate-900"
  },
  {
    id: "pkg_gold",
    keyName: "pkg_gold_name",
    keyPrice: "pkg_gold_price",
    keyDesc: "pkg_gold_desc",
    gradient: "from-amber-600/60 to-slate-900/80 border-gold-500/50",
    badgeColor: "bg-gold-500 text-stone-900 animate-pulse"
  },
  {
    id: "pkg_diamond",
    keyName: "pkg_diamond_name",
    keyPrice: "pkg_diamond_price",
    keyDesc: "pkg_diamond_desc",
    gradient: "from-cyan-700/60 to-slate-900/80",
    badgeColor: "bg-cyan-300 text-stone-950"
  }
];

export const SERVICES_DATA = [
  {
    id: "wedding",
    iconName: "Gift",
    keyTitle: "service_wedding_title",
    keyDesc: "service_wedding_desc"
  },
  {
    id: "corporate",
    iconName: "Briefcase",
    keyTitle: "service_corporate_title",
    keyDesc: "service_corporate_desc"
  },
  {
    id: "birthday",
    iconName: "Cake",
    keyTitle: "service_birthday_title",
    keyDesc: "service_birthday_desc"
  },
  {
    id: "cultural",
    iconName: "Sparkles",
    keyTitle: "service_cultural_title",
    keyDesc: "service_cultural_desc"
  },
  {
    id: "cocktail",
    iconName: "Utensils",
    keyTitle: "service_cocktail_title",
    keyDesc: "service_cocktail_desc"
  },
  {
    id: "anniversary",
    iconName: "Heart",
    keyTitle: "service_anniversary_title",
    keyDesc: "service_anniversary_desc"
  }
];

export const GALLERY_ITEMS = [
  // Weddings (using beautiful local assets reflecting uploaded photos)
  { id: "g1", category: "Weddings", url: banquetStage, alt: "Luxury 'Happily Ever After' Decorated Wedding Stage" },
  { id: "g2", category: "Weddings", url: banquetEntrance, alt: "Grand Entrance Welcome Reception Archway" },
  { id: "g3", category: "Weddings", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800", alt: "Lavish Wedding Florals & Mandap" },
  
  // Corporate
  { id: "g4", category: "Corporate", url: banquetBuffet, alt: "Guest Selection from Premium Hot Curries Buffet Counter" },
  { id: "g5", category: "Corporate", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800", alt: "Executive Presentation Screen" },
  { id: "g6", category: "Corporate", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", alt: "Corporate Seminar & Lights" },
  
  // Celebrations
  { id: "g7", category: "Celebrations", url: banquetPanipuri, alt: "Interactive Fresh Panipuri Golgappa Festive Catering" },
  { id: "g8", category: "Celebrations", url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800", alt: "Champagne Glasses Toast" },
  { id: "g9", category: "Celebrations", url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800", alt: "Festive Balloons & Birthday Setup" },
];


export const REVIEWS_DATA_MOCK = [
  {
    id: "r1",
    author: "Ramesh Shrestha",
    keyText: "rev_ramesh_text",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    id: "r2",
    author: "Priya Tamang",
    keyText: "rev_priya_text",
    rating: 5,
    date: "1 month ago"
  },
  {
    id: "r3",
    author: "Sunil Maharjan",
    keyText: "rev_sunil_text",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    id: "r4",
    author: "Anita Gurung",
    keyText: "rev_anita_text",
    rating: 5,
    date: "2 months ago"
  },
  {
    id: "r5",
    author: "Bikram Rai",
    keyText: "rev_bikram_text",
    rating: 5,
    date: "3 days ago"
  }
];

export const PACKAGE_INCLUSIONS_DETAILED = {
  "pkg_silver": [
    "Full Buffet Catering Service (1 Hot Soup, 2 Vegetarian Mains, 1 Rice, 1 Daal, 1 Noodle, 1 Sweet Dessert, with Salads & Traditional Pickles)",
    "Elegant Stage Decor (Sophisticated drapery, warm LED spotlights, and premium artificial flower arrangements)",
    "High-Fidelity Audio System (Fully synchronized speakers + 2 professional wireless microphones)",
    "Air-Conditioned Grand Banquet Hall (Fully active for up to 4 continuous hours of event)",
    "Backstage Green Room (1 private dressing room with direct access to the main stage)",
    "On-Site Event Operations Lead (Ensuring seamless timing, safety, and coordinator logistics)",
    "Free Secure Compound Parking (Ample capacity for up to 50 cars with round-the-clock security)"
  ],
  "pkg_gold": [
    "Royal Multi-Cuisine Buffet (2 Soups, 2 Gourmet Hot Starters, 3 Main Dishes (includes non-veg options), 2 Rice varieties, Fresh Handcrafted Roti & Naan, 2 Desserts, Seasonal Salads)",
    "Premium Floral Stage & Walkway Design (Lush local fresh flowers, royal carpeted runway, and coordinated drapes)",
    "High-Definition AV System (Twin projector setups + full HD screen displaying event presentations & slideshows)",
    "Atmospheric Concert Lighting (Intelligent moving head spotlights, LED color washes, and warm ambient uplights)",
    "VIP Vanity Suites (1 executive backstage dressing room featuring vanity mirrors, private lounge, and refreshments)",
    "Senior Event Planning Supervisor (Active pre-event planning checklist & live step-by-step coordination)",
    "Complimentary Welcome Drink (2 choices of artisanal fruit mocktails served upon guest arrival)",
    "Full Professional Valet Parking (Smooth arrival and departure management with dedicated valet drivers)",
    "Bypass VIP Entrance & Welcome Area (Custom signage, floral arches, and guest registration desk setup)"
  ],
  "pkg_diamond": [
    "Imperial Royal Feast (3 Specialty Soups, 4 Hot Premium Starters, 4 Main Course Masterpieces, Live Jalebi & Rabdi counters, Assorted Tandoori Breads, 3 Premium Desserts, Fruit Carpaccio, and Gourmet Dips)",
    "Extravagant Signature Floral Architecture (Fresh premium lilies, roses, and orchids across halls, stages, and tables)",
    "Cinematic Audio Experience & Live Concert Setup (High-output line arrays + professional mixer + live performance coordination)",
    "Full Stage Lighting Production Series (DMX moving beams, coordinate washes, low fog cloud machines, and cold pyro sparks effects)",
    "Ultra-Luxury Master VIP Dressing Lounge (Full sofa setups, premium cosmetics table, mirror arrays, personal restroom, and private catering)",
    "Dual Senior Event Coordinators + 4 Dedicated Ushers (Flawless guest seatings, gift registers, and schedule control)",
    "Grand Welcome Cocktails & Unlimited Beverage Service (Bespoke menu of handcrafted hot beverages, luxury tea bar, and free-flowing soft drinks)",
    "24/7 Security & Valet Parking Zone (Complete priority parking area under CCTV monitoring)",
    "Cinematographic Videography & Candid Photography Session (Full coverage of the event with high-res deliverable photo-video bundle)",
    "Complimentary First-Anniversary Romantic Candlelit Dinner (Special couple reservation suite at our elite associate restaurants)"
  ]
};

