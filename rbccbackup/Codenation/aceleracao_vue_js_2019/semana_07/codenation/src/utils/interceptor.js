import routes from '@/routes';

export default config => {
  if (location.pathname != "/login") {
    try {
      const auth = localStorage.getItem("state");
      const { access_token } = JSON.parse(auth).login.oauth;
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    } catch {
      routes.push({name: "login"});
    }
  }
  return config;
};
