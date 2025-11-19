// Header Svg curved
export const curveSvgDown = (
  <div className="absolute -bottom-8 left-0 right-0 w-full overflow-visible rotate-180 bg-[#111]">
    <svg
      className="w-full h-8"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1440 100"
    >
      <path 
        d="M0,0 L0,0 Q360,100 720,100 T1440,0 L1440,0 Z" 
        fill="currentColor"
      />
    </svg>
  </div>
);

// 🎯 Dotted Pattern
export const dotsSix = (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="96" viewBox="0 0 64 96">
    <g fill="gray">
      {[10, 18, 27, 36, 45, 54].map((y) =>
        [8, 20, 32, 44].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" />)
      )}
    </g>
  </svg>
);

// 📍 Location Icon
export const locationIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ✉️ Email Icon
export const emailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// 📞 Phone Icon
export const phoneIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.32 1.6.58 2.37a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.71-.71a2 2 0 0 1 2.11-.45c.77.26 1.56.46 2.37.58A2 2 0 0 1 22 16.92Z" />
  </svg>
);

// 📘 Facebook
export const facebook = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// 🐦 Twitter
export const twitter = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.83 1.08A4.52 4.52 0 0 0 16.11 0c-2.51 0-4.55 2.04-4.55 4.55 0 .36.04.71.12 1.05A12.94 12.94 0 0 1 1.64.89 4.48 4.48 0 0 0 2.92 6a4.41 4.41 0 0 1-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.44a4.52 4.52 0 0 1-2.04.08 4.54 4.54 0 0 0 4.24 3.15A9.07 9.07 0 0 1 0 19.54 12.79 12.79 0 0 0 6.93 21c8.32 0 12.86-6.89 12.86-12.86 0-.2 0-.41-.01-.61A9.14 9.14 0 0 0 23 3z" />
  </svg>
);

// ▶️ YouTube
export const youtube = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

// 💼 LinkedIn
export const linkedin = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// 📸 Instagram
export const insta = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);
