import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function Dashboard() {
  const [respondentCount, setRespondentCount] = useState(0);
  const [statementCount, setStatementCount] = useState(0);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [occupationData, setOccupationData] = useState([]);

  useEffect(() => {
    fetchCounts();
    fetchRespondentData();
  }, []);

  const fetchCounts = async () => {
    try {
      const { count: statementCount, error: statementCountError } =
        await supabase
          .from("statements")
          .select("*", { count: "exact", head: true });
      if (statementCountError) throw new Error(statementCountError.message);

      const { count: respondentCount, error: respondentCountError } =
        await supabase
          .from("respondents")
          .select("*", { count: "exact", head: true });
      if (respondentCountError) throw new Error(respondentCountError.message);

      setStatementCount(statementCount);
      setRespondentCount(respondentCount);
    } catch (error) {
      console.error("Error fetching counts:", error.message);
    }
  };

  const fetchRespondentData = async () => {
    try {
      const { data, error } = await supabase
        .from("respondents")
        .select("gender, age, job");
      if (error) throw new Error(error.message);

      const groupedGender = data.reduce((acc, respondent) => {
        acc[respondent.gender] = (acc[respondent.gender] || 0) + 1;
        return acc;
      }, {});

      const groupedAge = data.reduce((acc, respondent) => {
        acc[respondent.age] = (acc[respondent.age] || 0) + 1;
        return acc;
      }, {});

      const groupedOccupation = data.reduce((acc, respondent) => {
        acc[respondent.job] = (acc[respondent.job] || 0) + 1;
        return acc;
      }, {});

      setGenderData(
        Object.entries(groupedGender).map(([key, value]) => ({ key, value }))
      );
      setAgeData(
        Object.entries(groupedAge).map(([key, value]) => ({ key, value }))
      );
      setOccupationData(
        Object.entries(groupedOccupation).map(([key, value]) => ({
          key,
          value,
        }))
      );
    } catch (error) {
      console.error("Error fetching respondent data:", error.message);
    }
  };

  return (
    <div>
      <table className="border border-[#70AD47] w-full">
        <thead className="border border-[#70AD47] h-36">
          <tr>
            <th className="border border-[#70AD47] bg-[#A2CC8F] w-1/2 font-semibold text-3xl">
              {statementCount} Pernyataan
            </th>
            <th className="border border-[#70AD47] bg-[#A2CC8F] w-1/2 font-semibold text-3xl">
              {respondentCount} Responden
            </th>
          </tr>
        </thead>
      </table>

      <div className="mt-10 p-4">
        <h3 className="font-semibold text-2xl mb-4">
          Responden Berdasarkan Jenis Kelamin
        </h3>
        <table className="min-w-full border border-[#70AD47] mb-8">
          <thead className="bg-[#A2CC8F] text-black">
            <tr>
              <th className="border border-[#70AD47] p-2 w-1/2">
                Jenis Kelamin
              </th>
              <th className="border border-[#70AD47] p-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {genderData.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-[#70AD47] p-2 text-center">
                  {item.key}
                </td>
                <td className="border border-[#70AD47] p-2 text-center">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="font-semibold text-2xl mb-4">
          Responden Berdasarkan Usia
        </h3>
        <table className="min-w-full border border-[#70AD47] mb-8">
          <thead className="bg-[#A2CC8F] text-black">
            <tr>
              <th className="border border-[#70AD47] p-2 w-1/2">
                Kelompok Usia
              </th>
              <th className="border border-[#70AD47] p-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {ageData.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-[#70AD47] p-2 text-center">
                  {item.key}
                </td>
                <td className="border border-[#70AD47] p-2 text-center">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="font-semibold text-2xl mb-4">
          Responden Berdasarkan Pekerjaan
        </h3>
        <table className="min-w-full border border-[#70AD47]">
          <thead className="bg-[#A2CC8F] text-black">
            <tr>
              <th className="border border-[#70AD47] p-2 w-1/2">Pekerjaan</th>
              <th className="border border-[#70AD47] p-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {occupationData.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-[#70AD47] p-2 text-center">
                  {item.key}
                </td>
                <td className="border border-[#70AD47] p-2 text-center">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
