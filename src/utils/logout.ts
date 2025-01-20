import { NavigateFunction } from 'react-router-dom';

/**
 * Logs out the user by clearing localStorage, resetting states, and navigating to the login page.
 * @param navigate - The navigation function from react-router-dom.
 * @param setLoggedIn - (Optional) A state updater function to set the login state.
 * @param setIsProfileOpen - (Optional) A state updater function to close profile-related UI elements.
 */
export const logout = (
  navigate: NavigateFunction,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> | null = null,
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>> | null = null
) => {
  localStorage.clear(); // Clear all data from localStorage
  if (setLoggedIn) setLoggedIn(false); // Update logged-in state
  if (setIsProfileOpen) setIsProfileOpen(false); // Close profile menu if applicable
  navigate('/login'); // Redirect to the login page
};