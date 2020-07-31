import { InputType, Field, ID } from 'type-graphql'
import { ObjectId } from 'mongodb'
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

  @Field(() => ID)
  identifier_client: ObjectId
}