import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function Dashboard() {
  const [respondentCount, setRespondentCount] = useState(0);
  const [statementCount, setStatementCount] = useState(0);

  useEffect(() => {
    fetchCounts();
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
      <h2 className="w-full text-center mt-10 font-semibold text-3xl">
        Selamat Datang di EvalUX-Grab
      </h2>
      <div className="mt-6 flex justify-center">
        <h3 className="p-2 text-center bg-[#92D050]">
          Pilih menu di bagian kiri untuk memulai kegiatanmu!
        </h3>
      </div>
    </div>
  );
}

export default Dashboard;
