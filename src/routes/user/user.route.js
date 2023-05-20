import * as userController from './user.controller'
export default (route) => {
    route.post("/user/login", userController.login);
    route.post("/user/register", userController.register)

}