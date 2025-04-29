// Dashboard metrics
export const dashboardMetrics = [
  { title: "Total Sales", value: "142", change: "+12%", icon: "trendingUp" },
  { title: "Total Purchases", value: "87", change: "+5%", icon: "truck" },
  { title: "Current Stock", value: "34", change: "-3%", icon: "barChart2" },
  { title: "Monthly Revenue", value: "$283,500", change: "+8%", icon: "dollarSign" }
];

// Sales Trend Data for Chart
export const salesTrendData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 13, 15, 22, 27],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      tension: 0.4,
    },
    {
      label: 'Purchases',
      data: [8, 12, 9, 11, 14, 17],
      borderColor: '#FFC107',
      backgroundColor: 'rgba(255, 193, 7, 0.2)',
      tension: 0.4,
    }
  ],
};

// Recent Transactions
export const recentTransactions = [
  { id: 1, customer: "John Smith", vehicle: "Toyota Camry", date: "2023-05-15", plateNo: "ABC1234" },
  { id: 2, customer: "Jane Doe", vehicle: "Honda Civic", date: "2023-05-14", plateNo: "XYZ5678" },
  { id: 3, customer: "Mike Johnson", vehicle: "Ford F-150", date: "2023-05-12", plateNo: "DEF9012" },
  { id: 4, customer: "Sarah Williams", vehicle: "BMW X5", date: "2023-05-10", plateNo: "GHI3456" },
  { id: 5, customer: "Robert Brown", vehicle: "Chevrolet Malibu", date: "2023-05-08", plateNo: "JKL7890" }
];

// Sales Data
export const salesData = [
  { id: 1, customer: "John Smith", tel: "(555) 123-4567", vehicle: "Toyota Camry", engineNo: "T8973451", chassisNo: "JT2BF22K1W0123456", plateNo: "ABC1234", date: "2023-05-15" },
  { id: 2, customer: "Jane Doe", tel: "(555) 987-6543", vehicle: "Honda Civic", engineNo: "H7654321", chassisNo: "2HGFC2F52KH123456", plateNo: "XYZ5678", date: "2023-05-14" },
  { id: 3, customer: "Mike Johnson", tel: "(555) 234-5678", vehicle: "Ford F-150", engineNo: "F9876543", chassisNo: "1FTEW1EP2LFA12345", plateNo: "DEF9012", date: "2023-05-12" },
  { id: 4, customer: "Sarah Williams", tel: "(555) 876-5432", vehicle: "BMW X5", engineNo: "B1234567", chassisNo: "5UXCR6C51KLL12345", plateNo: "GHI3456", date: "2023-05-10" },
  { id: 5, customer: "Robert Brown", tel: "(555) 345-6789", vehicle: "Chevrolet Malibu", engineNo: "C7891234", chassisNo: "1G1ZD5ST1JF123456", plateNo: "JKL7890", date: "2023-05-08" }
];

// Purchase Data
export const purchaseData = [
  { id: 1, name: "Auto World Inc.", tel: "(555) 111-2222", vehicle: "Toyota Camry", engineNo: "T8973451", chassisNo: "JT2BF22K1W0123456", plateNo: "ABC1234", date: "2023-05-10" },
  { id: 2, name: "Prime Motors", tel: "(555) 222-3333", vehicle: "Honda Civic", engineNo: "H7654321", chassisNo: "2HGFC2F52KH123456", plateNo: "XYZ5678", date: "2023-05-08" },
  { id: 3, name: "City Auto Group", tel: "(555) 333-4444", vehicle: "Ford F-150", engineNo: "F9876543", chassisNo: "1FTEW1EP2LFA12345", plateNo: "DEF9012", date: "2023-05-05" },
  { id: 4, name: "Luxury Cars Ltd", tel: "(555) 444-5555", vehicle: "BMW X5", engineNo: "B1234567", chassisNo: "5UXCR6C51KLL12345", plateNo: "GHI3456", date: "2023-05-03" },
  { id: 5, name: "Value Auto Mart", tel: "(555) 555-6666", vehicle: "Chevrolet Malibu", engineNo: "C7891234", chassisNo: "1G1ZD5ST1JF123456", plateNo: "JKL7890", date: "2023-04-30" }
];

// User Data
export const userData = {
  name: "Admin User",
  email: "admin@tphilautos.com",
  role: "Administrator",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};