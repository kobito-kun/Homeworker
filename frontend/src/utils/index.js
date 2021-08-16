export const CheckAuth = () => {
  return localStorage.getItem("token") !== null ? null : window.location.href = "/login";
}

export const loggedIn = () => {
  return localStorage.getItem("token") !== null ? window.location.href = "/dashboard" : null;
}

export const dateRead = (c) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(c).toLocaleDateString('us-EN', options);
  return date;
}