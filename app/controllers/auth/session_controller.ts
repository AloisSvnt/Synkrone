import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('Auth/Index')
  }

  /**
   * Display form to create a new record
   */
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password']);
    try {
      const user = await User.verifyCredentials(email, password);
      await auth.use('web').login(user);
      session.flash('success', 'Login successful');
      return response.redirect().toRoute('blocks.index');
    } catch (error) {
      session.flash('error', 'Invalid email or password');
      return response.redirect().toRoute('login.show');
    }
  }

  /**
   * Handle form submission for the create action
   */
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('Auth/Login')
  }

  /**
   * Show individual record
   */
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout();
    session.flash({ success: 'You have been logged out.' });
    response.redirect('/login');
  }

  /**
   * Edit individual record
   */
  async showRegister({ inertia }: HttpContext) {
    return inertia.render('Auth/Register')
  }

  /**
   * Handle form submission for the edit action
   */
  async registerUser({ request, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      await User.create({email, password})
      session.flash('success', 'Registration successful')
      return response.redirect().toRoute('login.show')
    } catch (error) {
      session.flash('error', 'Registration failed')
      return response.redirect().toRoute('register.show')
    }
  }

  /**
   * Delete record
   */
  async showForgotPassword({ inertia }: HttpContext) {
    return inertia.render('Auth/ForgotPassword')
  }
}