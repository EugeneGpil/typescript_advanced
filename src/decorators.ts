interface ComponentDecoratorInterface {
  selector: string
  template: string
}

// function ComponentDecorator(config: ComponentDecoratorInterface): Function {
//   return function<T extends { new (...args: Array<any>): object }>(Constructor: T): T {
//     return class extends Constructor {
//       constructor(...args: Array<any>) {
//         super(...args)

//         const el = document.querySelector(config.selector)
//         if (el) {
//           el.innerHTML = config.template
//         }
//       }
//     }
//   }
// }

const ComponentDecorator: Function = (config: ComponentDecoratorInterface): Function => {
  return <T extends {new (...args: Array<any>): object}>(Constructor: T): T => {
    return class extends Constructor {
      constructor(...args: Array<any>) {
        super(...args)

        const el = document.querySelector(config.selector)
        if (el) {
          el.innerHTML = config.template
        }
      }
    }
  }
}

// function BindDecorator(_1: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
//   const original = descriptor.value
//   return {
//     configurable: true,
//     enumerable: false,
//     get() {
//       return original.bind(this)
//     }
//   }
// }

const BindDecorator: Function = (_1: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor => {
  const original = descriptor.value
  return {
    configurable: true,
    enumerable: false,
    get(): Function {
      return original.bind(this)
    }
  }
}

@ComponentDecorator({
  selector: '#card',
  template: `
    <div class="card">
      <div class="card-content">
        <span class="card-title">Card Component</span>
      </div>
    </div>
  `
})
class CardComponent {
  constructor(public name: string) {}

  @BindDecorator
  logName(): void {
    console.log(`Component name: ${this.name}`)
  }
}

const cardComponent: CardComponent = new CardComponent('Card Component')

const button: Element | null = document.querySelector('#btn')

if (button) {
  button.addEventListener('click', cardComponent.logName)
}



type ValidatorType = 'required' | 'email'

interface ValidatorConfigInterface {
  [className: string]: {
    [propName: string]: ValidatorType
  }
}

const validators: ValidatorConfigInterface = {}

const RequiredDecorator: Function = <T extends {new (...args: Array<any>): object}>(target: T, propName: string): void => {
  validators[target.constructor.name] = {
    ...validators[target.constructor.name],
    [propName]: 'required'
  } 
}

interface mayBeValidatedInterface {
  [prop: string]: any
}

class Form implements mayBeValidatedInterface {
  @RequiredDecorator
  public email: string | void
  constructor(email?: string) {
    this.email = email
  }
}

const validate: Function = (obj: mayBeValidatedInterface): boolean => {
  const objConfig = validators[obj.constructor.name]
  if (!objConfig) {
    return true
  }
  let isValid: boolean = true
  Object.keys(objConfig).forEach(key => {
    if (objConfig[key] === 'required') {
      isValid = isValid && !!obj[key]
    }
  })
  return isValid
}

const form: Form = new Form('index@mail.com')

if (validate(form)) {
  console.log('valid form', form)
} else {
  console.log('invalid form', form)
}
