import { useContext, useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { AuthContext } from '../../services/auth.service';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const currentUrl = window.location.origin;
  const [profileId, setProfileId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    if (!user) return;
    setProfileId(user.id);
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href={currentUrl} className="flex items-center no-underline">
            <span className="text-gray-100 text-xl font-bold hover:text-white transition-colors">MelMentor</span>
          </a>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-800/50 text-gray-100 placeholder-gray-400 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:bg-gray-800 transition-all"
                placeholder="Search..."
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-800 no-underline">
              Home
            </a>
            <a href="/mentors" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-800 no-underline">
              Mentors
            </a>
            {user ? (
              <>
                <a href={`/profile/${profileId}`} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-800 no-underline">
                  Profile
                </a>
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-800 no-underline">
                  Login
                </a>
                <a href="/signup" className="bg-gray-100 hover:bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline">
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors no-underline">
              Home
            </a>
            <a href="/mentors" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors no-underline">
              Mentors
            </a>
            {user ? (
              <>
                <a href={`/profile/${profileId}`} className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors no-underline">
                  Profile
                </a>
                <button
                  onClick={handleLogOut}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors no-underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors no-underline">
                  Login
                </a>
                <a href="/signup" className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors no-underline">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;