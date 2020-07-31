import { Resolver, Mutation, Arg, Query, ID, ObjectType, Field } from 'type-graphql'

import { Client, ClientEntity } from '../entities/client.entity'
import { PaymentEntity, PaymentStatus } from '../entities/payment.entity'

import { ClientInput } from './inputs/client.input'
import { PaymentInput } from './inputs/payment.input'

@ObjectType()
class PaymentFilter {
  @Field(() => String)
  id_client: string
  @Field(() => String)
  name_client: string
  @Field(() => Number)
  total_pay: number
  @Field(() => Number)
  total_amount: number
  @Field(() => Number)
  avg_amount: number
}

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  async allClient() {
    return await ClientEntity.find().populate('identifier_payments')
  }

  @Mutation(() => Client)
  async createClient(@Arg('variables', () => ClientInput) variables: ClientInput) {
    const newClient = (await ClientEntity.create(variables)).save()
    return newClient
  }

  @Mutation(() => Boolean)
  async deleteClient(@Arg('id', () => String) id: string) {
    await ClientEntity.deleteOne({_id: id})
    return true
  }

  @Mutation(() => Boolean)
  async updateClient(
    @Arg('id', () => String) id: string,
    @Arg('variables', () => ClientInput) variables: ClientInput) {
    await ClientEntity.update({ _id: id }, variables)
    return true
  }

  // Un pago pertenece a un solo cliente, y el cliente puede tener muchos pagos
  @Mutation(() => Client)
  async addPaymentToClient(
    @Arg('id', () => ID) id: string,
    @Arg('variables', () => PaymentInput) variables: PaymentInput) {
    const payment = await PaymentEntity.create(variables)
    const newPayment = await payment.save()
    const result = await ClientEntity.findByIdAndUpdate(id, {$push: { identifier_payments: newPayment._id}}, { new: true })
    return result
  }

  @Query(() => [PaymentFilter])
  async clientWithRegisteredPayment(
    @Arg('status', () => PaymentStatus) status: PaymentStatus
  ) {
    const result = await ClientEntity
    .find()
    .populate({ path: 'identifier_payments', match: { status } })
    // id_client
    // -  name_client
    // -  total_pay (Cantidad de Pagos)
    // -  total_amount (Sumatoria de los montos de los pagos)
    // - avg_amount ( total_amount / total_pay  )

    const payload: Array<PaymentFilter> = []
    result.map(result => {
      result.identifier_payments.map((payment: any) => {
        let amountTotal = 0
        amountTotal += payment.amount
        payload.push({
          id_client: `${result._id}`,
          name_client: result.name,
          total_pay: result.identifier_payments.length,
          total_amount: amountTotal,
          avg_amount: amountTotal / result.identifier_payments.length
        })
      })
    })

    return payload
  }

  @Mutation(() => Boolean)
  async changePaymentStatus(
    @Arg('id', () => ID)id: string,
    @Arg('status', () => PaymentStatus) status: PaymentStatus
  ) {
    await PaymentEntity.findByIdAndUpdate({ _id: id }, { status }, { new: true })
    return true
  }
}