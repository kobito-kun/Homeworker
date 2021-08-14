export const CheckAuth = () => {
  return localStorage.getItem("token") !== null ? null : window.location.href = "/login"
}