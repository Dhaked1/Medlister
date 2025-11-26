import React, { useState, useEffect, useRef } from "react";
import { X, Camera, MapPin, Ruler, Weight, Activity, User, Hash, Calendar } from "lucide-react";
import PatientActions from "./PatientActions";

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

interface PatientModalProps {
  patient: Patient;
  onClose: () => void;
  onPatientUpdated: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ patient, onClose, onPatientUpdated }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photo from local storage on mount
  useEffect(() => {
    const savedPhoto = localStorage.getItem(`patient_photo_${patient.id}`);
    if (savedPhoto) {
      setPhotoUrl(savedPhoto);
    } else {
      setPhotoUrl(null);
    }
  }, [patient.id]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoUrl(base64String);
        localStorage.setItem(`patient_photo_${patient.id}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-8">
          {/* Profile Header Section */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {photoUrl ? (
                  <img src={photoUrl} alt={patient.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-300" />
                )}
              </div>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                title="Change Photo"
              >
                <Camera size={16} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>

            {/* Name and Basic Info */}
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
              <h2 className="text-3xl font-bold text-gray-900">{patient.name}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2 text-gray-600">
                <span className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                  <Hash size={14} className="mr-1" /> {patient.id}
                </span>
                <span className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                  <MapPin size={14} className="mr-1" /> {patient.city}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 sm:mt-0">
              <PatientActions
                patient={patient}
                onClose={onClose}
                onPatientUpdated={onPatientUpdated}
              />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar size={18} className="mr-2 text-blue-500" />
                <span className="text-sm font-medium">Age & Gender</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {patient.age} Years <span className="text-gray-400">|</span> {patient.gender}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center text-gray-500 mb-2">
                <Ruler size={18} className="mr-2 text-green-500" />
                <span className="text-sm font-medium">Height</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{patient.height} m</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center text-gray-500 mb-2">
                <Weight size={18} className="mr-2 text-orange-500" />
                <span className="text-sm font-medium">Weight</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{patient.weight} kg</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow col-span-1 sm:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Activity size={18} className="mr-2 text-red-500" />
                    <span className="text-sm font-medium">BMI Status</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{patient.bmi?.toFixed(2)}</span>
                    <span className={`px-2 py-0.5 rounded text-sm font-medium ${patient.bmi_category === 'Normal' ? 'bg-green-100 text-green-800' :
                      patient.bmi_category === 'Overweight' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {patient.bmi_category}
                    </span>
                  </div>
                </div>
                {/* Visual BMI Indicator could go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
