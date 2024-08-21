class Ajax {
    post(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log('Ответ от API:', JSON.stringify(data, null, 2));  // Логируем ответ от API
                    callback(data);
                } else {
                    console.error('Ошибка при выполнении запроса', xhr.statusText);
                }
            }
        };
    }
}

export const ajax = new Ajax();
