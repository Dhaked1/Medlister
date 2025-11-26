import React, { useState, useEffect, useRef } from "react";
import { buildApiUrl } from "../config";

interface PatientInfo {
  id: string;
  name: string;
  age: number;
  gender: string;
  city: string;
  height: number;
  weight: number;
}

interface PatientFormProps {
  onPatientAdded: () => void;
  onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({
  onPatientAdded,
  onClose,
}) => {
  const [patient, setPatient] = useState<PatientInfo>({
    id: "",
    name: "",
    age: 0,
    gender: "Male",
    city: "",
    height: 0,
    weight: 0,
  });
  const [loading, setLoading] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  // Close form when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: ["age", "height", "weight"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = buildApiUrl("/patients/");
      console.log("Submitting to:", url);
      console.log("Patient data:", patient);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });

      console.log("Response status:", response.status);
      const responseData = await response.text();
      console.log("Response data:", responseData);

      if (!response.ok) {
        let errorMsg = "Failed to submit patient info";
        try {
          const errorData = JSON.parse(responseData);
          errorMsg = errorData.detail || errorData.message || errorMsg;
        } catch {
          errorMsg = `${errorMsg} (Status: ${response.status})`;
        }
        throw new Error(errorMsg);
      }

      alert("✅ Patient added successfully!");
      setPatient({
        id: "",
        name: "",
        age: 0,
        gender: "Male",
        city: "",
        height: 0,
        weight: 0,
      });
      onPatientAdded();
      onClose();
    } catch (error: any) {
      console.error("Full error:", error);
      const errorMessage = error.message || "Error submitting patient info";
      alert(`❌ ${errorMessage}\n\nCheck the browser console (F12) for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={panelRef}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300"
    >
      <div className="p-6 flex flex-col h-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center border-b pb-2">
          Add Patient
        </h2>

        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          {["id", "name", "age", "city", "height", "weight"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 text-sm mb-1 capitalize">
                {field === "id"
                  ? "Patient ID"
                  : field === "height"
                    ? "Height (cm)"
                    : field === "weight"
                      ? "Weight (kg)"
                      : field}
              </label>
              <input
                type={
                  ["age", "height", "weight"].includes(field)
                    ? "number"
                    : "text"
                }
                name={field}
                value={(patient as any)[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Gender</label>
            <select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
