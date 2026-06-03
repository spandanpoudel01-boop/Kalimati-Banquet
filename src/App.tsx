import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gift, 
  Briefcase, 
  Cake, 
  Sparkles, 
  Utensils, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  Edit, 
  Save, 
  RotateCcw, 
  LogOut, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Upload, 
  Menu as MenuIcon, 
  Lock, 
  Info,
  Clock,
  Instagram,
  Facebook,
  Video,
  Plus,
  Trash2,
  Eye,
  Settings as SettingsIcon,
  BarChart,
  CheckCircle,
  XCircle,
  Search,
  PlusCircle,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";
import { 
  DEFAULT_CONTENT_DICTIONARY, 
  MENU_STRUCTURE, 
  PACKAGES_DATA, 
  SERVICES_DATA, 
  GALLERY_ITEMS, 
  REVIEWS_DATA_MOCK,
  PACKAGE_INCLUSIONS_DETAILED
} from "./data";
import { ContentEditableDict } from "./types";

// Light particle canvas generator 
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      speedX: number;
    }> = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 750;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial population
    const maxParticles = 60;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.1,
      });
    }

    const drawParticles = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update values
        p.y += p.speedY;
        p.x += p.speedX;

        // Loop boundaries 
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-50 z-10" 
    />
  );
}

