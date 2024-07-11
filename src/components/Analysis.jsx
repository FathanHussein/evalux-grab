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

      // Calculate scores for each respondent
      const analysisData = respondents.map(respondent => {
        const variables = ['Useful', 'Usable', 'Findable', 'Credible', 'Desirable', 'Accessible', 'Valuable'];
        const scores = variables.reduce((acc, variable) => {
          acc[variable] = statements.reduce((total, statement) => {
            if (statement.variable === variable) {
              total += respondent.responses[statement.id] || 0;
            }
            return total;
          }, 0);
          return acc;
        }, {});

        const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
        const averageScore = variables.length > 0 ? (totalScore / variables.length).toFixed(2) : 0;

        return {
          name: respondent.name,
          ...scores,
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
              <th className='border border-gray-300 p-2'>Responden</th>
              <th className='border border-gray-300 p-2'>Useful</th>
              <th className='border border-gray-300 p-2'>Usable</th>
              <th className='border border-gray-300 p-2'>Findable</th>
              <th className='border border-gray-300 p-2'>Credible</th>
              <th className='border border-gray-300 p-2'>Desirable</th>
              <th className='border border-gray-300 p-2'>Accessible</th>
              <th className='border border-gray-300 p-2'>Valuable</th>
              <th className='border border-gray-300 p-2'>Total Skor</th>
              <th className='border border-gray-300 p-2'>Rata-rata Skor</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.map((data, index) => (
              <tr key={index}>
                <td className='border border-gray-300 p-2 w-12 text-center'>{index + 1}</td>
                <td className='border border-gray-300 p-2'>{data.name}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.Useful}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.Usable}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.Findable}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.Credible}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.Desirable}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.Accessible}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.Valuable}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.totalScore}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analysis;
