import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function Analysis() {
  const [analysisData, setAnalysisData] = useState([]);

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      // Fetch statements
      const { data: statements, error: statementsError } = await supabase.from('statements').select('*');
      if (statementsError) throw new Error(statementsError.message);

      // Fetch respondents
      const { data: respondents, error: respondentsError } = await supabase.from('respondents').select('*');
      if (respondentsError) throw new Error(respondentsError.message);

      // Calculate total and average scores
      const analysisData = statements.map(statement => {
        const totalScore = respondents.reduce((acc, respondent) => {
          const responseScore = respondent.responses[statement.id];
          return acc + (responseScore || 0); // Add score if it exists, otherwise add 0
        }, 0);

        const averageScore = respondents.length > 0 ? (totalScore / respondents.length).toFixed(2) : 0;

        return {
          ...statement,
          totalScore,
          averageScore
        };
      });

      setAnalysisData(analysisData);
    } catch (error) {
      console.error('Error fetching analysis data:', error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className='text-2xl md:text-3xl text-green-500 font-semibold mb-4 md:mb-8'>
        Analisis
      </h2>
      <div className='overflow-x-auto'>
        <table className="border border-gray-300 min-w-full">
          <thead className='border border-gray-300 bg-green-500 text-white'>
            <tr>
              <th className='border border-gray-300 p-2'>No</th>
              <th className='border border-gray-300 p-2'>Pernyataan</th>
              <th className='border border-gray-300 p-2'>Variabel</th>
              <th className='border border-gray-300 p-2'>Total Skor</th>
              <th className='border border-gray-300 p-2'>Rata-rata Skor</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.map((data, index) => (
              <tr key={data.id}>
                <td className='border border-gray-300 p-2 w-12 text-center'>{index + 1}</td>
                <td className='border border-gray-300 p-2 w-12'>{data.statement}</td>
                <td className='border border-gray-300 p-2 w-12 text-center'>{data.variable}</td>
                <td className='border border-gray-300 p-2 w-12 text-center'>{data.totalScore}</td>
                <td className='border border-gray-300 p-2 w-12 text-center'>{data.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analysis;
