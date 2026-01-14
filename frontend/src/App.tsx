// src/App.tsx
import { useState, useEffect } from 'react';
import api from './lib/axios'; // import axios instance

function App() {
  const [status, setStatus] = useState<string>('Đang kiểm tra kết nối...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApi = async () => {
      try {
        // Giả sử backend của bạn có endpoint /health hoặc / (root)
        const response = await api.get('/health'); // thay bằng endpoint thật của bạn
        // Ví dụ: nếu backend trả { message: "OK" }
        setStatus(response.data.message || 'API đang hoạt động!');
      } catch (err: any) {
        console.error('API error:', err);
        setError(err.message || 'Không kết nối được với backend');
        setStatus('Lỗi kết nối');
      }
    };

    checkApi();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>MindX Fullstack - Frontend</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Trạng thái kết nối Backend:</h3>
        <p style={{ color: error ? 'red' : 'green', fontWeight: 'bold' }}>
          {status}
        </p>
        {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
      </div>
    </div>
  );
}

export default App;