import axios from 'axios'

const api = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/',
})

const request = axios.create()

export { api, request }
