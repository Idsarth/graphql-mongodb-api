import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Payment, PaymentEntity } from '../entities/payment.entity'
import { PaymentInput } from './inputs/payment.input'

@Resolver()
export class PaymentResolver {
  @Query(() => [Payment])
  async allPayment() {
    return await PaymentEntity.find()
  }

  @Mutation(() => Payment)
  async createPayment(@Arg('variables', () => PaymentInput) variables: PaymentInput) {
    const newPayment = (await PaymentEntity.create(variables)).save()
    return newPayment
  }
}