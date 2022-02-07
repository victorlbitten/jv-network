import { AfterContentInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterContentInit {

  constructor() { }

  nodes = [
    {
        "id": "1",
        "name": "José Victor",
        "group": "Ator",
        "fragment": "Polímata baçônico"
    },
    {
        "id": "2",
        "name": "Relógio da torre da Matriz do Bação",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "3",
        "name": "Relógio da Feira Permanente de Amostras",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "4",
        "name": "Relógio de Belo Vale",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "5",
        "name": "Relógio da casa de José Victor",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "6",
        "name": "Tijolos",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "7",
        "name": "Escultura do Cemitério",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "8",
        "name": "Pia de Batismo",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "9",
        "name": "Escultura de Anjos",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "10",
        "name": "Máquina de Voar",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "11",
        "name": "Casa de José Victor",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "12",
        "name": "Adro da Matriz",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "13",
        "name": "Matriz do Bação",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "14",
        "name": "Construção da Matriz do Bação",
        "group": "Evento",
        "fragment": ""
    },
    {
        "id": "15",
        "name": "Padre Antônio Cândido",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "16",
        "name": "Mudança de Freguesia",
        "group": "Evento",
        "fragment": ""
    },
    {
        "id": "17",
        "name": "Missão de Padres do Caraça",
        "group": "Evento",
        "fragment": ""
    },
    {
        "id": "18",
        "name": "Itabira do Campo",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "19",
        "name": "Vila Rica",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "20",
        "name": "Padre Bernardo",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "21",
        "name": "Belo Horizonte",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "22",
        "name": "Belo Vale",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "23",
        "name": "Zé Relojoeiro",
        "group": "Ator",
        "fragment": "A notícia da genialidade de José Victor a produzir um relógio para a torre com engrenagens produzidas com pregos e madeira correu a região. Ela chegou aos ouvidos de Zé Relojoeiro — primeiro relojoeiro de Itabirito e um de seus serviços era a manutenção do relógio da Igreja São Sebastião — que logo se interessou por conhecer tal obra de engenharia.\nZé Relojoeiro tratou de reunir sua família, a mulher que estava grávida de seu (primeiro) filho, sua irmã (ou cunhada?) — que só visitou o Bação naquela vez em 70 anos de vida — e foram (como?) para a Matriz de São Gonçalo do Bação visitar o tão falado relógio.\nO próprio Zé Relojoeiro era meio inventor, então, chegando lá, ele ficou tão encantado com o funcionamento do relógio. Pois, ele funcionava com pesos de cimento e rodas de madeira rodeadas por pregos que rodavam um dentro do outro como uma engrenagem. Além disso, tinha os ponteiros feitos com pedras semi-preciosas.\nSendo assim, o relojoeiro ficou encantado e perguntou aos moradores do Bação mais sobre o tal inventor. Eles lhe contaram sobre a máquina voadora de José Victor, outra história que também marcou a memória de Zé Relojoeiro. Por conta de seu interesse e respeito a esse curioso personagem do Bação, Zé Relojoeiro decidiu que chamaria seu filho de José Victor em homenagem ao inventor Baçônico."
    },
    {
        "id": "24",
        "name": "Layla",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "25",
        "name": "Adilson",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "26",
        "name": "D. Divina",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "27",
        "name": "Neymer",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "28",
        "name": "Dr. Senna",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "29",
        "name": "Reportagem Estado de Minas",
        "group": "Documento",
        "fragment": ""
    },
    {
        "id": "30",
        "name": "Relógio ou reportagem na Alemanha",
        "group": "Documento",
        "fragment": ""
    },
    {
        "id": "31",
        "name": "Casa Flusser",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "32",
        "name": "Jaber",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "33",
        "name": "Cemitério do Bação",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "34",
        "name": "Bação",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "35",
        "name": "Valdecir",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "36",
        "name": "Livro de Tombos",
        "group": "Documento",
        "fragment": ""
    },
    {
        "id": "37",
        "name": "Mariana",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "38",
        "name": "D. Lia",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "39",
        "name": "Dolores",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "40",
        "name": "Voo do 14-bis",
        "group": "Evento",
        "fragment": ""
    },
    {
        "id": "41",
        "name": "Pedreira (checar nome)",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "42",
        "name": "Grupo de Teatro do Bação",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "43",
        "name": "José Bastos Bittencourt",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "44",
        "name": "Capsula do Tempo",
        "group": "Documento",
        "fragment": ""
    },
    {
        "id": "45",
        "name": "Itabirito",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "46",
        "name": "Música",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "47",
        "name": "Casa da Banda",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "48",
        "name": "Totonho",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "49",
        "name": "Vânia",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "50",
        "name": "Rio de Janeiro",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "51",
        "name": "Seu Benjamin",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "52",
        "name": "Grupo de Seresteiros",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "53",
        "name": "Semana Santa",
        "group": "Evento",
        "fragment": ""
    },
    {
        "id": "54",
        "name": "Relato da viagem",
        "group": "Documento",
        "fragment": "clicar em viagem e aparecer opções de texto -> viagem astral, viagem com extraterrestres"
    },
    {
        "id": "55",
        "name": "Comércios na R. das Pimentas",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "56",
        "name": "Marilene",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "57",
        "name": "Estrada de Ferro Central do Brasil",
        "group": "Ator",
        "fragment": "é um ator???"
    },
    {
        "id": "58",
        "name": "Agostinho Rodrigues",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "59",
        "name": "Luiz Cheffer",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "60",
        "name": "Ilariano Malta",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "61",
        "name": "Estação Engenheiro Correa",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "62",
        "name": "Declaração da República",
        "group": "Evento",
        "fragment": ""
    },
    {
        "id": "63",
        "name": "Padre Frederico",
        "group": "Ator",
        "fragment": ""
    },
    {
        "id": "64",
        "name": "Colégio Arnaldo",
        "group": "Local",
        "fragment": ""
    },
    {
        "id": "65",
        "name": "Inscrições",
        "group": "Produção",
        "fragment": ""
    },
    {
        "id": "66",
        "name": "Livro de Tombos",
        "group": "Documento",
        "fragment": ""
    },
    {
        "id": "67",
        "name": "Bolsa",
        "group": "Evento",
        "fragment": ""
    },
    {
        "id": "68",
        "name": "muros de pedra",
        "group": "Local",
        "fragment": ""
    }
];

links = [
  {
      "source": "José Victor",
      "target": "Relógio da torre da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Relógio da Feira Permanente de Amostras",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Relógio de Belo Vale",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Relógio da casa de José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Tijolos",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Escultura do Cemitério",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Pia de Batismo",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Escultura de Anjos",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Máquina de Voar",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Casa de José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Adro da Matriz",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Construção da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Construção da Matriz do Bação",
      "target": "Padre Antônio Cândido",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Padre Bernardo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Zé Relojoeiro",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Layla",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Adilson",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "D. Divina",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Neymer",
      "class": "Relato de primeira mão",
      "strength": "10"
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Dr. Senna",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da torre da Matriz do Bação",
      "target": "Relógio ou reportagem na Alemanha",
      "class": "",
      "strength": ""
  },
  {
      "source": "Zé Relojoeiro",
      "target": "Belo Vale",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Zé Relojoeiro",
      "target": "Zé Relojoeiro",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Dr. Senna",
      "target": "Reportagem Estado de Minas",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da Feira Permanente de Amostras",
      "target": "Belo Horizonte",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio de Belo Vale",
      "target": "Belo Vale",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio da casa de José Victor",
      "target": "D. Divina",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Tijolos",
      "target": "Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Tijolos",
      "target": "Casa de José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Tijolos",
      "target": "D. Divina",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Tijolos",
      "target": "Casa Flusser",
      "class": "",
      "strength": ""
  },
  {
      "source": "Tijolos",
      "target": "Jaber",
      "class": "",
      "strength": ""
  },
  {
      "source": "Escultura do Cemitério",
      "target": "Padre Antônio Cândido",
      "class": "",
      "strength": ""
  },
  {
      "source": "Escultura do Cemitério",
      "target": "Valdecir",
      "class": "",
      "strength": ""
  },
  {
      "source": "Padre Antônio Cândido",
      "target": "Casa Flusser",
      "class": "",
      "strength": ""
  },
  {
      "source": "Pia de Batismo",
      "target": "Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Pia de Batismo",
      "target": "Livro de Tombos",
      "class": "",
      "strength": ""
  },
  {
      "source": "Escultura de Anjos",
      "target": "Casa de José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Escultura de Anjos",
      "target": "Mariana",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "Padre Antônio Cândido",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "Adilson",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "Jaber",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "Valdecir",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "D. Lia",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "Dolores",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "Voo do 14-bis",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "Casa Flusser",
      "class": "",
      "strength": ""
  },
  {
      "source": "Máquina de Voar",
      "target": "D. Divina",
      "class": "",
      "strength": ""
  },
  {
      "source": "D. Divina",
      "target": "Dolores",
      "class": "",
      "strength": ""
  },
  {
      "source": "Casa de José Victor",
      "target": "D. Divina",
      "class": "",
      "strength": ""
  },
  {
      "source": "Casa de José Victor",
      "target": "Jaber",
      "class": "",
      "strength": ""
  },
  {
      "source": "Casa de José Victor",
      "target": "Valdecir",
      "class": "",
      "strength": ""
  },
  {
      "source": "Adro da Matriz",
      "target": "Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Adro da Matriz",
      "target": "Construção da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Adro da Matriz",
      "target": "Padre Antônio Cândido",
      "class": "",
      "strength": ""
  },
  {
      "source": "Adro da Matriz",
      "target": "Padre Bernardo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Adro da Matriz",
      "target": "Valdecir",
      "class": "",
      "strength": ""
  },
  {
      "source": "Adro da Matriz",
      "target": "Livro de Tombos",
      "class": "",
      "strength": ""
  },
  {
      "source": "Adro da Matriz",
      "target": "D. Divina",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Adro da Matriz",
      "target": "Pedreira (checar nome)",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Pedreira (checar nome)",
      "target": "D. Divina",
      "class": "Relato de segunda mão",
      "strength": "5"
  },
  {
      "source": "Adro da Matriz",
      "target": "Grupo de Teatro do Bação",
      "class": "Relato de primeira mão",
      "strength": "10"
  },
  {
      "source": "Construção da Matriz do Bação",
      "target": "Missão de Padres do Caraça",
      "class": "",
      "strength": ""
  },
  {
      "source": "Escultura do Cemitério",
      "target": "Cemitério do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Vila Rica",
      "target": "Dr. Senna",
      "class": "",
      "strength": ""
  },
  {
      "source": "Pia de Batismo",
      "target": "Valdecir",
      "class": "",
      "strength": ""
  },
  {
      "source": "Construção da Matriz do Bação",
      "target": "Mudança de Freguesia",
      "class": "",
      "strength": ""
  },
  {
      "source": "Mudança de Freguesia",
      "target": "Itabira do Campo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Bação",
      "target": "Construção da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Bastos Bittencourt",
      "target": "José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Bastos Bittencourt",
      "target": "Itabirito",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Bastos Bittencourt",
      "target": "Capsula do Tempo",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Bastos Bittencourt",
      "target": "Música",
      "class": "",
      "strength": ""
  },
  {
      "source": "Música",
      "target": "Casa da Banda",
      "class": "",
      "strength": ""
  },
  {
      "source": "Casa da Banda",
      "target": "Totonho",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Música",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Totonho",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Capsula do Tempo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Capsula do Tempo",
      "target": "Vânia",
      "class": "Relato de primeira mão",
      "strength": ""
  },
  {
      "source": "Vânia",
      "target": "D. Divina",
      "class": "",
      "strength": ""
  },
  {
      "source": "Dolores",
      "target": "D. Divina",
      "class": "",
      "strength": ""
  },
  {
      "source": "Dolores",
      "target": "Rio de Janeiro",
      "class": "",
      "strength": ""
  },
  {
      "source": "Dolores",
      "target": "Vânia",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Dolores",
      "class": "",
      "strength": ""
  },
  {
      "source": "Casa da Banda",
      "target": "Padre Bernardo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Padre Bernardo",
      "target": "Grupo de Seresteiros",
      "class": "",
      "strength": ""
  },
  {
      "source": "Semana Santa",
      "target": "Grupo de Teatro do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Semana Santa",
      "target": "Padre Bernardo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Semana Santa",
      "target": "Padre Antônio Cândido",
      "class": "",
      "strength": ""
  },
  {
      "source": "Vânia",
      "target": "Dr. Senna",
      "class": "Relato de segunda mão",
      "strength": ""
  },
  {
      "source": "Seu Benjamin",
      "target": "Dolores",
      "class": "",
      "strength": ""
  },
  {
      "source": "Seu Benjamin",
      "target": "D. Divina",
      "class": "",
      "strength": ""
  },
  {
      "source": "Seu Benjamin",
      "target": "Rio de Janeiro",
      "class": "",
      "strength": ""
  },
  {
      "source": "Seu Benjamin",
      "target": "José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Seu Benjamin",
      "target": "Casa de José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Seu Benjamin",
      "target": "Comércios na R. das Pimentas",
      "class": "",
      "strength": ""
  },
  {
      "source": "Comércios na R. das Pimentas",
      "target": "Marilene",
      "class": "",
      "strength": ""
  },
  {
      "source": "José Victor",
      "target": "Relato da viagem",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relato da viagem",
      "target": "Marilene",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relato da viagem",
      "target": "Jaber",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relato da viagem",
      "target": "Valdecir",
      "class": "",
      "strength": ""
  },
  {
      "source": "Zé Relojoeiro",
      "target": "Layla",
      "class": "",
      "strength": ""
  },
  {
      "source": "Zé Relojoeiro",
      "target": "Adilson",
      "class": "",
      "strength": ""
  },
  {
      "source": "Zé Relojoeiro",
      "target": "Itabirito",
      "class": "",
      "strength": ""
  },
  {
      "source": "Estrada de Ferro Central do Brasil",
      "target": "Seu Benjamin",
      "class": "",
      "strength": ""
  },
  {
      "source": "Estrada de Ferro Central do Brasil",
      "target": "Rio de Janeiro",
      "class": "",
      "strength": ""
  },
  {
      "source": "Estrada de Ferro Central do Brasil",
      "target": "Belo Horizonte",
      "class": "",
      "strength": ""
  },
  {
      "source": "Estrada de Ferro Central do Brasil",
      "target": "Vânia",
      "class": "Relato de segunda mão",
      "strength": ""
  },
  {
      "source": "Música",
      "target": "Padre Bernardo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Música",
      "target": "Totonho",
      "class": "",
      "strength": ""
  },
  {
      "source": "Música",
      "target": "D. Lia",
      "class": "",
      "strength": ""
  },
  {
      "source": "D. Lia",
      "target": "José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Agostinho Rodrigues",
      "target": "Itabirito",
      "class": "",
      "strength": ""
  },
  {
      "source": "Agostinho Rodrigues",
      "target": "José Bastos Bittencourt",
      "class": "",
      "strength": ""
  },
  {
      "source": "Agostinho Rodrigues",
      "target": "Música",
      "class": "",
      "strength": ""
  },
  {
      "source": "Agostinho Rodrigues",
      "target": "José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Grupo de Teatro do Bação",
      "target": "Marilene",
      "class": "",
      "strength": ""
  },
  {
      "source": "Grupo de Teatro do Bação",
      "target": "Semana Santa",
      "class": "",
      "strength": ""
  },
  {
      "source": "Relógio de Belo Vale",
      "target": "D. Divina",
      "class": "",
      "strength": ""
  },
  {
      "source": "Construção da Matriz do Bação",
      "target": "Luiz Cheffer",
      "class": "",
      "strength": ""
  },
  {
      "source": "Construção da Matriz do Bação",
      "target": "Ilariano Malta",
      "class": "",
      "strength": ""
  },
  {
      "source": "Construção da Matriz do Bação",
      "target": "D. Divina",
      "class": "Relato de segunda mão",
      "strength": ""
  },
  {
      "source": "Padre Bernardo",
      "target": "Padre Antônio Cândido",
      "class": "",
      "strength": ""
  },
  {
      "source": "Padre Antônio Cândido",
      "target": "Pedreira (checar nome)",
      "class": "",
      "strength": ""
  },
  {
      "source": "Ilariano Malta",
      "target": "Seu Benjamin",
      "class": "",
      "strength": ""
  },
  {
      "source": "Luiz Cheffer",
      "target": "Seu Benjamin",
      "class": "",
      "strength": ""
  },
  {
      "source": "Marilene",
      "target": "Jaber",
      "class": "",
      "strength": ""
  },
  {
      "source": "D. Lia",
      "target": "Totonho",
      "class": "",
      "strength": ""
  },
  {
      "source": "Comércios na R. das Pimentas",
      "target": "Rio de Janeiro",
      "class": "",
      "strength": ""
  },
  {
      "source": "Estação Engenheiro Correa",
      "target": "Estrada de Ferro Central do Brasil",
      "class": "",
      "strength": ""
  },
  {
      "source": "Declaração da República",
      "target": "Rio de Janeiro",
      "class": "",
      "strength": ""
  },
  {
      "source": "Ilariano Malta",
      "target": "D. Divina",
      "class": "",
      "strength": ""
  },
  {
      "source": "Ilariano Malta",
      "target": "Livro de Tombos",
      "class": "",
      "strength": ""
  },
  {
      "source": "Ilariano Malta",
      "target": "Construção da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Padre Frederico",
      "target": "Construção da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Padre Frederico",
      "target": "Colégio Arnaldo",
      "class": "",
      "strength": ""
  },
  {
      "source": "Colégio Arnaldo",
      "target": "Belo Horizonte",
      "class": "",
      "strength": ""
  },
  {
      "source": "Padre Frederico",
      "target": "Luiz Cheffer",
      "class": "",
      "strength": ""
  },
  {
      "source": "Inscrições",
      "target": "José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Inscrições",
      "target": "Construção da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "Inscrições",
      "target": "Adro da Matriz",
      "class": "",
      "strength": ""
  },
  {
      "source": "Estrada de Ferro Central do Brasil",
      "target": "Construção da Matriz do Bação",
      "class": "",
      "strength": ""
  },
  {
      "source": "D. Divina",
      "target": "Padre Bernardo",
      "class": "",
      "strength": ""
  },
  {
      "source": "D. Divina",
      "target": "Casa da Banda",
      "class": "",
      "strength": ""
  },
  {
      "source": "Dr. Senna",
      "target": "Bolsa",
      "class": "",
      "strength": ""
  },
  {
      "source": "Bolsa",
      "target": "José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "Dr. Senna",
      "target": "José Victor",
      "class": "",
      "strength": ""
  },
  {
      "source": "muros de pedra",
      "target": "Adro da Matriz",
      "class": "",
      "strength": ""
  }
];

height:any;
width:any;

linkStrength = 0.001;
nodeRadius = 4;
svg:any;

simulation: any;
nodeElements: any;
linkElements: any;
textElements: any

  ngAfterContentInit(): void {
    this.initSvg();
    this.createSimulation();
    this.createNetworkElements();
    this.setNetworkTicks();

    this.simulation.force('link').links(this.links);
  }

  initSvg () {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.svg = d3
      .select('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  createSimulation () {
    this.simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(-35))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('link', d3.forceLink()
          .id((link: any) => {
            return link.name;
            })
          .strength(link => 0.01));
  }

  createNetworkElements () {
    this.nodeElements = this.svg.append('g')
    .selectAll('circle')
    .data(this.nodes)
    .enter().append('circle')
        .attr('r', this.nodeRadius)
        .attr('fill', '#aaa')
        .on("click", (node:any) => this.onNodeClick(node));

    this.linkElements = this.svg.append('g')
    .selectAll('line')
    .data(this.links)
    .enter().append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#aaf');

    this.textElements = this.svg.append('g')
    .selectAll('text')
    .data(this.nodes)
    .enter().append('text')
        .text((node:any) => node.name)
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4);
  }

  onNodeClick (node: any) {
    console.log(node);
  }

  setNetworkTicks () {
      console.log(this.simulation);
    this.simulation.nodes(this.nodes).on('tick', () => {
      this.nodeElements
        .attr('cx', (node: any) => node.x)
        .attr('cy', (node: any) => node.y);
  
      this.textElements
          .attr('x', (node: any) => node.x)
          .attr('y', (node: any) => node.y);
  
      this.linkElements
          .attr('x1', (link: any) => link.source.x)
          .attr('y1', (link: any) => link.source.y)
          .attr('x2', (link: any) => link.target.x)
          .attr('y2', (link: any) => link.target.y)
    })
  }

}
