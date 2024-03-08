export interface Repo {
	name: string;
	description: string;
	full_name: string;
	owner: Owner
}

export interface Issue {
	id: number;
	user: Owner;
	html_url: string;
	labels: Label[];
	title: string;
}

export interface Owner {
	avatar_url: string
	login: string
}

export interface Label {
	id: number;
	name: string
}

export enum Acao {
	Anterior,
	Seguinte
}

export interface Filter {
	state: string,
	label: string,
	active: boolean,
	color: string
}