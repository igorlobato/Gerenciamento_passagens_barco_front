# Sistema de Gerenciamento de Passagens de Barco - Frontend

## Descrição
- O Sistema de Gerenciamento de Passagens de Barco - Frontend é a interface de usuário para o sistema de gerenciamento de passagens, construída com React e Vite. Este frontend integra-se ao backend Laravel via uma API RESTful, oferecendo uma experiência segura e fluida para registro, login, autenticação em dois fatores (2FA) e gerenciamento de passagens. O foco está na aplicação dos princípios de segurança da informação: Autenticidade, Confidencialidade, Não Repúdio, Integridade e Disponibilidade (esta não foi usada devido ao ambiente local).

## Desenvolvedor
- Igor Lobato de Oliveira

## Funcionalidades de Segurança
## 1. Autenticidade
- Validação de Formato de E-mail e Senha: Os formulários de registro (src/components/Register.jsx) e login (src/components/Login.jsx) validam o formato do e-mail (usando regex para garantir conformidade) e a senha (mínimo de 8 caracteres), garantindo que apenas dados válidos sejam enviados ao backend.

- Verificação de Conta Ativa: O componente src/components/Dashboard.jsx verifica se a conta do usuário está ativa, exibindo uma mensagem caso não, usando a rota /users/{id} para validar o status da conta, reforçando a autenticidade do usuário.

- Autenticação em Dois Fatores (2FA): Após o login, o componente Login.jsx exibe um formulário para inserção do código 2FA enviado por e-mail, garantindo que apenas usuários legítimos acessem o sistema.

- reCAPTCHA: Após 5 tentativas de login mal-sucedidas, um reCAPTCHA é exibido no formulário de login, protegendo contra tentativas automatizadas de força bruta.

## 2. Confidencialidade
- HTTPS no Frontend: O frontend é servido via HTTPS (https://localhost:3000) usando certificados gerados pelo mkcert, garantindo que as comunicações entre o navegador e o servidor Vite sejam criptografadas.

- Proxy Seguro para o Backend: As requisições para a API (/api) são encaminhadas ao backend Laravel (https://localhost) via proxy configurado no vite.config.js. A opção secure: false é usada para contornar certificados autossinados do backend (gerados por ryoluo/sail-ssl).

## 3. Não Repúdio
- Visualização dos Logs: Todas as ações do usuário no frontend são registradas no backend por meio do middleware LogActivity, garantindo rastreabilidade das ações.

## 4. Integridade
- Validação de Entrada no Frontend: Os formulários de registro e login validam os dados antes de enviar ao backend, usando verificações de formato (e-mail, senha, cpf, número) e exibindo mensagens de erro claras para entradas inválidas.

- Verificação de Token JWT: O componente PrivateRoute valida o token JWT antes de permitir acesso a rotas protegidas, garantindo que apenas tokens válidos sejam usados.
Estrutura do Projeto

## Arquivos Principais:
- src/components/Login.jsx: Interface de login com validação de e-mail, senha e suporte a 2FA e reCAPTCHA.
- src/components/Register.jsx: Interface de registro com validação de e-mail e senha.
- src/components/Dashboard.jsx: Painel que verifica se a conta do usuário está ativa antes de exibir conteúdo protegido.
- src/components/PrivateRoute.jsx: Componente de roteamento protegido que valida o token JWT antes de conceder acesso.
- src/services/authService.js: Serviço para comunicação com a API (login, verificação 2FA, obtenção de dados do usuário).
- src/services/adminService.js: Serviço para comunicação de funções de administrador.
vite.config.js: Configuração do Vite para HTTPS com certificados mkcert e proxy para o backend.

## Pré-requisitos
- Node.js
- npm: Para instalar dependências do React.
- mkcert: Para gerar certificados HTTPS confiáveis.
- Git: Para clonar o repositório.
- Backend Configurado: O backend Laravel (repositório Gerenciamento_passagens_barco) deve estar rodando em https://localhost com Laravel Sail e ryoluo/sail-ssl.

## Instalação e Configuração

- 1. Clonar o Repositório

git clone https://github.com/igorlobato/Gerenciamento_passagens_barco_front.git
cd Gerenciamento_passagens_barco_front

- 2. Instalar Dependências

npm install

- 3. Configurar HTTPS com mkcert

- Instale o mkcert (se ainda não estiver instalado):

sudo apt update
sudo apt install libnss3-tools
sudo apt install mkcert

- Gere certificados para localhost:

mkdir certs
cd certs
mkcert localhost 127.0.0.1 ::1
mkcert -install
cd ..

- Isso cria localhost+2.pem e localhost+2-key.pem no diretório certs e instala o certificado raiz no sistema.

- 4. Configurar o vite.config.js

- 5. Iniciar o Frontend
npm run dev