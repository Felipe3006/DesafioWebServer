
*Projeto de Desenvolvimento de Sistema de Matrículas para Instituição de Ensino*

Este projeto visa criar um sistema robusto de gerenciamento acadêmico para uma instituição de ensino, inspirado no ambiente da Unisinos.
O escopo abrange a construção do back-end utilizando as tecnologias e conhecimentos adquiridos durante o curso.

*Arquitetura e Tecnologias Utilizadas:*

O back-end do sistema foi desenvolvido utilizando Node.js, uma plataforma baseada em JavaScript que permite a construção de aplicações escaláveis e eficientes. 
Para a comunicação entre o front-end (não desenvolvido neste projeto) e o back-end, optamos por uma arquitetura de API REST, proporcionando flexibilidade e facilidade na integração com diferentes interfaces de usuário.

O banco de dados escolhido foi o MySQL, amplamente utilizado em sistemas de gerenciamento acadêmico devido à sua confiabilidade e desempenho. 
A estrutura do banco de dados foi projetada para suportar as principais entidades do sistema, como: turmas, usuario, professores , disciplinas, turno e matricula.

*Funcionalidades Implementadas:*

*1 - Autenticação e Autorização:*

O sistema inclui um sólido processo de autenticação e autorização, garantindo que apenas usuários autorizados tenham acesso às funcionalidades específicas.
A segurança é uma prioridade, considerando a sensibilidade das informações acadêmicas.

*2 - Gerenciamento de Turmas:*

Os administradores podem criar, visualizar e gerenciar turmas, especificando detalhes como turno e dia da semana. Cada turma é composta por alunos, professores e uma disciplina.

*Matrículas:*

Os alunos têm a capacidade de se matricular nas turmas disponíveis. O sistema valida a elegibilidade do aluno para a matrícula, considerando requisitos específicos.

*Ferramentas de Desenvolvimento e Testes:*

*Node.js:* Utilizado para criar a lógica do back-end do sistema.

*Express.js:* Framework para facilitar a construção de APIs REST eficientes.

*MySQL:* Banco de dados relacional para armazenar e recuperar dados de maneira eficiente.

*Postman:* Utilizado para testar as operações da API, garantindo a correta implementação e funcionamento.

*Observações Importantes:*

1 - O projeto concentrou-se exclusivamente no desenvolvimento do back-end, sem a implementação de um front-end. Isso foi feito para simplificar o escopo do projeto, focando nos aspectos fundamentais do sistema.

2 - O sistema foi extensivamente testado utilizando o Postman, garantindo que as operações da API respondam corretamente e atendam aos requisitos estabelecidos.

3 - A utilização do MySQL como banco de dados assegura a confiabilidade e escalabilidade necessárias para um ambiente acadêmico.

4 - Esse projeto exemplifica a aplicação prática dos conhecimentos adquiridos durante o curso, proporcionando uma solução sólida e eficiente para a gestão acadêmica de uma instituição de ensino.
