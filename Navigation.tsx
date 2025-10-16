import { LayoutDashboard, Map, AlertTriangle, Upload, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Gösterge Paneli', icon: LayoutDashboard },
    { path: '/region', label: 'Bölge Detayları', icon: Map },
    { path: '/alerts', label: 'Uyarılar', icon: AlertTriangle },
    { path: '/data-input', label: 'Veri Girişi', icon: Upload },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-t-xl transition-colors relative
                  ${active 
                    ? 'text-[#2B6CB0] bg-gray-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2B6CB0]" />
                )}
              </Link>
            );
          })}
          
          <div className="ml-auto">
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Çıkış</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
