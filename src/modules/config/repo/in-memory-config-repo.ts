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
        const recursiveSet = (keys:string[], currentData:{}) => {
            const [key, ...remainingKeys] = keys
            if(remainingKeys.length === 0){
                // @ts-ignore
                currentData[key] = value;
                return currentData
            }
            // @ts-ignore
            const currentKeyData =  currentData[key] || {};
            // @ts-ignore
            currentData[key] = Object.assign(currentKeyData, recursiveSet(remainingKeys, currentKeyData))
            return currentData;
        }

        this.data = recursiveSet(key.split('.'), this.data)

    }

}