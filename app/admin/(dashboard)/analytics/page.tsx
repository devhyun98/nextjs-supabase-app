'use client';

import { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAnalyticsData } from '@/lib/data/dummy-admin-stats';

type DateRange = 7 | 30 | 90;

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>(7);

  const analyticsData = useMemo(() => {
    return getAnalyticsData(dateRange);
  }, [dateRange]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">통계 분석</h1>
          <p className="text-muted-foreground mt-2">이벤트 및 사용자 추이를 분석하세요</p>
        </div>
        <Select value={dateRange.toString()} onValueChange={(value) => setDateRange(parseInt(value) as DateRange)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">지난 7일</SelectItem>
            <SelectItem value="30">지난 30일</SelectItem>
            <SelectItem value="90">지난 90일</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 이벤트 추이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>이벤트 생성 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#3b82f6"
                name="이벤트"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 사용자 가입 추이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자 가입 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                name="가입자"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 통합 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>이벤트 및 사용자 통합 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#3b82f6"
                name="이벤트"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                name="사용자"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
