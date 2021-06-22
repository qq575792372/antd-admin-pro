const getters = {
    // app
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
  // user
  token: state => state.user.token,
  name: state => state.user.name,
  // permission
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  sidebarRoutes: state => state.permission.sidebarRoutes
};
export default getters;
