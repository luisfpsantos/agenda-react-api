import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      const errorMsg = { errors: e.errors.map((err) => err.message) };
      return res.status(400).json(errorMsg);
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(500).json();
    }
  }

  // Show
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const { id: userId, nome, email } = user;

      return res.json({ id: userId, nome, email });
    } catch (e) {
      return res.status(500).json();
    }
  }

  // Update
  async update(req, res) {
    try {
      const { userId } = req;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuario não existe'],
        });
      }

      const newUser = await user.update(req.body);
      const { id, nome, email } = newUser;

      return res.json({ id, nome, email });
    } catch (e) {
      const errorMsg = { errors: e.errors.map((err) => err.message) };
      return res.status(500).json(errorMsg);
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const { userId } = req;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuario não existe'],
        });
      }

      await user.destroy();

      return res.status(204).json();
    } catch (e) {
      const errorMsg = { errors: e.errors.map((err) => err.message) };
      return res.status(500).json(errorMsg);
    }
  }
}

export default new UserController();
