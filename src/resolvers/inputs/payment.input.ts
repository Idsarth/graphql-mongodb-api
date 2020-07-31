import { InputType, Field } from 'type-graphql'
import { PaymentStatus } from '../../entities/payment.entity'

@InputType()
export class PaymentInput {

  @Field()
  identifier: string

  @Field()
  amount: number

  @Field()
  coin: string

  @Field()
  product_name: string

  @Field()
  status: PaymentStatus
}