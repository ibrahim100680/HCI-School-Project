import { useState } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={24} />
            </div>
            <span className="font-inter font-bold text-xl text-gray-800">NextGen Academy</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6 md:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-primary transition-colors font-medium ${
                  isActive(item.href) ? "nav-active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline" className="btn-transition">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="ghost"
                  className="btn-transition"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-primary text-white hover:bg-blue-700 btn-transition">
                  Student Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-gray-700"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 text-gray-700 hover:text-primary ${
                  isActive(item.href) ? "nav-active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-gray-700 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="block py-2 text-gray-700 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-2 text-primary font-medium"
                onClick={closeMobileMenu}
              >
                Student Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
