import httpClient from "@/lib/httpClient";

export const setSession = (token: string) => {
  if (token) {
    localStorage.setItem("accessToken", token);
    httpClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};

export const clearSession = () => {
  localStorage.removeItem("accessToken");
  delete httpClient.defaults.headers["Authorization"];
};
