const Settings = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Settings</h1>
      
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>General Settings</h3>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Site Name</label>
            <input 
              type="text" 
              defaultValue="Eswatini Financial Times" 
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Site Description</label>
            <textarea 
              defaultValue="Your trusted source for financial news in Eswatini"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '100px' }} 
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '15px' }}>Administrator Options</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <button className="btn btn-primary">Backup Database</button>
          <button className="btn btn-primary">Clear Cache</button>
          <button className="btn btn-danger">Reset Settings</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
