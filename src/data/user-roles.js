const userRoles = {
  Administrator: {
    canAccess: ["dashboard", "merchant", "outlet", "user"],
    canAdd: ["dashboard", "merchant", "outlet", "user"],
    canEdit: ["dashboard", "merchant", "outlet", "user"],
    canDelete: ["dashboard", "merchant", "outlet", "user"],
  },
};

export default userRoles;
