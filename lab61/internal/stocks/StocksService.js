const {StockDAO} = require('./StockDAO');

class StocksService {
    static findStocks(id) {
        if (id !== undefined) {
            return StockDAO.findById(id).toJSON();
        }

        return StockDAO.find().map((stock) => stock.toJSON());
    }

    static addStock(stock) {
        return StockDAO.insert(stock).toJSON();
    }

    static deleteStock(id) {
        return StockDAO.delete(id).map((stock) => stock.toJSON());
    }

    static incStock(id) {
        StockDAO.findById(id).visited_times += 1
    }
}

module.exports = {
    StocksService,
}