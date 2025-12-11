import { Link } from "react-router-dom";
import { Shield, Search, Zap, Building2, Boxes, Handshake } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-800">
      
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-cyan-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 md:px-20 py-24 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="max-w-2xl space-y-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black leading-[1.15] text-gray-900">
            Connecting <span className="text-blue-500">Buyers</span> &  
            <span className="text-blue-500"> Suppliers</span><br />
            Seamlessly.
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            A trusted B2B marketplace where businesses discover verified suppliers, 
            negotiate efficiently, and build long-term partnerships—all in one powerful dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex space-x-4 mt-6">
            <Link
              to="/signup"
              className="px-7 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              Join Now
            </Link>

            <Link
              to="/login"
              className="px-7 py-3 border-2 border-gray-300 font-semibold rounded-xl hover:bg-white/60 backdrop-blur-sm transition-all"
            >
              Login
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Create an account in minutes — no credit card required.
          </p>
        </div>

        {/* Right Image */}
        <div className="mt-12 md:mt-0 relative z-10">
          <img
            src="https://i.imgur.com/0y8Ftya.png"
            className="w-full max-w-md drop-shadow-2xl rounded-xl"
            alt="Marketplace banner"
          />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative px-6 md:px-20 py-14 bg-white/80 backdrop-blur-sm border-y">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-5xl font-black text-blue-500">15K+</h3>
            <p className="text-gray-700 mt-2 font-medium">Active Listings</p>
          </div>
          <div>
            <h3 className="text-5xl font-black text-blue-500">8K+</h3>
            <p className="text-gray-700 mt-2 font-medium">Verified Suppliers</p>
          </div>
          <div>
            <h3 className="text-5xl font-black text-blue-500">95%</h3>
            <p className="text-gray-700 mt-2 font-medium">Successful Requests</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 md:px-20 py-20">
        <h2 className="text-3xl font-black text-center mb-14">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Feature Cards */}
          {[
            {
              icon: <Shield className="w-7 h-7 text-blue-500" />,
              title: "Verified Suppliers",
              desc: "Only trusted and quality-checked suppliers ensure safe and reliable transactions."
            },
            {
              icon: <Search className="w-7 h-7 text-blue-500" />,
              title: "Easy Product Discovery",
              desc: "Browse thousands of listings with advanced filters to find exactly what you need."
            },
            {
              icon: <Zap className="w-7 h-7 text-blue-500" />,
              title: "Fast Order Requests",
              desc: "Send purchase requests instantly and receive quick responses."
            },
            {
              icon: <Handshake className="w-7 h-7 text-blue-500" />,
              title: "RFQ (Request for Quote)",
              desc: "Send RFQs for bulk or custom orders and negotiate pricing directly."
            },
            {
              icon: <Boxes className="w-7 h-7 text-blue-500" />,
              title: "Manage Listings & Requests",
              desc: "Suppliers manage listings effortlessly while buyers track all requests."
            },
            {
              icon: <Building2 className="w-7 h-7 text-blue-500" />,
              title: "Secure & Transparent",
              desc: "Every interaction is logged for complete transparency and trust."
            }
          ].map((f, i) => (
            <div
              key={i}
              className="p-7 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="px-6 md:px-20 py-20 bg-gray-50 border-t">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black">Built for Modern B2B Commerce</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our platform empowers enterprises and growing businesses 
            to find reliable suppliers, negotiate smarter, and scale faster — 
            all through real-time communication and powerful search tools.
          </p>

          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
          >
            Learn More →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-gray-900 text-center text-gray-300 mt-10">
        <p>© {new Date().getFullYear()} B2B Marketplace. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
