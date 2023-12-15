import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Luis',
      sobrenome: 'Santos',
      email: 'luis@email.com',
      idade: 24,
      peso: 90,
      altura: 1.70,
    });

    res.json({
      novoAluno,
    });
  }
}

export default new HomeController();
