export function hasRequiredPermissions(userPermissions, requiredPermissions) {
  // Create a map to count the occurrences of actions for each resource
  const resourceActionMap = {};

  // Iterate over user permissions and aggregate actions for each resource
  userPermissions.forEach((permission) => {
    if (!resourceActionMap[permission.resource]) {
      resourceActionMap[permission.resource] = [];
    }
    resourceActionMap[permission.resource] = resourceActionMap[
      permission.resource
    ].concat(permission.actions);
  });

  // Check if the required permissions are met for each resource
  return requiredPermissions.every((required) => {
    const userActions = resourceActionMap[required.resource];

    if (!userActions) {
      return false; // Resource not found in user permissions
    }

    // Check if all required actions exist in the user actions (with required counts)
    return required.actions.every((action) => {
      const actionCountInUser = userActions.filter((a) => a === action).length;
      const actionCountInRequired = required.actions.filter(
        (a) => a === action,
      ).length;
      return actionCountInUser >= actionCountInRequired;
    });
  });
}

export function checkUserRoles(userRoles, requiredRoles) {
  // Extract role names from userRoles and create a Set to ensure uniqueness
  const userRoleNames = new Set(userRoles.map((role) => role.role.name));

  // Check if all required roles are in the user's role set
  return requiredRoles.every((role) => userRoleNames.has(role));
}
