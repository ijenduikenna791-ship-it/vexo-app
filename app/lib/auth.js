const USERS_KEY = "vexo_users";
const SESSION_KEY = "vexo_session";
const ADMIN_SESSION_KEY = "vexo_admin_session";
const ADMIN_EMAIL = "admin@vexo.com";
const ADMIN_PASSWORD = "admin123";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function getUsers() {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(USERS_KEY)) || [];
}

export function signup({ name, email, password }) {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "An account with this email already exists." };
  }
  const newUser = { name, email, password };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
  return { success: true };
}

export function login({ email, password }) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
  return { success: true };
}

export function getSession() {
  if (typeof window === "undefined") return null;
  return safeParse(localStorage.getItem(SESSION_KEY));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function adminLogin({ email, password }) {
  if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email }));
    return { success: true };
  }
  return { success: false, error: "Invalid admin credentials." };
}

export function getAdminSession() {
  if (typeof window === "undefined") return null;
  return safeParse(localStorage.getItem(ADMIN_SESSION_KEY));
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
