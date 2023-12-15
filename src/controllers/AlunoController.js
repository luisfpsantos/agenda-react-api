import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll(
      {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      },
    );

    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((x) => x.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Faltando ID'] });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });

      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não existe'] });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((x) => x.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Faltando ID'] });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não existe'] });
      }

      await aluno.destroy();
      return res.status(204).json();
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((x) => x.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Faltando ID'] });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ['Aluno não existe'] });
      }

      const newAluno = await aluno.update(req.body);

      return res.json(newAluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((x) => x.message) });
    }
  }
}

export default new AlunoController();
