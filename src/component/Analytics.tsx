import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import axiosInstance from '@/utils/axiosConfig';

const Analytics = () => {

    const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response= await axiosInstance.get('file/getAnalytics')
      setAnalytics(response.data.data);
      console.log(response.data.data)
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return null;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const formatMonthlyData = analytics?.monthlyStats.map(stat => ({
    month: `${stat._id.month}/${stat._id.year}`,
    avgScore: Math.round(stat.avgCreditScore),
    applications: stat.totalApplications
  }));

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-4">
    <Card>
      <CardHeader>
        <CardTitle>Credit Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analytics?.creditScoreDistribution}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
            >
              {analytics?.creditScoreDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Monthly Applications & Credit Score Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatMonthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="avgScore" stroke="#8884d8" name="Avg Credit Score" />
            <Line yAxisId="right" type="monotone" dataKey="applications" stroke="#82ca9d" name="Applications" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card>
  <CardHeader>
    <CardTitle>Top Banks by Volume</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={analytics?.bankDistribution}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />

        {/* Y-axis for total accounts (left side) */}
        <YAxis 
          yAxisId="left" 
          orientation="left" 
          tickFormatter={(value) => value.toLocaleString()} 
        />

        {/* Y-axis for monetary values (right side, using log scaling) */}
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value} 
          scale="log" 
          domain={[1, 'auto']} 
        />

        <Tooltip 
          formatter={(value, name) => 
            name.includes("Overdue") || name.includes("Balance") 
              ? `${value.toLocaleString()} ₹` 
              : value.toLocaleString()
          } 
        />
        <Legend />

        {/* Total accounts (left Y-axis) */}
        <Bar 
          yAxisId="left" 
          dataKey="totalAccounts" 
          fill="#8884d8" 
          name="Total Accounts" 
        />

        {/* Total Amount Overdue (right Y-axis, log scale applied) */}
        <Bar 
          yAxisId="right" 
          dataKey="totalAmountOverdue" 
          fill="#ff7300" 
          name="Total Amount Overdue" 
        />

        {/* Total Current Balance (right Y-axis, log scale applied) */}
        <Bar 
          yAxisId="right" 
          dataKey="totalCurrentBalance" 
          fill="#82ca9d" 
          name="Total Current Balance" 
        />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>




<Card>
  <CardHeader>
    <CardTitle>Loan Portfolio Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={[
            { name: "Secured Loans", value: analytics?.loanStats[0]?.totalSecuredAmount },
            { name: "Unsecured Loans", value: analytics?.loanStats[0]?.totalUnsecuredAmount }
          ]}
          cx="50%" cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        >
          <Cell key="secured" fill="#0088FE" />
          <Cell key="unsecured" fill="#FF8042" />
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    <div className="text-center mt-4">
      <p className="text-sm text-gray-500">Average Credit Enquiries</p>
      <p className="text-2xl font-bold">
        {analytics?.loanStats[0]?.avgEnquiries.toFixed(2)}
      </p>
    </div>
  </CardContent>
</Card>

  </div>
  )
}

export default Analytics
