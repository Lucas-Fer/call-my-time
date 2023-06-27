import { Button, TextInput, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Form, FormAnnotation } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const handlerPreRegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type PreRegisterFormData = z.infer<typeof handlerPreRegisterFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreRegisterFormData>({
    resolver: zodResolver(handlerPreRegisterFormSchema),
  })

  const route = useRouter()

  async function handlePreRegisterForm(data: PreRegisterFormData) {
    const { username } = data

    await route.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handlePreRegisterForm)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : 'Digite seu usuário'}
        </Text>
      </FormAnnotation>
    </>
  )
}
