class Weather {
    constructor() {
        this.api = "http://api.openweathermap.org/data/2.5/weather?";
        this.key = api_key;
    }

    async getWeather(searchWord) {
        let searchType;

        //Apply proper searchType depending on searchWord (city or geolocation)
        if (!searchWord.match(/\d+/g))
            searchType = "q";
        else {
            const coordinates = searchWord.split("/").split(" ");
            searchType = "lat=" + coordinates[0] + "&lon=" + coordinates[1];
        }

        //Make get request and return response as json
        const res = await fetch(`${api}${searchType}=${searchWord}&APPID=${key}`);
        const data = await res.json();
        return data;
    }
}