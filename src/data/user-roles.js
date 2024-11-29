const userRoles = {
  Administrator: {
    canAccess: ["dashboard", "merchant", "outlet"],
    canAdd: ["dashboard", "merchant", "outlet"],
    canEdit: ["dashboard", "merchant", "outlet"],
    canDelete: ["dashboard", "merchant", "outlet"],
  },
};

export default userRoles;
