import Link from 'next/link';
import { Search, TrendingUp, Heart, Scale, ArrowRight, GraduationCap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <GraduationCap className="h-20 w-20 mx-auto mb-8 text-primary-200" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Find Your Dream College
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover, compare, and save colleges across India with our comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/colleges" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-lg px-10 py-4">
              <Search className="h-5 w-5 inline mr-2" />
              Explore Colleges
            </Link>
            <Link href="/compare" className="btn-secondary bg-transparent text-white border-white hover:bg-white/10 text-lg px-10 py-4">
              <Scale className="h-5 w-5 inline mr-2" />
              Compare Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Everything You Need to Find the Right College
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
            Our platform provides all the tools you need to make an informed decision about your higher education
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Smart Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Search by name, location, fees, and ratings. Filter results to find colleges that match your criteria.
              </p>
            </div>
            <div className="card">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Scale className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Easy Comparison</h3>
              <p className="text-gray-600 leading-relaxed">
                Compare up to 3 colleges side-by-side. Analyze fees, placements, ratings, and more at a glance.
              </p>
            </div>
            <div className="card">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Save Favorites</h3>
              <p className="text-gray-600 leading-relaxed">
                Save colleges to your personal list. Access them anytime and make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
            Browse colleges by category to find programs that match your interests
          </p>
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
                href={`/colleges?category=${encodeURIComponent(category.name)}`}
                className="category-card group"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your College Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-10 leading-relaxed">
            Join thousands of students who found their perfect college with our platform.
          </p>
          <Link
            href="/colleges"
            className="inline-flex items-center bg-white text-primary-700 hover:bg-primary-50 font-medium py-4 px-10 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4 text-lg">
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
