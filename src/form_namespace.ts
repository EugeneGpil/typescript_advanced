namespace Form {
  export type FormTypeType = 'inline' | 'block'
  export type FormStateType = 'active' | 'disabled'
  
  export interface FormInfoInterface {
    type: FormTypeType,
    state: FormStateType
  }
}
