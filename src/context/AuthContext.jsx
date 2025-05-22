import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // for route protection

const login = async () => {
  try {
    setAuthLoading(true);
    const result = await signInWithPopup(auth, provider);
    const userInfo = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    };
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    toast.success("✅ Logged in successfully");
  } catch (err) {
    console.error("Login failed:", err);
    toast.error("❌ Login failed");
  } finally {
    setAuthLoading(false);
  }
};

const logout = async () => {
  try {
    setAuthLoading(true);
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    toast.info("👋 Logged out");
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error("❌ Logout failed");
  } finally {
    setAuthLoading(false);
  }
};


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthLoading(false);
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
