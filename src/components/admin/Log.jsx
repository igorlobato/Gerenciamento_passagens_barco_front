import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import Layout from '../Layout';
import Swal from 'sweetalert2';

function Log() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await adminService.getLogs();
        setLogs(response.data || []);
      } catch (err) {
        const errorMessage = err.message || err.response?.data?.message || 'Erro ao carregar logs.';
        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);


  return (
    <Layout showSearchAndCarousel={false}>
      {() => (
        <div className="dashboard-activation admin">
          <h1 className="dashboard-activation-title">Logs do Sistema</h1>
          {loading ? (
            <p>Carregando logs...</p>
          ) : error ? (
            <div className="error">{error}</div>
          ) : logs.length === 0 ? (
            <p>Nenhum log encontrado.</p>
          ) : (
            <div className="admin-container">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>id_user</th>
                    <th>Rota</th>
                    <th>Detalhe</th>
                    <th>Ip</th>
                    <th className='dataLog'>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.id_user || 'Sistema'}</td>
                      <td>{log.rota || 'Rota não encontrada'}</td>
                      <td>{log.detalhe || 'Sem detalhes'}</td>
                      <td>{log.ip || 'Ip não encontrado'}</td>
                      <td className='dataLog'>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default Log;