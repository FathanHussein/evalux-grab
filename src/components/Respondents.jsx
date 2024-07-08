import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function Respondents() {
  const [respondents, setRespondents] = useState([]);

  useEffect(() => {
    fetchRespondents();
  }, []);

  const fetchRespondents = async () => {
    const { data, error } = await supabase.from('respondents').select('*');
    if (error) {
      console.error('Error fetching respondents:', error);
    } else {
      setRespondents(data);
    }
  };

  const deleteRespondent = async (id) => {
    const { error } = await supabase.from('respondents').delete().eq('id', id);
    if (error) {
      console.error('Error deleting respondent:', error);
    } else {
      setRespondents(respondents.filter(respondent => respondent.id !== id));
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl md:text-3xl text-green-500 font-semibold mb-4 md:mb-8'>
        Daftar Responden
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className='bg-green-500 text-white'>
            <tr>
              <th className='border border-gray-300 p-2'>No</th>
              <th className='border border-gray-300 p-2'>Nama</th>
              <th className='border border-gray-300 p-2'>Jenis Kelamin</th>
              <th className='border border-gray-300 p-2'>Usia</th>
              <th className='border border-gray-300 p-2'>Pekerjaan</th>
              <th className='border border-gray-300 p-2'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {respondents.map((respondent, index) => (
              <tr key={respondent.id} className='even:bg-gray-100'>
                <td className='border border-gray-300 p-2 text-center'>{index + 1}</td>
                <td className='border border-gray-300 p-2 text-center'>{respondent.name}</td>
                <td className='border border-gray-300 p-2 text-center'>{respondent.gender}</td>
                <td className='border border-gray-300 p-2 text-center'>{respondent.age}</td>
                <td className='border border-gray-300 p-2 text-center'>{respondent.job}</td>
                <td className='border border-gray-300 p-2 text-center'>
                  <button 
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => deleteRespondent(respondent.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Respondents;
