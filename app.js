const carts = document.querySelectorAll('.cart')

console.log(carts)

let count = 0;
let x;
let y;
let falseCount = 100;

carts.forEach(cart => {
	cart.addEventListener('click', () => {
		if ( count == 0 && cart.id < 100) {
			count++
			cart.children[0].style.display = 'block'
			x = cart.id
			localStorage.setItem(`${cart.id}`, cart.dataset.text)
		} else if (cart.id == x || cart.id > 100) {
			return
		} else if (count == 1) {
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
	 if (localStorage.getItem(x) == localStorage.getItem(y)) {
	 	console.log(cart.id = `${++falseCount}`)
	 	console.log(carts[x-1].id = `${++falseCount}`)
	 	localStorage.clear()
	 } else {
	 	setTimeout( () => {carts[x-1].children[0].style.display = 'none'
	 	carts[y-1].children[0].style.display = 'none'
		localStorage.clear()}, 500)
	 	
	 }
	
}