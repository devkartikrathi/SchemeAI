"use client"
const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">Providing easy access to government schemes and benefits for all citizens.</p>
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">Email: info@govschemes.com</p>
            <p className="text-gray-300">Phone: 1800-123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2023 GovSchemes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

