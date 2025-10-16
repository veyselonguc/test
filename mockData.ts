// Mock data for AirSense Dashboard

export interface PollutionReading {
  time: string;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
}

export interface Region {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  pm25: number;
  status: 'good' | 'moderate' | 'unhealthy' | 'dangerous';
}

export interface Alert {
  id: string;
  location: string;
  parameter: string;
  value: number;
  threshold: number;
  time: string;
  status: 'warning' | 'dangerous';
  acknowledged: boolean;
}

export const currentMetrics = {
  avgPm25: 42.3,
  activeAnomalies: 12,
  monitoredRegions: 347,
  lastUpdate: new Date().toISOString(),
};

export const hourlyData: PollutionReading[] = [
  { time: '00:00', pm25: 35, pm10: 45, no2: 28, so2: 12, o3: 42 },
  { time: '02:00', pm25: 32, pm10: 42, no2: 25, so2: 10, o3: 40 },
  { time: '04:00', pm25: 30, pm10: 40, no2: 23, so2: 9, o3: 38 },
  { time: '06:00', pm25: 38, pm10: 48, no2: 30, so2: 14, o3: 45 },
  { time: '08:00', pm25: 52, pm10: 62, no2: 42, so2: 20, o3: 55 },
  { time: '10:00', pm25: 58, pm10: 68, no2: 48, so2: 24, o3: 60 },
  { time: '12:00', pm25: 55, pm10: 65, no2: 45, so2: 22, o3: 58 },
  { time: '14:00', pm25: 48, pm10: 58, no2: 38, so2: 18, o3: 52 },
  { time: '16:00', pm25: 45, pm10: 55, no2: 35, so2: 16, o3: 48 },
  { time: '18:00', pm25: 50, pm10: 60, no2: 40, so2: 19, o3: 54 },
  { time: '20:00', pm25: 42, pm10: 52, no2: 33, so2: 15, o3: 46 },
  { time: '22:00', pm25: 38, pm10: 48, no2: 30, so2: 13, o3: 43 },
];

export const weeklyData: PollutionReading[] = [
  { time: 'Pzt', pm25: 45, pm10: 55, no2: 35, so2: 15, o3: 48 },
  { time: 'Sal', pm25: 52, pm10: 62, no2: 42, so2: 19, o3: 55 },
  { time: 'Çar', pm25: 48, pm10: 58, no2: 38, so2: 17, o3: 51 },
  { time: 'Per', pm25: 55, pm10: 65, no2: 45, so2: 21, o3: 58 },
  { time: 'Cum', pm25: 42, pm10: 52, no2: 33, so2: 14, o3: 45 },
  { time: 'Cmt', pm25: 38, pm10: 48, no2: 30, so2: 12, o3: 42 },
  { time: 'Paz', pm25: 35, pm10: 45, no2: 28, so2: 11, o3: 40 },
];

export const regions: Region[] = [
  { id: '1', name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, pm25: 85.5, status: 'unhealthy' },
  { id: '2', name: 'Delhi', country: 'India', lat: 28.6139, lng: 77.2090, pm25: 152.3, status: 'dangerous' },
  { id: '3', name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, pm25: 42.1, status: 'moderate' },
  { id: '4', name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, pm25: 28.7, status: 'good' },
  { id: '5', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, pm25: 35.2, status: 'moderate' },
  { id: '6', name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, pm25: 38.9, status: 'moderate' },
  { id: '7', name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, pm25: 98.4, status: 'unhealthy' },
  { id: '8', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, pm25: 18.5, status: 'good' },
];

export const alerts: Alert[] = [
  {
    id: '1',
    location: 'Delhi, India',
    parameter: 'PM2.5',
    value: 152.3,
    threshold: 50,
    time: '2025-10-09 14:23',
    status: 'dangerous',
    acknowledged: false,
  },
  {
    id: '2',
    location: 'Cairo, Egypt',
    parameter: 'PM10',
    value: 135.2,
    threshold: 100,
    time: '2025-10-09 14:15',
    status: 'dangerous',
    acknowledged: false,
  },
  {
    id: '3',
    location: 'Beijing, China',
    parameter: 'NO₂',
    value: 78.5,
    threshold: 60,
    time: '2025-10-09 13:58',
    status: 'warning',
    acknowledged: false,
  },
  {
    id: '4',
    location: 'Los Angeles, USA',
    parameter: 'O₃',
    value: 125.3,
    threshold: 100,
    time: '2025-10-09 13:42',
    status: 'warning',
    acknowledged: true,
  },
  {
    id: '5',
    location: 'Mumbai, India',
    parameter: 'PM2.5',
    value: 88.7,
    threshold: 50,
    time: '2025-10-09 13:30',
    status: 'dangerous',
    acknowledged: false,
  },
  {
    id: '6',
    location: 'Jakarta, Indonesia',
    parameter: 'SO₂',
    value: 42.1,
    threshold: 40,
    time: '2025-10-09 13:12',
    status: 'warning',
    acknowledged: true,
  },
];

export const getPollutionColor = (value: number): string => {
  if (value < 25) return '#38A169'; // green
  if (value < 50) return '#68D391'; // light green
  if (value < 75) return '#F6AD55'; // orange
  return '#E53E3E'; // red
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'good':
      return '#38A169';
    case 'moderate':
      return '#F6AD55';
    case 'unhealthy':
      return '#ED8936';
    case 'dangerous':
      return '#E53E3E';
    default:
      return '#A0AEC0';
  }
};
