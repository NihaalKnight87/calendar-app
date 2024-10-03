/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import './custom-css/App.css'
import NavBar from './components/NavBar.jsx';
import CalSection from './components/CalSection.jsx';
import SyncfusionLicenceHacking from './components/SyncfusionLicenceHacking.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavBar />
      <CalSection />
      {/* <SyncfusionLicenceHacking /> */}
      <ToastContainer />
    </>
  )
}
export default App;