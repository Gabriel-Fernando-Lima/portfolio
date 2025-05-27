create database portfolio;

use portfolio;

CREATE TABLE tecnologias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    link VARCHAR(255)
);

CREATE TABLE projeto_tecnologia (
    projeto_id INT NOT NULL,
    tecnologia_id INT NOT NULL,
    PRIMARY KEY (projeto_id, tecnologia_id),
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
    FOREIGN KEY (tecnologia_id) REFERENCES tecnologias(id) ON DELETE CASCADE
);

INSERT INTO tecnologias (nome) VALUES 
('Node.js'),
('React'),
('Bootstrap'),
('MySQL'),
('TailwindCSS'),
('JavaScript'),
('TypeScript'),
('Trello'),
('HTML5'),
('CSS3'),
('Github'),
('Git'),
('Python');

INSERT INTO projetos (nome, descricao, link) VALUES 
('Demoquery', 'O Demoquery é um projeto que busca aumentar a transparência e o engajamento político fora do período
                    eleitoral, permitindo que os cidadãos acompanhem a atuação dos políticos na câmara municipal de São
                    José dos Campos. A proposta é fornecer uma ferramenta que ajude a população a tomar decisões
                    informadas sobre seus representantes.', 'https://github.com/AgileKrakens/DemoQuerycy'),
('Genesys', 'O Genesys é um projeto em desenvolvimento que tem como objetivo oferecer soluções reais para
                    profissionais da venda direta. Com base na metodologia ágil SCRUM, a proposta é criar um dashboard
                    estratégico que monitore indicadores de crescimento das empresas e desenvolver um sistema de
                    captação de usuários externos, facilitando a conexão entre patrocinadores e afiliados.', 'https://github.com/GeneSys-fatec/API-2DSM');

INSERT INTO projeto_tecnologia (projeto_id, tecnologia_id) VALUES 
(1, 7), 
(1, 8), 
(1, 9), 
(1, 10), 
(1, 3), 
(2, 1),
(2, 2),
(2, 3),
(2, 6);