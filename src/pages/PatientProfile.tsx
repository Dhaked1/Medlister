import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, Weight, Activity, User, Hash, Calendar, FileText, Image as ImageIcon, Plus, Trash2, Download } from "lucide-react";
import PatientActions from "../components/PatientActions";
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

interface Note {
    id: string;
    text: string;
    date: string;
}

interface Document {
    id: string;
    name: string;
    url: string;
    type: 'image' | 'other';
    date: string;
}

const PatientProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // Patient Data State
    const [patient, setPatient] = useState<Patient | null>(location.state?.patient || null);
    const [loading, setLoading] = useState(!patient);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    // Notes & Documents State
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState("");
    const [documents, setDocuments] = useState<Document[]>([]);

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    // Fetch Patient Data
    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) return;
            try {
                if (!patient) {
                    const res = await fetch(buildApiUrl("/patients/viewAll"));
                    const data = await res.json();
                    const foundPatient = Object.values(data.patients).find((p: any) => p.id === id) as Patient;
                    if (foundPatient) {
                        setPatient(foundPatient);
                    } else {
                        navigate("/");
                    }
                }
            } catch (err) {
                console.error("Failed to fetch patient", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id, patient, navigate]);

    // Load Local Storage Data (Photo, Notes, Documents)
    useEffect(() => {
        if (patient?.id) {
            // Load Photo
            const savedPhoto = localStorage.getItem(`patient_photo_${patient.id}`);
            setPhotoUrl(savedPhoto || null);

            // Load Notes
            const savedNotes = localStorage.getItem(`patient_notes_${patient.id}`);
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }

            // Load Documents
            const savedDocs = localStorage.getItem(`patient_docs_${patient.id}`);
            if (savedDocs) {
                setDocuments(JSON.parse(savedDocs));
            }
        }
    }, [patient?.id]);

    // Handlers
    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && patient) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPhotoUrl(base64String);
                localStorage.setItem(`patient_photo_${patient.id}`, base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddNote = () => {
        if (!newNote.trim() || !patient) return;

        const note: Note = {
            id: Date.now().toString(),
            text: newNote,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedNotes = [note, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem(`patient_notes_${patient.id}`, JSON.stringify(updatedNotes));
        setNewNote("");
    };

    const handleDeleteNote = (noteId: string) => {
        if (!patient) return;
        const updatedNotes = notes.filter(n => n.id !== noteId);
        setNotes(updatedNotes);
        localStorage.setItem(`patient_notes_${patient.id}`, JSON.stringify(updatedNotes));
    };

    const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && patient) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const newDoc: Document = {
                    id: Date.now().toString(),
                    name: file.name,
                    url: base64String,
                    type: file.type.startsWith('image/') ? 'image' : 'other',
                    date: new Date().toLocaleDateString()
                };

                const updatedDocs = [newDoc, ...documents];
                setDocuments(updatedDocs);
                localStorage.setItem(`patient_docs_${patient.id}`, JSON.stringify(updatedDocs));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteDoc = (docId: string) => {
        if (!patient) return;
        const updatedDocs = documents.filter(d => d.id !== docId);
        setDocuments(updatedDocs);
        localStorage.setItem(`patient_docs_${patient.id}`, JSON.stringify(updatedDocs));
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!patient) return <div className="min-h-screen flex items-center justify-center">Patient not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            {/* Header Background */}
            <div className="h-64 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute top-6 left-6">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
                {/* Main Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="relative flex flex-col md:flex-row items-center md:items-end mb-8">
                            {/* Avatar */}
                            <div className="relative group -mt-20 md:-mt-0 md:-mb-4 md:mr-8">
                                <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                    {photoUrl ? (
                                        <img src={photoUrl} alt={patient.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={80} className="text-gray-300" />
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-2 right-2 bg-blue-600 text-white p-2.5 rounded-full shadow-md hover:bg-blue-700 transition-colors border-2 border-white"
                                    title="Change Photo"
                                >
                                    <Camera size={18} />
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
                            <div className="mt-6 md:mt-0 text-center md:text-left flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{patient.name}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-gray-600">
                                    <span className="flex items-center text-sm bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                                        <Hash size={14} className="mr-1.5 text-gray-500" /> {patient.id}
                                    </span>
                                    <span className="flex items-center text-sm bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                                        <MapPin size={14} className="mr-1.5 text-gray-500" /> {patient.city}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 md:mt-0">
                                <PatientActions
                                    patient={patient}
                                    onClose={() => { }}
                                    onPatientUpdated={() => navigate(0)}
                                />
                            </div>
                        </div>

                        <hr className="border-gray-100 my-8" />

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 flex items-center">
                                <div className="p-3 bg-blue-100 rounded-lg mr-4 text-blue-600">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Age & Gender</p>
                                    <p className="text-lg font-semibold text-gray-900">{patient.age} Yrs / {patient.gender}</p>
                                </div>
                            </div>
                            <div className="bg-green-50/50 p-5 rounded-xl border border-green-100 flex items-center">
                                <div className="p-3 bg-green-100 rounded-lg mr-4 text-green-600">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Physical Stats</p>
                                    <p className="text-lg font-semibold text-gray-900">{patient.height}m / {patient.weight}kg</p>
                                </div>
                            </div>
                            <div className="bg-purple-50/50 p-5 rounded-xl border border-purple-100 flex items-center">
                                <div className="p-3 bg-purple-100 rounded-lg mr-4 text-purple-600">
                                    <Weight size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">BMI</p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-gray-900 mr-2">{patient.bmi?.toFixed(2)}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${patient.bmi_category === 'Normal' ? 'bg-green-100 text-green-700' :
                                            patient.bmi_category === 'Overweight' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {patient.bmi_category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid: Notes & Documents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Clinical Notes Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-indigo-100 rounded-lg mr-3 text-indigo-600">
                                    <FileText size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Clinical Notes</h3>
                            </div>
                            <span className="text-sm text-gray-500">{notes.length} notes</span>
                        </div>

                        {/* Notes List */}
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
                            {notes.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                                    <FileText size={48} className="mb-2 opacity-20" />
                                    <p>No notes added yet</p>
                                </div>
                            ) : (
                                notes.map(note => (
                                    <div key={note.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 group hover:border-indigo-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-medium text-gray-400">{note.date}</span>
                                            <button
                                                onClick={() => handleDeleteNote(note.id)}
                                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{note.text}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add Note Input */}
                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex gap-2">
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Type a new clinical note..."
                                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm bg-gray-50 focus:bg-white transition-colors"
                                    rows={2}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleAddNote();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleAddNote}
                                    disabled={!newNote.trim()}
                                    className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Documents & Images Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 rounded-lg mr-3 text-orange-600">
                                    <ImageIcon size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Documents & Scans</h3>
                            </div>
                            <button
                                onClick={() => docInputRef.current?.click()}
                                className="text-sm bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors font-medium flex items-center"
                            >
                                <Plus size={16} className="mr-1" /> Upload
                            </button>
                            <input
                                type="file"
                                ref={docInputRef}
                                className="hidden"
                                accept="image/*,.pdf" // Limiting to images for now as we use FileReader for base64
                                onChange={handleDocUpload}
                            />
                        </div>

                        {/* Documents Grid */}
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {documents.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                                    <ImageIcon size={48} className="mb-2 opacity-20" />
                                    <p>No documents uploaded</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {documents.map(doc => (
                                        <div key={doc.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                                            {doc.type === 'image' ? (
                                                <img src={doc.url} alt={doc.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                                                    <FileText size={32} />
                                                </div>
                                            )}

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                                <p className="text-white text-xs truncate mb-2">{doc.name}</p>
                                                <div className="flex justify-between">
                                                    <a
                                                        href={doc.url}
                                                        download={doc.name}
                                                        className="text-white hover:text-blue-200"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteDoc(doc.id);
                                                        }}
                                                        className="text-white hover:text-red-200"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
