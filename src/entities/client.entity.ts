import { Field, ID, ObjectType } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

import { Payment } from './payment.entity';
import { Ref } from '../@types/types'

@ObjectType({ description: 'Entity client' })
export class Client {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field()
  @Property({ required: true, type: String, unique: true })
  identifier: string

  @Field()
  @Property({ required: true, type: String })
  name: string

  @Field()
  @Property({ required: true, type: String, unique: true })
  phone: string

  // relationship one to many to document payments
  @Field(() => [Payment])
  @Property({ ref: Payment, type: ObjectId })
  readonly identifier_payments: Ref<Payment>[]

  @Field()
  @Property({ type: Date, default: Date.now })
  readonly created_at: Date
}

export const ClientEntity = getModelForClass(Client)
