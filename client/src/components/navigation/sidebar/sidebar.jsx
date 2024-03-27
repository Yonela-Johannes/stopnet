import SidebarContent from './sidebar-content';
import SidebarIcons from './sidebar-icons';
 
const Sidebar = (props) => {
  
  return (
    <div className="sidebar flex float-left bg-red-600">
      <SidebarIcons />
      <SidebarContent />
    </div>
  );
}
 
export default Sidebar;
