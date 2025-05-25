import React, { useEffect, useState } from 'react';
import { getDB } from '../lib/db'; // uses PGliteWorker.create internally

interface Patient {
  id: number;
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  purpose: string;
  remarks: string;
}

// Typing the live query result parameter
interface LiveQueryResult<T> {
  rows: T[];
}

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const SearchPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState('SELECT * FROM patients;');
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [queryColumns, setQueryColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => Promise<void>) | null = null;

    const setupLiveQuery = async () => {
      const db = await getDB();

      const result = await db.live.query(
        'SELECT * FROM patients;',
        [],
        (res: LiveQueryResult<Patient>) => {
          console.log('🔄 Live update:', res.rows);
          setPatients(res.rows);
        }
      );

      unsubscribe = result.unsubscribe;
    };

    setupLiveQuery();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const runQuery = async () => {
    setError(null);
    try {
      const db = await getDB();
      const result = await db.query(query);
      const rows = result.rows;
      const cols = rows.length > 0 ? Object.keys(rows[0]) : [];
      setQueryResults(rows);
      setQueryColumns(cols);
    } catch (err: any) {
      setError(err.message || 'Invalid SQL query.');
      setQueryResults([]);
      setQueryColumns([]);
    }
  };

  const resetQuery = () => {
    setQuery('SELECT * FROM patients;');
    setQueryResults([]);
    setQueryColumns([]);
    setError(null);
  };

  return (
    <div style={{ width: '100vw', marginTop: '2rem' }} className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Patient Database & SQL Query Console</h2>

      {/* Query Area */}
      <div className="mb-6 flex flex-col items-center gap-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="w-full max-w-4xl px-4 py-2 border rounded shadow font-mono"
        />
        <div>
          <button
            onClick={runQuery}
            className="bg-[#2563eb] text-white px-6 py-2 rounded hover:bg-blue-700 transition mr-4"
          >
            Run Query
          </button>
          <button
            onClick={resetQuery}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            Reset
          </button>
        </div>
        {error && <p className="text-red-600 font-semibold">{error}</p>}
      </div>

      {/* Table: show query results if any, else show live patients */}
      {(queryResults.length > 0) ? (
        <>
          <h3 className="text-xl font-semibold mb-3 mt-10 text-center">Search Results</h3>
          <div className="overflow-x-auto" style={{ width: '90%', margin: '0 auto' }}>
            <table className="min-w-full bg-white shadow rounded">
              <thead className="font-extrabold text-[#2563eb] text-left">
                <tr>
                  {queryColumns.filter((col) => col !== 'id').map((col) => (
                    <th key={col} className="px-4 py-2">{capitalizeFirstLetter(col)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResults.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    {queryColumns.filter((col) => col !== 'id').map((col) => (
                      <td key={col} className="px-4 py-2">{(row as any)[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mt-10 mb-3 text-center">Patients Database</h3>
          {patients.length > 0 ? (
            <div className="overflow-x-auto mb-12" style={{ width: '90%', margin: '0 auto' }}>
              <table className="min-w-full bg-white shadow rounded">
                <thead className="font-extrabold text-[#2563eb] text-left">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Dob</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Purpose</th>
                    <th className="px-4 py-2">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{patient.name}</td>
                      <td className="px-4 py-2">{patient.dob}</td>
                      <td className="px-4 py-2">{patient.gender}</td>
                      <td className="px-4 py-2">{patient.address}</td>
                      <td className="px-4 py-2">{patient.phone}</td>
                      <td className="px-4 py-2">{patient.purpose}</td>
                      <td className="px-4 py-2">{patient.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">No patients found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
