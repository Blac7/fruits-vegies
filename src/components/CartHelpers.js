export const addItem = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({...item, count: 1})
        cart = Array.from(new Set(cart.map((f) => (f._id)))).map((id) => {
            return cart.find(p => p._id === id)
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

export const itemTotal = () => {
    if(typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}

export const getCartFruits = () => {
    if(typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    } else {
        return []
    }
}

export const updateCartItem = (fruitId, count) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((f, i) => {
            if(fruitId === f._id) {
                cart[i].count = count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        return cart
    }
}

export const removeFromCart = fruitId => {
    let cart = []
    if(typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((f, i) => {
            if(fruitId === f._id) {
                cart.splice(i, 1)
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        return cart
    }
}

export const emptyCart = next => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('cart')
        next()
    }
}

export const getTotal = () => {
    if(typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            return cart.reduce((currentValue, nextValue) => {
                return currentValue + nextValue.count * nextValue.price;
            }, 0)
        }
    }
}
