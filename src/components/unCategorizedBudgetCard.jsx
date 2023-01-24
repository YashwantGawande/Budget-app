import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import { unCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function UnCategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(unCATEGORIZED_BUDGET_ID).reduce(
    (total, expenses) => total + expenses.amount, 0)
    if(amount === 0)return null
  return (
  <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
  )
}
