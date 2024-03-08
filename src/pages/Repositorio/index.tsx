import {ReactElement, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {api} from "../../services/api";
import {Acao, Issue, Repo, Filter} from "../../types/RepoType";
import {BackButton, Container, Issues, Loading, Owner, PageActions, PageState} from "./styles";
import {FaArrowLeft, FaArrowRight, FaExclamationTriangle} from "react-icons/fa"
import {gDarkBlue} from "../../styles/global";


export default function Repositorio(): ReactElement {

	const [repositorio, setRepositorio] = useState<Repo | null>(null)
	const [issues, setIssues] = useState<Issue[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [filters, setFilters] = useState<Filter[]>([
		{state: "all", label: "Todas", active: true, color: `${gDarkBlue}`},
		{state: "open", label: "Abertas", active: false, color: "green"},
		{state: "closed", label: "Fechadas", active: false, color: "red"}
	]);
	const [filterIndex, setFilterIndex] = useState<number>(0);

	const params = useParams();

	useEffect(() => {
		async function load() {
			const [dataRepository, dataIsues] = await Promise.all([
				api.get(`/repos/${params.repositorio}`),
				api.get(`/repos/${params.repositorio}/issues`, {
					params: {
						state: filters[filterIndex].state,
						per_page: 5
					}
				})
			])
			const repositoryObject: Repo = dataRepository.data;
			const issuesObject: Issue[] = dataIsues.data;

			setRepositorio(repositoryObject);
			setIssues(issuesObject);
			setLoading(false);
		}

		load().then();
	}, [params.repositorio, filters, filterIndex]);

	useEffect(() => {
		async function loadIssue() {
			const response = await api.get(`/repos/${params.repositorio}/issues`, {
				params: {
					state: filters[filterIndex].state,
					page: page,
					per_page: 5
				}
			});
			console.log(response.data)
			const issuesObject: Issue[] = response.data;
			setIssues(issuesObject);

		}

		loadIssue().then();
	}, [filterIndex, filters, page, params.repositorio]);


	function handlePage(action: Acao): void {
		setPage(action === Acao.Anterior ? page - 1 : page + 1)
	}

	if (loading) {
		return (<Loading>
			<h1>Carregando</h1>
		</Loading>);
	}

	function handleFilter(index: number) {
		setFilterIndex(index);
	}

	return (
		<Container>
			<BackButton to="/">
				<FaArrowLeft color={gDarkBlue} size={30}></FaArrowLeft>
			</BackButton>
			<Owner>
				<img src={repositorio?.owner.avatar_url} alt={repositorio?.owner.login}></img>
				<h1>{repositorio?.name}</h1>
				<p>{repositorio?.description}</p>
			</Owner>
			<PageState active={filterIndex}>
				{filters.map((filter, index) => (
					<button type="button" key={filter.label} onClick={() => handleFilter(index)}>
						<FaExclamationTriangle color={filter.color}/>
						{filter.label}
					</button>
				))
				}
			</PageState>
			<Issues>
				{issues.map(issue => (
					<li key={String(issue.id)}>
						<img src={issue.user.avatar_url} alt={issue.user.login}/>
						<div>
							<strong>
								<a href={issue.html_url} target="_blank" rel="noreferrer">{issue.title}</a>
								{issue.labels.map(label => (
									<span key={String(label.id)}>{label.name}</span>
								))}
							</strong>
							<p>{issue.user.login}</p>
						</div>
					</li>
				))}
			</Issues>
			<PageActions>
				<button disabled={page < 2} type="button" onClick={() => handlePage(Acao.Anterior)}>
					<FaArrowLeft color="white"/>
					Anterior
				</button>
				<button type="button" onClick={() => handlePage(Acao.Seguinte)}>
					Seguinte
					<FaArrowRight color="white"/>
				</button>
			</PageActions>
		</Container>
	)
};