import { Field, ID, ObjectType } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'

@ObjectType({ description: 'Entity client' })
export class Client {
  @Field(() => ID)
  public _id: string

  @Field()
  @Property({ required: true, type: String })
  public name: string

  @Field()
  @Property({ required: true, type: String })
  public phone: string
}

export const ClientEntity = getModelForClass(Client)
