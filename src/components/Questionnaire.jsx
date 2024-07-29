import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function Questionnaire() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [statements, setStatements] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState('');

  useEffect(() => {
    fetchStatements();
  }, []);

  const fetchStatements = async () => {
    const { data, error } = await supabase.from('statements').select('*').order('order', { ascending: true });
    if (error) console.error(error);
    else setStatements(data);
  };

  const handleResponseChange = (statementId, value) => {
    setResponses({
      ...responses,
      [statementId]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setFormErrors('Harap isi semua field sebelum submit.');
      return;
    }

    const responseScores = {};
    for (let [statementId, response] of Object.entries(responses)) {
      let score = 0;
      switch (response) {
        case 'SS':
          score = 4;
          break;
        case 'S':
          score = 3;
          break;
        case 'TS':
          score = 2;
          break;
        case 'STS':
          score = 1;
          break;
        default:
          break;
      }
      responseScores[statementId] = score;
    }

    const { data, error } = await supabase.from('respondents').insert([{ name, gender, age, job, responses: responseScores }]);
    if (error) {
      console.error('Error submitting form:', error);
    } else {
      console.log('Form submitted successfully:', data);
      setName('');
      setGender('');
      setAge('');
      setJob('');
      setResponses({});
      setSubmitted(true);
      setFormErrors('');
    }
  };

  const isFormValid = () => {
    return (
      name &&
      gender &&
      age &&
      job &&
      statements.every(statement => responses[statement.id])
    );
  };

  if (submitted) {
    return (
      <div className="m-8 ml-16">
        <h2 className='text-3xl text-green-500 font-semibold'>Terima Kasih!</h2>
        <p>Formulir Anda telah berhasil dikirim.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <h2 className='text-3xl text-green-500 font-semibold mb-4'>
        Kuesioner
      </h2>
      <form className="mt-8" onSubmit={handleSubmit}>
        {formErrors && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded max-w-screen-sm">
            {formErrors}
          </div>
        )}
        <div className='max-w-screen-sm'>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 bg-gray-100 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Jenis Kelamin</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 bg-gray-100 rounded"
            >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Usia</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 bg-gray-100 rounded"
            >
              <option value="">Pilih</option>
              <option value="15-19">15-19</option>
              <option value="20-25">20-25</option>
              <option value="26-30">26-30</option>
              <option value="31-35">31-35</option>
              <option value=">36">{">36"}</option>
            </select>
          </div>
          <div className="mb-12">
            <label className="block mb-1 font-bold">Pekerjaan</label>
            <select
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 bg-gray-100 rounded"
            >
              <option value="">Pilih</option>
              <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
              <option value="Buruh">Buruh</option>
              <option value="Karyawan Swasta">Karyawan Swasta</option>
              <option value="Wiraswasta">Wiraswasta</option>
              <option value="Freelance">Freelance</option>
              <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
              <option value="Pegawai Sipil">Pegawai Sipil</option>
            </select>
          </div>
        </div>
        <div className="p-4 bg-gray-100 border border-gray-300 rounded max-w-screen-sm mb-4">
          <div className="grid grid-cols-2 gap-4 text-lg font-bold">
            <div>
              <p>SS - Sangat Setuju</p>
              <p>S - Setuju</p>
            </div>
            <div>
              <p>TS - Tidak Setuju</p>
              <p>STS - Sangat Tidak Setuju</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          {statements.map((statement, index) => (
            <div key={statement.id} className="mb-4 max-w-screen-sm">
              <label className="font-semibold">{statement.statement}</label>
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input type="radio" name={`statement${index}`} value="SS" onChange={() => handleResponseChange(statement.id, 'SS')} className="mr-2" />
                  Sangat Setuju
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`statement${index}`} value="S" onChange={() => handleResponseChange(statement.id, 'S')} className="mr-2" />
                  Setuju
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`statement${index}`} value="TS" onChange={() => handleResponseChange(statement.id, 'TS')} className="mr-2" />
                  Tidak Setuju
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`statement${index}`} value="STS" onChange={() => handleResponseChange(statement.id, 'STS')} className="mr-2" />
                  Sangat Tidak Setuju
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questionnaire;
