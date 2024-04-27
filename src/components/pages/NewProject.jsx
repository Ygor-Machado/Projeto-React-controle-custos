import { useNavigate } from 'react-router-dom';
import React from 'react'; // Importe o React se ainda não o fez

import styles from './NewProject.module.css';
import ProjectForm from '../project/ProjectForm';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        // Inicialize custo e serviços
        project.cost = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } }); // Use navigate para redirecionar
        })
        .catch((error) => {
            console.error('Erro ao criar projeto:', error);
        });
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    );
}

export default NewProject;
