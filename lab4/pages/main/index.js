import {ButtonComponent} from "../../components/buttons/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductComponent} from "../../components/product/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
            this.renderData(data.response.items);
        });
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
            <div id="main-page" class="d-flex flex-wrap">
                <div class="message-container">
                    <input type="text" id="message-input" placeholder="Введите сообщение" class="form-control mb-2"/>
                    <button class="btn btn-primary" id="send-message-button">Отправить сообщение</button>
                    <p id="message-status" class="mt-2">Сообщение не прочитано</p>
                </div>
                <div id="cards-container" class="d-flex flex-wrap"></div>
            </div>
        `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log("pressed ", cardId);

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();
        document.getElementById('send-message-button').addEventListener('click', this.sendMessage.bind(this));

        // Проверка статуса сообщения при загрузке страницы
        this.checkMessageStatus();
        //this.checkMessageReadStatus();
    }

    sendMessage() {
        const message = document.getElementById('message-input').value;

        if (message.trim() === '') {
            alert('Сообщение не может быть пустым');
            return;
        }

        this.updateMessageStatus('Сообщение не прочитано');

        ajax.post(urls.getGroupMembers(groupId), (data) => {
            const members = data.response.items;
            const memberIds = members.map(member => member.id);

            members.forEach((member) => {
                const sendMessageUrl = urls.sendMessage(member.id, message);
                ajax.post(sendMessageUrl, (response) => {
                    console.log('Ответ от отправки сообщения:', response);

                    if (response.error) {
                        console.error(`Ошибка при отправке сообщения ${member.first_name} ${member.last_name}: ${response.error.error_msg}`);
                    } else {
                        console.log(`Сообщение отправлено ${member.first_name} ${member.last_name}`);
                        console.log('Полный ответ API:', response);

                        if (typeof response.response === 'number') {
                            console.log('ID отправленного сообщения:', response.response);
                            localStorage.setItem('messageId', response.response);
                            this.checkMessageReadStatus(response.response, memberIds);
                        } else {
                            console.error('Не удалось получить ID сообщения из ответа:', response);
                        }
                    }
                });
            });
        });
    }

    async checkMessageReadStatus(messageId, memberIds) {
        if (!messageId) {
            return;
        }

        const checkStatus = async () => {
            let allRead = true;

            for (const memberId of memberIds) {
                try {
                    const data = await new Promise((resolve, reject) => {
                        ajax.post(urls.getConversationById(memberId), (response) => {
                            if (response.error) {
                                reject(response.error);
                            } else {
                                resolve(response);
                            }
                        });
                    });

                    console.log(`Ответ от getConversationById для ${memberId}:`, data);

                    if (data.response && data.response.items.length > 0) {
                        const conversation = data.response.items.find(convo => convo.peer.id === memberId);

                        if (conversation) {
                            console.log('Найдена беседа:', conversation);

                            const outRead = conversation.out_read || 0;

                            if (messageId > outRead) {
                                allRead = false;
                            }
                        } else {
                            console.error(`Беседа с указанным ID не найдена: ${memberId}`);
                            allRead = false;
                        }
                    } else {
                        console.error(`Не удалось получить данные о беседе для ${memberId}:`, data);
                        allRead = false;
                    }
                } catch (error) {
                    console.error(`Ошибка при запросе для ${memberId}:`, error);
                    allRead = false;
                }
            }

            return allRead;
        };

        const intervalId = setInterval(async () => {
            const allRead = await checkStatus();

            if (allRead) {
                clearInterval(intervalId);
                this.updateMessageStatus('Сообщение прочитано');
            }
        }, 5000); // проверять каждые 5 секунд
    }


    checkMessageStatus() {
        const messageStatus = localStorage.getItem('messageStatus');
        if (messageStatus) {
            this.updateMessageStatus(messageStatus);
        }
    }

    updateMessageStatus(status) {
        const statusElement = document.getElementById('message-status');
        statusElement.textContent = status;

        // Сохранение статуса сообщения в localStorage
        localStorage.setItem('messageStatus', status);
    }
}
