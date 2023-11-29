const express = require('express');
const connection = require('./connection');
const jsonwebtoken = require('jsonwebtoken');
const {PRIVATE_KEY, tokenValited, user } = require('./auth.js');
 
const app = express();
 
app.use(express.json());
 
const Port = 3000;
 
app.listen(3000, () => { console.log(`Funcionando na porta ${Port}`) });
 
// Define uma rota GET para login
app.get('/login', (req, res) => {
    // Decodifica o cabeçalho de autorização para obter o email e a senha do usuário
    const [, hash] = req.headers.authorization?.split(' ') || [' ', ' '];
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
 
    try {
        // Verifica se o email e a senha estão corretos
        connection.query('SELECT nome, tipoUser FROM usuario WHERE nome = ? AND senha = ?', [email, password], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Erro ao executar a consulta SQL.');
          }
 
          // Se não houver resultados, a senha está incorreta
          if (results.length === 0) {
            return res.status(401).send('E-mail ou senha incorreta!');
          }
     
          // Imprime os resultados da consulta no console
          console.log('Resultados da consulta:', results);
     
          // Se a senha estiver correta, extrai os dados do resultado da consulta
          const { nome, tipoUser } = results[0];
     
          // Gera um token JWT
          const token = jsonwebtoken.sign(
            { user: { nome, tipoUser } },
            PRIVATE_KEY,
            { expiresIn: '60m' }
          );
     
          // Imprime a variável results junto com o token no console
          console.log('Variável results:', results);
     
          // Retorna o usuário, o token JWT e outros dados relevantes
          return res.status(200).json({
            data: {
              token,
              nome,
              tipoUser
            }
          });
        });
      } catch (error) {
        // Em caso de erro, imprime no console e retorna o erro
        console.log(error);
        return res.status(500).send('Erro interno do servidor.');
      }
     
   
});
 
// Middleware para validar o token em todas as rotas que vêm a seguir
app.use('*', tokenValited);
 
//--------------------------------------------------------------------------ALUNO----------------------------------------------------------------------

//Exibe Matriculas
app.get('/login/ExibeMatriculas', (req, res) => {
    connection.query('SELECT Matricula.id_matricula, Usuario.userID , Usuario.nome, Turma.id_turma, Turma.nome_turma FROM Matricula JOIN Usuario ON Matricula.id_aluno = Usuario.userID JOIN Turma ON Matricula.id_turma = Turma.id_turma ;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//Matricular
app.post('/login/Matricular', (req, res) => {
    const { userID, id_aluno, id_turma } = req.body;
    // Consultar o tipo do usuário no banco de dados
    connection.query('SELECT tipoUser FROM Usuario WHERE userID = ?', [userID], (err, results) => {
        if (err) {
            console.error('Erro ao consultar tipo do usuário:', err);
            return res.status(500).json({ error: 'Erro interno ao verificar permissão' });
        }

        if (results.length === 0) {
            // Se o usuário não foi encontrado, retorne um erro
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const tipoUsuario = results[0].tipoUser;

        if (tipoUsuario === 'aluno') {
            if(userID != id_aluno) {
                console.error('Erro userID diferente de id_aluno', err);
                return res.status(500).json({ error: 'Não é possivel cadastra userID diferente de id_aluno' });
            }
            // Se for aluno, execute a lógica de cadastro
            connection.query('INSERT INTO matricula (id_aluno,id_turma) VALUES (?, ?)', [id_aluno, id_turma], (err, results) => {
                if (err) {
                    console.error('Erro ao cadastrar turma:', err);
                    return res.status(500).json({ error: 'Matricula não realizada' });
                } else {
                    return res.status(200).json({ message: 'Matricula realizada' });
                }
            });
        } else {
            // Se não for admin, retorne um erro de permissão
            return res.status(403).json({ error: 'Permissão negada. Somente admin pode cadastrar turmas.' });
        }
    });
});  

//--------------------------------------------------------------------------ADMIN----------------------------------------------------------------------


//Exibe todas as turmas criadas
app.get('/login/Turmas', (req, res) => {
    connection.query('SELECT turma.nome_turma, turno.dia, disciplina.nome_disciplina, professor.nome_professor FROM turma JOIN turno ON turma.id_turno = turno.id_turno JOIN disciplina ON turma.id_disciplina = disciplina.id_disciplina JOIN professor ON turma.id_professor = professor.id_professor;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//Cadastra Turma
app.post('/login/CadastrarTurma', (req, res) => {
    const { nome_turma, id_turno, id_disciplina, id_professor,userID } = req.body;
    // Consultar o tipo do usuário no banco de dados
    connection.query('SELECT tipoUser FROM Usuario WHERE userID = ?', [userID], (err, results) => {
        if (err) {
            console.error('Erro ao consultar tipo do usuário:', err);
            return res.status(500).json({ error: 'Erro interno ao verificar permissão' });
        }

        if (results.length === 0) {
            // Se o usuário não foi encontrado, retorne um erro
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const tipoUsuario = results[0].tipoUser;

        if (tipoUsuario === 'admin') {
            // Se for admin, execute a lógica de cadastro
            connection.query('INSERT INTO turma (nome_turma, id_turno, id_disciplina, id_professor) VALUES (?, ?, ?, ?)', [nome_turma, id_turno, id_disciplina, id_professor], (err, results) => {
                if (err) {
                    console.error('Erro ao cadastrar turma:', err);
                    return res.status(500).json({ error: 'Turma não cadastrada' });
                } else {
                    return res.status(200).json({ message: 'Turma cadastrada com sucesso' });
                }
            });
        } else {
            // Se não for admin, retorne um erro de permissão
            return res.status(403).json({ error: 'Permissão negada. Somente admin pode cadastrar turmas.' });
        }
    });
});


//Deletar turma
app.post('/login/deletarTurma', (req, res) => {
    const { nome_turma,userID } = req.body;
    // Consultar o tipo do usuário no banco de dados
    connection.query('SELECT tipoUser FROM Usuario WHERE userID = ?', [userID], (err, results) => {
        if (err) {
            console.error('Erro ao consultar tipo do usuário:', err);
            return res.status(500).json({ error: 'Erro interno ao verificar permissão' });
        }

        if (results.length === 0) {
            // Se o usuário não foi encontrado, retorne um erro
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const tipoUsuario = results[0].tipoUser;

        if (tipoUsuario === 'admin') {
        
            connection.query("DELETE FROM turma WHERE nome_turma = ?", [nome_turma], (err, results) => {
                if (err) {
                    console.error('Erro ao cadastrar turma:', err);
                    return res.status(500).json({ error: 'Turma não foi excluída' });
                } else {
                    return res.status(200).json({ message: 'Turma excluída com sucesso' });
                }
            });
        } else {
            // Se não for admin, retorne um erro de permissão
            return res.status(403).json({ error: 'Permissão negada. Somente admin pode cadastrar turmas.' });
        }
    });
});

//Fim