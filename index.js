const funcionarios = [];

const adicionarFuncionario = (id, nome, cargo, taxaHoraria) => {
  let funcionario = {
    id,
    nome,
    cargo,
    taxaHoraria,
    horasTrabalhadas: [],
  };

  funcionarios.push(funcionario);
};