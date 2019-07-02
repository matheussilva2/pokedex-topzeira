const notification = (msg, bg) => {    
    let notification = document.createElement('div')
    notification.classList.add('alert')
    notification.classList.add(bg)
    notification.innerHTML = msg
    return notification
}

export default notification
