import { InputType, Field } from 'type-graphql'

@InputType()
export class ClientInput {
  @Field()
  identifier: string

  @Field()
  name: string

  @Field()
  phone: string
}