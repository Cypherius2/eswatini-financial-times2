const Dashboard = () => {
  const stats = [
    { label: 'Total Articles', value: '245', change: '+12%' },
    { label: 'Total Users', value: '1,234', change: '+5%' },
    { label: 'Subscriptions', value: '856', change: '+8%' },
    { label: 'Page Views', value: '45,678', change: '+15%' }
  ]

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Dashboard</h1>
      
      <div className="dashboard-grid">
        {stats.map(stat => (
          <div key={stat.label} className="card">
            <h3>{stat.label}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</p>
            <span style={{ color: stat.change.startsWith('+') ? 'green' : 'red' }}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <p>Dashboard content will be displayed here...</p>
      </div>
    </div>
  )
}

export default Dashboard
