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
  const funcionario = funcionarios.find((func) => func.id === id);
  if (funcionario) {
    funcionario.horasTrabalhadas.push(horasTrabalhadas);
  }
};

const calcularSalarioMensal = (funcionario) => {
  const totalHoras = funcionario.horasTrabalhadas.reduce(
    (total, hora) => total + hora,
    0
  );
  return totalHoras * funcionario.taxaHoraria;
};

function calcularInss(funcionario) {
  const salarioBruto = calcularSalarioMensal(funcionario);

  const faixas = [
    { limite: 1412.0, aliquota: 7.5 },
    { limite: 2666.68, aliquota: 9 },
    { limite: 4000.03, aliquota: 12 },
    { limite: Infinity, aliquota: 14 },
  ];
  const tetoInss = 908.85;

  let inss = 0;
  for (let faixa of faixas) {
    if (salarioBruto <= faixa.limite) {
      inss = (salarioBruto * faixa.aliquota) / 100;
      break;
    }
  }

  return Math.min(inss, tetoInss);
}
