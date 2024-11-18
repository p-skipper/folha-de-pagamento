const funcionarios = [];

const adicionarFuncionario = (id, nome, cargo, taxaHoraria) => {
  const funcionario = {
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

function gerarRelatorioPagamento() {

  console.log("\n--- Relatório de Pagamento ---\n");
  funcionarios.forEach((func) => {
    const totalHoras = func.horasTrabalhadas.reduce((acc, hora) => acc + hora, 0);

    const salarioBruto = calcularSalarioMensal(func);
    const inss = calcularInss(func);
    const salarioLiquido = salarioBruto - inss;

    console.log(`Nome: ${func.nome}`);
    console.log(`Cargo: ${func.cargo}`);
    console.log(`Total de Horas: ${totalHoras}`);
    console.log(`Valor do INSS: R$ ${inss.toFixed(2)}`);
    console.log(`Salário Bruto: R$ ${salarioBruto.toFixed(2)}`);
    console.log(`Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`);
    console.log('-------------------------');
  });
}

function gerenciarFolhaPagamento() {
  const prompt = require("prompt-sync")();

  function exibirMenu() {
    console.log("\n--- Sistema de Folha de Pagamento ---");
    console.log("1 - Adicionar Funcionário");
    console.log("2 - Registrar Horas Trabalhadas");
    console.log("3 - Exibir Relatório de Pagamento");
    console.log("4 - Sair");
  }

  let opcao;

  do {
    exibirMenu();
    opcao = prompt("Digite a opção desejada: ");
    switch (opcao) {
      case "1":
        const id = Number(prompt("Digite o id do funcionário: "));
        const nome = prompt("Digite o nome do funcionário: ");
        const cargo = prompt("Digite o cargo do funcionário: ");
        const taxaHoraria = Number(prompt("Digite a taxa horária do funcionário: "));

        adicionarFuncionario(id, nome, cargo, taxaHoraria);
        console.log("Funcionário adicionado com sucesso.");
        break;

      case "2":
        const idFuncionario = Number(prompt("Digite o id do funcionário: "));
        const numHoras = Number(prompt("Digite o número de horas trabalhadas: "));

        registrarHoras(idFuncionario, numHoras);
        console.log("Horas registradas com sucesso.");
        break;

      case "3":
        gerarRelatorioPagamento();
        break;

      case "4":
        console.log("Saindo do sistema...");
        break;

      default:
        console.log("Opção inválida! Tente novamente.");
    }
  } while (opcao != "4");
}

gerenciarFolhaPagamento();
