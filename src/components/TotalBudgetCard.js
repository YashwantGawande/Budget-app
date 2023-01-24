import React from 'react'
import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function TotalBudgetCard() {
    const { expenses, budget } = useBudgets()
    const amount = expenses.reduce(
        (total, expenses) => total + expenses.amount, 0)
    const max = budget.reduce(
        (total, budget) => total + budget.max
    )
    return (
        <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />
    )
}
