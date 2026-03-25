useEffect(() => {
    api.get('/users')
        .then(res => setusers(res.data))
    api.get('/orders')
        .then(res => setOrders(res.data))
    api.get('/allbooks')
        .then(res => setBooks(res.data))

}, [])
const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0

);

const revenueData = orders.reduce((acc, order) => {
    const date = new Date(order.orderDate).toLocaleDateString()

    const existing = acc.find(item => item.date === date)

    if (existing) {
        existing.revenue += order.totalAmount
    } else {
        acc.push({
            date,
            revenue: order.totalAmount
        })
    }

    return acc
}, [])
const aovData = orders.reduce((acc, order) => {
    const date = new Date(order.orderDate).toLocaleDateString();

    const existing = acc.find(item => item.date === date);

    if (existing) {
        existing.total += order.totalAmount;
        existing.count += 1;
        existing.aov = Math.round(existing.total / existing.count);
    } else {
        acc.push({
            date,
            total: order.totalAmount,
            count: 1,
            aov: order.totalAmount
        });
    }

    return acc;
}, []);

