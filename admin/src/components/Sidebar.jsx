import { BarChart3, Package, Users } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col" data-testid="sidebar">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Product Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  data-testid={`sidebar-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900 mb-1">Need Help?</p>
          <p className="text-xs text-gray-600">Check our documentation for guides and tutorials.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;