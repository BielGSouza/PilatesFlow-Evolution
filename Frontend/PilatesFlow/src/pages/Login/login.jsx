import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './login.css'
import api from "../../services/api";

import MensagemErro from "../../components/mensagemErro.jsx";

function Login() {
    useEffect(() => {
        document.title = "Login - PilatesFlow";
    }, [])

    const [login, setLogin] = useState("CartaoLogin")
    const [senhaVisivel, setSenhaVisivel] = useState(false)
    const [mensagemErro, setMensagemErro] = useState("");

    //Função para cadastrar um usuário
    const inputNomeRef = useRef();
    const inputEmailRef = useRef();
    const inputSenhaRef = useRef();
    const inputTelefoneRef = useRef();

    const navigate = useNavigate();

    const cadastrarUsuario = async () => {
        try {
            const nome = inputNomeRef.current.value;
            const email = inputEmailRef.current.value;
            const senha = inputSenhaRef.current.value;
            const telefone = inputTelefoneRef.current.value;

            if (!nome || !email || !senha || !telefone) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            await api.post('/login/cadastrar', { nome, email, senha, telefone })

            inputNomeRef.current.value = "";
            inputEmailRef.current.value = "";
            inputSenhaRef.current.value = "";
            inputTelefoneRef.current.value = "";

            alert("Usuário cadastrado com sucesso!");
            setLogin("CartaoLogin")
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("Email já cadastrado. Por favor, utilize outro email.");
            } else {
                alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
                console.error(error);
            }
        }
    }

    const logarUsuario = async () => {
        try {
            const email = inputEmailRef.current.value;
            const senha = inputSenhaRef.current.value;

            if (!email || !senha) {
                setMensagemErro("Por favor, preencha todos os campos.");
                return;
            }

            const resposta = await api.post('/login/logar', { email, senha })
            const { token } = resposta.data;

            if (token) {
                localStorage.setItem('token', token)
                navigate('/menu');
            } else {
                alert("Erro ao fazer login. Por favor, tente novamente.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Credenciais inválidas. Por favor, verifique seu email e senha.");
            } else if (error.response && error.response.status === 404) {
                alert("Erro ao fazer login. Usuário não encontrado.");
                console.error(error);
            }
        }
    }

    const selecionarCartao = (qualBotao) => {
        console.log(qualBotao)
        if (qualBotao === "cadastro") {
            setLogin("CartaoCadastro")
        } else if (qualBotao === "login") {
            setLogin("CartaoLogin")
        }
    }

    const verSenha = () => {
        setSenhaVisivel(!senhaVisivel)
    }

    return (
        <>
            {login === "CartaoLogin" && (
                <div className="HeaderLogin">
                    <div className="colunaUm">
                        <p>De Volta</p>
                        <h1>Bem Vindo!</h1>
                        <h2 style={{ marginBottom: '20px' }}>PilatesFlow Evolution</h2>
                        <button onClick={e => selecionarCartao("cadastro")}>cadastrar-se</button>
                    </div>
                    <div className="colunaDois">
                        <form action="">
                            <h2>Login</h2>

                            <label htmlFor="inputEmail">Email:</label>
                            <input type="email" id="inputEmail" placeholder="Digite seu email" ref={inputEmailRef} />

                            <label htmlFor="inputPassword">Senha:</label>
                            <input type={senhaVisivel ? "text" : "password"} id="inputPassword" placeholder="Digite sua senha" ref={inputSenhaRef} />
                            <div className="verSenhaContainer">
                                <input type="checkbox" id="verSenhaCheckbox" onChange={verSenha} />
                            </div>

                            <button type="button" onClick={logarUsuario}>Entrar</button>
                            <MensagemErro mensagem={mensagemErro} />
                        </form>
                    </div>
                </div>
            )}

            {login === "CartaoCadastro" && (
                <div className="HeaderCadastro">
                    <div className="colunaDoisCadastro">
                        <form action="" className="formColunaDois">
                            <h2>Cadastro</h2>

                            <label htmlFor="inputNome">Nome:</label>
                            <input type="text" id="inputNome" placeholder="Digite seu nome" ref={inputNomeRef} />

                            <label htmlFor="inputEmail">Email:</label>
                            <input type="email" id="inputEmail" placeholder="Digite seu email" ref={inputEmailRef} />

                            <label htmlFor="inputPassword">Senha:</label>
                            <input type={senhaVisivel ? "text" : "password"} id="inputPassword" placeholder="Digite sua senha" ref={inputSenhaRef} />
                            <div className="verSenhaContainerDois">
                                <input type="checkbox" id="verSenhaCheckbox" onChange={verSenha} />
                            </div>

                            <label htmlFor="inputTelefone">Telefone:</label>
                            <input type="text" id="inputTelefone" placeholder="Digite seu telefone" maxLength={15} ref={inputTelefoneRef} />

                            <button type="button" onClick={cadastrarUsuario}>Cadastrar</button>
                        </form>
                    </div>
                    <div className="colunaUmCadastro">
                        <h1>Bem Vindo!</h1>
                        <h2 style={{ marginBottom: '20px' }}>PilatesFlow Evolution</h2>
                        <button onClick={e => selecionarCartao("login")}>Logar-se</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login