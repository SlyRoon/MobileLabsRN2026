import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  function login(email, password) {
    if (!email.trim() || !password.trim()) {
      return { ok: false, message: 'Заповніть email і пароль.' };
    }

    setUser({ name: 'Користувач', email });
    setIsAuthenticated(true);
    return { ok: true };
  }

  function register(email, password, name) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { ok: false, message: 'Заповніть всі поля.' };
    }

    if (password.length < 4) {
      return { ok: false, message: 'Пароль має містити мінімум 4 символи.' };
    }

    setUser({ name, email });
    setIsAuthenticated(true);
    return { ok: true };
  }

  function logout() {
    setUser(null);
    setIsAuthenticated(false);
  }

  const value = useMemo(
    () => ({ isAuthenticated, user, login, register, logout }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth потрібно використовувати всередині AuthProvider');
  }

  return context;
}
