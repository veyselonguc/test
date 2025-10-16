import { useState } from 'react';
import { MapPin, Download, TrendingUp, TrendingDown, Cloud, Wind, Droplets } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { weeklyData, getStatusColor } from '../lib/mockData';

export function RegionDetails() {
  const [selectedRegion] = useState({
    name: 'Los Angeles',
    country: 'USA',
    lat: 34.0522,
    lng: -118.2437,
    status: 'moderate' as const,
    currentPollution: {
      pm25: 42.1,
      pm10: 55.3,
      no2: 35.2,
      so2: 15.8,
      o3: 48.9,
    }
  });

  const pollutants = [
    { name: 'PM2.5', value: selectedRegion.currentPollution.pm25, unit: 'µg/m³', threshold: 50, icon: Cloud, color: '#2B6CB0' },
    { name: 'PM10', value: selectedRegion.currentPollution.pm10, unit: 'µg/m³', threshold: 100, icon: Cloud, color: '#38A169' },
    { name: 'NO₂', value: selectedRegion.currentPollution.no2, unit: 'µg/m³', threshold: 60, icon: Wind, color: '#F6AD55' },
    { name: 'SO₂', value: selectedRegion.currentPollution.so2, unit: 'µg/m³', threshold: 40, icon: Droplets, color: '#9F7AEA' },
    { name: 'O₃', value: selectedRegion.currentPollution.o3, unit: 'µg/m³', threshold: 100, icon: Wind, color: '#ED8936' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-gray-900">{selectedRegion.name}</h1>
              <Badge
                style={{
                  backgroundColor: getStatusColor(selectedRegion.status),
                  color: 'white'
                }}
              >
                {selectedRegion.status === 'good' ? 'İyi' : 
                 selectedRegion.status === 'moderate' ? 'Orta' : 
                 selectedRegion.status === 'unhealthy' ? 'Sağlıksız' : 'Tehlikeli'}
              </Badge>
            </div>
            <p className="text-gray-500">{selectedRegion.country}</p>
          </div>
          <Button className="bg-[#2B6CB0] hover:bg-[#2B6CB0]/90 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <Card className="lg:col-span-2 border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle>Bölge Haritası</CardTitle>
              <CardDescription>Hava kalitesi izleme istasyonları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
                {/* Focused Map View */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, #2B6CB0 0px, #2B6CB0 1px, transparent 1px, transparent 15px),
                      repeating-linear-gradient(90deg, #2B6CB0 0px, #2B6CB0 1px, transparent 1px, transparent 15px)`
                  }} />
                  
                  {/* Central marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-[#F6AD55] opacity-30 animate-ping absolute" />
                      <div className="w-16 h-16 rounded-full bg-[#F6AD55] flex items-center justify-center shadow-xl relative">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Satellite stations */}
                  {[
                    { x: '30%', y: '40%', status: 'good' },
                    { x: '70%', y: '35%', status: 'moderate' },
                    { x: '25%', y: '70%', status: 'good' },
                    { x: '75%', y: '65%', status: 'moderate' },
                    { x: '50%', y: '20%', status: 'good' },
                  ].map((station, i) => (
                    <div
                      key={i}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ left: station.x, top: station.y }}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: getStatusColor(station.status) }}
                      />
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        İstasyon #{i + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Box */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-sm text-gray-900 mb-1">{selectedRegion.name}</div>
                  <div className="text-xs text-gray-500">
                    {selectedRegion.lat.toFixed(4)}°N, {Math.abs(selectedRegion.lng).toFixed(4)}°W
                  </div>
                  <Separator className="my-2" />
                  <div className="text-xs text-gray-500">5 izleme istasyonu aktif</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pollutants Sidebar */}
          <div className="space-y-4">
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle>Güncel Ölçümler</CardTitle>
                <CardDescription>Gerçek zamanlı kirletici seviyeleri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pollutants.map((pollutant) => {
                  const Icon = pollutant.icon;
                  const percentage = (pollutant.value / pollutant.threshold) * 100;
                  const isAbove = pollutant.value > pollutant.threshold;
                  
                  return (
                    <div key={pollutant.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${pollutant.color}15` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: pollutant.color }} />
                          </div>
                          <span className="text-sm text-gray-900">{pollutant.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900">
                            {pollutant.value} {pollutant.unit}
                          </span>
                          {isAbove ? (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: pollutant.color
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Eşik: {pollutant.threshold} {pollutant.unit}</span>
                        <span>{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Trends */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>7 Günlük Kirletici Trendleri</CardTitle>
            <CardDescription>Tüm izlenen parametrelerin karşılaştırmalı analizi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
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
                  <Legend />
                  <Line type="monotone" dataKey="pm25" stroke="#2B6CB0" strokeWidth={2} name="PM2.5" />
                  <Line type="monotone" dataKey="pm10" stroke="#38A169" strokeWidth={2} name="PM10" />
                  <Line type="monotone" dataKey="no2" stroke="#F6AD55" strokeWidth={2} name="NO₂" />
                  <Line type="monotone" dataKey="so2" stroke="#9F7AEA" strokeWidth={2} name="SO₂" />
                  <Line type="monotone" dataKey="o3" stroke="#ED8936" strokeWidth={2} name="O₃" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
