const Users = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joined: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Author', joined: '2023-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', joined: '2023-03-10' }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Users</h1>
        <button className="btn btn-primary">Add New User</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: user.role === 'Admin' ? '#d4edda' : 
                                   user.role === 'Author' ? '#d1ecf1' : '#f8d7da',
                    color: user.role === 'Admin' ? '#155724' : 
                          user.role === 'Author' ? '#0c5460' : '#721c24'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <button className="btn btn-primary" style={{ marginRight: '10px' }}>Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>s
  )
}

export default Users
