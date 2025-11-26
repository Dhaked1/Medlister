import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import SearchBar from "../components/SearchBar";
import PatientList from "../components/PatientList";
import PatientModal from "../components/PatientModal";
import PatientSlideForm from "../components/PatientSlideForm";
import { buildApiUrl } from "../config";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  city: string;
  height: number;
  weight: number;
  bmi?: number;
  bmi_category?: string;
}

const HomePage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch(buildApiUrl("/patients/viewAll"));
      const data = await res.json();
      setPatients(Object.values(data.patients) as Patient[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans relative">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Meditrack</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>

      <PatientList
        patients={filteredPatients}
        loading={loading}
        onSelectPatient={setSelectedPatient}
      />

      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onPatientUpdated={fetchPatients}
        />
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition"
        >
          <Plus size={24} />
        </button>
      )}

      <PatientSlideForm
        showForm={showForm}
        onClose={() => setShowForm(false)}
        onPatientAdded={fetchPatients}
      />
    </div>
  );
};

export default HomePage;
