import InMemoryConfigRepo from "./in-memory-config-repo"


it("should run test", ()=>{
    expect(true).toBe(true)
})


describe("In memory config repository", () =>{

    const createNewRepo= () => new InMemoryConfigRepo();

    it("should return empty object if key doesn't exists",async () => {
        const repo = createNewRepo();
        const value = await repo.get("notExistingKey");
        expect(value).toEqual({})

    })

     // @ts-ignore
    const testSetAndGet = async (myKey, myData) => {
        const repo = createNewRepo();

        await repo.set(myKey, myData);

        const retrievedValue = await repo.get(myKey)
        expect(retrievedValue).toEqual(myData)
    }

    it("should set and return simple value",async () => {
        const myData = "my data";
        const myKey = "myKey";
        await testSetAndGet(myKey, myData);

    })

    it("should set and get an xpath value", async () =>{
        const myData = "my data";
        const myKey = "path.key";
        await testSetAndGet(myKey, myData)
    })

    it("should set and get an object with xpath value", async () =>{
        const myData = {
            'my' : 'data'
        };
        const myKey = "path.key";
        await testSetAndGet(myKey, myData)
    })

    it("should set  multiple and get an object with xpath value", async () =>{
        const myData = '';
        const myKey = "path.key";
        const repo = createNewRepo();

        await repo.set('key.test', 'test');
        await repo.set('key.test2', 'test2');
        await repo.set('key.test3.anotherLevel', 'test3');

        const retrievedData =  await repo.get('key');

        expect(retrievedData).toEqual({
            'test': 'test',
            'test2': 'test2',
            'test3': {
                'anotherLevel': 'test3'
            }
        })

    })



})
