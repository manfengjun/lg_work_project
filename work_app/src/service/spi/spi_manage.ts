class SpiManager {
    public baseUrl: string = ''
    public connectTimeout: number = 5000
    public receiveTimeout: number = 5000
    public logEnable: boolean = true

    private static instance: SpiManager
    private constructor() {
    }
    static getInstance() {
		if (this.instance == null) {
            SpiManager.instance = new SpiManager();
        }
        return SpiManager.instance;
    }
}

export { SpiManager }