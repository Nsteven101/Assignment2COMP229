import { signout } from "./api-auth.js";

const auth = {
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return false;

    try {
      return JSON.parse(jwt); // { token, user: { ... } }
    } catch (err) {
      console.error("Failed to parse JWT from sessionStorage", err);
      return false;
    }
  },

  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
    cb(); // optional callback
  },

  isAdmin() {
    const session = this.isAuthenticated();
    return session && session.user && session.user.role === "admin";
  },

  clearJWT(cb) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("jwt");
    }

    cb?.(); // safely call callback if defined

    signout().then(() => {
      // Expire cookie manually
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
