const startScreen = document.querySelector('.startScreen')
const startBtn = document.querySelector('.startBtn')
const endBtn = document.querySelector('.endBtn')
const container = document.querySelector('.container')
const carts = document.querySelectorAll('.cart')
const winCont = document.querySelector('.winContainer')

let array = []
let count = 0;
let x;
let y;
let falseCount = 100;


const db = (event) => {
	event.preventDefault()
	console.log(Math.floor(Math.random()*10))
	container.classList.add('up')
}

startBtn.addEventListener('click', db)

endBtn.addEventListener('click', (event) => {
	event.preventDefault()
	container.classList.remove('up')
})


carts.forEach(cart => {
	cart.addEventListener('click', () => {
		if ( count === 0 && cart.id < 100) {
			count++
			cart.children[0].style.display = 'block'
			x = cart.id
			localStorage.setItem(`${cart.id}`, cart.dataset.text)
		} else if (cart.id === x || cart.id > 100) {
			return
		} else if (count === 1) {
			count = 0
			cart.children[0].style.display = 'block'
			y = cart.id
			localStorage.setItem(`${cart.id}`, cart.dataset.text)
			comeback(cart)
		} else if (count > 1) {
			return
		}
	})
})

function comeback(cart){
	if (localStorage.getItem(x) === localStorage.getItem(y)) {
	 	console.log(cart.id = `${++falseCount}`)
	 	console.log(carts[x-1].id = `${++falseCount}`)
	 	localStorage.clear()
	} else {
	 	setTimeout( () => {carts[x-1].children[0].style.display = 'none'
	 	carts[y-1].children[0].style.display = 'none'
		localStorage.clear()}, 500)
	}
	win()
}

const win = () => {
	carts.forEach( item => {
		if (item.id < 100) {
			return
		} else {
			if (array.includes(item.id)){
				return
			} else {
				array.push(item.id)
				console.log(array)
				if (array.length == 16) {
					console.log('win!!')
					let winBox = document.createElement('div')
					winBox.classList.add('winBox')
					winBox.innerHTML = 'ПОБЕДА'
					winCont.append(winBox)
					setTimeout( () => container.classList.remove('up'), 1000)
				}
			}
		}
	})
}

