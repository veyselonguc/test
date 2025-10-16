import { useState } from 'react';
import { Upload, Activity, Database, Play, Pause, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

export function DataInput() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [requestsPerSecond] = useState(47);
  const [queueHealth] = useState(98);

  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    parameter: 'pm25',
    value: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert('Veri başarıyla gönderildi!');
    setFormData({ latitude: '', longitude: '', parameter: 'pm25', value: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">Veri Girişi & Test</h1>
          <p className="text-gray-500">Manuel veri girişi ve sistem izleme</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Manual Input Form */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-[#2B6CB0]" />
                </div>
                <div>
                  <CardTitle>Manuel Veri Girişi</CardTitle>
                  <CardDescription>Kirlilik ölçümlerini manuel olarak girin</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Enlem</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="0.0001"
                      placeholder="34.0522"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      className="bg-gray-50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Boylam</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="0.0001"
                      placeholder="-118.2437"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      className="bg-gray-50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parameter">Kirletici Parametresi</Label>
                  <Select value={formData.parameter} onValueChange={(value) => setFormData({ ...formData, parameter: value })}>
                    <SelectTrigger className="bg-gray-50">
                      <SelectValue placeholder="Parametre seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pm25">PM2.5</SelectItem>
                      <SelectItem value="pm10">PM10</SelectItem>
                      <SelectItem value="no2">NO₂</SelectItem>
                      <SelectItem value="so2">SO₂</SelectItem>
                      <SelectItem value="o3">O₃</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">Değer (µg/m³)</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.1"
                    placeholder="42.5"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="bg-gray-50"
                    required
                  />
                </div>

                <Separator />

                <Button type="submit" className="w-full bg-[#2B6CB0] hover:bg-[#2B6CB0]/90 rounded-xl">
                  <Upload className="w-4 h-4 mr-2" />
                  Ölçüm Gönder
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="text-sm text-gray-700 mb-2">Hızlı Kılavuz:</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ölçüm konumu için GPS koordinatlarını girin</li>
                  <li>• Ölçülen kirletici türünü seçin</li>
                  <li>• Ölçülen değeri µg/m³ cinsinden girin</li>
                  <li>• Veriler WHO eşiklerine göre doğrulanacaktır</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#38A169]" />
                  </div>
                  <div>
                    <CardTitle>Veri Alım Durumu</CardTitle>
                    <CardDescription>Gerçek zamanlı işleme metrikleri</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Saniye Başına İstek</div>
                    <div className="flex items-end gap-2">
                      <span className="text-gray-900">{requestsPerSecond}</span>
                      <TrendingUp className="w-4 h-4 text-[#38A169] mb-1" />
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-[#38A169] flex items-center justify-center">
                    <span className="text-sm text-gray-900">{requestsPerSecond}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Kuyruk Sağlığı</div>
                    <Badge className="bg-[#38A169]">{queueHealth}%</Badge>
                  </div>
                  <Progress value={queueHealth} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kafka Kuyruğu 1</span>
                    <Badge variant="outline" className="border-[#38A169] text-[#38A169]">Aktif</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kafka Kuyruğu 2</span>
                    <Badge variant="outline" className="border-[#38A169] text-[#38A169]">Aktif</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">İşleme Hattı</span>
                    <Badge variant="outline" className="border-[#38A169] text-[#38A169]">Sağlıklı</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Database className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Simülasyon Modu</CardTitle>
                    <CardDescription>Test verisi otomatik oluştur</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Otomatik Test Modu</div>
                    <div className="text-xs text-gray-500">
                      {isSimulating ? 'Sentetik veri üretiliyor...' : 'Simülasyon duraklatıldı'}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={isSimulating ? 'destructive' : 'default'}
                    className={isSimulating ? '' : 'bg-[#2B6CB0] hover:bg-[#2B6CB0]/90'}
                    onClick={() => setIsSimulating(!isSimulating)}
                  >
                    {isSimulating ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Durdur
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Başlat
                      </>
                    )}
                  </Button>
                </div>

                {isSimulating && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#38A169] rounded-full animate-pulse" />
                      <span className="text-sm text-gray-600">PM2.5 ölçümleri: 12/sn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#38A169] rounded-full animate-pulse" />
                      <span className="text-sm text-gray-600">PM10 ölçümleri: 8/sn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#38A169] rounded-full animate-pulse" />
                      <span className="text-sm text-gray-600">NO₂ ölçümleri: 6/sn</span>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-sm text-gray-700 mb-2">Simülasyon Bilgisi:</div>
                  <p className="text-sm text-gray-600">
                    Etkinleştirildiğinde, sistem test ve tanıtım amaçlı olarak tüm izlenen bölgelerde gerçekçi kirlilik verileri otomatik olarak üretecektir.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
