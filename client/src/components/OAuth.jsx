import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles click event for Google sign-in button.
   * Initiates Google sign-in process and dispatches signInSuccess action upon success.
   */
  const handleGoogleClick = async () => {
    try {
      // Initialize GoogleAuthProvider and getAuth instance
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Trigger Google sign-in popup and get sign-in result
      const result = await signInWithPopup(auth, provider);

      // Send user data to the server for authentication and user creation
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      // Dispatch signInSuccess action upon successful sign-in
      const data = await res.json();
      dispatch(signInSuccess(data));

      // Redirect to home page after successful sign-in
      navigate("/");
    } catch (error) {
      // Log error message if Google sign-in fails
      console.log("Could not sign in with Google:", error);
    }
  };

  // Render Google sign-in button
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
