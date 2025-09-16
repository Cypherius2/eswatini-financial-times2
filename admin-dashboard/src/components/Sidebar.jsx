import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/articles', label: 'Articles', icon: '📝' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/categories', label: 'Categories', icon: '📂' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav>
        <ul className="sidebar-nav">
          {menuItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span style={{ marginRight: '10px' }}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
