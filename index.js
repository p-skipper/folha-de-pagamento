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

const registrarHoras = (id, horasTrabalhadas) => {
  const funcionario = funcionarios.find(func => func.id === id);
  if (funcionario) {
    funcionario.horasTrabalhadas.push(horasTrabalhadas);
  }
};

function calcularSalarioMensal(funcionario) {
  const totalHoras = funcionario.horasTrabalhadas.reduce((total, hora) => total + hora, 0);
  return totalHoras * funcionario.taxaHoraria;
}