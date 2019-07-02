import { api, request } from './poke-api'
import notification from './notifications'

class App {
	constructor() {
		this.initialForm = document.getElementById('initialForm')
		this.initialSearchBtn = document.getElementById("initialSearchBtn")
		this.initialSearchInput = document.getElementById("initialSearchInput")

		this.infoScreen = document.getElementById("infoScreen")

		this.pokeNameText = document.getElementById('pokemonName')
		this.pokemonTypesBadges = document.getElementById("pokemonTypesBadges")
		this.pokeWeightText = document.getElementById("poke-weight")
		this.pokemonAbilitiesList = document.getElementById("pokemonAbilitiesList")
		this.pokeSpriteImg = document.getElementById("poke-sprite")


		this.abilitiesContainer = document.getElementById('abilities-container')
		this.statsContainer = document.getElementById('stats-container')

		this.pokeHPLabel    = document.getElementById("poke-hp")
		this.pokeAtkLabel   = document.getElementById("poke-atk")
		this.pokeDefLabel   = document.getElementById("poke-def")
		this.pokeSpaLabel   = document.getElementById("poke-spa")
		this.pokeSpdLabel   = document.getElementById("poke-spd")
		this.pokeSpeedLabel = document.getElementById("poke-speed")

		this.statsBtn = document.getElementById('statsBtn')
		this.abilitiesBtn = document.getElementById('abilitiesBtn')
		this.searchInput = document.getElementById('searchInput')
		this.searchForm = document.getElementById('searchForm')

		this.notificationArea = document.getElementById("notificationArea")

		this.loadingScreen = document.getElementById("loadingScreen")

		this.registerHandlers()
	}

	registerHandlers() {
		this.statsBtn.onclick = event => {
			this.changeScreen(this.statsContainer)

			this.statsBtn.disabled = true
			this.abilitiesBtn.disabled = false
		}

		this.abilitiesBtn.onclick = event => {
			this.changeScreen(this.abilitiesContainer)

			this.statsBtn.disabled = false
			this.abilitiesBtn.disabled = true
		}

		this.searchForm.onsubmit = event => {
			event.preventDefault()
			this.getPokemonData(this.searchInput.value)

			this.infoScreen.style.opacity = 0
			this.infoScreen.style.display = 'block'
			this.infoScreen.style.opacity = 1
		}

		this.initialForm.onsubmit = event => {
			event.preventDefault()
			this.getPokemonData(this.initialSearchInput.value)
			this.initialForm.style.display = 'none'

			this.infoScreen.style.opacity = 0
			this.infoScreen.style.display = 'block'
			this.infoScreen.style.opacity = 1

			this.statsBtn.disabled = true

		}
	}

	changeScreen(screen) {
		this.abilitiesContainer.style.display = "none"
		this.statsContainer.style.display = "none"
		this.statsContainer.style.opacity = "0"
		this.abilitiesContainer.style.opacity = "0"

		screen.style.display = 'block'
		screen.style.opacity = "1"
	}

	async getPokemonData(pokeName){
		this.infoScreen.style.filter = "blur(10px)"
		this.loadingScreen.style.display = 'block'
		try{
			let response = await api.get(`pokemon/${ pokeName.toLowerCase() }`)
			let { id, weight, name, abilities, sprites, types, stats } =  response.data
			let pokemon = {
				id,
				weight,
				name,
				abilities,
				sprites,
				types,
				stats
			}
			this.loadPokemonData(pokemon)
		}catch(e){
			this.pushNotification("Something gone wrong! Check pokemon name and try again.", "alert-warning")
		}
		finally {
			this.infoScreen.style.filter = "blur(0px)"
			this.loadingScreen.style.display = 'none'
		}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	}

	pushNotification(msg, type){
		alert(msg)
	}

	loadPokemonData(pokemon){
		pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

		this.pokeNameText.innerHTML = "#" + pokemon.id +" "+ pokemon.name
		this.pokeSpriteImg.setAttribute("src", pokemon.sprites['front_default'])
		this.abilitiesContainer.innerHTML = ""

		this.pokeWeightText.innerHTML = pokemon.weight/10 + "kg"
		this.pokeHPLabel.innerHTML    = pokemon.stats[5].base_stat
		this.pokeAtkLabel.innerHTML   = pokemon.stats[4].base_stat
		this.pokeDefLabel.innerHTML   = pokemon.stats[3].base_stat
		this.pokeSpaLabel.innerHTML   = pokemon.stats[2].base_stat
		this.pokeSpdLabel.innerHTML   = pokemon.stats[1].base_stat
		this.pokeSpeedLabel.innerHTML = pokemon.stats[0].base_stat

		this.pokemonTypesBadges.innerHTML = "";
		pokemon.types.forEach(type => {
			let badge = document.createElement("div")
			badge.classList.add('badge')
			badge.classList.add('badge-primary')
			badge.classList.add('mr-1')
			badge.innerHTML = type.type.name
			this.pokemonTypesBadges.appendChild(badge)
		})

		this.getAbilityModelList(pokemon.abilities)
	}

	async getAbilityInfo(url){
		let response = await request.get(`${ url }`)
		let data = response.data
		return data
	}

	getAbilityModelList(abilities){
		abilities.forEach(async ability => {
			let abilityInfo = await this.getAbilityInfo(ability.ability.url)

			let abilityTitle = document.createElement('dt')
			let abilityTitleH1 = abilityTitle.appendChild(document.createElement('h5'))
			abilityTitleH1.innerHTML = ability.ability.name

			let abilityDescription = document.createElement('dd')
			abilityDescription.innerHTML = abilityInfo['effect_entries'][0].effect

			this.abilitiesContainer.appendChild(abilityTitle)
			this.abilitiesContainer.appendChild(abilityDescription)
		})
	}
}

new App()