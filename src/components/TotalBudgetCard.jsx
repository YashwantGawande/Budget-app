import React from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce(
    (total, expenses) => total + expenses.amount,
    0
  );
  const max = budgets.reduce((total, budget) => total + budget.max);
  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
}
