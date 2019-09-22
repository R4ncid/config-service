export default interface ConfigRepo {
    get(key:string): Promise<any>,

    set(key:string, value: string | number): Promise<void>
}