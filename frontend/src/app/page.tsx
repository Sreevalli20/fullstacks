import Link from 'next/link';
import { Search, TrendingUp, Heart, Scale, ArrowRight, GraduationCap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <GraduationCap className="h-16 w-16 mx-auto mb-6 text-primary-200" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream College
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Discover, compare, and save colleges across India with our comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/colleges" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
              <Search className="h-5 w-5 inline mr-2" />
              Explore Colleges
            </Link>
            <Link href="/compare" className="btn-secondary bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-3">
              <Scale className="h-5 w-5 inline mr-2" />
              Compare Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Everything You Need to Find the Right College
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Search by name, location, fees, and ratings. Filter results to find colleges that match your criteria.
              </p>
            </div>
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Scale className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Comparison</h3>
              <p className="text-gray-600">
                Compare up to 3 colleges side-by-side. Analyze fees, placements, ratings, and more at a glance.
              </p>
            </div>
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
              <p className="text-gray-600">
                Save colleges to your personal list. Access them anytime and make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Popular Categories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Engineering', icon: '⚙️' },
              { name: 'Medical', icon: '🏥' },
              { name: 'Management', icon: '💼' },
              { name: 'Arts & Science', icon: '📚' },
              { name: 'Law', icon: '⚖️' },
              { name: 'Architecture', icon: '🏛️' },
              { name: 'Pharmacy', icon: '💊' },
              { name: 'Design', icon: '🎨' },
            ].map((category) => (
              <Link
                key={category.name}
                href="/colleges"
                className="card hover:shadow-lg transition-all hover:scale-105 cursor-pointer group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your College Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who found their perfect college with our platform.
          </p>
          <Link
            href="/colleges"
            className="inline-flex items-center bg-white text-primary-700 hover:bg-primary-50 font-medium py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">
            © 2024 CollegeFinder. All rights reserved.
          </p>
          <p className="text-sm">
            This platform uses synthetic/demo data for demonstration purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
