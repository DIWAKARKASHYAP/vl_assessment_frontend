import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      
      {/* HERO SECTION */}
      <section className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Connecting <span className="text-blue-600">Buyers</span> &  
            <span className="text-blue-600"> Suppliers</span><br />
            Seamlessly.
          </h1>

          <p className="text-lg text-gray-600">
            A trusted marketplace to source products, manage suppliers, and grow your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex space-x-4 mt-6">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
            >
              Join Now
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 border border-gray-400 hover:bg-gray-200 rounded-lg"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0">
          <img
            src="https://i.imgur.com/0y8Ftya.png"
            className="w-full max-w-md drop-shadow-xl rounded-xl"
            alt="Marketplace banner"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Verified Suppliers</h3>
            <p className="text-gray-600">
              Work only with trusted suppliers for safe and reliable transactions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Easy Product Discovery</h3>
            <p className="text-gray-600">
              Browse thousands of resources to find exactly what your business needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Fast Order Requests</h3>
            <p className="text-gray-600">
              Send purchase requests and get responses quickly from suppliers.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-gray-900 text-center text-gray-300 mt-10">
        <p>© {new Date().getFullYear()} B2B Marketplace. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
