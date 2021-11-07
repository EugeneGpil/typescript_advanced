const cars: string[] = ['hello', 'hi']
const cars2: Array<string> = cars

const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('hiellow')
  }, 2000)
  setTimeout(() => {
    reject()
  }, 4000)
})

promise
  .then(res => {
    console.log('promise res', res.toUpperCase())
  })
  .catch(er => {
    console.log(er)
  })



function getMergedObject<T extends object, R extends object>(a: T, b: R): T & R {
  return Object.assign({}, a, b)
}

const getMergedObject2: Function = <T extends object, R extends object>(a: T, b: R): T & R => {
  return Object.assign({}, a, b)
}

const obj = getMergedObject2({name: 'hi'}, {age: 4})
console.log('obj.name', obj.name,)
console.log('obj.age', obj.age)



interface CountableInterface {
  length: number
}

interface LengthMessageInterface {
  param: any,
  lengthMessage: string
}

const coutnableTest: Function = <T extends CountableInterface>(param: T): LengthMessageInterface => {
  return {
    param,
    lengthMessage: `There are ${param.length} elements`
  }
}

console.log('countTest', coutnableTest('hello string'))
console.log('countTest', coutnableTest(['hello', 'array']))
console.log('countTest', coutnableTest({something: 'hello obj', length: null}))



function getObjValue<T extends object, R extends keyof T>(obj: T, key: R): any {
  return obj[key]
}

const getObjValue2: Function = <T extends object, R extends keyof T>(obj: T, key: R): any => {
  return obj[key]
}

interface PersonInterface {
  name: string,
  age: number
}

const person: PersonInterface = {
  name: 'Someone',
  age: 39,
}

console.log(getObjValue2(person, 'name'))
console.log(getObjValue2(person, 'age'))
// console.log(getObjValue2(person, 'job')) //error



class Collection<T extends number | string | boolean | null | undefined> {
  constructor(private _collection: T[] = []) {}

  add(item: T): Collection<T> {
    this._collection = [
      ...this._collection,
      item
    ]
    return this
  }

  remove(item: T): Collection<T> {
    this._collection = this._collection.filter(collectionItem => collectionItem != item)
    return this
  }

  all(): Array<T> {
    return [...this._collection]
  }
}

console.log(
  (new Collection<string>(['There', 'are', 'several', 'strings']))
    .remove('several')
    .add('in')
    .add('collection')
    .all()
)



interface Car {
  name: string,
  year: number
}

const createValidCar: Function = (name: string, year: number): Car => {
  const car: Partial<Car> = {}

  if (name.length >= 3) {
    car.name = name
  }

  if (year >= 1990) {
    car.year = year
  }

  return car as Car
}

console.log('car', createValidCar('kia', '2002'))
console.log('car', createValidCar('opel', '1989'))



const readonlyArray: Readonly<Array<string>> = ['Some', 'Strings']
// readonlyArray.push('hi') //error

const ford: Readonly<Car> = {
  name: 'ford',
  year: 2000
}
// ford.name = 'opel' //error
