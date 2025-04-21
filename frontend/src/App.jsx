import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = () => {
    fetch('http://localhost:3333/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Erro ao carregar usuários:", err));
  };

  const cadastrarUsuario = (e) => {
    e.preventDefault();

    const name = document.getElementById('nameUser').value.trim();
    const email = document.getElementById('emailUser').value.trim();
    const senha = document.getElementById('passwordUser').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    fetch('http://localhost:3333/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, senha })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        document.getElementById('nameUser').value = '';
        document.getElementById('emailUser').value = '';
        document.getElementById('passwordUser').value = '';
        carregarUsuarios();
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao cadastrar usuário.");
      });
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div>
      <form>
        <h2>Cadastro de usuários</h2>

        <div className="input-group">
          <label htmlFor="nameUser">Nome do usuário</label>
          <input type="text" id="nameUser" />
        </div>

        <br />

        <div className="input-group">
          <label htmlFor="emailUser">E-mail do usuário</label>
          <input type="text" id="emailUser" />
        </div>

        <br />

        <div className="input-group">
          <label htmlFor="passwordUser">Senha do usuário</label>
          <input type="text" id="passwordUser" />
        </div>

        <br />

        <button onClick={cadastrarUsuario}>Cadastrar</button>
      </form>

      <hr />

      <h2>Usuários cadastrados</h2>
      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado ainda.</p>
      ) : (
        <ul>
          {usuarios.map((user, index) => (
            <li key={index}>
              Nome: {user.name}
              <br /><br />
              E-mail: {user.email}
              
              <br /><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;