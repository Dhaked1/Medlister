import React from "react";
import PatientForm from "./PatientForm";

interface PatientSlideFormProps {
  showForm: boolean;
  onClose: () => void;
  onPatientAdded: () => void;
}

const PatientSlideForm: React.FC<PatientSlideFormProps> = ({ showForm, onClose, onPatientAdded }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        showForm ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {showForm && (
        <PatientForm
          onPatientAdded={onPatientAdded}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default PatientSlideForm;
