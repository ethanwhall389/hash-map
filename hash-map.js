class HashMap {

    constructor(){
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.hashTable = [];
    }

    hash(key) {
        let hashCode = 0;
        let index = 0;

        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
            index = hashCode % this.capacity;
            // console.log(`CharCodeAt ${i} = ${key.charCodeAt(i)}`);
        }

        console.log(index);
        return index;
    }

    set(key, value) {
        const index = this.hash(key)
        //if bucket is already filled
        if(this.hashTable[index]) {
            if (this.hashTable[index].key === key) {
                //overwrite
                this.hashTable[index] = {key, value};
            } else {
                //chain
                this.hashTable[index].next = {key, value};
            }
        } else {
            this.hashTable[index] = {key, value};
        }
        console.log(this.hashTable);
    }
}

const map = new HashMap();
map.set('Carla', 13);
map.set('Carlos', 21);
map.set('Carlos', 21);
map.set('CARLA', 52);