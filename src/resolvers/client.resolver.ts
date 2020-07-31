import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Client, ClientEntity } from '../entities/client.entity'

import { ClientInput } from './inputs/client.input'

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  async allClient() {
    return await ClientEntity.find()
  }

  @Mutation(() => Client)
  async createClient(@Arg('variables', () => ClientInput) variables: ClientInput) {
    const newClient = (await ClientEntity.create(variables)).save()
    return newClient
  }

  @Mutation(() => Boolean)
  async deletePayment(@Arg("id", () => String) id: string) {
    await ClientEntity.deleteOne({_id: id})
    return true
  }

  @Mutation(() => Boolean)
  async updatePayment(
    @Arg("id", () => String) id: string,
    @Arg("variables", () => ClientInput) variables: ClientInput) {
    await ClientEntity.update({ _id: id }, variables)
    return true
  }

}