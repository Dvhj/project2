
const startBtn = document.querySelector('.startBtn')
const endBtn = document.querySelector('.endBtn')
const container = document.querySelector('.container')
const carts = document.querySelectorAll('.cart')
const winCont = document.querySelector('.winContainer')

const dataOfImages = [
	{ letter:'A', img:"img/bird.png"},
	{ letter:'B', img:"img/fox.png"},
	{ letter:'C', img:"img/elephant.png"},
	{ letter:'D', img:"img/koala.png"},
	{ letter:'E', img:"img/cat.png"},
	{ letter:'F', img:"img/butterfly.png"},
	{ letter:'G', img:"img/turtle.png"},
	{ letter:'H', img:"img/fish.png"},
	{ letter:'A', img:"img/bird.png"},
	{ letter:'B', img:"img/fox.png"},
	{ letter:'C', img:"img/elephant.png"},
	{ letter:'D', img:"img/koala.png"},
	{ letter:'E', img:"img/cat.png"},
	{ letter:'F', img:"img/butterfly.png"},
	{ letter:'G', img:"img/turtle.png"},
	{ letter:'H', img:"img/fish.png"},
]
let randomArr = []
let array = []
let countRandom = 1
let count = 0;
let x;
let y;
let falseCount = 100;

// выводим данные на сайт
const db = (event) => {
	let dbCount = 0
	event.preventDefault()
	dataOfImages.forEach(randomiser)
	dataOfImages.sort(function (a, b) {
	  if (a.id > b.id) {
	    return 1;
	  }
	  if (a.id < b.id) {
	    return -1;
	  }
	})
	carts.forEach((item) => {
		item.style.cursor = 'pointer'
		item.dataset.text = dataOfImages[dbCount].letter
		item.id = dataOfImages[dbCount].id
		item.innerHTML = `
			<img src=${dataOfImages[dbCount].img} alt="">
		`
		dbCount++

	})
	startBtn.style.display = 'none'
}

// создаем набор рандомных id
function randomiser () {
	localStorage.clear()
	let random = Math.floor(Math.random()*16)
	if ( randomArr.includes(random)){
		randomiser()
	} else{
		randomArr.push(random)
		dataOfImages[random].id = countRandom
		countRandom++
	}
}

// старт
startBtn.addEventListener('click', db)

// конец
endBtn.addEventListener('click', (event) => {
	event.preventDefault()
	startBtn.style.display = 'block'
	randomArr.length = 0
	array.length = 0
	carts.forEach((item) => {
		// item.children[0].style.display = 'none'
		item.removeAttribute('id')
		item.removeAttribute('data-text')
		item.children[0].src = ''
	})
	dataOfImages.forEach((item) => {
		delete item.id
	})
	countRandom = 1
	count = 0
	winCont.children[0].remove()
})

// основная механика игры
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

// проверка на совпадение объектов
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

// проверка на победу
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
				}
			}
		}
	})
}

