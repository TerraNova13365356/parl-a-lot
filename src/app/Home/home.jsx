'use client';

import Link from 'next/link';
 

export default function HomePage() {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white overflow-x-hidden min-h-screen relative">
      {/* Header */}
      <header className="bg-black bg-opacity-70 py-4 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">Parke4-Lot</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="#followup" className="hover:text-purple-400 transition-colors">Followup</Link></li>
              <li><Link href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
              <li><Link href="#control" className="hover:text-purple-400 transition-colors">Control</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center text-center relative z-10">
        <div className="animate__animated animate__fadeInUp">
          <h2 className="text-5xl font-bold mb-4">Book Your Parking Slot Effortlessly</h2>
          <p className="text-xl mb-8">Find and resume parking spaces easily with Park a Lot.</p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-8 rounded-full hover:from-purple-700 hover:to-blue-600 transition-all">Go Select</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black bg-opacity-50 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Real-Time Availability', 'Secure Payments', 'User-Friendly Interface'].map((feature, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-800 to-blue-700 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform">
                <h3 className="text-2xl font-bold mb-4">{feature}</h3>
                <p>{
                  feature === 'Real-Time Availability' ? 'Check parking availability in real-time.' :
                  feature === 'Secure Payments' ? 'Pay securely with multiple payment options.' :
                  'Easy to use interface for all users.'
                }</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-black bg-opacity-70 text-center relative z-10">
        <p>&copy; 2025 Parkesac. All rights reserved.</p>
      </footer>
    </div>
  );
}
