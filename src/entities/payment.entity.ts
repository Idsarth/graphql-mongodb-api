import { ObjectId } from 'mongodb'
import { Field, ID, ObjectType, Int, registerEnumType } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { Client } from './client.entity';

// Import types
import { Ref } from '../@types/types'

export enum PaymentStatus {
  CREATE = 'create',
  PENDING = 'pending',
  PAID = 'paid'
}

registerEnumType(PaymentStatus, { name: 'payment_status', description: 'payment status' })

@ObjectType({ description: 'Entity client' })
export class Payment {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field(() => String)
  @Property({ required: true, type: String, unique: true })
  identifier: string

  @Field(() => Int)
  @Property({ required: true, type: Number })
  amount: number

  @Field(() => String)
  @Property({ required: true, type: String })
  coin: string

  @Field(() => String)
  @Property({ required: true, type: String })
  product_name: string

  @Field(() => PaymentStatus)
  @Property({ required: true, type: String })
  status: PaymentStatus

  @Field(() => String)
  @Property({ required: true, ref: Client })
  identifier_client: Ref<Client>

  @Field(() => Date)
  @Property({ type: Date, default: new Date() })
  readonly created_at: Date
}

export const PaymentEntity = getModelForClass(Payment)
