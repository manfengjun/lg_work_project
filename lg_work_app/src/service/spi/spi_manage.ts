class SpiManager {
    public baseUrl: string = ''
    public connectTimeout: number = 5000
    public receiveTimeout: number = 5000
    public logEnable: boolean = true

    private static instance: SpiManager
    constructor() {
    }
    static getInstance() {
        if (!SpiManager.instance) {
            SpiManager.instance = new SpiManager();
        }
        return SpiManager.instance;
    }

}

export { SpiManager }