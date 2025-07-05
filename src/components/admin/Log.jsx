import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import Layout from '../Layout';
import Swal from 'sweetalert2';

function Log() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await adminService.getLogs(currentPage);
        setLogs(response.data.data || []);
        setTotalPages(response.data.last_page || 1);
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
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);
    }
  };

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
                    <th>Usuário</th>
                    <th>Rota</th>
                    <th>Detalhe</th>
                    <th>IP</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.id_user || 'Sistema'}</td>
                      <td>{log.rota || 'Rota não encontrada'}</td>
                      <td>{log.detalhe || 'Sem detalhes'}</td>
                      <td>{log.ip || 'IP não encontrado'}</td>
                      <td>{new Date(log.created_at).toLocaleString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default Log;