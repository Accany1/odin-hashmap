// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bound");
//   }
  
function HashMap() {
    let capacity = 16
    const loadFactor = 0.75
    let load = 0

    let hashmap = new Array(capacity)
        .fill(null)
        .map(() => [])


    const calculateLoad = () => {
        if (load <= (capacity*loadFactor)) {
            return false
        } else {
            console.log("load amount:" + capacity*loadFactor)
            return true
        }
    }

    const hash = (key) => {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            //modulo on the end
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }
     
        return hashCode;
    }

    const set = (key, value) => {
        const nextNode = null
        const hashedKey = hash(key)
        console.log(hashedKey)
        

        if (hashmap[hashedKey].length === 0 ){
            hashmap[hashedKey].push({key,value,nextNode})
            load ++
        } else if (hashmap[hashedKey][0].key === key ){
            hashmap[hashedKey][0].value = value
        } else {
            let pointer = hashmap[hashedKey][0]
            while (pointer.nextNode !== null) {
                if (pointer.key === key ){
                    pointer.value = value
                    return
                }
                pointer = pointer.nextNode
            }

            if (pointer.key === key ){
                pointer.value = value
                return
            }

            pointer.nextNode = {key,value,nextNode}
            // console.log(pointer)
            load ++
        }

        if (calculateLoad()){
            console.log("resizing")
            resize()
        } 
    }

    const get = (key) => {
        for (i = 0; i<hashmap.length; i++) {
            // if the array is not empty
            if (hashmap[i].length !== 0){
                // if this is the end of the linked list
                if (hashmap[i][0].nextNode === null) {
                    // if key in hash map = given key
                    if (hashmap[i][0].key === key) {
                        return hashmap[i][0].value
                    }
                } else {
                    let pointer = hashmap[i][0]
                    while (pointer.nextNode !== null) {
                        if (pointer.key === key) {
                            return pointer.value
                        }
                        pointer = pointer.nextNode
                    }
                    if (pointer.key === key) {
                        return pointer.value
                    }
                }
            }
        }
        return null
    }

    const has = (key) => {
        for (i = 0; i<hashmap.length; i++) {
            // if the array is not empty
            if (hashmap[i].length !== 0){
                // if this is the end of the linked list
                if (hashmap[i][0].nextNode === null) {
                    // if key in hash map = given key
                    if (hashmap[i][0].key === key) {
                        return true
                    }
                } else {
                    let pointer = hashmap[i][0]
                    while (pointer.nextNode !== null) {
                        if (pointer.key === key) {
                            return true
                        }
                        pointer = pointer.nextNode
                    }
                    if (pointer.key === key) {
                        return true
                    }
                }
            }
        }
        return false
    }
    
    const remove = (key) => {
        for (i = 0; i<hashmap.length; i++) {
            // if the array is not empty
            if (hashmap[i].length !== 0){
                // if this is the end of the linked list
                if (hashmap[i][0].nextNode === null) {
                    // if key in hash map = given key
                    if (hashmap[i][0].key === key) {
                        hashmap[i] = []
                        load --
                        return true
                    }
                } else {
                    let pointer = hashmap[i][0]
                    let prevPointer = null
                    while (pointer.nextNode !== null) {
                        if (pointer.key === key) {
                            let newPointer = pointer.nextNode
                            pointer.key = newPointer.key
                            pointer.value = newPointer.value
                            pointer.nextNode = newPointer.nextNode
                            load --
                            return true
                        }
                        prevPointer = pointer
                        pointer = pointer.nextNode
                    }
                    if (pointer.key === key) {
                        prevPointer.nextNode = null
                        load --
                        return true
                    }
                }
            }
        }
        return false
    }

    const length = () => {
        return load
    }

    const resize = () => {
        
        let oldHash = hashmap
        
        capacity = capacity * 2
        load = 0
        hashmap = new Array(capacity)
            .fill(null)
            .map(() => [])
        for (i = 0; i<oldHash.length; i++) {
            if (oldHash[i].length === 0){
            } else {
                if (oldHash[i][0].nextNode === null) {
                    set(oldHash[i][0].key,oldHash[i][0].value)
                } else {
                    let pointer = oldHash[i][0]
                    while (pointer.nextNode !== null){
                        set(pointer.key, pointer.value)
                        pointer = pointer.nextNode
                    }
                    set(pointer.key, pointer.value)
                }
            }
        }
    }

    const clear = () => {
        capacity = 16
        hashmap = new Array(capacity)
            .fill(null)
            .map(() => [])
        load = 0
    }

    const keys = () => {
        let keyArray = []
        for (i = 0; i<hashmap.length; i++) {
            // if the array is not empty
            if (hashmap[i].length !== 0){
                // if this is the end of the linked list
                if (hashmap[i][0].nextNode === null) {
                    // if key in hash map = given key
                        keyArray.push(hashmap[i][0].key)
                    } else {
                        let pointer = hashmap[i][0]
                        while (pointer.nextNode !== null) {
                            keyArray.push(pointer.key)
                            pointer = pointer.nextNode
                        }
                        keyArray.push(pointer.key)
                    }
                } 
            }
        return keyArray
    }

    const values = () => {
        let valueArray = []
        for (i = 0; i<hashmap.length; i++) {
            // if the array is not empty
            if (hashmap[i].length !== 0){
                // if this is the end of the linked list
                if (hashmap[i][0].nextNode === null) {
                    // if key in hash map = given key
                        valueArray.push(hashmap[i][0].value)
                    } else {
                        let pointer = hashmap[i][0]
                        while (pointer.nextNode !== null) {
                            valueArray.push(pointer.value)
                            pointer = pointer.nextNode
                        }
                        valueArray.push(pointer.value)
                    }
                } 
            }
        return valueArray
    }
        
    

    const entries = () => {
        let allArray = []
        for (i = 0; i<hashmap.length; i++) {
            // if the array is not empty
            if (hashmap[i].length !== 0){
                // if this is the end of the linked list
                if (hashmap[i][0].nextNode === null) {
                    // if key in hash map = given key
                        allArray.push([hashmap[i][0].key, hashmap[i][0].value])
                    } else {
                        let pointer = hashmap[i][0]
                        while (pointer.nextNode !== null) {
                            allArray.push([pointer.key, pointer.value])
                            pointer = pointer.nextNode
                        }
                        allArray.push([pointer.key, pointer.value])
                    }
                } 
            }
        return allArray
    }

    return {
        hash,
        set,
        entries,
        clear,
        get,
        has,
        remove,
        length,
        keys,
        values
    }
}

const test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lion', 'silver')
test.set('moon', 'silver')

// test.entries()
console.log(test.get("lion"))
console.log(test.has("lions"))
console.log(test.remove("lion"))
console.log(test.entries())
console.log(test.length())
console.log(test.keys())
console.log(test.values())
console.log(test.entries())



