import React, { useState } from "react";
import { buildApiUrl } from "../config";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  city: string;
  height: number;
  weight: number;
}

interface EditPatientFormProps {
  patient: Patient;
  onClose: () => void;
  onPatientUpdated: () => void;
}

const EditPatientForm: React.FC<EditPatientFormProps> = ({
  patient,
  onClose,
  onPatientUpdated,
}) => {
  const [formData, setFormData] = useState<Patient>({ ...patient });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["age", "height", "weight"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(buildApiUrl(`/patients/update/${patient.id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update patient");

      alert("✅ Patient updated successfully!");
      onPatientUpdated(); // refresh the patient list
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error updating patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-2xl w-80 space-y-3"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Edit Patient
        </h2>

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
                ["age", "height", "weight"].includes(field) ? "number" : "text"
              }
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={field === "id"} // ID should not be editable
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 text-sm mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

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
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientForm;
