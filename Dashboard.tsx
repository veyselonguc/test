import { useState } from 'react';
import { Cloud, AlertTriangle, MapPin, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { currentMetrics, hourlyData, regions, alerts, getPollutionColor, getStatusColor } from '../lib/mockData';

export function Dashboard() {
  const [liveUpdate, setLiveUpdate] = useState(true);

  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Ortalama PM2.5 (24s)</CardDescription>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-[#2B6CB0]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-gray-900">
                  {currentMetrics.avgPm25} <span className="text-gray-500">µg/m³</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Aktif Anomaliler</CardDescription>
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#E53E3E]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-gray-900">
                  {currentMetrics.activeAnomalies}
                </div>
                <div className="flex items-center gap-1 text-red-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">3 new</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>İzlenen Bölgeler</CardDescription>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#38A169]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-gray-900">
                  {currentMetrics.monitoredRegions}
                </div>
                <div className="flex items-center gap-1 text-green-600 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">All active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <Card className="lg:col-span-2 border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle>Küresel Hava Kalitesi Haritası</CardTitle>
              <CardDescription>Bölgelere göre gerçek zamanlı kirlilik yoğunluğu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
                {/* Simulated Map with Region Markers */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, #2B6CB0 0px, #2B6CB0 1px, transparent 1px, transparent 20px),
                        repeating-linear-gradient(90deg, #2B6CB0 0px, #2B6CB0 1px, transparent 1px, transparent 20px)`
                    }} />

                    {/* Region Markers */}
                    {regions.map((region) => {
                      const x = ((region.lng + 180) / 360) * 100;
                      const y = ((90 - region.lat) / 180) * 100;

                      return (
                        <div
                          key={region.id}
                          className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${x}%`, top: `${y}%` }}
                        >
                          <div
                            className="w-8 h-8 rounded-full animate-pulse shadow-lg flex items-center justify-center"
                            style={{ backgroundColor: getStatusColor(region.status) }}
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                            <div>{region.name}</div>
                            <div className="text-xs text-gray-300">PM2.5: {region.pm25} µg/m³</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="text-sm text-gray-600 mb-2">Air Quality Index</div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-[#38A169]" />
                      <span className="text-xs text-gray-600">Good</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-[#F6AD55]" />
                      <span className="text-xs text-gray-600">Moderate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-[#ED8936]" />
                      <span className="text-xs text-gray-600">Unhealthy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-[#E53E3E]" />
                      <span className="text-xs text-gray-600">Dangerous</span>
                    </div>
                  </div>
                </div>

                {/* Live Indicator */}
                {liveUpdate && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#38A169] rounded-full animate-pulse" />
                    <span className="text-sm text-gray-700">Live</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Alert Panel */}
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Son Anomaliler</CardTitle>
                <Badge variant="destructive" className="bg-[#E53E3E]">
                  {unacknowledgedAlerts.length}
                </Badge>
              </div>
              <CardDescription>Gerçek zamanlı uyarı izleme</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[360px] pr-4">
                <div className="space-y-3">
                  {unacknowledgedAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-xl border-l-4 bg-gray-50"
                      style={{
                        borderLeftColor: alert.status === 'dangerous' ? '#E53E3E' : '#F6AD55'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className="w-4 h-4"
                            style={{ color: alert.status === 'dangerous' ? '#E53E3E' : '#F6AD55' }}
                          />
                          <span className="text-sm text-gray-900">{alert.parameter}</span>
                        </div>
                        <Badge
                          variant={alert.status === 'dangerous' ? 'destructive' : 'secondary'}
                          className={alert.status === 'dangerous' ? 'bg-[#E53E3E]' : 'bg-[#F6AD55]'}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{alert.location}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{alert.value} µg/m³</span>
                        <span>•</span>
                        <span>Eşik: {alert.threshold}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{alert.time}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* PM2.5 Trend Chart */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>PM2.5 Seviyeleri - Son 24 Saat</CardTitle>
            <CardDescription>Ortalama partikül madde konsantrasyon trendi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorPm25" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B6CB0" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2B6CB0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="time" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="pm25"
                    stroke="#2B6CB0"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPm25)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl border-0 shadow-sm">
          <div className="text-sm text-gray-500">
            Son güncelleme: {new Date(currentMetrics.lastUpdate).toLocaleString('tr-TR')}
          </div>
          <div className="text-sm text-gray-500">
            Data source: <span className="text-[#2B6CB0]">WHO & local sensors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
