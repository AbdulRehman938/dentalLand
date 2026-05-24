import React, { useState, useRef, useEffect } from 'react';
import { PiPhone, PiMapPin, PiAt, PiClock } from 'react-icons/pi';
import { HiOutlineChevronRight, HiChevronDown, HiChevronLeft, HiChevronRight, HiCheck, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// ─── Environment Variables ──────────────────────────────────────
const COUNTRIES_API_URL = import.meta.env.VITE_COUNTRIES_API_URL;
const FLAG_CDN_URL = import.meta.env.VITE_FLAG_CDN_URL;
const MAP_TILE_URL = import.meta.env.VITE_MAP_TILE_URL;

// ─── Country type ───────────────────────────────────────────────
interface Country {
  name: string;
  flag: string;    // emoji flag
  code: string;   // dial code e.g. "+1"
  iso2: string;   // ISO 2-letter code e.g. "US"
  maxLen: number; // expected digit count (national number)
}

// ─── PhoneInput ─────────────────────────────────────────────────
const PhoneInput = ({ value, onChange, onBlur, error, touched }: {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selected, setSelected] = useState<Country>({
    name: 'United Arab Emirates', flag: 'ae', code: '+971', iso2: 'AE', maxLen: 9
  });
  const [dropOpen, setDropOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch countries once
  useEffect(() => {
    fetch(COUNTRIES_API_URL)
      .then(r => r.json())
      .then((data: any[]) => {
        const list: Country[] = data
          .filter(c => c.idd?.root && c.idd?.suffixes?.length)
          .map(c => {
            const root = c.idd.root as string;
            const suffix = c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : '';
            const dialCode = root + suffix;
            const maxLen = 10;
            return {
              name: c.name.common,
              flag: (c.cca2 as string).toLowerCase(), // ISO2 for flagcdn.com
              code: dialCode,
              iso2: c.cca2,
              maxLen,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
        // Default to UAE
        const uae = list.find(c => c.iso2 === 'AE');
        if (uae) setSelected(uae);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  const handleSelect = (country: Country) => {
    setSelected(country);
    setDropOpen(false);
    setSearch('');
    // strip old code prefix and keep number part
    const numPart = value.replace(/^\+\d+\s?/, '');
    onChange(`${country.code} ${numPart}`.trim());
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const digits = e.target.value.replace(/\D/g, '');
    onChange(`${selected.code} ${digits}`);
  };

  // Extract just the number part (no dial code) for display
  const displayNumber = value.replace(/^\+\d+\s?/, '');

  return (
    <div className="flex flex-col gap-2 w-full" ref={ref}>
      <div className={`flex items-center w-full bg-gray-50/50 border ${
        error && touched ? 'border-red-500' : 'border-gray-300'
      } rounded-xl overflow-hidden focus-within:border-brand-secondary/50 focus-within:bg-white transition-colors`}>

        {/* Country code trigger */}
        <button
          type="button"
          onClick={() => setDropOpen(!dropOpen)}
          className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-transparent hover:bg-gray-100/60 transition-colors shrink-0"
        >
          <img
            src={`${FLAG_CDN_URL}/w20/${selected.flag}.png`}
            srcSet={`${FLAG_CDN_URL}/w40/${selected.flag}.png 2x`}
            alt={selected.name}
            className="w-5 h-auto rounded-sm object-cover"
          />
          <span className="text-brand-black font-semibold text-sm">{selected.code}</span>
          <motion.div animate={{ rotate: dropOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <HiChevronDown className="text-gray-400 text-sm" />
          </motion.div>
        </button>

        {/* Number input */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          placeholder="Enter phone number"
          value={displayNumber}
          onChange={handleNumberChange}
          onBlur={onBlur}
          maxLength={selected.maxLen + 2}
          className="flex-1 bg-transparent px-4 py-3.5 outline-none text-brand-black placeholder:text-gray-500 font-medium"
        />
      </div>

      {/* Country dropdown */}
      <AnimatePresence>
        {dropOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[70] bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] w-72 mt-1 overflow-hidden"
            data-lenis-prevent="true"
            style={{ top: '100%', left: 0 }}
          >
            {/* Search */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <HiMagnifyingGlass className="text-gray-400 text-base shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-brand-black placeholder:text-gray-400"
                />
                {search && (
                  <button type="button" onClick={() => setSearch('')}>
                    <HiXMark className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Country list */}
            <div className="overflow-y-auto max-h-56" data-lenis-prevent="true">
              {loading ? (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">Loading countries…</div>
              ) : filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">No country found</div>
              ) : (
                filtered.map(c => (
                  <div
                    key={c.iso2}
                    onClick={() => handleSelect(c)}
                    className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selected.iso2 === c.iso2 ? 'bg-[#F0F5E4]' : ''
                    }`}
                  >
                    <img
                      src={`${FLAG_CDN_URL}/w20/${c.flag}.png`}
                      srcSet={`${FLAG_CDN_URL}/w40/${c.flag}.png 2x`}
                      alt={c.name}
                      className="w-5 h-auto rounded-sm object-cover shrink-0"
                    />
                    <span className="flex-1 text-sm font-medium text-brand-black truncate">{c.name}</span>
                    <span className="text-sm text-gray-400 font-semibold shrink-0">{c.code}</span>
                    {selected.iso2 === c.iso2 && (
                      <HiCheck className="text-[#5B7A12] shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && touched && <span className="text-red-500 text-xs font-medium px-1">{error}</span>}
    </div>
  );
};

const CustomSelect = ({ value, onChange, options, placeholder, error, touched, disabled, disabledTooltip }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o: any) => o.value === value);

  const handleToggle = () => {
    if (disabled) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex flex-col gap-2 w-full" ref={ref}>
      <div 
        onClick={handleToggle}
        className={`w-full bg-gray-50/50 border ${error && touched ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3.5 flex justify-between items-center ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-brand-secondary/50'} transition-colors relative`}
      >
        <span className={value ? "text-brand-black font-medium" : "text-gray-500 font-medium"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <HiChevronDown className="text-gray-500 text-lg" />
        </motion.div>

        {/* Tooltip for disabled state */}
        <AnimatePresence>
          {showTooltip && disabled && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded whitespace-nowrap shadow-md z-50 pointer-events-none"
            >
              {disabledTooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[60] top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-y-auto max-h-60 py-2"
            data-lenis-prevent="true"
          >
            {options.map((opt: any) => (
              <div 
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer text-brand-black font-medium transition-colors ${value === opt.value ? 'bg-[#F0F5E4] text-[#5B7A12]' : ''} ${opt.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent pointer-events-none' : ''}`}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && touched && <span className="text-red-500 text-xs font-medium px-1">{error}</span>}
    </div>
  );
}

const CustomDatePicker = ({ value, onChange, placeholder, error, touched }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  // Disable prev-month if already on the current month
  const isCurrentMonth =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  const prevMonth = () => {
    if (!isCurrentMonth) setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleDateClick = (day: number, isPast: boolean) => {
    if (isPast) return;
    const formatted = `${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${currentMonth.getFullYear()}`;
    onChange(formatted);
    setIsOpen(false);
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="relative flex flex-col gap-2 w-full" ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-gray-50/50 border ${error && touched ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3.5 flex justify-between items-center cursor-pointer hover:border-brand-secondary/50 transition-colors`}
      >
        <span className={value ? "text-brand-black font-medium" : "text-gray-500 font-medium"}>
          {value || placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <HiChevronDown className="text-gray-500 text-lg" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[60] top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className={`p-2 rounded-full transition-colors ${isCurrentMonth ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              >
                <HiChevronLeft />
              </button>
              <span className="font-bold text-brand-black">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              <button type="button" onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><HiChevronRight /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d} className="text-xs text-gray-400 font-bold">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {blanks.map(b => <div key={`blank-${b}`} className="p-2"></div>)}
              {days.map(d => {
                const dateStr = `${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}/${d.toString().padStart(2, '0')}/${currentMonth.getFullYear()}`;
                const isSelected = value === dateStr;
                const thisDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
                const isPast = thisDate < today;
                return (
                  <div 
                    key={d} 
                    onClick={() => handleDateClick(d, isPast)}
                    title={isPast ? 'Past date unavailable' : ''}
                    className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-colors
                      ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                      ${isSelected ? 'bg-[#5B7A12] text-white' : ''}
                      ${!isPast && !isSelected ? 'hover:bg-[#F0F5E4] text-brand-black' : ''}
                    `}
                  >
                    {d}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && touched && <span className="text-red-500 text-xs font-medium px-1">{error}</span>}
    </div>
  );
}

// Validation Schema
const bookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  date: Yup.string().required('Preferred date is required'),
  time: Yup.string().required('Preferred time is required'),
  service: Yup.string().required('Please select a service'),
  comment: Yup.string(),
  privacy: Yup.boolean().oneOf([true], 'You must accept the privacy policy')
});

// ─── Leaflet Map Component ─────────────────────────────────────
const LeafletMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues
    import('leaflet').then((L) => {
      const map = L.map(mapRef.current!, {
        center: [25.0957, 55.1566], // Dubai Internet City coordinates
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

      // Add OpenStreetMap tiles
      L.tileLayer(MAP_TILE_URL, {
        maxZoom: 19,
      }).addTo(map);

      // Add zoom control to bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add attribution to bottom-left
      L.control.attribution({ position: 'bottomleft' }).addTo(map)
        .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>');

      // Custom red thumbpin marker icon
      const redIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
            </filter>
            <g filter="url(#shadow)">
              <path d="M20 0C9 0 0 9 0 20c0 15 20 32 20 32s20-17 20-32C40 9 31 0 20 0z" fill="#DC2626"/>
              <path d="M20 2C10.1 2 2 10.1 2 20c0 13.4 18 28.6 18 28.6s18-15.2 18-28.6C38 10.1 29.9 2 20 2z" fill="#EF4444"/>
              <circle cx="20" cy="18" r="8" fill="white" opacity="0.95"/>
              <circle cx="20" cy="18" r="5" fill="#DC2626"/>
            </g>
          </svg>
        `,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -52],
      });

      // Add marker
      L.marker([25.0957, 55.1566], { icon: redIcon })
        .addTo(map)
        .bindPopup(
          '<div style="font-family:Inter,sans-serif;padding:4px 2px;"><strong style="font-size:14px;color:#1a1a1a;">Dental Land</strong><br/><span style="font-size:12px;color:#666;">Building 15, Dubai Internet City<br/>Sheikh Zayed Road, Dubai, UAE</span></div>',
          { offset: [0, -10] }
        );

      mapInstanceRef.current = map;

      // Fix map size on load
      setTimeout(() => map.invalidateSize(), 100);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full rounded-xl" style={{ minHeight: '300px' }} />
  );
};

const ContactForms = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      comment: '',
      privacy: false
    },
    validationSchema: bookingSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        const response = await fetch('http://localhost:3001/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.success) {
          setSubmitStatus({ type: 'success', message: 'Consultation booked successfully! Check your email for confirmation.' });
          formik.resetForm();
        } else {
          setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
        }
      } catch (error) {
        setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
      } finally {
        setIsSubmitting(false);
        // Auto-clear status after 8 seconds
        setTimeout(() => setSubmitStatus(null), 8000);
      }
    }
  });

  // Generate time slots; disable past/current slots when selected date is today
  const allTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM',
  ];

  const timeOptions = (() => {
    const now = new Date();
    const todayStr = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
    const isToday = formik.values.date === todayStr;

    return allTimeSlots.map(slot => {
      let isDisabled = false;
      if (isToday) {
        // Parse slot time and compare with now
        const [timePart, meridiem] = slot.split(' ');
        const [h, m] = timePart.split(':').map(Number);
        let hours24 = h;
        if (meridiem === 'PM' && h !== 12) hours24 += 12;
        if (meridiem === 'AM' && h === 12) hours24 = 0;
        const slotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours24, m);
        // Disable if slot is at or before current time
        if (slotDate <= now) isDisabled = true;
      }
      return { value: slot, label: slot, disabled: isDisabled };
    });
  })();

  const serviceOptions = [
    { value: 'implants', label: 'Dental Implants' },
    { value: 'veneers', label: 'Dental Veneers' },
    { value: 'prosthetics', label: 'Dental Prosthetics' },
    { value: 'whitening', label: 'Teeth Whitening' },
    { value: 'hygiene', label: 'Dental Hygiene' },
  ];

  return (
    <section className="relative w-full px-2 pb-20 mt-4">
      <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Side: Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-2 tracking-tight">
            Book a Consultation
          </h2>
          <p className="text-gray-400 text-[15px] font-medium mb-8">
            Our team will get back to you within 24h to arrange the best time for you.
          </p>

          <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-brand-black">Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Jane Smith"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-gray-50/50 border ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3.5 outline-none focus:border-brand-secondary/50 focus:bg-white transition-colors text-brand-black placeholder:text-gray-500 font-medium`}
              />
              {formik.errors.name && formik.touched.name && <span className="text-red-500 text-xs font-medium px-1">{formik.errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-brand-black">Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="your@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-gray-50/50 border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3.5 outline-none focus:border-brand-secondary/50 focus:bg-white transition-colors text-brand-black placeholder:text-gray-500 font-medium`}
              />
              {formik.errors.email && formik.touched.email && <span className="text-red-500 text-xs font-medium px-1">{formik.errors.email}</span>}
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold text-brand-black">Phone Number</label>
              <PhoneInput
                value={formik.values.phone}
                onChange={(val) => formik.setFieldValue('phone', val)}
                onBlur={() => formik.setFieldTouched('phone', true)}
                error={formik.errors.phone}
                touched={formik.touched.phone}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-brand-black">Preferred Date</label>
                <CustomDatePicker 
                  value={formik.values.date}
                  onChange={(val: string) => {
                    formik.setFieldValue('date', val);
                    // Clear time when date changes since past-time rules may change
                    formik.setFieldValue('time', '');
                  }}
                  placeholder="mm/dd/yyyy"
                  error={formik.errors.date}
                  touched={formik.touched.date}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-bold ${!formik.values.date ? 'text-gray-400' : 'text-brand-black'}`}>Preferred Time</label>
                <CustomSelect 
                  value={formik.values.time}
                  onChange={(val: string) => formik.setFieldValue('time', val)}
                  options={timeOptions}
                  placeholder="00:00 --"
                  error={formik.errors.time}
                  touched={formik.touched.time}
                  disabled={!formik.values.date}
                  disabledTooltip="Please select a date first"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-brand-black">Service</label>
              <CustomSelect 
                value={formik.values.service}
                onChange={(val: string) => formik.setFieldValue('service', val)}
                options={serviceOptions}
                placeholder="Select a service"
                error={formik.errors.service}
                touched={formik.touched.service}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-brand-black">Comment</label>
              <textarea 
                name="comment"
                placeholder="Leave a comment..."
                rows={4}
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-gray-50/50 border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:border-brand-secondary/50 focus:bg-white transition-colors text-brand-black placeholder:text-gray-500 font-medium resize-none`}
              ></textarea>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div 
                className={`relative w-5 h-5 flex-shrink-0 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-300 ${formik.values.privacy ? 'bg-[#5B7A12] border-[#5B7A12]' : 'border-gray-300 bg-white'} ${formik.errors.privacy && formik.touched.privacy ? 'border-red-500' : ''}`}
                onClick={() => {
                  formik.setFieldValue('privacy', !formik.values.privacy);
                  formik.setFieldTouched('privacy', true);
                }}
              >
                <AnimatePresence>
                  {formik.values.privacy && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <HiCheck className="text-white text-[13px] font-bold" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <label className="text-gray-400 text-sm cursor-pointer select-none" onClick={() => {
                  formik.setFieldValue('privacy', !formik.values.privacy);
                  formik.setFieldTouched('privacy', true);
              }}>
                I agree to the <a href="#" onClick={(e) => e.stopPropagation()} className="text-[#5B7A12] font-medium underline underline-offset-2 hover:text-[#4a630e] transition-colors">Privacy Policy</a> and agree to be contacted by Dental Land
              </label>
            </div>
            {formik.errors.privacy && formik.touched.privacy && (
              <span className="text-red-500 text-xs font-medium px-1 -mt-4">{formik.errors.privacy}</span>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#5B7A12] hover:bg-[#4a630e] text-white font-bold py-4 rounded-xl transition-all mt-2 shadow-[0_4px_14px_rgba(91,122,18,0.25)] flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : 'Book a Consultation'}
            </button>

            {/* Status message */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    submitStatus.type === 'success'
                      ? 'bg-[#F0F5E4] text-[#5B7A12] border border-[#5B7A12]/20'
                      : 'bg-red-50 text-red-600 border border-red-200'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <HiCheck className="text-lg shrink-0" />
                  ) : (
                    <HiXMark className="text-lg shrink-0" />
                  )}
                  {submitStatus.message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right Side: Info & Map */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Contact Info Card */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-2 tracking-tight">
              Contact Info
            </h2>
            <p className="text-gray-400 text-[15px] font-medium mb-10">
              Don't hesitate to reach out, we'll answer all questions.
            </p>

            <div className="flex flex-col gap-8">
              {/* Phone */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5E4] flex items-center justify-center text-[#5B7A12]">
                    <PiPhone className="text-2xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-brand-black text-[15px]">Phone number</span>
                    <span className="text-gray-400 text-[14px]">+92 308 7448630</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open('tel:+923087448630', '_self')}
                  className="text-[#5B7A12] font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Call <HiOutlineChevronRight />
                </button>
              </div>

              {/* Address */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5E4] flex items-center justify-center text-[#5B7A12]">
                    <PiMapPin className="text-2xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-brand-black text-[15px]">Address</span>
                    <span className="text-gray-400 text-[14px] max-w-[200px] leading-tight">Building 15, Dubai Internet City, Sheikh Zayed Road, Dubai, UAE</span>
                  </div>
                </div>
                <button
                  onClick={() => mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="text-[#5B7A12] font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  See Map <HiOutlineChevronRight />
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5E4] flex items-center justify-center text-[#5B7A12]">
                    <PiAt className="text-2xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-brand-black text-[15px]">Email</span>
                    <span className="text-gray-400 text-[14px]">hello@dentalland.com</span>
                  </div>
                </div>
                <button
                  onClick={() => window.open('mailto:hello@dentalland.com', '_self')}
                  className="text-[#5B7A12] font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Email <HiOutlineChevronRight />
                </button>
              </div>

              {/* Working Hours */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5E4] flex items-center justify-center text-[#5B7A12]">
                    <PiClock className="text-2xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-brand-black text-[15px]">Working Hours</span>
                    <span className="text-gray-400 text-[14px]">Mon. to Fri. - 9:00 to 18:00 (UTC)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div ref={mapContainerRef} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex-grow min-h-[300px] relative overflow-hidden">
            <LeafletMap />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForms;