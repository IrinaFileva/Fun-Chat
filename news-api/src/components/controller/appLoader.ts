import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        if (process.env.API_URL && process.env.API_KEY) {
            super(process.env.API_URL, {
                apiKey: process.env.API_KEY,
            });
        } else {
            throw new Error('Environment variables not available');
        }
    }
}

export default AppLoader;
