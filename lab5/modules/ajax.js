class Ajax {
    post(url, callback) {
        fetch(url, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error:', error));
    }
}

export const ajax = new Ajax();
