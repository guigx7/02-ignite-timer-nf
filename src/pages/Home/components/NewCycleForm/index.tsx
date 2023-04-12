import { FormContainer, MinutesAmountImput, TaskInput } from './style'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const { register, handleSubmit, watch, reset } = useForm<newCicleFormData>({
  resolver: zodResolver(newCycleFormValidationSchema),
  defaultValues: {
    task: '',
    minutesAmount: 0,
  },
})

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser de no mínimo 5 minutos')
    .max(180, 'O ciclo deve ser de no mínimo 180 minutos'),
})

type newCicleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
        <option value="Projeto 5" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountImput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={180}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
