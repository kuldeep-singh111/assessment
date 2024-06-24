import  { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './CommentsDashboard.css'; // Import the CSS file
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const CommentsDashboard = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' | null } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);


  const handleSort = (columnKey: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';

    if (sortConfig && sortConfig.key === columnKey) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }

    setSortConfig({ key: columnKey, direction });
  };

  
  const filteredComments = useMemo(() => {
    return comments.filter(comment =>
      comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [comments, searchTerm]);

  
  const sortedComments = useMemo(() => {
    if (!sortConfig || !sortConfig.direction) return filteredComments;

    return [...filteredComments].sort((a, b) => {
      if (a[sortConfig.key as keyof Comment] < b[sortConfig.key as keyof Comment]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof Comment] > b[sortConfig.key as keyof Comment]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredComments, sortConfig]);

 
  const paginatedComments = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedComments.slice(start, start + pageSize);
  }, [sortedComments, page, pageSize]);

  return (
    <div className="dashboard-container">
      
      <div className="controls">

      <div className="sort-buttons">
          <button className="sort-button" onClick={() => handleSort('postId')}>Post ID</button>
          <button className="sort-button" onClick={() => handleSort('name')}>Username</button>
          <button className="sort-button" onClick={() => handleSort('email')}>Email</button>
        </div>
        
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
    
      </div>
      <table className="comments-table">
        <thead >
          <tr className='heding-header'>
            <th className="table-header">Post ID</th>
            <th className="table-header">Username</th>
            <th className="table-header">Email</th>
            <th className="table-header">Description</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.map((comment) => (
            <tr key={comment.id} className="table-row">
              <td className="table-cell">{1201 + comment.id}</td>
              <td className="table-cell">{comment.name}</td>
              <td className="table-cell">{comment.email}</td>
              <td className="table-cell">{comment.body.split(' ').slice(0, 5).join(' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
       
        <span className="pagination-info">1-10 of 100 items {page}</span>
        <span className="pagination-button" onClick={() => setPage(prev => Math.max(prev - 1, 1))}><FaArrowLeft /> </span>
        <span className="pagination-button" onClick={() => setPage(prev => prev + 1)}><FaArrowRight /></span>
        
        <div className="page-size-selector">
        <select className="page-size-select" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={10}>10/Page </option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      </div>
    
    </div>
  );
};

export default CommentsDashboard;
