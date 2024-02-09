class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {

    constructor(){
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.hashTable = [];
    }

    checkCapacity() {
        const filled = this.entries().length;
        const calculatedLoadFactor = filled / this.capacity;
        if (calculatedLoadFactor >= this.loadFactor) {
            this.capacity = this.capacity * 2;

            const entries = this.entries();
            
            this.clear();

            entries.forEach(entry => {
                this.set(entry[0], entry[1]);
            })
        }
    }

    hash(key) {
        let hashCode = 0;
        let index = 0;

        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
            index = hashCode % this.capacity;
        }

        return index;
    }

    set(key, value) {
        const index = this.hash(key)
        
        //Check if index is in bounds
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }


        //if bucket is already filled
        if(this.hashTable[index]) {
            if (this.hashTable[index].key === key) {
                //overwrite
                this.hashTable[index] = new Node(key, value);
            } else {
                //chain
                this.hashTable[index].next = new Node(key, value);
            }
        } 
        else {
            this.hashTable[index] = new Node(key, value);
        }

        //Check to see if buckets (capacity) need growth
        this.checkCapacity();
    }

    get(key) {
        const index = this.hash(key);

        //Check if index is in bounds
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if(this.hashTable[index]) {

            let currentNode = this.hashTable[index];
            while(currentNode !== null) {
                if (currentNode.key === key) {
                    return currentNode.value;
                } else {
                    currentNode = currentNode.next;
                }
            }

        }
        console.log(`There was no key ${key} in the hash map`);
        return null;
    }

    has(key) {
        const index = this.hash(key);

        //Check if index is in bounds
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bound");
        }

        if(this.hashTable[index]) {

            let currentNode = this.hashTable[index];
            while(currentNode !== null) {
                if (currentNode.key === key) {
                    return true;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }
        return false;
    }

    remove(key) {
        if(this.has(key)) {

            const index = this.hash(key);

                //Check if index is in bounds
            if (index < 0 || index >= this.capacity) {
                throw new Error("Trying to access index out of bound");
            }

            let currentNode = this.hashTable[index];
            let previousNode = null;
            while(currentNode !== null) {
                if (currentNode.key === key) {
                    //remove node
                    if(currentNode.next !== null) {
                        this.hashTable[index] = currentNode.next;
                        this.hashTable[index].next = null;
                        console.log(`Key ${key} has been removed by assigning next to it.`)
                        console.log(this.hashTable);
                        return true
                    } else {
                        if(previousNode !== null) {
                            console.log(`Key ${key} has been removed using previous node`);
                            previousNode.next = null;
                            return true;
                        } else {
                            console.log(`Key ${key} has been deleted:`);
                            delete this.hashTable[index];
                            return true;
                        }
                    }
                } else {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
            }
        }
        console.log(`Cannot remove key ${key} becuase it does not exist`);
        return false;
    }

    length() {
        let keyCount = 0;
        for (let i = 0; i < this.hashTable.length; i++) {
            
            if(this.hashTable[i] !== undefined) {
                keyCount+= 1;

                let currentNode = this.hashTable[i];

                while(currentNode !== null) {
                    if(currentNode.next !== null) {
                        keyCount+= 1;
                    }
                    currentNode = currentNode.next;
                }
            }
        }
        return keyCount;
    }

    clear() {
        for (let i = 0; i < this.hashTable.length; i++) {
            delete this.hashTable[i];
        }
    }

    keys() {
        let keysArray = [];
        for (let i = 0; i < this.hashTable.length; i++) {
            
            if(this.hashTable[i] !== undefined) {
                keysArray.push(this.hashTable[i].key);

                let currentNode = this.hashTable[i];

                while(currentNode !== null) {
                    if(currentNode.next !== null) {
                        keysArray.push(currentNode.next.key);
                    }
                    currentNode = currentNode.next;
                }
            }
        }
        return keysArray;
    }

    values() {
        let valuesArray = [];
        for (let i = 0; i < this.hashTable.length; i++) {
            
            if(this.hashTable[i] !== undefined) {
                valuesArray.push(this.hashTable[i].value);

                let currentNode = this.hashTable[i];

                while(currentNode !== null) {
                    if(currentNode.next !== null) {
                        valuesArray.push(currentNode.next.value);
                    }
                    currentNode = currentNode.next;
                }
            }
        }
        return valuesArray;

    }

    entries() {
        let entriesArray = [];

        for (let i = 0; i < this.hashTable.length; i++) {
            
            if(this.hashTable[i] !== undefined) {
                entriesArray.push([this.hashTable[i].key, this.hashTable[i].value]);

                let currentNode = this.hashTable[i];

                while(currentNode !== null) {
                    if(currentNode.next !== null) {
                        entriesArray.push([currentNode.next.key, currentNode.next.value]);
                    }
                    currentNode = currentNode.next;
                }
            }
        }
        return entriesArray;
    }
}




// DRIVER SCRIPT




const map = new HashMap();

console.log('Initial empty hash table: \n')
console.log(map.hashTable);

console.log('\n**********\n')

console.log('map.set(Carla, 13); map.set(Carlos, 21); map.set(Carlos, 21); map.set(CARLA, 52); \n');

map.set('Carla', 13);
map.set('Carlos', 21);
map.set('Carlos', 21);
map.set('CARLA', 52);

console.log(map.hashTable);

console.log('\n**********\n')

console.log('map.length()\n');

console.log(map.length());

console.log('\n**********\n')

console.log('map.keys()\n');

console.log(map.keys());

console.log('\n**********\n')

console.log('map.values()\n');

console.log(map.values());

console.log('\n**********\n')

console.log('map.entries()\n');

console.log(map.entries());

console.log('\n**********\n')

console.log('map.get(CARLA); map.get(Ethan); map.get(CARLOS);\n');

console.log(map.get('CARLA'));
console.log(map.get('Ethan'));
console.log(map.get('CARLOS'));

console.log('\n**********\n')

console.log('map.has(Carla); map.has(CARlos);\n');

console.log(map.has('Carla'));
console.log(map.has('CARlos'));

console.log('\n**********\n')

console.log('map.remove CARLA, Carlos, Erin\n');

map.remove('CARLA');
map.remove('Carlos');
map.remove('Erin');

console.log('\n');

console.log(map.hashTable);

console.log('\n**********\n')

console.log(`Current capacity: ${map.capacity}`);

console.log('\nSet 17 new pairs, forcing capacity to double\n');

map.set('Hello', 2)
map.set('Hi', 2)
map.set('HELLO', 2)
map.set('What', 2)
map.set('Yay', 2)
map.set('Hiiii', 2);
map.set('ABC', 2);
map.set('abc', 2);
map.set('NotMe', 2);
map.set('YesYou', 2);
map.set('OKAY', 2);
map.set('Why', 2);
map.set('Mayonaise', 2);
map.set('EthanHall', 2);
map.set('Pancake', 2);
map.set('cats', 2);
map.set('Pillow', 2);

console.log(`New capacity: ${map.capacity}\n`);

console.log(map.hashTable);
