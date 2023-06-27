import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Form } from './styles'
import { useForm } from 'react-hook-form'
import zod from 'zod'

const handlerPreRegisterFormSchema = zod.object({
  username: zod.string(),
})

type PreRegisterFormData = zod.infer<typeof handlerPreRegisterFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<PreRegisterFormData>()

  async function handlePreRegisterForm(data: PreRegisterFormData) {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handlePreRegisterForm)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
