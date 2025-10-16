import { useState } from 'react';
import { AlertTriangle, Filter, Check, X, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { alerts as initialAlerts } from '../lib/mockData';

export function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterParameter, setFilterParameter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAcknowledge = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.status === filterSeverity;
    const matchesParameter = filterParameter === 'all' || alert.parameter === filterParameter;
    const matchesSearch = alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesParameter && matchesSearch;
  });

  const activeAlerts = filteredAlerts.filter(a => !a.acknowledged).length;
  const dangerousAlerts = filteredAlerts.filter(a => a.status === 'dangerous' && !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">Uyarılar & Anomaliler</h1>
            <p className="text-gray-500">Hava kalitesi eşik ihlallerini izleyin ve yönetin</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[#F6AD55] text-[#F6AD55] px-4 py-2">
              {activeAlerts} Aktif
            </Badge>
            <Badge variant="destructive" className="bg-[#E53E3E] px-4 py-2">
              {dangerousAlerts} Tehlikeli
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Konuma göre ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50"
                />
              </div>

              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-full md:w-[180px] bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Önem Derecesi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Önem Dereceleri</SelectItem>
                  <SelectItem value="warning">Uyarı</SelectItem>
                  <SelectItem value="dangerous">Tehlikeli</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterParameter} onValueChange={setFilterParameter}>
                <SelectTrigger className="w-full md:w-[180px] bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Kirletici" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Kirleticiler</SelectItem>
                  <SelectItem value="PM2.5">PM2.5</SelectItem>
                  <SelectItem value="PM10">PM10</SelectItem>
                  <SelectItem value="NO₂">NO₂</SelectItem>
                  <SelectItem value="SO₂">SO₂</SelectItem>
                  <SelectItem value="O₃">O₃</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Table */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>Uyarı Geçmişi</CardTitle>
            <CardDescription>
              {alerts.length} uyarının {filteredAlerts.length} tanesi gösteriliyor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Durum</TableHead>
                    <TableHead>Konum</TableHead>
                    <TableHead>Parametre</TableHead>
                    <TableHead>Değer</TableHead>
                    <TableHead>Eşik</TableHead>
                    <TableHead>Zaman</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow
                      key={alert.id}
                      className={alert.acknowledged ? 'opacity-50' : ''}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className="w-4 h-4"
                            style={{ color: alert.status === 'dangerous' ? '#E53E3E' : '#F6AD55' }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{alert.location}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-[#2B6CB0] text-[#2B6CB0]">
                          {alert.parameter}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-900">{alert.value}</span>
                        <span className="text-gray-500 text-sm ml-1">µg/m³</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{alert.threshold}</span>
                        <span className="text-gray-500 text-sm ml-1">µg/m³</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">{alert.time}</div>
                      </TableCell>
                      <TableCell>
                        {alert.acknowledged ? (
                          <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                            Onaylandı
                          </Badge>
                        ) : (
                          <Badge
                            variant={alert.status === 'dangerous' ? 'destructive' : 'secondary'}
                            className={alert.status === 'dangerous' ? 'bg-[#E53E3E]' : 'bg-[#F6AD55]'}
                          >
                            {alert.status === 'dangerous' ? 'Tehlikeli' : 'Uyarı'}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!alert.acknowledged && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#38A169] text-[#38A169] hover:bg-[#38A169] hover:text-white"
                              onClick={() => handleAcknowledge(alert.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-600 hover:bg-gray-100"
                            onClick={() => handleDismiss(alert.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-br from-red-50 to-white">
            <CardContent className="pt-6">
              <div className="text-gray-600 mb-1">Tehlikeli Uyarılar</div>
              <div className="text-gray-900">{dangerousAlerts}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="pt-6">
              <div className="text-gray-600 mb-1">Uyarılar</div>
              <div className="text-gray-900">
                {filteredAlerts.filter(a => a.status === 'warning' && !a.acknowledged).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="text-gray-600 mb-1">Onaylandı</div>
              <div className="text-gray-900">
                {filteredAlerts.filter(a => a.acknowledged).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="text-gray-600 mb-1">Toplam Uyarılar</div>
              <div className="text-gray-900">{filteredAlerts.length}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
