import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function Statements() {
  const [statements, setStatements] = useState([]);
  const [newStatement, setNewStatement] = useState("");
  const [newVariable, setNewVariable] = useState("");

  useEffect(() => {
    fetchStatements();
  }, []);

  const fetchStatements = async () => {
    const { data, error } = await supabase
      .from("statements")
      .select("*")
      .order("order", { ascending: true });
    if (error) {
      console.error("Error fetching statements:", error);
    } else {
      setStatements(data);
    }
  };

  const addStatement = async () => {
    const { data: maxOrderData, error: maxOrderError } = await supabase
      .from("statements")
      .select("order")
      .order("order", { ascending: false })
      .limit(1);
    if (maxOrderError) {
      console.error("Error fetching statements order:", maxOrderError);
      return;
    }

    const maxOrder = maxOrderData.length > 0 ? maxOrderData[0].order : 0;
    const newOrder = maxOrder + 1;

    const { data, error } = await supabase
      .from("statements")
      .insert([
        { statement: newStatement, variable: newVariable, order: newOrder },
      ]);
    if (error) {
      console.error("Error adding statement:", error);
    } else {
      setStatements([...statements, data[0]]);
      setNewStatement("");
      setNewVariable("");
    }
  };

  const deleteStatement = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus pernyataan ini?"
    );

    if (confirmed) {
      const { error } = await supabase.from("statements").delete().eq("id", id);
      if (error) {
        console.error("Error deleting statement:", error);
      } else {
        fetchStatements();
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl md:text-3xl text-green-500 font-semibold mb-4 md:mb-8">
        Daftar Pernyataan
      </h2>
      <div className="w-full flex flex-row md:flex-row justify-between md:justify-end items-center mb-4">
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            value={newStatement}
            onChange={(e) => setNewStatement(e.target.value)}
            placeholder="Pernyataan baru"
            className="p-2 border border-gray-300 bg-gray-100 rounded mb-2 md:mb-0 md:mr-4"
          />
          <select
            value={newVariable}
            onChange={(e) => setNewVariable(e.target.value)}
            className="p-2 border border-gray-300 bg-gray-100 rounded mb-2 md:mb-0 md:mr-4"
          >
            <option value="">Pilih</option>
            <option value="Useful">Useful</option>
            <option value="Usable">Usable</option>
            <option value="Findable">Findable</option>
            <option value="Credible">Credible</option>
            <option value="Desirable">Desirable</option>
            <option value="Accessible">Accessible</option>
            <option value="Valuable">Valuable</option>
          </select>
        </div>
        <button
          onClick={addStatement}
          className="bg-green-500 text-white py-2 px-4 rounded self-end"
        >
          Tambah
        </button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="border border-gray-300 p-2">No</th>
            <th className="border border-gray-300 p-2">Pernyataan</th>
            <th className="border border-gray-300 p-2">Variabel</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {statements.map((statement, index) => (
            <tr key={statement.id} className="even:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2">
                {statement.statement}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {statement.variable}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => deleteStatement(statement.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Statements;
