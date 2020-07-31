import { InputType, Field, ID } from 'type-graphql'
import { ObjectId } from 'mongodb'

@InputType()
export class PaymentInput {

  @Field()
  public identifier: string

  @Field()
  public amount: number

  @Field()
  public coin: string

  @Field()
  public product_name: string

  @Field()
  public status: string

  @Field(() => ID)
  public identifier_client: ObjectId
}