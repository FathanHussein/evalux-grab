import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-3xl mb-4">Selamat Datang di EvalUX-Grab</h1>
      <p className="max-w-md mx-auto">
        Sebuah platform evaluasi digital yang dibuat sebagai bentuk Tugas Akhir saya Muhammad Fathan Hussein, Mahasiswa S1 Jurusan Sistem Informasi STMIK Sinar Nusantara Surakarta.
      </p>
      <div className="max-w-md mx-auto p-6 mt-10 bg-[#92D050] border border-black">
        <p>
          Tanpa mengurangi rasa hormat saya, ijinkanlah saya Muhammad Fathan Hussein, Mahasiswa S1 Sistem Informasi STMIK Sinar Nusantara meminta waktu Anda sejenak untuk ikut membantu memberikan jawaban pada kuesioner yang sudah saya siapkan. Atas perhatian dan waktunya, saya mengucapkan banyak Terima kasih kepada para Responden sekalian dan Sehat selalu semua. Amin
        </p>
        <button
          className="px-4 py-2 mt-4 bg-slate-200 text-black rounded hover:bg-slate-300"
          onClick={() => navigate('/questionnaire')}
        >
          FORM KUESIONER
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
