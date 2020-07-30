import { Field, , ObjectType } from 'type-graphql'
import { prop, Ref } from '@typegoose/typegoose'

@ObjectType()
export class ClientEntity {
  @Field(() => )
  @prop({ required: true, type: String })
  public name: string

  @prop({ required: true, type: String })
  public phone: string

  @prop({ required: true })
}