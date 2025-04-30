// Sales Data
export const salesData = [
  { id: 1, customer: "John Smith", tel: "(555) 123-4567", vehicle: "Toyota Camry", engineNo: "T8973451", chassisNo: "JT2BF22K1W0123456", plateNo: "ABC1234", date: "2024-03-15" },
  { id: 2, customer: "Jane Doe", tel: "(555) 987-6543", vehicle: "Honda Civic", engineNo: "H7654321", chassisNo: "2HGFC2F52KH123456", plateNo: "XYZ5678", date: "2024-03-14" },
  { id: 3, customer: "Mike Johnson", tel: "(555) 234-5678", vehicle: "Ford F-150", engineNo: "F9876543", chassisNo: "1FTEW1EP2LFA12345", plateNo: "DEF9012", date: "2024-02-12" },
  { id: 4, customer: "Sarah Williams", tel: "(555) 876-5432", vehicle: "BMW X5", engineNo: "B1234567", chassisNo: "5UXCR6C51KLL12345", plateNo: "GHI3456", date: "2024-02-10" },
  { id: 5, customer: "Robert Brown", tel: "(555) 345-6789", vehicle: "Chevrolet Malibu", engineNo: "C7891234", chassisNo: "1G1ZD5ST1JF123456", plateNo: "JKL7890", date: "2024-02-08" }
];

// Purchase Data
export const purchaseData = [
  { id: 1, name: "Auto World Inc.", tel: "(555) 111-2222", carName: "Toyota Camry", engineNo: "T8973451", chassisNo: "JT2BF22K1W0123456", plateNo: "ABC1234", date: "2024-03-10" },
  { id: 2, name: "Prime Motors", tel: "(555) 222-3333", carName: "Honda Civic", engineNo: "H7654321", chassisNo: "2HGFC2F52KH123456", plateNo: "XYZ5678", date: "2024-03-08" },
  { id: 3, name: "City Auto Group", tel: "(555) 333-4444", carName: "Ford F-150", engineNo: "F9876543", chassisNo: "1FTEW1EP2LFA12345", plateNo: "DEF9012", date: "2024-02-05" },
  { id: 4, name: "Luxury Cars Ltd", tel: "(555) 444-5555", carName: "BMW X5", engineNo: "B1234567", chassisNo: "5UXCR6C51KLL12345", plateNo: "GHI3456", date: "2024-02-03" },
  { id: 5, name: "Value Auto Mart", tel: "(555) 555-6666", carName: "Chevrolet Malibu", engineNo: "C7891234", chassisNo: "1G1ZD5ST1JF123456", plateNo: "JKL7890", date: "2024-02-01" },
  { id: 6, name: "Elite Motors", tel: "(555) 666-7777", carName: "Mercedes C300", engineNo: "M1234567", chassisNo: "WDDWF4KB2FR123456", plateNo: "MNO4567", date: "2024-03-15" }
];

// Dashboard metrics calculation function
export const calculateMetrics = () => {
  // Calculate total sales
  const currentMonthSales = salesData.filter(sale => {
    const saleDate = new Date(sale.date);
    const currentDate = new Date();
    return saleDate.getMonth() === currentDate.getMonth() &&
           saleDate.getFullYear() === currentDate.getFullYear();
  }).length;

  const previousMonthSales = salesData.filter(sale => {
    const saleDate = new Date(sale.date);
    const currentDate = new Date();
    const previousMonth = currentDate.getMonth() - 1;
    return saleDate.getMonth() === previousMonth &&
           saleDate.getFullYear() === currentDate.getFullYear();
  }).length;

  const salesChange = previousMonthSales === 0 ? 100 : 
    Math.round(((currentMonthSales - previousMonthSales) / previousMonthSales) * 100);

  // Calculate total purchases
  const currentMonthPurchases = purchaseData.filter(purchase => {
    const purchaseDate = new Date(purchase.date);
    const currentDate = new Date();
    return purchaseDate.getMonth() === currentDate.getMonth() &&
           purchaseDate.getFullYear() === currentDate.getFullYear();
  }).length;

  const previousMonthPurchases = purchaseData.filter(purchase => {
    const purchaseDate = new Date(purchase.date);
    const currentDate = new Date();
    const previousMonth = currentDate.getMonth() - 1;
    return purchaseDate.getMonth() === previousMonth &&
           purchaseDate.getFullYear() === currentDate.getFullYear();
  }).length;

  const purchasesChange = previousMonthPurchases === 0 ? 100 :
    Math.round(((currentMonthPurchases - previousMonthPurchases) / previousMonthPurchases) * 100);

  // Calculate current stock (purchases - sales)
  const currentStock = purchaseData.length - salesData.length;
  const previousStock = (previousMonthPurchases - previousMonthSales);
  const stockChange = previousStock === 0 ? 100 :
    Math.round(((currentStock - previousStock) / Math.abs(previousStock)) * 100);

  return [
    { 
      title: "Total Sales", 
      value: salesData.length.toString(), 
      change: `${salesChange >= 0 ? '+' : ''}${salesChange}%`,
      icon: "trendingUp" 
    },
    { 
      title: "Total Purchases", 
      value: purchaseData.length.toString(), 
      change: `${purchasesChange >= 0 ? '+' : ''}${purchasesChange}%`,
      icon: "truck" 
    },
    { 
      title: "Current Stock", 
      value: currentStock.toString(), 
      change: `${stockChange >= 0 ? '+' : ''}${stockChange}%`,
      icon: "barChart2" 
    }
  ];
};

// Dashboard metrics
export const dashboardMetrics = calculateMetrics();

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

// User Data
export const userData = {
  name: "Admin User",
  email: "admin@tphilautos.com",
  role: "Administrator",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};
