// hooks/useRoleBadge.js

export const useRoleBadge = (role) => {
  const styles = {
    OrgAdmin: "bg-red-700 text-white",
    Manager: "bg-yellow-400 text-black",
    User: "bg-blue-600 text-white",
    SupportAgent: "bg-green-500 text-white",
    Custom: "bg-gray-500 text-white",
  };

  return styles[role] || "bg-zinc-400 text-white";
};
