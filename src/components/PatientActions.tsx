import React, { useState } from "react";
import { buildApiUrl } from "../config";
import { Edit, Trash2 } from "lucide-react";
import EditPatientForm from "./EditPatientForm";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  city: string;
  height: number;
  weight: number;
}

interface PatientActionsProps {
  patient: Patient;
  onClose: () => void;
  onPatientUpdated: () => void;
}

const PatientActions: React.FC<PatientActionsProps> = ({
  patient,
  onClose,
  onPatientUpdated,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
      const res = await fetch(buildApiUrl(`/patients/delete/${patient.id}`), {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete patient");

      alert("✅ Patient deleted successfully!");
      onPatientUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting patient");
    }
  };

  return (
    <div className="flex justify-end space-x-2 mt-4">
      <button
        onClick={() => setShowEdit(true)}
        className="flex items-center px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
      >
        <Edit size={16} className="mr-1" /> Edit
      </button>
      <button
        onClick={handleDelete}
        className="flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
      >
        <Trash2 size={16} className="mr-1" /> Delete
      </button>

      {showEdit && (
        <EditPatientForm
          patient={patient}
          onClose={() => setShowEdit(false)}
          onPatientUpdated={onPatientUpdated}
        />
      )}
    </div>
  );
};

export default PatientActions;
