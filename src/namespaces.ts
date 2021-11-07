/// <reference path="form_namespace.ts" />

class MyForm {
  private type: Form.FormTypeType = 'inline'
  private state: Form.FormStateType = 'active'

  constructor(public email: string) {}

  getInfo(): Form.FormInfoInterface {
    return {
      type: this.type,
      state: this.state
    }
  }
}

const form2 = new MyForm('index@mail.com')
console.log('MyForm', form2.getInfo())
