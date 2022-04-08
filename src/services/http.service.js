import axios from "axios";

axios.defaults.baseURL = "https://pjsonplaceholder.typicode.com/";

const httpService = {
    get: axios.get
};

export default httpService;
