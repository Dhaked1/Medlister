# Meditrack Frontend

A modern, responsive React application for managing patient information with a clean and intuitive user interface. This frontend application provides comprehensive patient management capabilities including adding, viewing, editing, and deleting patient records.

## 🚀 Live Demo

Visit the live application: [Meditrack Frontend](https://satyam1120k.github.io/Meditrack_Frontend)

Visit the live API: [Meditrack API](https://meditrack-backend-murex.vercel.app)

Docs of API for testing: [API Docs](https://meditrack-backend-murex.vercel.app/docs)

## 📋 Features

- **User Authentication**: Secure login and signup system with protected routes
- **Patient Management**: Complete CRUD operations for patient records
- **Patient Profiles**: Detailed patient profile pages with photo uploads
- **Clinical Notes**: Add and manage clinical notes for each patient
- **Document Management**: Upload and manage patient documents and scans
- **Search Functionality**: Real-time search through patient names
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **BMI Calculation**: Automatic BMI calculation and categorization
- **Modal Views**: Detailed patient information in modal overlays
- **Slide Forms**: Smooth sliding forms for adding new patients
- **Real-time Updates**: Instant UI updates after operations
- **Local Storage**: Client-side storage for patient photos, notes, and documents

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.14
- **Icons**: Lucide React
- **Routing**: React Router DOM 7.9.6
- **HTTP Client**: Axios 1.13.2
- **Backend**: Python with FastAPI
- **Database**: Firebase
- **Frontend Deployment**: GitHub Pages
- **Backend Deployment**: Vercel
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── api/                 # API configuration
│   └── api.ts          # Axios instance and interceptors
├── components/          # Reusable UI components
│   ├── EditPatientForm.tsx    # Form for editing patient details
│   ├── PatientActions.tsx     # Action buttons (Edit/Delete)
│   ├── PatientForm.tsx        # Form for adding new patients
│   ├── PatientList.tsx        # Grid display of patient cards
│   ├── PatientModal.tsx       # Modal for viewing patient details
│   ├── PatientSlideForm.tsx   # Sliding form container
│   └── SearchBar.tsx          # Search input component
├── pages/               # Page components
│   ├── HomePage.tsx           # Main dashboard page
│   ├── Login.tsx              # User login page
│   ├── Signup.tsx             # User registration page
│   └── PatientProfile.tsx     # Detailed patient profile page
├── config.ts            # API configuration and URL building
├── App.tsx              # Root application component with routing
├── main.tsx             # Application entry point
├── index.css            # Global styles
└── App.css              # Component-specific styles
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/samir1120k/Meditrack_Frontend.git
   cd Meditrack_Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🔌 API Configuration

The application connects to a backend API for patient data management. The API configuration is centralized in `src/config.ts`:

- **Default API URL**: `https://meditrack-backend-murex.vercel.app`
- **Environment Variable**: `VITE_API_BASE_URL`
- **Runtime Override**: `window.__API_BASE_URL__`

### API Endpoints Used

Using FastAPI in backend to link with Firebase database.

**Authentication Endpoints:**

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

**Patient Management Endpoints:**

- `GET /patients/viewAll` - Fetch all patients
- `POST /patients/` - Create new patient
- `PUT /patients/update/{id}` - Update patient
- `DELETE /patients/delete/{id}` - Delete patient

## 🎨 User Interface

### Main Features

1. **Header Section**

   - Application title "Meditrack"
   - Search bar with real-time filtering

2. **Patient Grid**

   - Responsive card layout (1-3 columns based on screen size)
   - Patient name and ID display
   - Click to view detailed information

3. **Patient Modal**

   - Complete patient information display
   - BMI calculation and category
   - Edit and Delete action buttons

4. **Add Patient Form**

   - Sliding form from the right side
   - Form validation and error handling
   - Auto-calculation of BMI

5. **Edit Patient Form**

   - Modal overlay for editing
   - Pre-filled form with current data
   - ID field disabled (non-editable)

6. **Patient Profile Page**

   - Comprehensive patient information display
   - Photo upload and management
   - Clinical notes section with add/delete functionality
   - Document and scan uploads with preview
   - Local storage for patient-specific data

7. **Authentication Pages**
   - Login page with email/password authentication
   - Signup page for new user registration
   - Protected routes requiring authentication

### Patient Data Model

```typescript
interface Patient {
  id: string; // Unique patient identifier
  name: string; // Patient's full name
  age: number; // Age in years
  gender: string; // Male/Female/Other
  city: string; // City of residence
  height: number; // Height in centimeters
  weight: number; // Weight in kilograms
  bmi?: number; // Calculated BMI
  bmi_category?: string; // BMI category (Underweight/Normal/Overweight/Obese)
}
```

## 🔄 Application Workflow

### User Authentication

**Signing Up:**

1. Navigate to the signup page
2. Enter name, email, and password (minimum 6 characters)
3. Submit to create account
4. Automatically redirected to login page

**Logging In:**

1. Enter email and password
2. Upon successful authentication, user data is stored in localStorage
3. Redirected to the main dashboard (HomePage)
4. Protected routes are now accessible

### Adding a Patient

1. Click the "+" button (bottom-right corner)
2. Fill out the sliding form with patient details
3. Submit to create new patient record
4. Form closes and patient list refreshes

### Viewing Patient Details

**Quick View (Modal):**

1. Click on any patient card in the grid
2. Modal opens with complete patient information
3. View BMI calculation and category
4. Access edit/delete actions

**Detailed View (Profile Page):**

1. Click on any patient card in the grid
2. Navigate to full patient profile page
3. View comprehensive patient information
4. Access photo upload, clinical notes, and document management

### Managing Patient Profile

**Uploading Patient Photo:**

1. Navigate to patient profile page
2. Click camera icon on patient avatar
3. Select image file
4. Photo is saved to localStorage and displayed

**Adding Clinical Notes:**

1. Navigate to patient profile page
2. Type note in the text area
3. Click "+" button or press Enter
4. Note is saved with timestamp to localStorage

**Uploading Documents:**

1. Navigate to patient profile page
2. Click "Upload" button in Documents section
3. Select file (images or PDFs)
4. Document is saved to localStorage and displayed in grid

### Editing a Patient

1. Open patient modal or profile page
2. Click "Edit" button
3. Modify patient information in the edit form
4. Submit changes
5. Data refreshes automatically

### Deleting a Patient

1. Open patient modal or profile page
2. Click "Delete" button
3. Confirm deletion in browser dialog
4. Patient is removed and list refreshes

### Searching Patients

1. Type in the search bar (top-right)
2. Patient list filters in real-time
3. Search is case-insensitive and matches patient names

## 🎯 Key Components

### HomePage

- Main application container
- Manages patient state and API calls
- Handles search functionality
- Coordinates between components

### PatientList

- Displays patients in responsive grid
- Handles loading and empty states
- Click handlers for patient selection

### PatientModal

- Shows detailed patient information
- Integrates PatientActions component
- Click-outside-to-close functionality

### PatientForm

- Handles new patient creation
- Form validation and submission
- Auto-calculation of BMI

### EditPatientForm

- Modal form for patient updates
- Pre-populated with current data
- ID field protection

### PatientActions

- Edit and Delete buttons
- Confirmation dialogs
- API integration for operations

### Login

- Email and password authentication
- Error handling and validation
- Redirects to dashboard on success
- Link to signup page

### Signup

- User registration form
- Password validation (minimum 6 characters)
- Success/error messaging
- Auto-redirect to login after registration

### PatientProfile

- Comprehensive patient information display
- Photo upload with base64 encoding
- Clinical notes management (add/delete)
- Document upload and preview
- Local storage integration
- Navigation back to dashboard

## 🚀 Deployment

The application is configured for GitHub Pages deployment:

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

The `gh-pages` package handles the deployment process automatically.

**Note**: The application uses HashRouter (instead of BrowserRouter) to ensure proper routing on GitHub Pages, which doesn't support server-side routing.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url_here
```

### API Configuration

The application uses two API configuration files:

1. **`src/config.ts`**:

   - Centralized API URL configuration
   - Supports environment variables and runtime overrides
   - URL building utility functions

2. **`src/api/api.ts`**:
   - Axios instance with base URL configuration
   - Response interceptors for error handling
   - Default headers configuration

### Authentication & Storage

- **User Authentication**: Stored in `localStorage` as `user` key
- **Patient Photos**: Stored in `localStorage` as `patient_photo_{id}`
- **Clinical Notes**: Stored in `localStorage` as `patient_notes_{id}`
- **Documents**: Stored in `localStorage` as `patient_docs_{id}`

### Vite Configuration

The `vite.config.ts` includes:

- React plugin
- Tailwind CSS plugin
- GitHub Pages base path configuration (`/Meditrack_Frontend/`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Samir**

- GitHub: [@samir1120k](https://github.com/samir1120k)

## 🔐 Security Notes

- User authentication is handled via FastAPI backend
- Protected routes require valid user session in localStorage
- Patient data is stored in Firebase database
- Local storage is used for client-side features (photos, notes, documents)
- All API calls are made to the deployed backend on Vercel

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons provided by Lucide React
- Routing handled by React Router DOM
- HTTP requests managed with Axios
- Backend API built with FastAPI
- Deployed on GitHub Pages (Frontend) and Vercel (Backend)

---

For any questions or support, please open an issue on GitHub.
