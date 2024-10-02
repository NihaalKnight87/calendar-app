/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import CompanyLogo from '../assets/icons/logo.png';
import IconLogoH from '../assets/icons/IconsLogo_h.png';
import IconLogoV from '../assets/icons/IconsLogo_v.png';

function NavBar() {
  return (
    <nav>
        <div className='navTopBar dropAnim_Nav'>
            <img src={CompanyLogo} alt="Company Logo" />
            <img src={IconLogoH} alt="Icon Logo H" />
        </div>
        <div className='navLeftSideBar dropAnim_NavSide'>
            <img src={IconLogoV} alt="Icon Logo V" />
        </div>
    </nav>
  )
}
export default NavBar;