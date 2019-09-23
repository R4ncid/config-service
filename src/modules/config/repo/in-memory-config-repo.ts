import ConfigRepo from './config-repo'

export default class InMemoryConfigRepo implements ConfigRepo{
    private data: {};

    constructor(){
        this.data = {}
    }

    async get(key: string): Promise<any> {
        return key
                .split('.')
                .reduce((res:any, k) => res[k] || {}, this.data)
    }

    async set(key: string, value: string | number): Promise<void> {
        const recursiveSet = (keys:string[], currentData: {[k: string]: any}) => {
            const [key, ...remainingKeys] = keys;
            if(remainingKeys.length === 0){
                currentData[key] = value;
                return currentData
            }

            const currentKeyData =  currentData[key] || {};

            currentData[key] = Object.assign(currentKeyData, recursiveSet(remainingKeys, currentKeyData))
            return currentData;
        }

        this.data = recursiveSet(key.split('.'), this.data)

    }

}