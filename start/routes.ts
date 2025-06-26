/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BlockController = () => import('#controllers/block_controller');
const sessionController = () => import('#controllers/auth/session_controller');
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

router.on('/').renderInertia('home')

router
  .group(() => {
    router.get('/login', [sessionController, 'showLogin']).as('login.show');
    router.post('/login', [sessionController, 'login']).as('login');
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/logout', [sessionController, 'logout']).as('logout');
    router.get('/register', [sessionController, 'showRegister']).as('register.show');
    router.post('/register', [sessionController, 'registerUser']).as('register');
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/blocks', [BlockController, 'index']).as('blocks.index');
    router.get('/blocks/create', [BlockController, 'create']).as('blocks.create');
    router.post('/blocks', [BlockController, 'store']).as('blocks.store');
    router.get('/blocks/:id', [BlockController, 'show']).as('blocks.show');
    router.get('/blocks/:id/edit', [BlockController, 'edit']).as('blocks.edit');
    router.put('/blocks/:id', [BlockController, 'update']).as('blocks.update');
    router.delete('/blocks/:id', [BlockController, 'destroy']).as('blocks.destroy');
  })
  .use(middleware.auth()) 
