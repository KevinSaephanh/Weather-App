const config = require("./config");

class Weather {
    constructor() {
        this.api = config.api;
        this.key = config.key;
    }

    async getWeather(searchWord) {
        if (!searchWord.match(/\d/)) {
            const searchType = "q";
            const res = await fetch(
                `${this.api}${searchType}=${searchWord}&APPID=${this.key}`
            );
            const data = await res.json();
            return data;
        } else {
            const coordinates = searchWord.split("/");
            const searchType =
                "lat=" + coordinates[0] + "&lon=" + coordinates[1];
            const res = await fetch(
                `${this.api}${searchType}&APPID=${this.key}`
            );
            const data = await res.json();
            return data;
        }
    }
}
