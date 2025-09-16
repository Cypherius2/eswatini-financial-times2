import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
