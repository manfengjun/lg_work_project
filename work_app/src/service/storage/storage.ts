export interface StorageInstance {
    set(key: string, value: any): void;
    get(key: string): any;
    remove(key: string): void;
}

class StorageClass implements StorageInstance {
    set(key: string, value: any): void {
        uni.setStorageSync(key, JSON.stringify(value))
    }
    get(key: string): any {
        let res = uni.getStorageSync(key)
        if (res) {
            return JSON.parse(res)
        }
        return null
    }
    remove(key: string): void {
        uni.removeStorageSync(key)
    }
}
let Storage = new StorageClass();

export default Storage;

