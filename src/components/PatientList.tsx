import React from "react";
import { useNavigate } from "react-router-dom";

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

interface PatientListProps {
  patients: Patient[];
  loading: boolean;
  onSelectPatient: (patient: Patient) => void; // Kept for compatibility but unused for navigation now
}

const PatientList: React.FC<PatientListProps> = ({ patients, loading }) => {
  const navigate = useNavigate();

  if (loading) return <div className="text-center col-span-full">Loading patients...</div>;
  if (patients.length === 0) return <div className="text-center col-span-full text-gray-500">No patients found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
      {patients.map((patient) => (
        <div
          key={patient.id}
          onClick={() => navigate(`/patient/${patient.id}`, { state: { patient } })}
          className="bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1 duration-200"
        >
          <h2 className="font-semibold text-lg text-gray-800">{patient.name}</h2>
          <p className="text-gray-500 text-sm">ID: {patient.id}</p>
          <div className="mt-2 flex items-center text-xs text-gray-400">
            <span>{patient.city}</span>
            <span className="mx-1">•</span>
            <span>{patient.age} yrs</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
