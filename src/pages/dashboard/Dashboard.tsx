import { useEffect, useState } from 'react';
import './Dashboard.css';
import { AuthUser } from '../../models';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import ScriptTable from '../../components/ScriptTable/ScriptTable';


const authService = new AuthService("http://localhost:8091");

export default function Dashboard() {

  const [session, setSession] = useState<AuthUser | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const navigate = useNavigate();
  useEffect(() => {
    const load = async () => {
      const s = authService.getSession();
      setSession(s);
      if (s) {
        setIsFetching(false);
      } else {
        navigate("/login")
      }
    };

    load();
  }, [isFetching, navigate]);


  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Menu Lateral</h2>
        <nav>
          <ul className="space-y-4">
            <li><a href="#home" className="hover:text-gray-300">Home</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <ScriptTable />
      </main>
    </div>
  );
};


