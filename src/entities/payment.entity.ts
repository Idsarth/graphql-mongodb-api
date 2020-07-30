import { Field, ID, ObjectType, Int } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'

@ObjectType({ description: 'Entity client' })
export class Payment {
  @Field(() => ID)
  public _id: string

  @Field()
  @Property({ required: true, type: String })
  public coin: string

  @Field(() => Int)
  @Property({ required: true, type: Number })
  public amount: number

  @Field()
  @Property({ required: true, type: String })
  public code_product: string
}

export const PaymentEntity = getModelForClass(Payment)
