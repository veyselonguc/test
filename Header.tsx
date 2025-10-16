import { Search, User, Bell } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2B6CB0] to-[#38A169] rounded-xl flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
                fill="white"
              />
              <path
                d="M12 16C8.69 16 6 18.69 6 22H18C18 18.69 15.31 16 12 16Z"
                fill="white"
                opacity="0.7"
              />
            </svg>
          </div>
          <span className="text-gray-900">
            AirSense
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Bölge, kirletici ara..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#2B6CB0] transition-colors" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E53E3E] text-white flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </div>
          <Avatar className="cursor-pointer ring-2 ring-gray-100 hover:ring-[#2B6CB0] transition-all">
            <AvatarFallback className="bg-gradient-to-br from-[#2B6CB0] to-[#38A169] text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
