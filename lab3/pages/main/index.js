import {ProductPage} from "../product/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjTAlBSpjBskU0BybcSqT2J7G3XkAduDtioWvFycVbgA&s",
                title: "Акция",
                text: "Такой акции вы еще не видели 1",
                description: "Акция на облигации",
                contact: "Ул. Пушкина 32, тел. 89321312323"
            },
            {
                id: 2,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvbIooSSZOQ86PU9kcokCw3Rh2-o6XKVN5X9UP-DaUyQ&s",
                title: "Акция",
                text: "Такой акции вы еще не видели 2",
                description: "Акция понижение цен!",
                contact: "Ул. Привокзальная 10, тел. 89993335588"
            },
            {
                id: 3,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzg5WMZUOkIQkCueMBoWqYy1Xh8iP4_rbwRFSxIe6nyw&s",
                title: "Акция",
                text: "Такой акции вы еще не видели 3",
                description: "Акция на низкии цены",
                contact: "Ул. Ленина, тел. 83211238899"
            },
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap"></div>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const item = document.data.find(d => d.id == cardId);
        const productPage = new ProductPage(this.parent, item.id, item.src, item.description, item.contact);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        if (!document.data) {
            document.data = this.getData();
        }

        document.data.forEach(item => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
