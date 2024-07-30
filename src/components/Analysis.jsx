import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function Analysis() {
  const [analysisData, setAnalysisData] = useState([]);
  const [grandMeans, setGrandMeans] = useState({});

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      // Fetch statements and order by 'order' column
      const { data: statements, error: statementsError } = await supabase
        .from('statements')
        .select('*')
        .order('order', { ascending: true });
      if (statementsError) throw new Error(statementsError.message);

      // Fetch respondents
      const { data: respondents, error: respondentsError } = await supabase.from('respondents').select('*');
      if (respondentsError) throw new Error(respondentsError.message);

      // Calculate scores for each statement and the grand means
      const analysisData = statements.map(statement => {
        const scores = respondents.map(respondent => respondent.responses[statement.id] || 0);
        const totalScore = scores.reduce((acc, score) => acc + score, 0);
        const averageScore = respondents.length > 0 ? (totalScore / respondents.length).toFixed(2) : 0;

        // Calculate count for each response option
        const responseCounts = {
          SS: scores.filter(score => score === 4).length,
          S: scores.filter(score => score === 3).length,
          TS: scores.filter(score => score === 2).length,
          STS: scores.filter(score => score === 1).length,
        };

        return {
          statement: statement.statement,
          variable: statement.variable,
          ...responseCounts,
          totalScore,
          averageScore
        };
      });

      // Calculate grand mean for each variable
      const variables = ['Useful', 'Usable', 'Findable', 'Credible', 'Desirable', 'Accessible', 'Valuable'];
      const grandMeans = variables.reduce((acc, variable) => {
        const variableStatements = analysisData.filter(data => data.variable === variable);
        const totalVariableScore = variableStatements.reduce((acc, data) => acc + data.totalScore, 0);
        const grandMean = variableStatements.length > 0 ? (totalVariableScore / (variableStatements.length * respondents.length)).toFixed(2) : 0;
        acc[variable] = grandMean;
        return acc;
      }, {});

      setAnalysisData(analysisData);
      setGrandMeans(grandMeans);
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
              <th className='border border-gray-300 p-2'>SS</th>
              <th className='border border-gray-300 p-2'>S</th>
              <th className='border border-gray-300 p-2'>TS</th>
              <th className='border border-gray-300 p-2'>STS</th>
              <th className='border border-gray-300 p-2'>Total Nilai</th>
              <th className='border border-gray-300 p-2'>Rata-rata</th>
              <th className='border border-gray-300 p-2'>Grand Mean</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.map((data, index) => (
              <tr key={index}>
                <td className='border border-gray-300 p-2 w-12 text-center'>{index + 1}</td>
                <td className='border border-gray-300 p-2'>{data.statement}</td>
                <td className='border border-gray-300 p-2'>{data.variable}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.SS}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.S}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.TS}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.STS}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.totalScore}</td>
                <td className='border border-gray-300 p-2 text-center'>{data.averageScore}</td>
                <td className='border border-gray-300 p-2 text-center'>{grandMeans[data.variable]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analysis;