export default function App() {
  // --- Admin Panel States ---
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminEditMode, setIsAdminEditMode] = useState<boolean>(false);
  const [content, setContent] = useState<ContentEditableDict>({});
  const [heroBg, setHeroBg] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  
  // --- Admin Dashboard & Booking Tracker States ---
  const [bookings, setBookings] = useState<any[]>([]);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>("bookings");
  const [bookingSearch, setBookingSearch] = useState<string>("");
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>("All");
  const [showAddBookingForm, setShowAddBookingForm] = useState<boolean>(false);
  const [newBookingForm, setNewBookingForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    guestsCount: "",
    selectedPackage: "",
    specialRequests: ""
  });
  
  // Login credentials state
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Copyright click tracker state
  const [copyrightClicks, setCopyrightClicks] = useState<number>(0);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  // Dynamic and editable records states
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [menuStructure, setMenuStructure] = useState<any[]>([]);
  const [openedPackage, setOpenedPackage] = useState<string | null>(null);

  // --- UI Layout States ---
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeMenuTab, setActiveMenuTab] = useState<string>("veg_starter");
  const [galleryFilter, setGalleryFilter] = useState<string>("All Photos");
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    guestsCount: "",
    selectedPackage: "",
    specialRequests: ""
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showBookingSuccess, setShowBookingSuccess] = useState<boolean>(false);
  const [successToastMessage, setSuccessToastMessage] = useState<string>("");

  // ScrollSpy states to highlight current section in navigation bar
  const [currentSection, setCurrentSection] = useState<string>("home");

  // Load administrative settings and content values on load
  useEffect(() => {
    // 1. Authenticated session check
    const logged = localStorage.getItem("kb_admin_logged") === "true";
    if (logged) {
      setIsAdminLoggedIn(true);
    }

    // 2. Load dictionary from storage or fallback to defaults
    const storedDict = localStorage.getItem("kb_edited_content");
    if (storedDict) {
      try {
        setContent(JSON.parse(storedDict));
      } catch (e) {
        setContent({ ...DEFAULT_CONTENT_DICTIONARY });
      }
    } else {
      setContent({ ...DEFAULT_CONTENT_DICTIONARY });
    }

    // 3. Load custom background base64
    const bg = localStorage.getItem("kb_hero_background_url");
    if (bg) {
      setHeroBg(bg);
    } else {
      // Elegant default premium Unsplash image
      setHeroBg("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920");
    }

    // 4. Load dynamic gallery list
    const storedGallery = localStorage.getItem("kb_gallery_list");
    if (storedGallery) {
      try {
        setGalleryList(JSON.parse(storedGallery));
      } catch (e) {
        setGalleryList([...GALLERY_ITEMS]);
      }
    } else {
      setGalleryList([...GALLERY_ITEMS]);
    }

    // 5. Load dynamic menu structure
    const storedMenu = localStorage.getItem("kb_menu_structure");
    if (storedMenu) {
      try {
        setMenuStructure(JSON.parse(storedMenu));
      } catch (e) {
        setMenuStructure([...MENU_STRUCTURE]);
      }
    } else {
      setMenuStructure([...MENU_STRUCTURE]);
    }

    // 6. Load bookings inquiry logs
    const storedBookings = localStorage.getItem("kb_bookings");
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {
        setBookings([]);
      }
    } else {
      const initialMockBookings = [
        {
          id: "b_mock_1",
          fullName: "Rohan Adhikari",
          phone: "+977-9841234567",
          email: "rohan.ad@gmail.com",
          eventType: "Wedding Receptions",
          eventDate: "24/06/2026",
          guestsCount: "350",
          selectedPackage: "pkg_gold",
          specialRequests: "Need gold drapery, round table seating, and standard stage flowers setup.",
          status: "Confirmed",
          createdAt: "02/06/2026, 11:30 AM"
        },
        {
          id: "b_mock_2",
          fullName: "Sanjana Shrestha",
          phone: "+977-9851098765",
          email: "sanjana.sth@outlook.com",
          eventType: "Birthday Celebrations",
          eventDate: "12/07/2026",
          guestsCount: "80",
          selectedPackage: "pkg_silver",
          specialRequests: "Special balloon setup & chocolate cake for the birthday boy.",
          status: "Pending",
          createdAt: "01/06/2026, 03:15 PM"
        },
        {
          id: "b_mock_3",
          fullName: "Kantipur Tech Corp",
          phone: "+977-01-4411223",
          email: "hr@kantipurtech.com",
          eventType: "Corporate Conference",
          eventDate: "04/08/2026",
          guestsCount: "120",
          selectedPackage: "pkg_diamond",
          specialRequests: "Require high-speed internet, dual projection screens, and custom mocktail bar.",
          status: "Pending",
          createdAt: "30/05/2026, 10:00 AM"
        }
      ];
      setBookings(initialMockBookings);
      localStorage.setItem("kb_bookings", JSON.stringify(initialMockBookings));
    }

    // Navbar scroll listener
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section for scrollSpy
      const sections = ["home", "about", "services", "menu", "gallery", "reviews", "booking", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update a single key in the text dictionary
  const updateContentKey = (key: string, newValue: string) => {
    setContent((prev) => {
      const updated = { ...prev, [key]: newValue };
      // Note: We update active state immediately.
      // Persisted to storage when clicking 'Save Changes' in toolbar.
      return updated;
    });
  };

  // Helper component to render inline editable content
  interface EditableTextProps {
    idKey: string;
    className?: string;
    as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  }

  const EditableText = ({ idKey, className = "", as: Element = "span" }: EditableTextProps) => {
    const value = content[idKey] !== undefined ? content[idKey] : (DEFAULT_CONTENT_DICTIONARY[idKey] || "");

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      const nextText = e.currentTarget.innerText;
      updateContentKey(idKey, nextText);
    };

    if (!isAdminEditMode) {
      return <Element className={className}>{value}</Element>;
    }

    return (
      <Element
        className={`${className} outline-dashed outline-1 outline-gold-400/60 bg-gold-950/20 px-1 rounded transition-all focus:outline-solid focus:outline-gold-500 focus:bg-stone-900/90`}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
      >
        {value}
      </Element>
    );
  };

  // Click handler for copyright triggers admin modal on 5 rapid clicks
  const handleCopyrightClick = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 1000) {
      const nextCount = copyrightClicks + 1;
      setCopyrightClicks(nextCount);
      if (nextCount >= 5) {
        setShowLoginModal(true);
        setCopyrightClicks(0); // reset
      }
    } else {
      setCopyrightClicks(1);
    }
    setLastClickTime(currentTime);
  };

  // Authenticate admin log-on
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === "Admin" && passwordInput === "kalimati123") {
      setIsAdminLoggedIn(true);
      setIsAdminEditMode(true); // default to edit mode
      localStorage.setItem("kb_admin_logged", "true");
      setShowLoginModal(false);
      setLoginError("");
      setUsernameInput("");
      setPasswordInput("");
      
      // Trigger a beautiful success notice
      triggerToast("Welcome Admin! Content editing is now enabled. Double click any text block to rewrite.");
    } else {
      setLoginError("Invalid system credentials. Please try again.");
    }
  };

  // Trigger system notification
  const triggerToast = (message: string) => {
    setSuccessToastMessage(message);
    setShowBookingSuccess(true);
    setTimeout(() => {
      setShowBookingSuccess(false);
    }, 5000);
  };

  // Upload hero file handler (stored as base64 in local state/storage)
  const handleHeroBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setHeroBg(base64String);
        localStorage.setItem("kb_hero_background_url", base64String);
        triggerToast("Hero background updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Persistent saving
  const handleSaveChanges = () => {
    localStorage.setItem("kb_edited_content", JSON.stringify(content));
    triggerToast("Success! All text modifications have been permanently saved in browser localStorage.");
  };

  // Add a new row to an existing banquet menu category definition
  const handleAddNewMenuRow = (catId: string) => {
    const dishName = prompt("Enter new dish name:");
    if (!dishName) return;
    const dishPrice = prompt(`Enter price of "${dishName}" in NPR (₨):`, "350");
    if (dishPrice === null) return;
    
    const currentMenu = menuStructure.length > 0 ? menuStructure : MENU_STRUCTURE;
    const itemId = `item_${Date.now()}`;
    const nameKey = `menu_${catId}_${itemId}_name`;
    const priceKey = `menu_${catId}_${itemId}_price`;
    
    // Update local config dictionary in active state
    setContent(prev => ({
      ...prev,
      [nameKey]: dishName,
      [priceKey]: dishPrice
    }));
    
    const updatedMenu = currentMenu.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: [...cat.items, { id: itemId, keyName: nameKey, keyPrice: priceKey }]
        };
      }
      return cat;
    });
    
    setMenuStructure(updatedMenu);
    localStorage.setItem("kb_menu_structure", JSON.stringify(updatedMenu));
    localStorage.setItem("kb_edited_content", JSON.stringify({
      ...content,
      [nameKey]: dishName,
      [priceKey]: dishPrice
    }));
    
    triggerToast(`Successfully added "${dishName}" to menu category!`);
  };

  // Delete a specific row from a menu category
  const handleDeleteMenuRow = (catId: string, itemId: string, nameVal: string) => {
    if (confirm(`Are you sure you want to permanently delete "${nameVal || "this dish"}" from the menu category?`)) {
      const currentMenu = menuStructure.length > 0 ? menuStructure : MENU_STRUCTURE;
      const updatedMenu = currentMenu.map(cat => {
        if (cat.id === catId) {
          return {
            ...cat,
            items: cat.items.filter(item => item.id !== itemId)
          };
        }
        return cat;
      });
      
      setMenuStructure(updatedMenu);
      localStorage.setItem("kb_menu_structure", JSON.stringify(updatedMenu));
      triggerToast("Permanently removed menu item row from active configurations.");
    }
  };

  // Clear edits and reset everything
  const handleResetToDefault = () => {
    if (confirm("Are you sure you want to reset all customized contents to factory default? Any edits will be discarded.")) {
      localStorage.removeItem("kb_edited_content");
      localStorage.removeItem("kb_hero_background_url");
      localStorage.removeItem("kb_gallery_list");
      localStorage.removeItem("kb_menu_structure");
      setContent({ ...DEFAULT_CONTENT_DICTIONARY });
      setHeroBg("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920");
      setGalleryList([...GALLERY_ITEMS]);
      setMenuStructure([...MENU_STRUCTURE]);
      setIsAdminEditMode(false);
      triggerToast("Application has been successfully reset to master default configuration.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Logout admin dashboard
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminEditMode(false);
    localStorage.removeItem("kb_admin_logged");
    triggerToast("Logged out of Admin Portal successfully.");
  };

  // Booking Form Submission
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!bookingForm.fullName.trim()) errors.fullName = "Full Name is required";
    if (!bookingForm.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(bookingForm.phone.trim())) {
      errors.phone = "Please enter a valid phone helpline number";
    }
    if (!bookingForm.email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingForm.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!bookingForm.eventType) errors.eventType = "Please select an event option";
    if (!bookingForm.eventDate) errors.eventDate = "Please choose a valid scheduling date";
    if (!bookingForm.guestsCount) {
      errors.guestsCount = "Guests headcount is required";
    } else if (Number(bookingForm.guestsCount) < 10) {
      errors.guestsCount = "Minimum event headcount is 10 guests";
    }
    if (!bookingForm.selectedPackage) errors.selectedPackage = "Please select a banquet tier";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // scroll to error
      const firstErrorKey = Object.keys(formErrors)[0] || "fullName";
      document.getElementsByName(firstErrorKey)?.[0]?.focus();
      return;
    }

    // Prepare Email parameters
    const subject = `Booking Inquiry: ${bookingForm.eventType} at Kalimati Banquet - ${bookingForm.eventDate}`;
    const emailBody = `Respected Kalimati Banquet Host Team,

I would like to file a formal event reservation inquiry with the following spec constraints:

• Full Applicant Name: ${bookingForm.fullName}
• Phone Contact Helpline: ${bookingForm.phone}
• Email Address: ${bookingForm.email}
• Requested Category Event: ${bookingForm.eventType}
• Preferred Calendar Date: ${bookingForm.eventDate}
• Approximate Guest Headcount: ${bookingForm.guestsCount} guests
• Chosen Banquet Option Tier: ${bookingForm.selectedPackage}

Custom requests & logistics specs:
${bookingForm.specialRequests || "None specified"}

Kindly verify availability on the specified date slot and coordinate the required deposit invoice.

Warmest regards,
${bookingForm.fullName}`;

    const mailtoUrl = `mailto:krishnagirikb@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open in native system handler
    window.location.href = mailtoUrl;

    // Save search context inside localStorage for Admin Access
    const newBookingObj = {
      id: "b_" + Date.now(),
      fullName: bookingForm.fullName,
      phone: bookingForm.phone,
      email: bookingForm.email,
      eventType: bookingForm.eventType || "Banquet Event",
      eventDate: bookingForm.eventDate,
      guestsCount: bookingForm.guestsCount,
      selectedPackage: bookingForm.selectedPackage,
      specialRequests: bookingForm.specialRequests,
      status: "Pending",
      createdAt: new Date().toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setBookings((prev) => {
      const updated = [newBookingObj, ...prev];
      localStorage.setItem("kb_bookings", JSON.stringify(updated));
      return updated;
    });

    // Toast acknowledgement
    triggerToast("Thank you! Your booking request has been compiled, saved in the database, and the email is ready to send. We will contact you soon.");

    // Reset Form
    setBookingForm({
      fullName: "",
      phone: "",
      email: "",
      eventType: "",
      eventDate: "",
      guestsCount: "",
      selectedPackage: "",
      specialRequests: ""
    });
  };

  // Review Slider control
  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev === 0 ? REVIEWS_DATA_MOCK.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev === REVIEWS_DATA_MOCK.length - 1 ? 0 : prev + 1));
  };

  // Image Filter logic
  const filteredGallery = galleryFilter === "All Photos" 
    ? galleryList 
    : galleryList.filter(item => item.category === galleryFilter);

  return (
    <div className="relative font-sans text-stone-100 bg-stone-950 overflow-x-hidden min-h-screen">
      
      {/* 🔐 Admin Floating Control System Toolbar */}
      {isAdminLoggedIn && (
        <div className="sticky top-0 z-50 bg-stone-900 border-b border-gold-400 text-stone-100 px-4 py-3 shadow-2xl flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-serif font-bold text-xs md:text-sm tracking-wider text-gold-400">
              ⚡ KALIMATI BANQUET - REALTIME CONTEXT EDITOR
            </span>
            <span className="bg-stone-800 text-[10px] text-stone-300 px-2 py-0.5 rounded ml-2 hidden md:inline border border-stone-700">
              Admin Session Active
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Edit Mode toggler button */}
            <button
              onClick={() => {
                setIsAdminEditMode(!isAdminEditMode);
                triggerToast(isAdminEditMode ? "Edit Mode Disabled" : "Edit Mode Enabled. Tap and modify text values directly.");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isAdminEditMode 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : "bg-stone-800 border border-stone-600 text-stone-300 hover:bg-stone-700"
              }`}
            >
              <Edit className="h-3.5 w-3.5" />
              {isAdminEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}
            </button>

            {/* Zentral Control Dashboard Modal Button */}
            <button
              onClick={() => setShowAdminDashboard(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-stone-800 to-stone-900 border border-gold-500/40 text-gold-400 hover:text-gold-300 font-semibold px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <BarChart className="h-3.5 w-3.5 text-gold-400" />
              <span>Dashboard Portal</span>
            </button>

            {/* Change Hero background selector */}
            <label className="flex items-center gap-1.5 bg-stone-800 border border-stone-600 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded cursor-pointer text-xs font-semibold uppercase tracking-wider transition-all">
              <Upload className="h-3.5 w-3.5 text-gold-400" />
              <span>Hero Image</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleHeroBgUpload} 
                className="hidden" 
              />
            </label>

            {/* Save Button */}
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-1.5 bg-gold-500 text-stone-950 font-semibold px-4 py-1.5 rounded hover:bg-gold-400 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              Save Edits
            </button>

            {/* Master Reset */}
            <button
              onClick={handleResetToDefault}
              className="flex items-center gap-1.5 bg-stone-800 text-amber-500 hover:text-amber-400 font-semibold px-3 py-1.5 rounded border border-amber-500/20 hover:bg-stone-700 text-xs uppercase tracking-wider transition-all cursor-pointer"
              title="Revert all administrative changes and restore template text"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Defaults
            </button>

            {/* Logout */}
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-1 bg-stone-950 text-stone-400 hover:text-white px-3 py-1.5 rounded text-xs hover:bg-black transition-all cursor-pointer"
            >
              <LogOut className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* --- NOTIFICATION TOAST POPUP --- */}
      <AnimatePresence>
        {showBookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm md:max-w-md bg-stone-900 border-l-4 border-gold-500 text-stone-100 p-4 rounded-lg shadow-2xl flex items-start gap-3"
          >
            <div className="bg-gold-500 p-1.5 rounded-full text-stone-950 mt-0.5 shrink-0 animate-bounce">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div className="flex-1">
              <h4 className="font-serif font-bold text-gold-400 text-sm tracking-wider uppercase">System Notification</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">{successToastMessage}</p>
            </div>
            <button 
              onClick={() => setShowBookingSuccess(false)}
              className="text-stone-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔝 STRIP-1: STICKY NAVIGATION BAR */}
      <nav 
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isAdminLoggedIn ? "mt-[120px] md:mt-[60px]" : ""
        } ${
          isScrolled 
            ? "bg-stone-950/95 py-3 border-b border-gold-500/10 shadow-2xl backdrop-blur-md" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo element with custom gold script */}
          <a href="#home" className="flex flex-col select-none group">
            <span className="font-script text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-gold-400 to-amber-500 tracking-wide font-bold leading-tight">
              Kalimati Banquet
            </span>
            <span className="text-[9px] text-stone-400 uppercase tracking-[0.25em] font-mono -mt-1 font-medium group-hover:text-gold-400 transition-colors">
              Luxury Venue • Kathmandu
            </span>
          </a>

          {/* Nav links: Desktop View */}
          <div className="hidden lg:flex items-center space-x-6">
            {[
              { id: "home", labelKey: "nav_home" },
              { id: "about", labelKey: "nav_about" },
              { id: "services", labelKey: "nav_services" },
              { id: "menu", labelKey: "nav_menu" },
              { id: "gallery", labelKey: "nav_gallery" },
              { id: "reviews", labelKey: "nav_reviews" },
              { id: "booking", labelKey: "nav_booking" },
              { id: "contact", labelKey: "nav_contact" }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative py-2 text-xs uppercase font-semibold tracking-widest transition-colors cursor-pointer group ${
                  currentSection === link.id 
                    ? "text-gold-400" 
                    : "text-stone-300 hover:text-gold-400"
                }`}
              >
                <EditableText idKey={link.labelKey} />
                
                {/* Gold underline hover effect line */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold-400 transition-all duration-300 ${
                  currentSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}

            {/* Quick CTAs inside menu */}
            <a 
              href="#booking"
              className="ml-4 bg-gradient-to-r from-amber-500 to-gold-600 hover:from-amber-400 hover:to-gold-500 text-stone-950 font-bold px-4 py-2 rounded text-xs uppercase tracking-wider transition-all duration-200 transform active:scale-95 shadow-md"
            >
              Reserve
            </a>
          </div>

          {/* Hamburger button for mobile views */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-gold-400 focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu container block */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-stone-950 border-b border-gold-500/15 overflow-hidden shadow-xl"
            >
              <div className="px-4 pt-3 pb-6 flex flex-col space-y-4">
                {[
                  { id: "home", labelKey: "nav_home" },
                  { id: "about", labelKey: "nav_about" },
                  { id: "services", labelKey: "nav_services" },
                  { id: "menu", labelKey: "nav_menu" },
                  { id: "gallery", labelKey: "nav_gallery" },
                  { id: "reviews", labelKey: "nav_reviews" },
                  { id: "booking", labelKey: "nav_booking" },
                  { id: "contact", labelKey: "nav_contact" }
                ].map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1.5 text-xs uppercase tracking-wider font-medium text-stone-300 hover:text-gold-400 ${
                      currentSection === link.id ? "text-gold-400 border-l-2 border-gold-400 pl-2" : "pl-1"
                    }`}
                  >
                    <EditableText idKey={link.labelKey} />
                  </a>
                ))}
                
                <a 
                  href="#booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-gold-500 text-stone-950 font-bold py-2.5 rounded text-xs uppercase tracking-wider transition-colors hover:bg-gold-400"
                >
                  Book Banquet Hall
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      {/* 🏛️ STRIP-2: HERO SECTION WITH THE OVERLAY */}
      <section 
        id="home"
        className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden pt-20"
        style={{ backgroundImage: `url("${heroBg}")` }}
      >
        {/* Full scren dark vignette layout overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50 z-0" />
        <div className="absolute inset-0 bg-radial-gradient-vignette opacity-70 z-0" />

        {/* Floating Edit Button Overlay for Hero Image */}
        {isAdminEditMode && (
          <div 
            onClick={() => {
              const newUrl = prompt("Enter new image URL for the Hero Background:", heroBg);
              if (newUrl) {
                setHeroBg(newUrl);
                localStorage.setItem("kb_hero_background_url", newUrl);
                triggerToast("Hero background URL updated! Remember to click 'Save Edits' at the top of the screen to persist text changes.");
              }
            }}
            className="absolute top-24 right-6 md:right-12 z-30 bg-stone-900/95 hover:bg-gold-500 hover:text-stone-950 border border-gold-500/40 text-gold-400 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-2xl transition-all hover:scale-[1.03]"
            title="Click to change Hero background picture"
          >
            <Edit className="h-4 w-4" />
            Edit Background Image URL
          </div>
        )}

        {/* Live shimmering particles canvas background */}
        <GoldParticles />

        {/* Interactive content frame with high readability styling */}
        <div className="relative max-w-4xl mx-auto px-4 z-20 text-center select-text mt-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-950/40 border border-gold-500/20 rounded-full mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-spin-slow" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-gold-300 font-semibold uppercase">
              <EditableText idKey="hero_tagline" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3.5xl md:text-5.5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]"
          >
            <EditableText idKey="hero_title" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-stone-300 mt-6 text-sm md:text-base lg:text-lg max-w-2xl mx-auto tracking-wide font-light leading-relaxed"
          >
            <EditableText idKey="hero_subtext" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            {/* CTA Book Now - Gold solid */}
            <a
              href="#booking"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-stone-950 font-bold px-8 py-3.5 rounded text-xs uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform active:scale-98 text-center"
            >
              <EditableText idKey="hero_cta_book" />
            </a>

            {/* CTA Explore Menu - Outlined Red */}
            <a
              href="#menu"
              className="w-full sm:w-auto bg-transparent hover:bg-red-500/10 border-2 border-red-500 hover:border-red-400 text-stone-100 hover:text-white font-bold px-8 py-3 rounded text-xs uppercase tracking-widest transition-all text-center"
            >
              <EditableText idKey="hero_cta_menu" />
            </a>
          </motion.div>
        </div>

        {/* Diagonal Wave Divider at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-16 w-full pointer-events-none z-10 fill-stone-950">
          <svg viewBox="0 0 1440 100" fill="currentColor" className="w-full h-full">
            <path d="M0,80L120,69.3C240,59,480,37,720,32C960,37,1200,59,1320,69.3L1440,80L1440,100L1320,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"></path>
          </svg>
        </div>
      </section>


      {/* 🌟 STRIP-3: ABOUT US SECTION */}
      <section id="about" className="py-24 relative overflow-hidden bg-stone-950">
        
        {/* Ambient background gold glow effect */}
        <div className="absolute top-1/3 -left-64 h-[400px] w-[400px] blur-[150px] bg-gold-950/20 rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Story details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="font-mono text-[10px] md:text-xs text-gold-400 tracking-[0.3em] uppercase block font-bold">
                  <EditableText idKey="about_story_subtitle" />
                </span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-semibold tracking-tight text-white leading-tight">
                  <EditableText idKey="about_story_title" />
                </h2>
              </div>

              <div className="h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />

              <div className="space-y-4 text-stone-300 text-sm md:text-base leading-relaxed font-light">
                <EditableText idKey="about_story_p1" as="p" />
                <EditableText idKey="about_story_p2" as="p" />
              </div>

              {/* Unique stats bento layout block */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                {[
                  { keyNum: "spec_capacity_num", keyLbl: "spec_capacity_lbl", icon: <Users className="h-4 w-4 text-gold-500 inline mr-1" /> },
                  { keyNum: "spec_ac_num", keyLbl: "spec_ac_lbl", icon: <Clock className="h-4 w-4 text-gold-500 inline mr-1" /> },
                  { keyNum: "spec_valet_num", keyLbl: "spec_valet_lbl", icon: <MapPin className="h-4 w-4 text-gold-500 inline mr-1" /> },
                  { keyNum: "spec_support_num", keyLbl: "spec_support_lbl" , icon: <Check className="h-4 w-4 text-gold-500 inline mr-1" />}
                ].map((spec, idx) => (
                  <div key={idx} className="bg-stone-900/60 p-4 rounded-lg border border-stone-800 text-center hover:border-gold-500/25 transition-all">
                    <p className="text-xl md:text-2xl font-serif text-gold-400 font-bold tracking-tight">
                      <EditableText idKey={spec.keyNum} />
                    </p>
                    <p className="text-[10px] uppercase font-mono text-stone-400 mt-1 whitespace-nowrap">
                      {spec.icon} <EditableText idKey={spec.keyLbl} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual illustration bento with overlay features */}
            <div className="lg:col-span-5 relative">
              <div className="relative group overflow-hidden rounded-2xl border border-gold-500/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent z-10" />
                <img 
                  src={content["about_interior_image"] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=700"} 
                  alt="Kalimati Banquet Interior layout" 
                  className={`w-full object-cover aspect-[4/5] object-center transition-transform duration-700 ${isAdminEditMode ? "border-2 border-dashed border-gold-500/50 cursor-pointer" : "group-hover:scale-105"}`}
                  referrerPolicy="no-referrer"
                  onClick={() => {
                    if (isAdminEditMode) {
                      const current = content["about_interior_image"] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=700";
                      const newUrl = prompt("Enter new image URL for About layout illustration:", current);
                      if (newUrl) {
                        updateContentKey("about_interior_image", newUrl);
                        triggerToast("About interior layout picture has been updated instantly!");
                      }
                    }
                  }}
                />

                {/* Clear Edit Mode Helper Overlay for Image Change */}
                {isAdminEditMode && (
                  <div 
                    onClick={() => {
                      const current = content["about_interior_image"] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=700";
                      const newUrl = prompt("Enter new image URL for About layout illustration:", current);
                      if (newUrl) {
                        updateContentKey("about_interior_image", newUrl);
                        triggerToast("About interior layout picture has been updated instantly!");
                      }
                    }}
                    className="absolute inset-0 bg-stone-950/75 hover:bg-stone-950/65 z-20 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all"
                  >
                    <Edit className="h-6 w-6 text-gold-400 mb-2 animate-bounce" />
                    <span className="text-sm font-serif font-bold text-gold-400 uppercase tracking-wide">
                      Click to Change Picture
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono mt-1">
                      (NPR Banquets Master Graphic Layout)
                    </span>
                  </div>
                )}
                
                {/* Floating highlight card on top of image */}
                <div className="absolute bottom-6 left-6 right-6 z-20 bg-stone-900/95 border border-gold-500/20 p-5 rounded-xl backdrop-blur">
                  <h4 className="font-serif font-bold text-gold-400 tracking-wide text-xs uppercase mb-1">
                    Premier Address
                  </h4>
                  <p className="text-white text-sm font-semibold">
                    Kalimati, Kathmandu (Near Kalimati Bridge)
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Convenient bypass road, 200+ car free parking zone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Three icon accent cards underneath */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-stone-900">
            {[
              { idKeyT: "card_excellence_title", idKeyD: "card_excellence_desc" },
              { idKeyT: "card_culinary_title", idKeyD: "card_culinary_desc" },
              { idKeyT: "card_ambience_title", idKeyD: "card_ambience_desc" }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="bg-stone-900/40 p-6 rounded-xl border border-stone-850 hover:border-gold-500/20 transition-all hover:-translate-y-1 block"
              >
                <h3 className="font-serif font-semibold text-lg text-gold-400">
                  <EditableText idKey={card.idKeyT} />
                </h3>
                <p className="text-xs text-stone-300 mt-3 leading-relaxed">
                  <EditableText idKey={card.idKeyD} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 🎉 STRIP-4: SERVICES SECTION */}
      <section id="services" className="py-24 bg-stone-900/40 border-y border-stone-900/65 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] md:text-xs text-gold-400 tracking-[0.3em] uppercase font-bold">
              <EditableText idKey="services_subtitle" />
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-white mt-2 leading-tight">
              <EditableText idKey="services_title" />
            </h2>
            <div className="h-[2px] w-20 bg-gold-500 mx-auto mt-4 mb-4" />
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
              <EditableText idKey="services_desc" />
            </p>
          </div>

          {/* Service grid matching required hover red glow effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service) => {
              // Map icon string dynamically
              const IconComp = (() => {
                switch(service.iconName) {
                  case "Gift": return Gift;
                  case "Briefcase": return Briefcase;
                  case "Cake": return Cake;
                  case "Sparkles": return Sparkles;
                  case "Utensils": return Utensils;
                  case "Heart": return Heart;
                  default: return Sparkles;
                }
              })();

              return (
                <div 
                  key={service.id}
                  className="group relative bg-stone-950 p-8 rounded-xl border border-stone-850/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] hover:border-red-500/30 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Subtle red outline overlay inside on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Service Icon */}
                  <div className="bg-gold-500/10 p-3.5 rounded-lg w-fit text-gold-400 border border-gold-500/20 group-hover:bg-red-500/10 group-hover:text-red-400 group-hover:border-red-500/20 transition-all">
                    <IconComp className="h-6 w-6 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif font-semibold text-lg text-white mt-6 group-hover:text-gold-400 transition-colors">
                    <EditableText idKey={service.keyTitle} />
                  </h3>

                  <p className="text-xs text-stone-300 mt-3 leading-relaxed font-light">
                    <EditableText idKey={service.keyDesc} />
                  </p>

                  {/* Corner indicator accent */}
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono tracking-widest text-stone-600 uppercase font-semibold group-hover:text-red-400/50 transition-colors">
                    0{SERVICES_DATA.indexOf(service) + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 🍽️ STRIP-5: MENU CARD SECTION */}
      <section id="menu" className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] md:text-xs text-gold-400 tracking-[0.3em] uppercase font-bold">
              <EditableText idKey="menu_subtitle" />
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-white mt-1 leading-tight">
              <EditableText idKey="menu_title" />
            </h2>
            <div className="h-[2px] w-20 bg-gold-400 mx-auto mt-4 mb-4" />
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
              <EditableText idKey="menu_desc" />
            </p>
          </div>

          {/* Categories select tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: "veg_starter", keyLabel: "cat_veg_starters" },
              { id: "nonveg_starter", keyLabel: "cat_nonveg_starters" },
              { id: "main_veg", keyLabel: "cat_main_veg" },
              { id: "main_nonveg", keyLabel: "cat_main_nonveg" },
              { id: "rice_breads", keyLabel: "cat_rice_breads" },
              { id: "desserts", keyLabel: "cat_desserts" },
              { id: "beverages", keyLabel: "cat_beverages" },
              { id: "packages", keyLabel: "cat_packages" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMenuTab(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border transition-all cursor-pointer ${
                  activeMenuTab === tab.id
                    ? "bg-gold-500 text-stone-950 border-gold-500 font-bold shadow-md"
                    : "bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white"
                }`}
              >
                <EditableText idKey={tab.keyLabel} />
              </button>
            ))}
          </div>

          {/* Switchable tab contents */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeMenuTab !== "packages" ? (
                <motion.div
                  key={activeMenuTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                >
                  {((menuStructure && menuStructure.length > 0) ? menuStructure : MENU_STRUCTURE).find(c => c.id === activeMenuTab)?.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-end justify-between gap-4 p-4 rounded-lg bg-stone-900/30 border border-stone-850/60 hover:bg-stone-900/65 group transition-colors"
                    >
                      {/* Left: Name and indicator */}
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-serif font-bold text-base text-white group-hover:text-gold-400 transition-colors truncate">
                          <EditableText idKey={item.keyName} />
                        </h4>
                        <div className="h-[1px] w-full border-b border-dashed border-stone-800 mt-2" />
                      </div>

                      {/* Right: Currency and Price */}
                      <div className="text-gold-400 font-bold font-mono text-base shrink-0 flex items-center gap-1">
                        <span>₨</span>
                        <EditableText idKey={item.keyPrice} />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="packages"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn"
                >
                  {PACKAGES_DATA.map((pkg) => (
                    <div 
                      key={pkg.id}
                      onClick={() => setOpenedPackage(pkg.id)}
                      className={`relative rounded-2xl p-8 bg-gradient-to-b ${pkg.gradient} border-[1px] border-stone-800 hover:border-gold-500/40 transition-all hover:-translate-y-2 flex flex-col justify-between cursor-pointer group active:scale-[0.99]`}
                      title="Click directly to open detailed lists of inclusions!"
                    >
                      {/* Popular ribbon for Gold tier */}
                      {pkg.id === "pkg_gold" && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-500 text-stone-950 px-3.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest font-black shadow-lg">
                          Most Preferred Block
                        </div>
                      )}

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded font-black ${pkg.badgeColor}`}>
                            {pkg.id === "pkg_silver" ? "Silver" : pkg.id === "pkg_gold" ? "Gold Royal" : "Diamond Supreme"}
                          </span>
                          
                          {/* Eye action button cue */}
                          <div
                            className="text-[10px] font-mono tracking-wider font-bold text-stone-400 group-hover:text-gold-400 flex items-center gap-1 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" /> Check Inclusions
                          </div>
                        </div>

                        <h3 className="font-serif font-bold text-xl text-white group-hover:text-gold-300 transition-colors">
                          <EditableText idKey={pkg.keyName} />
                        </h3>

                        <div className="flex items-baseline gap-1.5 text-gold-400 my-6">
                          <span className="font-serif font-medium text-lg">₨</span>
                          <span className="font-mono text-3.5xl font-black tracking-tight leading-none">
                            {/* Format numbers for Nepali context if numeric */}
                            <EditableText idKey={pkg.keyPrice} />
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 ml-1 uppercase">Inclusive</span>
                        </div>

                        <div className="h-[2px] w-full bg-stone-800/80 mb-6" />

                        <p className="text-xs text-stone-300 leading-relaxed font-light mb-6">
                          <EditableText idKey={pkg.keyDesc} />
                        </p>
                      </div>

                      {/* Inclusions checklist mockup */}
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-2.5 text-xs text-stone-300">
                          <Check className="h-4 w-4 text-gold-500 shrink-0" />
                          <span>Fully air-conditioned reception hall space</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-stone-300">
                          <Check className="h-4 w-4 text-gold-500 shrink-0" />
                          <span>Premium soundproofing & ambient mics</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-stone-300">
                          <Check className="h-4 w-4 text-gold-500 shrink-0" />
                          <span>Free private backstage vanity setups</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-stone-300">
                          <span className="text-gold-400 font-mono tracking-wider text-[10px] font-bold underline cursor-pointer">
                            Click card to open +9 more inclusions
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingForm(prev => ({ ...prev, selectedPackage: pkg.id }));
                          const target = document.getElementById("booking");
                          if (target) {
                            window.scrollTo({
                              top: target.offsetTop - 80,
                              behavior: "smooth"
                            });
                          }
                          triggerToast(`Selected ${pkg.id === "pkg_silver" ? "Silver" : pkg.id === "pkg_gold" ? "Gold" : "Diamond"} Package! Ready for inquiry.`);
                        }}
                        className={`block w-full text-center py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                          pkg.id === "pkg_gold"
                            ? "bg-gold-500 hover:bg-gold-400 text-stone-950 shadow-md transform hover:scale-[1.02]"
                            : "bg-stone-800 hover:bg-stone-700 text-stone-200"
                        }`}
                      >
                        Inquire Package
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Package Detailed Inclusions Overlay Modal */}
        <AnimatePresence>
          {openedPackage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md"
              onClick={() => setOpenedPackage(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stone-900 border border-gold-500/25 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
              >
                {/* Gold ambient shimmer strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-gold-600 via-yellow-500 to-gold-400" />
                
                {/* Close Button */}
                <button 
                  onClick={() => setOpenedPackage(null)}
                  className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white hover:bg-stone-850 rounded-full transition-all cursor-pointer z-35"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-stone-850 bg-stone-900/50">
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-gold-950/40 border border-gold-500/20 text-gold-400 px-3 py-1 rounded-full font-black">
                    {openedPackage === "pkg_silver" ? "Silver Tier Package" : openedPackage === "pkg_gold" ? "Gold Royal Banquet" : "Diamond Supreme"}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3.5xl text-white font-bold tracking-tight mt-3">
                    <EditableText idKey={PACKAGES_DATA.find(p => p.id === openedPackage)?.keyName || ""} />
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2 text-gold-400 font-bold">
                    <span className="text-sm font-serif font-medium">Rate: NPR</span>
                    <span className="font-mono text-xl md:text-2xl font-black">
                      <EditableText idKey={PACKAGES_DATA.find(p => p.id === openedPackage)?.keyPrice || ""} />
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 uppercase font-bold">(Exclusively Inclusive)</span>
                  </div>
                </div>

                {/* Main Content Area: List view of inclusions */}
                <div className="p-6 md:p-8 max-h-[50vh] overflow-y-auto space-y-4 bg-stone-950/30">
                  <p className="text-stone-400 text-xs font-mono uppercase tracking-wider font-semibold border-b border-stone-850 pb-2 text-left">
                    Master Inclusions Checklist ({PACKAGE_INCLUSIONS_DETAILED[openedPackage as keyof typeof PACKAGE_INCLUSIONS_DETAILED]?.length || 0} features)
                  </p>
                  
                  <div className="space-y-3.5">
                    {PACKAGE_INCLUSIONS_DETAILED[openedPackage as keyof typeof PACKAGE_INCLUSIONS_DETAILED]?.map((inc, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        key={i} 
                        className="flex items-start gap-3 p-3 bg-stone-900/40 rounded-xl border border-stone-850/40 hover:border-gold-500/10 transition-colors"
                      >
                        <Check className="h-4 w-4 text-gold-400 shrink-0 mt-0.5 bg-gold-950/50 p-0.5 rounded border border-gold-500/20" />
                        <span className="text-stone-200 text-xs md:text-sm font-sans leading-relaxed text-left">{inc}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer actions */}
                <div className="p-6 bg-stone-900 border-t border-stone-850/60 flex flex-col sm:flex-row gap-3 justify-end">
                  <button 
                    onClick={() => setOpenedPackage(null)}
                    className="px-4 py-2.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                  <button 
                    onClick={() => {
                      const selPkg = openedPackage;
                      setOpenedPackage(null);
                      setBookingForm(prev => ({ ...prev, selectedPackage: selPkg }));
                      const target = document.getElementById("booking");
                      if (target) {
                        window.scrollTo({
                          top: target.offsetTop - 80,
                          behavior: "smooth"
                        });
                      }
                      triggerToast(`Selected ${selPkg === "pkg_silver" ? "Silver" : selPkg === "pkg_gold" ? "Gold" : "Diamond"} Package! Form inquiry activated.`);
                    }}
                    className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold rounded-lg text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-md shadow-gold-500/10"
                  >
                    Select & Plan Reservation
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      {/* 🖼️ STRIP-6: GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-stone-900/30 border-t border-stone-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] md:text-xs text-gold-400 tracking-[0.3em] uppercase font-bold">
              <EditableText idKey="gallery_subtitle" />
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-white mt-1 leading-tight">
              <EditableText idKey="gallery_title" />
            </h2>
            <div className="h-[2px] w-20 bg-gold-400 mx-auto mt-4 mb-4" />
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
              <EditableText idKey="gallery_desc" />
            </p>
          </div>

          {/* Filter Categories Selector */}
          <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto pb-2">
            {[
              { id: "All Photos", labelKey: "cat_all" },
              { id: "Weddings", labelKey: "cat_weddings" },
              { id: "Corporate", labelKey: "cat_corporate" },
              { id: "Celebrations", labelKey: "cat_celebrations" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setGalleryFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  galleryFilter === cat.id
                    ? "bg-stone-100 text-stone-950 font-bold border-stone-100"
                    : "bg-stone-850 hover:bg-stone-800 text-stone-400 border border-transparent"
                }`}
              >
                <EditableText idKey={cat.labelKey} />
              </button>
            ))}
          </div>

          {/* Masonry CSS Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredGallery.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => {
                  if (isAdminEditMode) {
                    const newUrl = prompt(`Enter new image URL for Gallery item "${item.alt}":`, item.url);
                    if (newUrl === null) return; // cancel
                    const newAlt = prompt(`Enter new brief label/alt description for this photo:`, item.alt);
                    if (newAlt === null) return; // cancel
                    
                    const updated = galleryList.map(g => g.id === item.id ? { ...g, url: newUrl, alt: newAlt } : g);
                    setGalleryList(updated);
                    localStorage.setItem("kb_gallery_list", JSON.stringify(updated));
                    triggerToast("Gallery image updated successfully!");
                  } else {
                    setSelectedLightboxImage(galleryList.indexOf(item));
                  }
                }}
                className="break-inside-avoid relative overflow-hidden rounded-xl border border-stone-800 group cursor-pointer shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5" />
                
                {/* Admin Mode Overlay Hint */}
                {isAdminEditMode && (
                  <div className="absolute inset-0 bg-stone-950/80 z-30 flex flex-col items-center justify-center p-3 text-center border border-dashed border-gold-500/40 rounded-xl">
                    <Edit className="h-5 w-5 text-gold-400 mb-1" />
                    <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-mono">Click to Edit Photo</span>
                    <span className="text-[9px] text-stone-500 truncate max-w-full px-1">{item.alt}</span>
                  </div>
                )}

                {/* Visual Label overlays inside and reveals on hover */}
                <div className="absolute bottom-4 left-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[9px] uppercase font-mono tracking-widest bg-gold-500 text-stone-950 px-2 py-0.5 rounded font-black">
                    {item.category}
                  </span>
                  <h4 className="text-white text-sm font-semibold tracking-wide font-serif mt-1">{item.alt}</h4>
                </div>

                <img 
                  src={item.url} 
                  alt={item.alt} 
                  className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Breathtaking Lightbox Overlay Portal */}
        <AnimatePresence>
          {selectedLightboxImage !== null && selectedLightboxImage < galleryList.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedLightboxImage(null)}
            >
              <button 
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white hover:bg-stone-900 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLightboxImage(null);
                }}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
                {/* Previous Image control */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLightboxImage(prev => {
                      if (prev === null) return null;
                      return prev === 0 ? galleryList.length - 1 : prev - 1;
                    });
                  }}
                  className="absolute left-4 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white cursor-pointer transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <img 
                  src={galleryList[selectedLightboxImage].url} 
                  alt={galleryList[selectedLightboxImage].alt}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg border border-stone-800 shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Next Image control */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLightboxImage(next => {
                      if (next === null) return null;
                      return next === galleryList.length - 1 ? 0 : next + 1;
                    });
                  }}
                  className="absolute right-4 p-3 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white cursor-pointer transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Caption */}
              <div 
                className="mt-4 text-center max-w-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] uppercase font-mono tracking-widest bg-gold-500 text-stone-950 px-2.5 py-0.5 rounded font-black">
                  {galleryList[selectedLightboxImage].category}
                </span>
                <p className="text-white text-base font-serif font-bold mt-2">
                  {galleryList[selectedLightboxImage].alt}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Photo {selectedLightboxImage + 1} of {galleryList.length}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      {/* ⭐ STRIP-7: GOOGLE REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] md:text-xs text-gold-400 tracking-[0.3em] uppercase font-bold">
              <EditableText idKey="reviews_subtitle" />
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-white mt-1 leading-tight">
              <EditableText idKey="reviews_title" />
            </h2>
            <div className="h-[2px] w-20 bg-gold-400 mx-auto mt-4 mb-4" />
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
              <EditableText idKey="reviews_desc" />
            </p>
          </div>

          {/* Horizontally scrolling reviews with custom design and G-Badge */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-900 border border-stone-850 p-8 rounded-2xl relative shadow-xl text-center flex flex-col justify-between"
                >
                  {/* Google Icon and quotation accents */}
                  <div className="absolute top-6 left-6 text-gold-500/10 font-serif text-7xl select-none font-bold leading-none">
                    “
                  </div>

                  <div className="space-y-4">
                    {/* Stars ratings */}
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-gold-500 text-gold-500" />
                      ))}
                    </div>

                    <blockquote className="text-stone-200 text-sm md:text-base italic leading-relaxed font-light max-w-2xl mx-auto">
                      <EditableText idKey={REVIEWS_DATA_MOCK[activeReviewIndex].keyText} />
                    </blockquote>
                  </div>

                  <div className="mt-8">
                    <p className="font-serif text-gold-400 text-sm font-bold tracking-wide">
                      {REVIEWS_DATA_MOCK[activeReviewIndex].author}
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono mt-0.5 uppercase">
                      Local Guide • {REVIEWS_DATA_MOCK[activeReviewIndex].date}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Switch Controllers */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={prevReview}
                className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-gold-500 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {REVIEWS_DATA_MOCK.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeReviewIndex === idx ? "w-6 bg-gold-400" : "w-2 bg-stone-800"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextReview}
                className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-gold-500 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            {/* Powered by Google Reviews Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-stone-900/60 px-4 py-2 rounded-lg border border-stone-850/80">
                <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center stroke-none select-none overflow-hidden shrink-0">
                  <svg viewBox="0 0 24 24" className="h-3 w-3">
                    <path fill="#4285F4" d="M23.7 12.3c0-.8-.1-1.7-.2-2.5H12v4.8h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9.1z"/>
                    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.9-2.1-6.8-5H1.2v3.2C3.2 21.3 7.3 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.2 14.1c-.2-.7-.4-1.4-.4-2.1 0-.7.1-1.5.4-2.1V6.7H1.2a11.9 11.9 0 000 10.6l4-3.2z"/>
                    <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.1 0 12 0 7.3 0 3.2 2.7 1.2 6.7l4 3.2c.9-2.9 3.6-5.1 6.8-5.1z"/>
                  </svg>
                </div>
                <span className="text-[11px] tracking-wide font-medium text-stone-300 font-sans">
                  Powered by <span className="font-bold text-white border-b border-white/20 select-none">Google Reviews</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 📅 STRIP-8: BOOKING DESK SECTION */}
      <section id="booking" className="py-24 bg-stone-900/40 border-t border-stone-900 relative">
        
        {/* Glow backdrop decorator */}
        <div className="absolute bottom-1/4 -right-48 h-[350px] w-[350px] blur-[150px] bg-red-950/15 rounded-full" />

        <div className="max-w-4xl mx-auto px-4 relative z-20">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-[10px] md:text-xs text-gold-400 tracking-[0.3em] uppercase font-bold">
              <EditableText idKey="book_subtitle" />
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-white mt-1 leading-tight">
              <EditableText idKey="book_title" />
            </h2>
            <div className="h-[2px] w-20 bg-gold-400 mx-auto mt-4 mb-4" />
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
              <EditableText idKey="book_desc" />
            </p>
          </div>

          {/* Form container frame */}
          <div className="bg-stone-950 p-6 md:p-10 rounded-2xl border border-stone-850/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600" />
            
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                    <EditableText idKey="form_name_lbl" /> <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={bookingForm.fullName}
                    onChange={handleFormChange}
                    className={`w-full bg-stone-900 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-stone-600 ${
                      formErrors.fullName 
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" 
                        : "border-stone-800 focus:border-gold-500"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide mt-1 pl-1">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone number input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                    <EditableText idKey="form_phone_lbl" /> <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleFormChange}
                    className={`w-full bg-stone-900 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-stone-600 ${
                      formErrors.phone 
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" 
                        : "border-stone-800 focus:border-gold-500"
                    }`}
                    placeholder="e.g., +977 9851000000"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide mt-1 pl-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                    <EditableText idKey="form_email_lbl" /> <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={bookingForm.email}
                    onChange={handleFormChange}
                    className={`w-full bg-stone-900 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-stone-600 ${
                      formErrors.email 
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" 
                        : "border-stone-800 focus:border-gold-500"
                    }`}
                    placeholder="e.g., mail@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide mt-1 pl-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Event dropdown selector options */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                    <EditableText idKey="form_type_lbl" /> <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="eventType"
                    value={bookingForm.eventType}
                    onChange={handleFormChange}
                    className={`w-full bg-stone-900 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all ${
                      formErrors.eventType 
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" 
                        : "border-stone-800 focus:border-gold-500"
                    }`}
                  >
                    <option value="" className="text-stone-600">Select an event category</option>
                    <option value="Wedding Reception">Wedding Reception</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Birthday Gala">Birthday Gala</option>
                    <option value="Bratabandha Ceremony">Bratabandha & Cultural Ceremony</option>
                    <option value="Cocktail Social Mixer">Cocktail Evening</option>
                    <option value="Anniversary Gala">Anniversary Party</option>
                    <option value="Other Celebrations">Other Celebrations</option>
                  </select>
                  {formErrors.eventType && (
                    <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide mt-1 pl-1">
                      {formErrors.eventType}
                    </p>
                  )}
                </div>

                {/* Scheduled calendar slot picker */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                    <EditableText idKey="form_date_lbl" /> <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    name="eventDate"
                    value={bookingForm.eventDate}
                    onChange={handleFormChange}
                    className={`w-full bg-stone-900 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all text-stone-300 ${
                      formErrors.eventDate 
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" 
                        : "border-stone-800 focus:border-gold-500"
                    }`}
                  />
                  {formErrors.eventDate && (
                    <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide mt-1 pl-1">
                      {formErrors.eventDate}
                    </p>
                  )}
                </div>

                {/* Headcount input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                    <EditableText idKey="form_guests_lbl" /> <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    name="guestsCount"
                    value={bookingForm.guestsCount}
                    onChange={handleFormChange}
                    className={`w-full bg-stone-900 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-stone-600 ${
                      formErrors.guestsCount 
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" 
                        : "border-stone-800 focus:border-gold-500"
                    }`}
                    placeholder="Min 10 - Max 500 guests"
                    min="10"
                    max="1000"
                  />
                  {formErrors.guestsCount && (
                    <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide mt-1 pl-1">
                      {formErrors.guestsCount}
                    </p>
                  )}
                </div>
              </div>

              {/* Package category preference select */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                  <EditableText idKey="form_pkg_lbl" /> <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: "pkg_silver", label: "Silver Tier Package (₨ 85,000)" },
                    { id: "pkg_gold", label: "Gold Royal Tier Package (₨ 1,60,000)" },
                    { id: "pkg_diamond", label: "Diamond Supreme Package (₨ 3,50,000)" }
                  ].map((pItem) => (
                    <label 
                      key={pItem.id}
                      className={`block px-4 py-3 rounded-lg border text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all select-none text-center ${
                        bookingForm.selectedPackage === pItem.id
                          ? "bg-gold-500/15 border-gold-500 text-gold-400 font-bold"
                          : "bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-400"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="selectedPackage" 
                        value={pItem.id}
                        checked={bookingForm.selectedPackage === pItem.id}
                        onChange={handleFormChange}
                        className="hidden"
                      />
                      {pItem.label}
                    </label>
                  ))}
                </div>
                {formErrors.selectedPackage && (
                  <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide mt-1 pl-1">
                    {formErrors.selectedPackage}
                  </p>
                )}
              </div>

              {/* Custom specs text box */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-semibold text-stone-300 tracking-wider flex items-center gap-1.5 pl-0.5">
                  <EditableText idKey="form_requests_lbl" />
                </label>
                <textarea 
                  name="specialRequests"
                  value={bookingForm.specialRequests}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-gold-500 rounded-lg px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-stone-600"
                  placeholder="Outline any dietary/menu edits, floristry style, or special VIP accommodations requested..."
                />
              </div>

              {/* Submit CTA button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-stone-950 font-extrabold uppercase py-4 rounded-xl text-xs tracking-widest shadow-lg hover:brightness-110 active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4.5 w-4.5 text-stone-950 fill-none" />
                  <EditableText idKey="form_submit_btn" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>


      {/* 📍 STRIP-9: CONTACT & MAP SECTION */}
      <section id="contact" className="py-24 bg-stone-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] md:text-xs text-gold-400 tracking-[0.3em] uppercase font-bold">
              <EditableText idKey="contact_subtitle" />
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-white mt-1 leading-tight">
              <EditableText idKey="contact_title" />
            </h2>
            <div className="h-[2px] w-20 bg-gold-400 mx-auto mt-4 mb-4" />
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
              <EditableText idKey="contact_desc" />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Box: Details card list with gold icons */}
            <div className="lg:col-span-5 bg-stone-900/40 border border-stone-850 p-8 rounded-2xl flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                
                {/* Location Box */}
                <div className="flex items-start gap-4">
                  <div className="bg-gold-550/10 border border-gold-500/25 p-3 rounded-lg text-gold-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">
                      <EditableText idKey="contact_address_label" />
                    </h4>
                    <p className="text-white font-medium text-sm mt-1 leading-relaxed">
                      <EditableText idKey="contact_address_val" />
                    </p>
                  </div>
                </div>

                {/* Helpline booking call */}
                <div className="flex items-start gap-4">
                  <div className="bg-gold-550/10 border border-gold-500/25 p-3 rounded-lg text-gold-400 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">
                      <EditableText idKey="contact_phone_label" />
                    </h4>
                    <p className="text-white font-medium text-sm mt-1 leading-relaxed">
                      <EditableText idKey="contact_phone_val" />
                    </p>
                  </div>
                </div>

                {/* Direct email box */}
                <div className="flex items-start gap-4">
                  <div className="bg-gold-550/10 border border-gold-500/25 p-3 rounded-lg text-gold-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">
                      <EditableText idKey="contact_email_label" />
                    </h4>
                    <a 
                      href="mailto:krishnagirikb@yahoo.com" 
                      className="text-gold-400 hover:text-gold-300 font-medium text-sm mt-1 leading-relaxed block transition-all"
                    >
                      <EditableText idKey="contact_email_val" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels Link block in gold */}
              <div className="pt-6 border-t border-stone-800">
                <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold mb-4">
                  Digital Media Channels
                </h4>
                <div className="flex items-center gap-3">
                  {[
                    { id: "f", icon: <Facebook className="h-4 w-4" />, hover: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/50", link: "https://facebook.com/kalimatibanquet" },
                    { id: "i", icon: <Instagram className="h-4 w-4" />, hover: "hover:bg-[#E1306C]/10 hover:text-[#E1306C] hover:border-[#E1306C]/50", link: "https://instagram.com/kalimatibanquet" },
                    { id: "t", icon: <Video className="h-4 w-4" />, hover: "hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/50", link: "https://tiktok.com/@kalimatibanquet" }
                  ].map((soc) => (
                    <a
                      key={soc.id}
                      href={soc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`h-11 w-11 rounded-lg bg-stone-950 border border-gold-500/10 flex items-center justify-center text-gold-400 transition-all ${soc.hover}`}
                    >
                      {soc.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Box: Embedded Google Map Iframe for Kalimati coordinates */}
            <div className="lg:col-span-7 bg-stone-900/20 border border-stone-850 rounded-2xl overflow-hidden min-h-[350px]">
              <iframe
                title="Google Maps Location: Kalimati, Kathmandu"
                src="https://maps.google.com/maps?q=Kalimati,%20Kathmandu,%20Nepal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[350px] border-0 outline-none filter grayscale contrast-[1.15] opacity-85 hover:opacity-100 transition-opacity"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>


      {/* 🔻 STRIP-10: FOOTER FOOTPRINT */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-16 border-t border-stone-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Branded summary block */}
            <div className="space-y-4 md:col-span-2">
              <a href="#home" className="flex flex-col select-none inline-block">
                <span className="font-script text-3.5xl text-gold-400 font-bold leading-none tracking-wide">
                  Kalimati Banquet
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] font-mono mt-0.5 text-stone-500">
                   Kathmandu's Legacy Venue
                </span>
              </a>
              <p className="text-stone-300 font-light leading-relaxed max-w-sm mt-3">
                <EditableText idKey="footer_tagline" />
              </p>
            </div>

            {/* Quick map links */}
            <div>
              <h4 className="text-white font-serif font-semibold text-sm tracking-wider uppercase mb-4">
                Explore Banquet
              </h4>
              <ul className="space-y-2">
                {[
                  { target: "about", label: "Our Story" },
                  { target: "services", label: "Specialties" },
                  { target: "menu", label: "Cuisine Tabs" },
                  { target: "gallery", label: "Visual Portfolios" }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={`#${item.target}`} 
                      className="hover:text-gold-400 transition-colors pl-0 hover:pl-1"
                    >
                      • {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timings and helplines stats */}
            <div>
              <h4 className="text-white font-serif font-semibold text-sm tracking-wider uppercase mb-4">
                Availability
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                  <span>Administrative: 9 AM - 7 PM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                  <span>Events Slot: Mon - Sun (24H)</span>
                </li>
                <li className="flex items-center gap-2 text-gold-400 font-semibold">
                  <Check className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                  <span>Booking Open for 2026 / 2027</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-[1px] w-full bg-stone-900 my-8" />

          {/* Copyright section with clicks capture & discoverable admin link */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <div className="flex flex-wrap items-center gap-4">
              <p 
                onClick={handleCopyrightClick}
                className="cursor-pointer hover:text-stone-300 transition-colors select-none font-mono tracking-wider active:scale-95"
                title="Tip: Authorized administrator dashboard login portal bypass"
              >
                <EditableText idKey="footer_copyright" />
              </p>
              <span className="text-stone-800 hidden sm:inline">•</span>
              <button
                onClick={() => {
                  if (isAdminLoggedIn) {
                    setShowAdminDashboard(true);
                  } else {
                    setShowLoginModal(true);
                  }
                }}
                className="text-[10px] uppercase font-mono tracking-wider text-stone-600 hover:text-gold-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Lock className="h-3 w-3 text-stone-600 hover:text-gold-400" />
                <span>{isAdminLoggedIn ? "Admin Dashboard" : "Staff Portal Login"}</span>
              </button>
            </div>
            
            <p className="text-[10px] font-mono text-stone-600 tracking-widest uppercase">
              Designed with Gold Trim Accents • Kathmandu, Nepal
            </p>
          </div>
        </div>
      </footer>


      {/* 🔐 PASSWORD POPUP LOGIN MODAL CONTAINER */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-stone-900 border border-gold-400 p-6 md:p-8 rounded-xl max-w-sm w-full relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gold-400" />
              
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError("");
                }}
                className="absolute top-4 right-4 text-stone-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <div className="h-12 w-12 bg-gold-500/10 text-gold-400 rounded-full flex items-center justify-center mx-auto border border-gold-500/20 mb-3 animate-pulse">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white">Admin Authentication</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                  Access restricted to banquet staff
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Username Input */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                    Username
                  </label>
                  <input 
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 rounded px-3 py-2 text-xs focus:outline-none transition-colors text-white"
                    placeholder="Enter Admin"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                    Security Password
                  </label>
                  <input 
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-gold-500 rounded px-3 py-2 text-xs focus:outline-none transition-colors text-white"
                    placeholder="••••••••••••"
                    required
                  />
                </div>

                {/* Error Log */}
                {loginError && (
                  <p className="text-red-500 text-[10px] uppercase font-mono tracking-wide">
                    ⚠️ {loginError}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold uppercase py-2.5 rounded text-xs tracking-wider transition-colors cursor-pointer"
                >
                  Confirm Gate Pass
                </button>

                <div className="flex items-center gap-1.5 bg-stone-950/60 p-2.5 rounded text-[10px] text-stone-500 mt-4 leading-relaxed font-mono">
                  <Info className="h-4.5 w-4.5 shrink-0 text-gold-500/50" />
                  <span>Authorized use only. Actions on this control hub are registered in local session hashes.</span>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔐 ADVANCED ADMINISTRATIVE CONTROL CENTER DASHBOARD MODAL */}
      <AnimatePresence>
        {showAdminDashboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setShowAdminDashboard(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-stone-900 border border-gold-400 rounded-xl max-w-5xl w-full h-[88vh] flex flex-col md:flex-row relative shadow-2xl overflow-hidden text-stone-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-500 via-gold-400 to-amber-600" />

              {/* Sidebar Tabs Controls */}
              <div className="w-full md:w-64 bg-stone-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-serif font-black text-xs tracking-widest text-gold-400 uppercase">
                      Admin Command Portal
                    </span>
                  </div>

                  <nav className="space-y-1">
                    {[
                      { id: "bookings", label: "Bookings Ledger", count: bookings.length, icon: <FileSpreadsheet className="h-4 w-4" /> },
                      { id: "stats", label: "Business Analytics", icon: <BarChart className="h-4 w-4" /> },
                      { id: "menu", label: "Banquet Menu Manager", icon: <Utensils className="h-4 w-4" /> },
                      { id: "texts", label: "Homepage Site Texts", icon: <SettingsIcon className="h-4 w-4" /> }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveDashboardTab(tab.id);
                          setShowAddBookingForm(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          activeDashboardTab === tab.id
                            ? "bg-gold-500 text-stone-950 font-bold"
                            : "bg-stone-900/30 text-stone-400 hover:bg-stone-900/80 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2 font-bold">
                          {tab.icon}
                          {tab.label}
                        </span>
                        {tab.count !== undefined && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            activeDashboardTab === tab.id ? "bg-stone-950 text-gold-400" : "bg-stone-905 text-stone-300"
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Footer specs inside sidebar */}
                <div className="mt-6 pt-4 border-t border-stone-905 space-y-4">
                  <div className="text-[10px] font-mono text-stone-500 space-y-1">
                    <p>SYSTEM SECURITY: ACTIVE</p>
                    <p>ROLE: BANQUET PORTAL</p>
                    <p>LOGGED: Admin</p>
                  </div>
                  <button
                    onClick={() => setShowAdminDashboard(false)}
                    className="w-full bg-stone-900 border border-stone-800 hover:bg-stone-850 hover:border-stone-700 text-stone-300 py-2 rounded text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                  >
                    Close Workspace
                  </button>
                </div>
              </div>

              {/* Main Contents Window */}
              <div className="flex-1 flex flex-col overflow-hidden bg-stone-900">
                {/* Header title */}
                <div className="px-6 py-4 bg-stone-900/40 border-b border-stone-850 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">
                      {activeDashboardTab === "bookings" && "Banquet Booking Ledger & Reservations Log"}
                      {activeDashboardTab === "stats" && "Executive Financial Forecasts & Analytics"}
                      {activeDashboardTab === "menu" && "Gourmet Multi-cuisine Menu & Item Pricing"}
                      {activeDashboardTab === "texts" && "Copywriting & Site Translations Hub"}
                    </h3>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
                      {activeDashboardTab === "bookings" && "Audit incoming reservation requests, register manual log items and confirm dates."}
                      {activeDashboardTab === "stats" && "Business health overview, guest plan headcounts and popular tier packages analysis."}
                      {activeDashboardTab === "menu" && "Live updates of items listed across categorially segmented food banquets."}
                      {activeDashboardTab === "texts" && "Configure titles, subheadings and informational copy across all visible sections."}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAdminDashboard(false)}
                    className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body elements container */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                  
                  {/* --- TAB CONTAINER: BOOKINGS MANAGEMENT --- */}
                  {activeDashboardTab === "bookings" && (
                    <div className="space-y-6">
                      
                      {/* Search, Filter & Action Toolbar */}
                      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-stone-950/40 p-4 rounded-xl border border-stone-850">
                        <div className="relative w-full md:w-72">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-500" />
                          <input
                            type="text"
                            placeholder="Search applicant name, phone, type..."
                            value={bookingSearch}
                            onChange={(e) => setBookingSearch(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-850 focus:border-gold-500 rounded px-9 py-2 text-xs focus:outline-none text-white placeholder:text-stone-600 transition-colors"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                          {/* Quick status filter list */}
                          <div className="flex bg-stone-900 p-0.5 rounded-lg border border-stone-850">
                            {["All", "Pending", "Confirmed", "Cancelled"].map((st) => (
                              <button
                                key={st}
                                onClick={() => setBookingFilterStatus(st)}
                                className={`px-3 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                                  bookingFilterStatus === st
                                    ? "bg-gold-500 text-stone-950"
                                    : "text-stone-400 hover:text-stone-200"
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => {
                              setShowAddBookingForm(!showAddBookingForm);
                              setNewBookingForm({
                                fullName: "",
                                phone: "",
                                email: "",
                                eventType: "Wedding Receptions",
                                eventDate: new Date().toLocaleDateString('en-US'),
                                guestsCount: "120",
                                selectedPackage: "pkg_gold",
                                specialRequests: ""
                              });
                            }}
                            className="bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold px-3 py-1.5 rounded text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ml-auto"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add Booking</span>
                          </button>
                        </div>
                      </div>

                      {/* Explicit Manual Booking Addition Form */}
                      {showAddBookingForm && (
                        <motion.form
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!newBookingForm.fullName.trim() || !newBookingForm.phone.trim() || !newBookingForm.eventDate) {
                              alert("Required parameters (Name, Phone, Date) are missing.");
                              return;
                            }
                            const addedBk = {
                              id: "b_man_" + Date.now(),
                              fullName: newBookingForm.fullName,
                              phone: newBookingForm.phone,
                              email: newBookingForm.email || "manually@entered.com",
                              eventType: newBookingForm.eventType,
                              eventDate: newBookingForm.eventDate,
                              guestsCount: newBookingForm.guestsCount || "100",
                              selectedPackage: newBookingForm.selectedPackage || "pkg_gold",
                              specialRequests: newBookingForm.specialRequests || "",
                              status: "Confirmed",
                              createdAt: new Date().toLocaleString()
                            };

                            const updated = [addedBk, ...bookings];
                            setBookings(updated);
                            localStorage.setItem("kb_bookings", JSON.stringify(updated));
                            triggerToast("New reservation successfully registered in Ledger!");
                            setShowAddBookingForm(false);
                          }}
                          className="bg-stone-900 border border-stone-800 p-5 rounded-xl space-y-4 shadow-inner"
                        >
                          <div className="flex items-center justify-between border-b border-stone-850 pb-2">
                            <h4 className="font-serif font-black text-xs text-gold-400 uppercase tracking-widest flex items-center gap-1.5">
                              <PlusCircle className="h-4 w-4" />
                              Manual Reservation Creator Form
                            </h4>
                            <button
                              type="button"
                              onClick={() => setShowAddBookingForm(false)}
                              className="text-stone-500 hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Client Full Name *</label>
                              <input
                                type="text"
                                required
                                value={newBookingForm.fullName}
                                onChange={(e) => setNewBookingForm({...newBookingForm, fullName: e.target.value})}
                                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-white uppercase"
                                placeholder="E.g. Dipendra Thapa"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Contact Phone *</label>
                              <input
                                type="text"
                                required
                                value={newBookingForm.phone}
                                onChange={(e) => setNewBookingForm({...newBookingForm, phone: e.target.value})}
                                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-white"
                                placeholder="+977-98..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Email Address</label>
                              <input
                                type="email"
                                value={newBookingForm.email}
                                onChange={(e) => setNewBookingForm({...newBookingForm, email: e.target.value})}
                                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-white"
                                placeholder="name@domain.com"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Event Type *</label>
                              <select
                                value={newBookingForm.eventType}
                                onChange={(e) => setNewBookingForm({...newBookingForm, eventType: e.target.value})}
                                className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-white font-medium focus:outline-none"
                              >
                                <option value="Wedding Receptions">Wedding Receptions</option>
                                <option value="Corporate Events">Corporate Events</option>
                                <option value="Birthday Celebrations">Birthday Celebrations</option>
                                <option value="Bratabandha & Cultural Ceremonies">Bratabandha & Cultural Ceremonies</option>
                                <option value="Cocktail Evenings">Cocktail Evenings</option>
                                <option value="Anniversary Galas">Anniversary Galas</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Calendar Date *</label>
                              <input
                                type="text"
                                required
                                value={newBookingForm.eventDate}
                                onChange={(e) => setNewBookingForm({...newBookingForm, eventDate: e.target.value})}
                                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-white"
                                placeholder="E.g. 24/06/2026"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Headcount *</label>
                              <input
                                type="number"
                                required
                                min="10"
                                value={newBookingForm.guestsCount}
                                onChange={(e) => setNewBookingForm({...newBookingForm, guestsCount: e.target.value})}
                                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Banquet Option Tier</label>
                              <select
                                value={newBookingForm.selectedPackage}
                                onChange={(e) => setNewBookingForm({...newBookingForm, selectedPackage: e.target.value})}
                                className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-white font-medium focus:outline-none"
                              >
                                <option value="pkg_silver">Silver Package (₨ 85,000)</option>
                                <option value="pkg_gold">Gold Banquet Tier (₨ 1,60,000)</option>
                                <option value="pkg_diamond">Diamond Supreme Tier (₨ 3,50,000)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Special Instructions & Requests</label>
                            <input
                              type="text"
                              value={newBookingForm.specialRequests}
                              onChange={(e) => setNewBookingForm({...newBookingForm, specialRequests: e.target.value})}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-white"
                              placeholder="Dietary adjustments, stage design instructions, seating rules"
                            />
                          </div>

                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold w-full py-2.5 rounded text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                          >
                            Save Reservation to Database
                          </button>
                        </motion.form>
                      )}

                      {/* Bookings inquiry list feed */}
                      <div className="space-y-3">
                        {bookings
                          .filter((b) => {
                            // Search filter
                            const rawSearch = bookingSearch.toLowerCase().trim();
                            if (rawSearch) {
                              const matchName = b.fullName.toLowerCase().includes(rawSearch);
                              const matchPhone = b.phone.toLowerCase().includes(rawSearch);
                              const matchType = b.eventType.toLowerCase().includes(rawSearch);
                              const matchEmail = (b.email || "").toLowerCase().includes(rawSearch);
                              if (!matchName && !matchPhone && !matchType && !matchEmail) return false;
                            }
                            // Status filter
                            if (bookingFilterStatus !== "All" && b.status !== bookingFilterStatus) {
                              return false;
                            }
                            return true;
                          })
                          .map((b) => (
                            <div
                              key={b.id}
                              className="bg-stone-950/80 border border-stone-850 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gold-500/20 transition-all shadow"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <h4 className="font-serif font-black text-stone-100 text-sm tracking-wide uppercase">
                                    {b.fullName}
                                  </h4>
                                  <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-widest ${
                                    b.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                    b.status === "Cancelled" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                                    "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                  }`}>
                                    {b.status}
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1.5 text-stone-300 text-[11px] font-mono">
                                  <p className="flex items-center gap-1.5">
                                    <Phone className="h-3.5 w-3.5 text-gold-500" />
                                    <span>{b.phone}</span>
                                  </p>
                                  <p className="flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5 text-gold-500" />
                                    <span className="truncate max-w-[150px]" title={b.email}>{b.email}</span>
                                  </p>
                                  <p className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-gold-500" />
                                    <span className="text-white font-semibold">{b.eventDate}</span>
                                  </p>
                                  <p className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5 text-gold-500" />
                                    <span>{b.guestsCount} guests</span>
                                  </p>
                                </div>

                                <div className="text-[11px] text-stone-400 leading-relaxed font-light mt-1">
                                  <span className="font-semibold text-gold-400 text-xs">Event type:</span> {b.eventType} • <span className="font-semibold text-gold-400 text-xs">Chosen Package:</span> {b.selectedPackage === "pkg_silver" ? "Silver Tier" : b.selectedPackage === "pkg_gold" ? "Gold Royal" : "Diamond Supreme"}
                                  {b.specialRequests && (
                                    <p className="border-l-2 border-stone-850 pl-2 mt-1 text-stone-400 select-all italic bg-stone-900/40 p-1.5 rounded">
                                      "{b.specialRequests}"
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex xl:flex-col gap-2 shrink-0 justify-end pt-2 md:pt-0">
                                {/* Action controls */}
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => {
                                      // Toggle Confirm status
                                      const updated = bookings.map((item) => item.id === b.id ? { ...item, status: "Confirmed" } : item);
                                      setBookings(updated);
                                      localStorage.setItem("kb_bookings", JSON.stringify(updated));
                                      triggerToast(`Successfully Confirmed ${b.fullName}'s date slot!`);
                                    }}
                                    disabled={b.status === "Confirmed"}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                                      b.status === "Confirmed" 
                                        ? "bg-stone-900 text-stone-600 border border-stone-850 cursor-not-allowed" 
                                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                                    }`}
                                  >
                                    <CheckCircle className="h-3 w-3" /> Confirms
                                  </button>

                                  <button
                                    onClick={() => {
                                      // Toggle Cancel status
                                      const updated = bookings.map((item) => item.id === b.id ? { ...item, status: "Cancelled" } : item);
                                      setBookings(updated);
                                      localStorage.setItem("kb_bookings", JSON.stringify(updated));
                                      triggerToast(`Cancelled event inquiry block for ${b.fullName}`);
                                    }}
                                    disabled={b.status === "Cancelled"}
                                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                                      b.status === "Cancelled" 
                                        ? "bg-stone-900 text-stone-600 border border-stone-850 cursor-not-allowed" 
                                        : "bg-rose-950/40 border border-rose-500/35 text-rose-400 hover:bg-rose-500 hover:text-white"
                                    }`}
                                  >
                                    <XCircle className="h-3 w-3" /> Cancel
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to permanently delete booking reference of ${b.fullName}?`)) {
                                        const updated = bookings.filter((item) => item.id !== b.id);
                                        setBookings(updated);
                                        localStorage.setItem("kb_bookings", JSON.stringify(updated));
                                        triggerToast(`Deleted booking record of ${b.fullName}`);
                                      }
                                    }}
                                    className="bg-stone-900 border border-stone-800 text-stone-400 hover:bg-red-900 hover:text-white hover:border-red-650 p-2 rounded cursor-pointer transition-colors"
                                    title="Delete booking reference completely"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>

                                <span className="text-[9px] font-mono text-stone-500 text-right">Reference ID: {b.id}</span>
                              </div>
                            </div>
                          ))}

                        {bookings.filter((b) => {
                          const rawSearch = bookingSearch.toLowerCase().trim();
                          if (rawSearch) {
                            const matchName = b.fullName.toLowerCase().includes(rawSearch);
                            const matchPhone = b.phone.toLowerCase().includes(rawSearch);
                            const matchType = b.eventType.toLowerCase().includes(rawSearch);
                            if (!matchName && !matchPhone && !matchType) return false;
                          }
                          if (bookingFilterStatus !== "All" && b.status !== bookingFilterStatus) return false;
                          return true;
                        }).length === 0 && (
                          <div className="bg-stone-900/60 p-8 rounded-xl border border-stone-850 text-center text-stone-400">
                            <Info className="h-8 w-8 text-gold-500/60 mx-auto mb-2" />
                            <p className="text-sm font-medium">No banquet reservations match chosen filter settings.</p>
                            <p className="text-xs text-stone-500 mt-1">Try resetting search parameters to display baseline files.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- TAB CONTAINER: BUSINESS STATS & KPI METRICS --- */}
                  {activeDashboardTab === "stats" && (
                    <div className="space-y-6 animate-fadeIn">
                      
                      {/* KPI Dashboard grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        
                        {/* KPI 1 */}
                        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider font-mono">Gross Reservations</span>
                            <h4 className="text-2.5xl font-serif font-black text-white mt-1">{bookings.length}</h4>
                            <p className="text-[10px] font-mono text-stone-500 mt-1">Lump sum entries registered</p>
                          </div>
                          <div className="h-12 w-12 bg-gold-500/10 text-gold-400 border border-gold-400/25 rounded-lg flex items-center justify-center shrink-0">
                            <FileSpreadsheet className="h-6 w-6" />
                          </div>
                        </div>

                        {/* KPI 2 */}
                        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider font-mono">Est Revenue Log</span>
                            <h4 className="text-2xl font-mono font-black text-emerald-400 mt-1">
                              ₨ {(() => {
                                return bookings.reduce((sum, b) => {
                                  if (b.status === "Cancelled") return sum;
                                  let flatPrice = 160000;
                                  if (b.selectedPackage === "pkg_silver") flatPrice = 85000;
                                  if (b.selectedPackage === "pkg_diamond") flatPrice = 350000;
                                  return sum + flatPrice;
                                }, 0);
                              })().toLocaleString()}
                            </h4>
                            <p className="text-[10px] font-mono text-stone-500 mt-1">Excludes cancelled packages</p>
                          </div>
                          <div className="h-12 w-12 bg-emerald-500/10 text-emerald-400 border border-emerald-400/25 rounded-lg flex items-center justify-center shrink-0">
                            <TrendingUp className="h-6 w-6" />
                          </div>
                        </div>

                        {/* KPI 3 */}
                        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider font-mono">Confirmed Slots</span>
                            <h4 className="text-2.5xl font-serif font-black text-gold-400 mt-1">
                              {bookings.filter((b) => b.status === "Confirmed").length}
                            </h4>
                            <p className="text-[10px] font-mono text-stone-500 mt-1">Deposits cleared / contract locked</p>
                          </div>
                          <div className="h-12 w-12 bg-gold-400/10 text-gold-400 border border-gold-400/25 rounded-lg flex items-center justify-center shrink-0">
                            <CheckCircle className="h-6 w-6" />
                          </div>
                        </div>

                        {/* KPI 4 */}
                        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider font-mono">Total Planned Guests</span>
                            <h4 className="text-2.5xl font-serif font-black text-white mt-1">
                              {bookings.filter(b=>b.status !== "Cancelled").reduce((sum, b)=>sum + (Number(b.guestsCount)||0), 0)}
                            </h4>
                            <p className="text-[10px] font-mono text-stone-500 mt-1">Planned food catering plates</p>
                          </div>
                          <div className="h-12 w-12 bg-gold-400/10 text-gold-400 border border-gold-400/25 rounded-lg flex items-center justify-center shrink-0">
                            <Users className="h-6 w-6" />
                          </div>
                        </div>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        
                        {/* Event Category Popularity Progress Bars */}
                        <div className="bg-stone-950/70 p-6 rounded-xl border border-stone-800">
                          <h4 className="font-serif font-bold text-sm text-gold-400 mb-6 uppercase tracking-wider">Event categories segmentation analysis</h4>
                          <div className="space-y-4">
                            {[
                              { label: "Wedding Receptions", count: bookings.filter(b=>b.eventType.includes("Wed")).length, color: "bg-amber-500" },
                              { label: "Corporate Events", count: bookings.filter(b=>b.eventType.includes("Corp")).length, color: "bg-cyan-500" },
                              { label: "Birthday Celebrations", count: bookings.filter(b=>b.eventType.includes("Birth")).length, color: "bg-rose-500" },
                              { label: "Bratabandha & Rituals", count: bookings.filter(b=>b.eventType.includes("Brat")).length, color: "bg-emerald-500" },
                              { label: "Other Ceremonies", count: bookings.filter(b=>!b.eventType.includes("Wed") && !b.eventType.includes("Corp") && !b.eventType.includes("Birth") && !b.eventType.includes("Brat")).length, color: "bg-stone-500" }
                            ].map((evt) => {
                              const total = bookings.length || 1;
                              const percentage = Math.round((evt.count / total) * 100);
                              return (
                                <div key={evt.label} className="space-y-1.5">
                                  <div className="flex justify-between text-xs font-semibold font-mono tracking-wide text-stone-300 font-bold">
                                    <span>{evt.label}</span>
                                    <span>{evt.count} ({percentage}%)</span>
                                  </div>
                                  <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden">
                                    <div className={`h-full ${evt.color} rounded-full`} style={{ width: `${percentage}%` }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Package Selection Trends list */}
                        <div className="bg-stone-950/70 p-6 rounded-xl border border-stone-850">
                          <h4 className="font-serif font-bold text-sm text-gold-400 mb-6 uppercase tracking-wider">Banquet package tiers distribution</h4>
                          <div className="space-y-4 font-bold">
                            {[
                              { label: "Gold Royal Tier Package (₨ 1,60,000)", key: "pkg_gold", count: bookings.filter(b=>b.selectedPackage === "pkg_gold").length, color: "bg-amber-400" },
                              { label: "Silver Tier Package (₨ 85,000)", key: "pkg_silver", count: bookings.filter(b=>b.selectedPackage === "pkg_silver").length, color: "bg-slate-400" },
                              { label: "Diamond Supreme Package (₨ 3,50,000)", key: "pkg_diamond", count: bookings.filter(b=>b.selectedPackage === "pkg_diamond").length, color: "bg-cyan-400" }
                            ].map((pkg) => {
                              const total = bookings.length || 1;
                              const percentage = Math.round((pkg.count / total) * 100);
                              return (
                                <div key={pkg.key} className="space-y-1.5">
                                  <div className="flex justify-between text-xs font-semibold font-mono tracking-wide text-stone-300">
                                    <span>{pkg.label}</span>
                                    <span>{pkg.count} bookings</span>
                                  </div>
                                  <div className="h-2.5 w-full bg-stone-900 rounded-full overflow-hidden">
                                    <div className={`h-full ${pkg.color} rounded-full`} style={{ width: `${percentage}%` }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-8 bg-stone-900/60 p-4 rounded-lg border border-stone-850 text-[11px] text-stone-400 flex items-start gap-2 leading-relaxed">
                            <Info className="h-4.5 w-4.5 text-gold-550 shrink-0 mt-0.5 animate-pulse" />
                            <span>These financial calculations represent potential expected sales volume dynamically derived from locked banquets contract states. Excludes cancelled packages.</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* --- TAB CONTAINER: BANQUET MENU PRICES & ITEMS --- */}
                  {activeDashboardTab === "menu" && (
                    <div className="space-y-8 animate-fadeIn font-bold">
                      <div className="bg-stone-950/50 p-4 rounded-xl border border-stone-800 text-[11px] text-stone-400 leading-relaxed max-w-3xl flex items-start gap-2.5">
                        <Info className="h-4.5 w-4.5 shrink-0 text-gold-400 mt-0.5" />
                        <span>This configuration page offers an executive shortcut panel. Changing prices and names here will instantly rewrite respective values in the master configuration list below, automatically updating public visitors' menu pages in real-time. Click "Save Edits" on the top of the screen to lock modifications permanently.</span>
                      </div>

                      {((menuStructure && menuStructure.length > 0) ? menuStructure : MENU_STRUCTURE).map((cat) => (
                        <div key={cat.id} className="bg-stone-950 p-5 rounded-xl border border-stone-850 space-y-4">
                          <div className="flex justify-between items-center gap-4 border-b border-stone-900 pb-2">
                            <h4 className="font-serif font-semibold text-gold-400 tracking-wide text-xs uppercase flex items-center gap-1.5">
                              <Utensils className="h-4 w-4 text-gold-500" />
                              {cat.category} Category
                            </h4>
                            
                            {/* Dynamically insert new dish row button */}
                            <button
                              onClick={() => handleAddNewMenuRow(cat.id)}
                              className="px-3 py-1 bg-gold-950/40 hover:bg-gold-500 hover:text-stone-950 border border-gold-500/30 text-gold-400 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-md hover:scale-[1.02]"
                            >
                              <Plus className="h-3 w-3" />
                              Add Dish Row
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cat.items.map((item) => {
                              const nameVal = content[item.keyName] !== undefined ? content[item.keyName] : (DEFAULT_CONTENT_DICTIONARY[item.keyName] || "");
                              const priceVal = content[item.keyPrice] !== undefined ? content[item.keyPrice] : (DEFAULT_CONTENT_DICTIONARY[item.keyPrice] || "");

                              return (
                                <div key={item.id} className="bg-stone-900 p-3 rounded-lg flex items-center justify-between gap-4 hover:border-gold-500/25 border border-transparent transition-all">
                                  
                                  {/* Dish Name edit input */}
                                  <div className="flex-1 space-y-1">
                                    <label className="text-[9px] uppercase font-mono text-stone-500 font-bold block text-left">Dish Name Label</label>
                                    <input
                                      type="text"
                                      value={nameVal}
                                      onChange={(e) => updateContentKey(item.keyName, e.target.value)}
                                      className="w-full bg-stone-950 border border-stone-800 text-xs font-semibold px-2 py-1 rounded text-white focus:outline-none focus:border-gold-500 transition-colors"
                                    />
                                  </div>

                                  {/* Price edit number input */}
                                  <div className="w-28 space-y-1 shrink-0">
                                    <label className="text-[9px] uppercase font-mono text-stone-500 font-bold block text-left">Cost Rate (₨)</label>
                                    <div className="relative">
                                      <span className="absolute left-2.5 top-1 text-xs text-gold-400 font-mono font-bold">₨</span>
                                      <input
                                        type="text"
                                        value={priceVal}
                                        onChange={(e) => updateContentKey(item.keyPrice, e.target.value)}
                                        className="w-full bg-stone-950 border border-stone-850 text-xs font-mono font-bold px-7 py-1 rounded text-gold-400 text-right focus:outline-none focus:border-gold-500 transition-colors"
                                      />
                                    </div>
                                  </div>

                                  {/* Delete Action Trigger Button */}
                                  <button
                                    onClick={() => handleDeleteMenuRow(cat.id, item.id, nameVal)}
                                    className="p-1.5 self-end text-stone-500 hover:text-red-500 hover:bg-stone-950 border border-transparent hover:border-red-500/20 rounded transition-all cursor-pointer mt-4"
                                    title={`Delete item "${nameVal}"`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>

                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* --- TAB CONTAINER: SITE COPY DICTIONARY MANAGER --- */}
                  {activeDashboardTab === "texts" && (
                    <div className="space-y-6 animate-fadeIn font-bold">
                      
                      {/* Search and filters of site keys */}
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Here is a full list of text variables powering the website content. Filter and write translations to modify headers, captions, or contact info. Changes refresh instantly. Click "Save Edits" on the top of the screen to lock modifications permanently.
                      </p>

                      <div className="space-y-4">
                        {[
                          { key: "hero_title", desc: "Hero Title Header" },
                          { key: "hero_subtext", desc: "Hero Subheader tagline" },
                          { key: "about_story_title", desc: "Our Story section heading" },
                          { key: "about_story_p1", desc: "Our Story background text paragraph 1" },
                          { key: "about_story_p2", desc: "Our Story background text paragraph 2" },
                          { key: "contact_address_val", desc: "Banquet Hall exact physical location" },
                          { key: "contact_phone_val", desc: "Staff phone lines for manual booking" },
                          { key: "contact_email_val", desc: "Direct contact inquiry email receipt" },
                          { key: "footer_tagline", desc: "Signature tagline in footer" }
                        ].map((txt) => {
                          const value = content[txt.key] !== undefined ? content[txt.key] : (DEFAULT_CONTENT_DICTIONARY[txt.key] || "");
                          return (
                            <div key={txt.key} className="bg-stone-950 p-4 rounded-xl border border-stone-850 space-y-2">
                              <div className="flex justify-between items-center bg-stone-900 px-3 py-1 rounded-lg border border-stone-800">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400 font-mono font-bold">{txt.desc}</span>
                                <span className="text-[9px] font-mono text-stone-600">Key Identifier: {txt.key}</span>
                              </div>
                              <textarea
                                value={value}
                                rows={txt.key.includes("p1") || txt.key.includes("p2") ? 3 : 1}
                                onChange={(e) => updateContentKey(txt.key, e.target.value)}
                                className="w-full bg-stone-900 border border-stone-850 text-xs px-3 py-2 rounded focus:outline-none focus:border-gold-500 transition-colors text-stone-100 placeholder:text-stone-700 leading-relaxed"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
