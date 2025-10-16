import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app would navigate to dashboard
    alert('Giriş başarılı!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2B6CB0] to-[#38A169] rounded-xl flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
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

            <h1 className="text-gray-900 mb-2">Hoş Geldiniz</h1>
            <p className="text-gray-500">
              Çevre izleme panonuza erişmek için giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta adresi</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Beni hatırla
                </label>
              </div>
              <a href="#" className="text-sm text-[#2B6CB0] hover:underline">
                Şifremi unuttum?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#2B6CB0] to-[#38A169] hover:opacity-90 text-white rounded-xl"
            >
              Giriş Yap
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="relative my-6">
              <Separator />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                veya
              </span>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-200 rounded-xl"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google ile devam et
              </Button>
            </div>
          </form>

          <p className="text-sm text-gray-500 text-center mt-8">
            Hesabınız yok mu?{' '}
            <a href="#" className="text-[#2B6CB0] hover:underline">
              Ücretsiz kaydolun
            </a>
          </p>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:block relative bg-gradient-to-br from-[#2B6CB0] to-[#38A169] p-12">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)`
          }} />
          
          <div className="relative h-full flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-white mb-4">
                Küresel Hava Kalitesini Gerçek Zamanlı İzleyin
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Dünya çapında 347 bölgedeki kirlilik seviyelerini takip edin. Hava kalitesi WHO eşiklerini aştığında anında uyarılar alın.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                      <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white">Gerçek Zamanlı İzleme</div>
                    <div className="text-white/70 text-sm">7/24 veri toplama ve analiz</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white">Gelişmiş Analitik</div>
                    <div className="text-white/70 text-sm">ML destekli anomali tespiti</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white">Anında Uyarılar</div>
                    <div className="text-white/70 text-sm">Eşik ihlali bildirimleri</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <span>Dünya çapında çevre kurumları tarafından güvenilir</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
