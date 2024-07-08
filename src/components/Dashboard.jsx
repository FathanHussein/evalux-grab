import React from 'react';

function Dashboard() {
  return (
    <div>
      <table class="border border-[#70AD47] w-full">
        <thead className='border border-[#70AD47] h-36'>
          <tr>
            <th className='border border-[#70AD47] bg-[#A2CC8F] w-1/2 font-semibold text-3xl'>35 Pernyataan</th>
            <th className='border border-[#70AD47] bg-[#A2CC8F] w-1/2 font-semibold text-3xl'>100 Responden</th>
          </tr>
        </thead>
      </table>
      <h2 className='w-full text-center mt-10 font-semibold text-3xl'>
        Selamat Datang di EvalUX-Grab
      </h2>
      <div className='mt-6 flex justify-center'>
        <h3 className='p-2 text-center bg-[#92D050]'>
          Pilih menu di bagian kiri untuk memulai kegiatanmu!
        </h3>
      </div>
    </div>
  );
}

export default Dashboard;
