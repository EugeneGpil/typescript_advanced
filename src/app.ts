class Person {
  constructor(private name: string) {}

  printName (): void {
    console.log(this.name)
  }
}

const bill = new Person('Bill')

const btn: Element | null = document.querySelector('#btn')

btn?.addEventListener('click', (): void => {
  console.log('btn clicked')
})

// =========

const logInfo = (data: string, _a?: number): void => {
  console.log(data)
}

logInfo('something')

const some: string = 'hi'