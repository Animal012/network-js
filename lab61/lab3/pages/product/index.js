import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id, src, description, contact) {
        this.parent = parent;
        this.id = id;
        this.src = src;
        this.description = description;
        this.contact = contact;
    }

    getData() {
        return {
            id: this.id,
            src: this.src,
            title: `Акция ${this.id}`,
            text: `Такой акции вы еще не видели`,
            description: this.description,
            contact: this.contact
        };
    }

    getUniqueImageSrc() {
        const uniqueImages = [
            "https://www.parczoologiquedeparis.fr/sites/parczoologiquedeparis/files/styles/498x373/public/thumbnails/image/fg4_3340_c_f-g_grandin_mnhn_1.jpg?itok=Pc4qlt1q&lasttime=1715609441",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLbxUVwPx_ZeHOHOhyHr6qX2OOxl3UD_64K6GT2Za_NA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VHQZhQqaDPJwr542FDwtRwDoJGLQA9qSciIFIYAAWA&s"
        ];
        return uniqueImages[this.id - 1];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page"></div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        this.renderProductDetails(data);
    }

    renderProductDetails(data) {
        const html = `
            <div class="product-detail">
                <img src="${data.src}" alt="картинка пумы" style="width: 20%; height: auto;">
                <h1>${data.title}</h1>
                <p>${data.text}</p>
                <p>${data.description}</p>
                <p>${data.contact}</p>
                <button class="btn btn-secondary" id="more-button">Подробнее</button>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', html);
        document.getElementById('more-button').addEventListener('click', () => this.renderUniqueImage());
    }

    renderUniqueImage() {
        const uniqueImageSrc = this.getUniqueImageSrc();
        const html = `
            <div class="unique-image">
                <img src="${uniqueImageSrc}" alt="Unique Puma Image" style="width: 100%; height: auto;">
                <button class="btn btn-primary" id="back-button">Назад</button>
            </div>
        `;
        this.pageRoot.innerHTML = ''; // Очистить содержимое страницы
        this.pageRoot.insertAdjacentHTML('beforeend', html);
        document.getElementById('back-button').addEventListener('click', this.clickBack.bind(this));
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
}
