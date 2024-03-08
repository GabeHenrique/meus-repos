import {ReactElement, useCallback, useEffect, useState} from "react";
import {Container, DeleteButton, Form, List, SubmitButton} from "./styles";
import {FaBars, FaGithub, FaPlus, FaSpinner, FaTrash} from "react-icons/fa"
import {api} from "../../services/api";
import {Link} from "react-router-dom";
import {Repo} from "../../types/RepoType";

export default function Main(): ReactElement {
  const [newRepo, setNewRepo] = useState<string>("");
  const [repositorios, setRepositorios] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const repoString = localStorage.getItem("repos");
    if (repoString) {
      setRepositorios(JSON.parse(repoString));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios))
  }, [repositorios])

  function handleInputChange(event: any) {
    setNewRepo(event.target.value)
    setAlert(false)
  }

  const handleDelete = useCallback((repo: string) => {
    const find = repositorios.filter(r => r.full_name !== repo)
    setRepositorios(find)
  }, [repositorios])

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();

    async function submit() {
      setLoading(true)
      setAlert(false)
      try {
        if (newRepo === "") {
          throw new Error("Você precisa indicar um repositório")
        }
        const hasRepo = repositorios.find(repo => repo.full_name === newRepo);
        if (hasRepo) {
          throw new Error("Repositório duplicado")
        }
        const response = await api.get(`repos/${newRepo}`)

        const repo: Repo = response.data;
        setRepositorios([...repositorios, repo])
        setNewRepo("")
      } catch (error) {
        console.log(error)
        setAlert(true)
      } finally {
        setLoading(false);
      }
    }

    submit().then();
  }, [newRepo, repositorios]);


  return (
    <Container>
      <h1>
        <FaGithub size={25}></FaGithub>
        Meus repositórios
      </h1>
      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adiciona Repositórios"
          value={newRepo}
          onChange={handleInputChange}/>
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="white" size={14}/>
          ) : (
            <FaPlus color="white" size={14}></FaPlus>
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositorios.map(repositorio => (
          <li key={repositorio.full_name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repositorio.full_name)}>
                <FaTrash size={14}/>
              </DeleteButton>
              {repositorio.full_name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repositorio.full_name)}`}>
              <FaBars size={20}/>
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}