import Login from './components/user/Login';
import Register from './components/user/Register';
import TaskManager from './components/tasks/TaskManager';

export default [
    {
      path: '/login*',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/tasks/:id',
      component: TaskManager
    },
    {
      path: '*',
      redirect: '/login'
    }
];

