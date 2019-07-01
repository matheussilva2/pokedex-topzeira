class App {
	constructor() {
		this.initialForm = document.getElementById('initialForm')
		this.initialSearchBtn = document.getElementById("initialSearchBtn")
		this.initialSearchInput = document.getElementById("initialSearchInput")

		this.infoScreen = document.getElementById("infoScreen")

		this.abilitiesContainer = document.getElementById('abilities-container')
		this.descriptionContainer = document.getElementById('description-container')

		this.descriptionBtn = document.getElementById('descriptionBtn')
		this.abilitiesBtn = document.getElementById('abilitiesBtn')
		this.searchBtn = document.getElementById('searchBtn')

		this.registerHandlers()
	}

	registerHandlers() {
		this.descriptionBtn.onclick = event => {
			this.changeScreen(this.descriptionContainer)
		}

		this.abilitiesBtn.onclick = event => {
			this.changeScreen(this.abilitiesContainer)
		}

		this.searchBtn.onclick = event => {
			console.log("Proucra poraaa")
		}

		this.initialForm.onsubmit = event => {
			event.preventDefault()
			this.initialForm.style.display = 'none'

			this.infoScreen.style.opacity = 0
			this.infoScreen.style.display = 'block'
			this.infoScreen.style.opacity = 1

		}
	}

	changeScreen(screen) {
		this.abilitiesContainer.style.display = "none"
		this.descriptionContainer.style.display = "none"
		this.descriptionContainer.style.opacity = "0"
		this.abilitiesContainer.style.opacity = "0"

		screen.style.display = 'block'
		screen.style.opacity = "1"
	}
}

new App()