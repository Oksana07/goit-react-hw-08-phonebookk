export const getUserName = state => state.auth.user.name;
export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;
export const getAuthError = state => state.auth.error;
