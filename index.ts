import PromptSync from "prompt-sync";
import Funcionario from "./classes/Funcionario";

const prompt = PromptSync()

const listaFuncionarios: Funcionario[] = []

function adicionarFuncionario(nome: string, cargo: string, taxaHoraria: number):void {
    let funcionario = new Funcionario(nome, cargo, taxaHoraria)

    listaFuncionarios.push(funcionario)
    console.log("Funcionário adicionado com sucesso!")
}

function exibirLista():void {
    console.log("-------- LISTA DE FUNCIONÁRIOS ---------- \n");

    listaFuncionarios.map((func) => {
        func.exibirInformacoes()
    })
}

function gerarRelatorioPagamento(): void{
    console.log("-------- RELATÓRIO DE PAGAMENTOS ---------- \n");

    listaFuncionarios.map((func) => {
        console.log(`Nome: ${func.nome}`)
        console.log(`Cargo: ${func.cargo}`)
        console.log(`Total de horas trabalhadas: ${func.calcularTotalHoras()}`)
        console.log(`Valor do INSS: R$ ${func.calcularInss().toFixed(2)}`)
        console.log(`Salário bruto: R$ ${func.calcularSalarioMensal().toFixed(2)}`)
        console.log(`Salário líquido: R$ ${(func.calcularSalarioMensal() - func.calcularInss()).toFixed(2)}`)
        console.log("---------------- \n")
    })
}

function gerenciarFolhaPagamento(): void {
    function exibirMenu(): void {
        console.log("\n--- Sistema de Folha de Pagamento ---");
        console.log("1 - Adicionar Funcionário");
        console.log("2 - Registrar Horas Trabalhadas");
        console.log("3 - Exibir lista de funcionários");
        console.log("4 - Exibir Relatório de Pagamento");
        console.log("5 - Sair");
    }

    let opcao;

    do {
        exibirMenu();
        opcao = prompt("Digite a opção desejada: ");
        switch (opcao) {
            case "1":
                let nome = prompt("Digite o nome do funcionário: ");
                let cargo = prompt("Digite o cargo do funcionário: ");
                let taxaHoraria = Number(prompt("Digite a taxa horária do funcionário: "));

                adicionarFuncionario(nome, cargo, taxaHoraria);
                break;

            case "2":
                let idFuncionario = prompt("Digite o id do funcionário: ");
                let numHoras = Number(prompt("Digite o número de horas trabalhadas: "));

                let funcionarioExiste = false

                listaFuncionarios.map(func => {
                    if(func.id == idFuncionario){
                        func.registrarHoras(numHoras);
                        funcionarioExiste = true
                    }
                })

                if(!funcionarioExiste){
                    console.log(`O funcionário com id ${idFuncionario} não existe`)
                }
                break;

            case "3":
                exibirLista()
                break;

            case "4":
                gerarRelatorioPagamento();
                break;

            case "5":
                console.log("Saindo do sistema...");
                break;

            default:
                console.log("Opção inválida!");
        }
    } while (opcao != "5");
}

gerenciarFolhaPagamento();