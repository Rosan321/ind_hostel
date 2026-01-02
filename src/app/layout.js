import {
  Geist,
  Geist_Mono,
  Open_Sans,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "@/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700"], // Specify the weights you need
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"], // Specify the weights you need
});

export const metadata = {
  title: "Ind Hostel",
  description: "Hotel Booking App",
  icons: {
    icon: "/logoF.png",
    shortcut: "/logoF.png",
    apple: "/logoF.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${openSans.variable} font-sans antialiased`}
      >
        <StoreProvider>
          <Header />
          <main className="pt-22">{children}</main>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={2500}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss={false}
            draggable
            theme="dark"
          />
        </StoreProvider>
      </body>
    </html>
  );
}
