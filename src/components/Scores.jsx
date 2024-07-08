import React from 'react';

function Scores() {
  return (
    <div className='p-4'>
      <h2 className='text-2xl md:text-3xl text-green-500 font-semibold mb-4 md:mb-8'>
        Skor
      </h2>
      <table class="min-w-full border-gray-300 border">
        <thead className= 'bg-green-500 text-white'>
          <tr>
            <th className='border border-gray-300 p-2'>SS - Sangat Setuju</th>
            <th className='border border-gray-300 p-2'>S - Setuju</th>
            <th className='border border-gray-300 p-2'>TS - Tidak Setuju</th>
            <th className='border border-gray-300 p-2'>STS - Sangat Tidak Setuju</th>
          </tr>
        </thead>
        <tbody className='h-20'>
          <tr>
            <td className='border border-gray-300 p-2 w-12 text-center'>4</td>
            <td className='border border-gray-300 p-2 w-12 text-center'>3</td>
            <td className='border border-gray-300 p-2 w-12 text-center'>2</td>
            <td className='border border-gray-300 p-2 w-12 text-center'>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Scores;
