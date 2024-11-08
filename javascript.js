if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
  
function HashMap() {
    const capacity = 16
    const loadFactor = 0.8

    let hashmap = Array(capacity)
        .fill(null)
        .map(() => [])

    hash = (key) => {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            //modulo on the end
          hashCode = primeNumber * hashCode + key.charCodeAt(i) % capacity;
        }
     
        return hashCode;
    }

    set = (key, value) => {
        
    }
}

