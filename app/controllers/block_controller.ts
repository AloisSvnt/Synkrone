import type { HttpContext } from '@adonisjs/core/http'
import Block from '#models/block'

export default class BlockController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const blocks = await Block.query().preload('user').orderBy('createdAt', 'desc');
    return inertia.render('Blocks/Index', { blocks });
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('Blocks/Create');
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const data = request.only(['title', 'description', 'sharedWithId', 'date', 'startTime', 'endTime']);
    await Block.create(data);

    session.flash('success', 'Block created successfully');
    return response.redirect().toRoute('blocks.index');
  }

  /**
   * Show individual record
   */
  async show({ params, response, inertia }: HttpContext) {
    const block = await Block.query()
      .where('id', params.id)
      .preload('user')
      .firstOrFail();

    return block ? inertia.render('Blocks/Show', { block }) : response.status(404).send('Block not found');
  }

  /**
   * Edit individual record
   */
  async edit({ params, response, inertia }: HttpContext) {
    const block = Block.query()
      .where('id', params.id)
      .preload('user')
      .firstOrFail();

    return inertia.render('Blocks/Edit', { block }) || response.status(404).send('Block not found');
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    if (!params || !params.id) {
      return response.status(400).send('Bad request')
    }
    const block = await Block.query()
      .where('id', params.id)
      .firstOrFail();
    const data = request.only(['title', 'description', 'sharedWithId', 'date', 'startTime', 'endTime']);

    block.merge(data);
    await block.save();

    session.flash('success', 'Block updated successfully');
    return response.redirect().toRoute('blocks.show', { id: block.id });
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    const block = await Block.query()
      .where('id', params.id)
      .firstOrFail();
    if (!block) {
      return response.status(404).send('Block not found');
    }
    await block.delete();
    session.flash('success', 'Block deleted successfully');
    return response.redirect().toRoute('blocks.index');
  }
}