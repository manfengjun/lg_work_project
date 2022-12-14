export interface StorageInstance {
    set(key: string, value: any): void;
    get(key: string): any;
    remove(key: string): void;
}

class StorageClass implements StorageInstance {
    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    get(key: string): any {
        let temp = localStorage.getItem(key);
        if (temp) {
            return JSON.parse(temp);
        }
        return null;
    }
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}
let Storage = new StorageClass();

export default Storage;

