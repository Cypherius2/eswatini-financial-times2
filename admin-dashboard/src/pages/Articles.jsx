const Articles = () => {
  const articles = [
    { id: 1, title: 'Eswatini Economy Grows', author: 'John Doe', category: 'Economy', date: '2023-05-15', status: 'Published' },
    { id: 2, title: 'Banking Sector Update', author: 'Jane Smith', category: 'Banking', date: '2023-05-14', status: 'Draft' },
    { id: 3, title: 'Market Analysis', author: 'Mike Johnson', category: 'Markets', date: '2023-05-13', status: 'Published' }
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Articles</h1>
        <button className="btn btn-primary">Create New Article</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{article.category}</td>
                <td>{article.date}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: article.status === 'Published' ? '#d4edda' : '#fff3cd',
                    color: article.status === 'Published' ? '#155724' : '#856404'
                  }}>
                    {article.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary" style={{ marginRight: '10px' }}>Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Articles
